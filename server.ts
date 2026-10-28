import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import { initialWeatherZones, initialSurveillanceData } from './src/data/agroData.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '25mb' }));

// Initialize GoogleGenAI server-side with required headers
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Helper to extract base64 data and mime type
function parseImageData(dataUrl: string): { mimeType: string; base64: string } {
  if (dataUrl.startsWith('data:')) {
    const matches = dataUrl.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
    if (matches && matches.length === 3) {
      return {
        mimeType: matches[1],
        base64: matches[2],
      };
    }
  }
  return {
    mimeType: 'image/jpeg',
    base64: dataUrl,
  };
}

// Crop disease analysis endpoint using Gemini 2.5 Flash
app.post('/api/analyze-crop', async (req: Request, res: Response) => {
  try {
    const { imageBase64, cropHint, language = 'en', location = 'Ethiopian Highlands' } = req.body;

    if (!imageBase64) {
      res.status(400).json({ error: 'Image data is required' });
      return;
    }

    const { mimeType, base64 } = parseImageData(imageBase64);

    const langInstruction =
      language === 'om'
        ? 'Provide the detailed diagnosis in Afaan Oromoo (with English scientific terms in brackets).'
        : language === 'am'
        ? 'Provide the detailed diagnosis in Amharic (አማርኛ) (with English scientific terms in brackets).'
        : 'Provide the detailed diagnosis in English.';

    const systemPrompt = `You are a world-class Plant Pathologist and Ethiopian Agricultural Extension Specialist (Development Agent / D.A.).
Your role is to diagnose crop diseases from plant leaf images, with particular expertise in Ethiopian staple crops:
- Arabica Coffee (Coffea arabica): Coffee Leaf Rust (Hemileia vastatrix), Coffee Berry Disease (Colletotrichum kahawae), Coffee Wilt (Gibberella xylarioides)
- Bread Wheat (Triticum aestivum): Stem Rust (Ug99 / Puccinia graminis), Stripe Rust (Puccinia striiformis), Septoria
- Teff (Eragrostis tef): Teff Rust (Uromyces eragrostidis), Head Smut, Damping off
- Maize (Zea mays): Maize Lethal Necrosis Disease (MLND), Gray Leaf Spot, Northern Corn Leaf Blight, Fall Armyworm damage
- Enset (Ensete ventricosum): Bacterial Wilt (Xanthomonas vasicola pv. musacearum)
- Tomato (Solanum lycopersicum): Early Blight (Alternaria solani), Late Blight, Bacterial Spot, Mosaic virus
- Potato (Solanum tuberosum): Late Blight (Phytophthora infestans), Bacterial Wilt (Ralstonia)
- Sorghum, Barley, Faba Bean, and others.

Analyze the provided leaf image carefully.
${langInstruction}
Focus on actionable, realistic recommendations for smallholder farmers in Ethiopia. Include:
1. Practical low-cost organic / traditional Ethiopian remedies (wood ash, neem spray, compost, crop spacing, rogueing).
2. Registered, safe chemical fungicides/pesticides with knapsack sprayer dosages (e.g. per 15L backpack tank) and PPE warnings.
3. Cultural practices (EIAR / JARC resistant cultivars, crop rotation, shade management).
4. Immediate 24-48 hour actions.
5. A short 2-3 sentence spoken summary suitable for audio playback to rural farmers.`;

    const contents = {
      parts: [
        {
          inlineData: {
            mimeType: mimeType.startsWith('image/svg') ? 'image/png' : mimeType,
            data: base64,
          },
        },
        {
          text: `Please diagnose this crop leaf image.
Crop hint from farmer: ${cropHint || 'Unknown / Not specified'}.
Location: ${location}.
Return a strictly valid JSON object matching the following structure:
{
  "cropName": "Common name of the crop",
  "scientificCropName": "Botanical name",
  "diseaseName": "Common name of the disease or 'Healthy Foliage'",
  "scientificPathogen": "Pathogen name (fungus, bacterium, virus, or pest)",
  "isHealthy": false,
  "confidence": 95.5,
  "severity": "healthy" | "mild" | "moderate" | "severe",
  "symptoms": ["Symptom 1", "Symptom 2", "Symptom 3"],
  "causeEtiology": "Detailed cause and environmental triggers",
  "treatments": {
    "organic": ["Organic remedy 1", "Organic remedy 2"],
    "chemical": ["Chemical fungicide 1 with knapsack dosage", "Chemical treatment 2"],
    "cultural": ["Cultural sanitation 1", "Resistant varieties from EIAR"]
  },
  "immediateNextSteps": ["Immediate action 1", "Immediate action 2"],
  "preventativeMeasures": ["Prevention 1", "Prevention 2"],
  "regionalRiskNote": "Specific agro-ecological relevance in Ethiopian zones (Oromia, Amhara, Sidama, etc.)",
  "audioSummaryScript": "2-3 short, spoken sentences summarizing the problem and main action for the farmer."
}`,
        },
      ],
    };

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
        temperature: 0.2,
      },
    });

    const responseText = response.text || '{}';
    let parsedResult;
    try {
      parsedResult = JSON.parse(responseText);
    } catch {
      // Fallback clean regex in case of formatting wraps
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      parsedResult = jsonMatch ? JSON.parse(jsonMatch[0]) : {};
    }

    // Assemble final result
    const finalResult = {
      id: 'res-' + Date.now(),
      timestamp: new Date().toISOString(),
      cropName: parsedResult.cropName || cropHint || 'Crop Specimen',
      scientificCropName: parsedResult.scientificCropName || 'Plantae',
      diseaseName: parsedResult.diseaseName || 'Diagnostic Assessment',
      scientificPathogen: parsedResult.scientificPathogen || 'Unspecified Pathogen',
      isHealthy: Boolean(parsedResult.isHealthy),
      confidence: typeof parsedResult.confidence === 'number' ? parsedResult.confidence : 92.5,
      severity: parsedResult.severity || (parsedResult.isHealthy ? 'healthy' : 'moderate'),
      symptoms: Array.isArray(parsedResult.symptoms) && parsedResult.symptoms.length > 0
        ? parsedResult.symptoms
        : ['Visual foliar examination completed.'],
      causeEtiology: parsedResult.causeEtiology || 'Pathogen activity influenced by temperature and relative humidity.',
      treatments: {
        organic: parsedResult.treatments?.organic || ['Apply organic compost and inspect shade conditions.'],
        chemical: parsedResult.treatments?.chemical || ['Consult local agricultural development agent for certified knapsack dosage.'],
        cultural: parsedResult.treatments?.cultural || ['Rotate crops and maintain balanced spacing.']
      },
      immediateNextSteps: parsedResult.immediateNextSteps || ['Isolate symptomatic foliage and notify extension agent.'],
      preventativeMeasures: parsedResult.preventativeMeasures || ['Plant certified disease-resistant seeds.'],
      regionalRiskNote: parsedResult.regionalRiskNote || 'Surveillance recommended across Ethiopian agricultural zones.',
      audioSummaryScript: parsedResult.audioSummaryScript || `Crop diagnosis complete for ${parsedResult.cropName || 'your crop'}. Please review the recommended organic and chemical treatments.`,
      imageUrl: imageBase64,
      location,
      status: parsedResult.isHealthy ? 'resolved' : 'treating'
    };

    res.json(finalResult);
  } catch (err: unknown) {
    const error = err as Error;
    console.error('Error in /api/analyze-crop:', error.message);
    res.status(500).json({
      error: 'AI diagnosis failed',
      details: error.message
    });
  }
});

// AI Agricultural Assistant Chat endpoint
app.post('/api/chat-advisor', async (req: Request, res: Response) => {
  try {
    const { message, conversationHistory = [], language = 'en', cropContext } = req.body;

    if (!message) {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    const langInstruction =
      language === 'om'
        ? 'Always respond fluently in Afaan Oromoo (Oromiffa). Keep sentences clear, practical, and respectful.'
        : language === 'am'
        ? 'Always respond fluently in Amharic (አማርኛ). Keep sentences clear, practical, and respectful.'
        : 'Always respond fluently in English.';

    const systemInstruction = `You are "AgroAI Advisor", an empathetic, highly knowledgeable Senior Agricultural Extension Specialist and Agronomist in Ethiopia.
You assist smallholder and commercial farmers with:
- Crop disease identification and integrated pest management (IPM)
- Soil fertility, organic composting, bio-fertilizers, and balanced NPSB/Urea application in Ethiopia
- Agro-forestry and shade management for Arabica Coffee (Jimma, Kaffa, Sidama, Harar)
- Teff production (seed rate, row planting, vertisol drainage, weed control like Guizotia scabra / Mech)
- Wheat rust prevention (Ug99 stem rust, stripe rust, resistant varieties from Kulumsa)
- Enset (False Banana) bacterial wilt eradication and knife sterilization
- Seasonal planning for Meher (main wet season) and Belg (short rains)
${cropContext ? `Current Crop In Focus: ${cropContext}` : ''}

${langInstruction}
Keep answers structured, practical, and encouraging. Cite Ethiopian Agricultural Research Institute (EIAR) guidelines when relevant. Provide 2-3 quick follow-up questions at the end as brief bullet points.`;

    const chatContents = [
      ...conversationHistory.map((item: { sender: string; text: string }) => ({
        role: item.sender === 'user' ? 'user' : 'model',
        parts: [{ text: item.text }],
      })),
      {
        role: 'user',
        parts: [{ text: message }],
      },
    ];

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: chatContents,
      config: {
        systemInstruction,
        temperature: 0.5,
      },
    });

    const replyText = response.text || 'I am here to assist your farm. How can I help with your crops today?';

    res.json({
      reply: replyText,
      timestamp: new Date().toISOString(),
    });
  } catch (err: unknown) {
    const error = err as Error;
    console.error('Error in /api/chat-advisor:', error.message);
    res.status(500).json({
      error: 'Advisor chat failed',
      details: error.message
    });
  }
});

// Weather and agro-ecological risk data
app.get('/api/weather-advisory', (_req: Request, res: Response) => {
  res.json({
    zones: initialWeatherZones,
    timestamp: new Date().toISOString(),
  });
});

// National disease surveillance alerts
app.get('/api/surveillance', (_req: Request, res: Response) => {
  res.json({
    alerts: initialSurveillanceData,
    prevalence: [
      { crop: 'Arabica Coffee', disease: 'Coffee Leaf Rust', percentage: 34, trend: '+4% this month' },
      { crop: 'Bread Wheat', disease: 'Wheat Stem & Stripe Rust', percentage: 28, trend: '+8% this month' },
      { crop: 'Field Maize', disease: 'MLND & Gray Leaf Spot', percentage: 16, trend: '-2% this month' },
      { crop: 'Enset', disease: 'Bacterial Wilt (BXW)', percentage: 12, trend: 'Stable' },
      { crop: 'Highland Potato', disease: 'Late Blight', percentage: 10, trend: '+5% this month' },
    ],
    seasonalInsight: {
      season: 'Meher Season Transition',
      riskFactor: 'High Humidity & Wind Spore Dispersal',
      targetZones: ['Arsi Wheat Belt', 'Jimma Coffee Zone', 'West Shewa Potato Belt'],
    },
    timestamp: new Date().toISOString(),
  });
});

// Setup Vite in Dev or static files in Production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🌾 AgroAI Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start AgroAI server:', err);
});
