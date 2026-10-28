import { CropDiseaseResult } from '../types';

export interface SampleCropItem {
  id: string;
  name: {
    en: string;
    om: string;
    am: string;
  };
  cropType: string;
  diseaseName: {
    en: string;
    om: string;
    am: string;
  };
  scientificPathogen: string;
  isHealthy: boolean;
  severity: 'healthy' | 'mild' | 'moderate' | 'severe';
  imageUrl: string;
  defaultResult: CropDiseaseResult;
}

// Generate realistic data URLs for Ethiopian agricultural leaf samples
export const createSampleLeafSvg = (type: string): string => {
  let innerElements = '';
  let bgColor = '#1b3a27';

  switch (type) {
    case 'coffee-rust':
      bgColor = '#1e382b';
      innerElements = `
        <!-- Coffee leaf blade -->
        <path d="M 60 200 C 60 90, 160 30, 200 10 C 240 30, 340 90, 340 200 C 340 310, 250 370, 200 390 C 150 370, 60 310, 60 200 Z" fill="#2d5a37" stroke="#1f4427" stroke-width="3"/>
        <!-- Central midrib -->
        <path d="M 200 15 Q 198 200 200 388" stroke="#4a7c59" stroke-width="4" fill="none"/>
        <!-- Lateral veins -->
        <path d="M 200 80 Q 150 95 110 120 M 200 80 Q 250 95 290 120" stroke="#3b6948" stroke-width="2" fill="none"/>
        <path d="M 200 140 Q 140 160 90 190 M 200 140 Q 260 160 310 190" stroke="#3b6948" stroke-width="2" fill="none"/>
        <path d="M 200 210 Q 140 235 95 270 M 200 210 Q 260 235 305 270" stroke="#3b6948" stroke-width="2" fill="none"/>
        <path d="M 200 280 Q 150 305 115 340 M 200 280 Q 250 305 285 340" stroke="#3b6948" stroke-width="2" fill="none"/>
        <!-- Coffee Rust (Hemileia vastatrix) pustules: orange-yellow powder spots with necrotic centers -->
        <circle cx="140" cy="150" r="14" fill="#eab308" opacity="0.85"/>
        <circle cx="140" cy="150" r="8" fill="#d97706"/>
        <circle cx="138" cy="148" r="4" fill="#78350f"/>
        
        <circle cx="260" cy="180" r="18" fill="#eab308" opacity="0.85"/>
        <circle cx="260" cy="180" r="10" fill="#ea580c"/>
        <circle cx="258" cy="178" r="5" fill="#451a03"/>
        
        <circle cx="160" cy="240" r="22" fill="#ca8a04" opacity="0.85"/>
        <circle cx="162" cy="238" r="13" fill="#c2410c"/>
        <circle cx="160" cy="235" r="7" fill="#451a03"/>

        <circle cx="240" cy="265" r="16" fill="#eab308" opacity="0.85"/>
        <circle cx="240" cy="265" r="9" fill="#d97706"/>

        <circle cx="130" cy="300" r="12" fill="#ca8a04" opacity="0.9"/>
        <circle cx="270" cy="110" r="10" fill="#eab308" opacity="0.8"/>
        <!-- Chlorotic halo spread -->
        <ellipse cx="160" cy="240" rx="32" ry="26" fill="#facc15" opacity="0.25"/>
        <ellipse cx="260" cy="180" rx="28" ry="22" fill="#facc15" opacity="0.25"/>
      `;
      break;

    case 'wheat-rust':
      bgColor = '#233220';
      innerElements = `
        <!-- Wheat leaf blade and sheath (elongated graminoid leaf) -->
        <path d="M 170 10 L 230 10 L 225 390 L 175 390 Z" fill="#4d7c38" stroke="#365827" stroke-width="2"/>
        <line x1="200" y1="10" x2="200" y2="390" stroke="#689f4c" stroke-width="2"/>
        <line x1="185" y1="10" x2="185" y2="390" stroke="#3f662e" stroke-width="1"/>
        <line x1="215" y1="10" x2="215" y2="390" stroke="#3f662e" stroke-width="1"/>
        <!-- Wheat Stem Rust (Puccinia graminis / Ug99 lineage) reddish-brown elongated pustules -->
        <rect x="188" y="70" width="16" height="35" rx="5" fill="#991b1b"/>
        <rect x="190" y="72" width="12" height="31" rx="4" fill="#b91c1c"/>
        <ellipse cx="196" cy="87" rx="4" ry="12" fill="#450a0a"/>

        <rect x="178" y="140" width="14" height="42" rx="4" fill="#7f1d1d"/>
        <rect x="180" y="142" width="10" height="38" rx="3" fill="#dc2626"/>

        <rect x="206" y="170" width="15" height="48" rx="5" fill="#991b1b"/>
        <rect x="208" y="172" width="11" height="44" rx="4" fill="#ef4444"/>
        <ellipse cx="213" cy="194" rx="3" ry="15" fill="#450a0a"/>

        <rect x="185" y="240" width="18" height="50" rx="5" fill="#7f1d1d"/>
        <rect x="187" y="242" width="14" height="46" rx="4" fill="#b91c1c"/>

        <rect x="200" y="310" width="16" height="38" rx="4" fill="#991b1b"/>
        <!-- Epidermis rupture tearing appearance -->
        <path d="M 186 68 L 190 70 L 186 73 M 204 68 L 206 72 L 204 75" stroke="#fef08a" stroke-width="1.5" fill="none"/>
        <path d="M 183 238 L 187 241 L 183 244" stroke="#fef08a" stroke-width="1.5" fill="none"/>
      `;
      break;

    case 'teff-rust':
      bgColor = '#1e2d24';
      innerElements = `
        <!-- Slender Teff grass leaf blade -->
        <path d="M 185 10 C 195 80, 200 200, 205 390 L 195 390 C 190 200, 185 80, 180 10 Z" fill="#528340" stroke="#355828" stroke-width="2"/>
        <line x1="190" y1="10" x2="200" y2="390" stroke="#71a85b" stroke-width="1.5"/>
        <!-- Teff Rust (Uromyces eragrostidis) small golden-brown scattered flecks -->
        <circle cx="186" cy="65" r="3.5" fill="#b45309"/>
        <circle cx="192" cy="78" r="4" fill="#d97706"/>
        <circle cx="187" cy="110" r="3" fill="#92400e"/>
        <circle cx="194" cy="130" r="4.5" fill="#b45309"/>
        <circle cx="190" cy="160" r="3.5" fill="#d97706"/>
        <circle cx="188" cy="195" r="5" fill="#78350f"/>
        <circle cx="196" cy="225" r="4" fill="#b45309"/>
        <circle cx="191" cy="260" r="4.5" fill="#d97706"/>
        <circle cx="195" cy="290" r="3.5" fill="#92400e"/>
        <circle cx="198" cy="330" r="4" fill="#b45309"/>
      `;
      break;

    case 'maize-mlnd':
      bgColor = '#1f3424';
      innerElements = `
        <!-- Wide maize leaf blade -->
        <path d="M 80 390 C 100 220, 150 80, 200 20 C 250 80, 300 220, 320 390 Z" fill="#65a30d" stroke="#4d7c0f" stroke-width="3"/>
        <!-- Prominent pale midrib -->
        <path d="M 200 25 L 200 390" stroke="#a3e635" stroke-width="6"/>
        <!-- MLND Severe chlorotic mottling, margin necrosis & bleached streaks -->
        <path d="M 110 180 C 120 150, 140 130, 170 140 C 150 170, 130 190, 110 180 Z" fill="#facc15" opacity="0.9"/>
        <path d="M 230 160 C 260 140, 280 170, 260 210 C 240 190, 220 170, 230 160 Z" fill="#facc15" opacity="0.9"/>
        <!-- Dead leaf margins (dry brown necrosis) -->
        <path d="M 82 300 Q 100 260 120 270 Q 95 320 85 360 Z" fill="#78350f"/>
        <path d="M 315 280 Q 295 240 275 250 Q 305 310 312 350 Z" fill="#78350f"/>
        <!-- Mosaic streaks -->
        <line x1="140" y1="210" x2="185" y2="240" stroke="#fef08a" stroke-width="4" stroke-dasharray="6,4"/>
        <line x1="150" y1="270" x2="190" y2="300" stroke="#fef08a" stroke-width="4" stroke-dasharray="6,4"/>
        <line x1="215" y1="230" x2="260" y2="260" stroke="#fef08a" stroke-width="4" stroke-dasharray="6,4"/>
        <line x1="215" y1="290" x2="255" y2="320" stroke="#fef08a" stroke-width="4" stroke-dasharray="6,4"/>
        <line x1="120" y1="330" x2="180" y2="360" stroke="#ca8a04" stroke-width="3"/>
      `;
      break;

    case 'tomato-blight':
      bgColor = '#1e3328';
      innerElements = `
        <!-- Compound tomato leaflet -->
        <path d="M 120 220 C 100 150, 160 80, 200 40 C 240 80, 300 150, 280 220 C 270 290, 240 340, 200 370 C 160 340, 130 290, 120 220 Z" fill="#15803d" stroke="#166534" stroke-width="3"/>
        <path d="M 200 45 L 200 365" stroke="#4ade80" stroke-width="3"/>
        <!-- Serrated lobed edges -->
        <!-- Early Blight (Alternaria solani) Target / Bullseye concentric rings with chlorotic halo -->
        <ellipse cx="160" cy="180" rx="35" ry="32" fill="#ca8a04" opacity="0.3"/>
        <circle cx="160" cy="180" r="24" fill="#3f2314"/>
        <circle cx="160" cy="180" r="18" fill="none" stroke="#78350f" stroke-width="2.5"/>
        <circle cx="160" cy="180" r="11" fill="none" stroke="#9a3412" stroke-width="2"/>
        <circle cx="160" cy="180" r="5" fill="#1c0f07"/>

        <ellipse cx="235" cy="250" rx="30" ry="28" fill="#ca8a04" opacity="0.3"/>
        <circle cx="235" cy="250" r="20" fill="#3f2314"/>
        <circle cx="235" cy="250" r="14" fill="none" stroke="#78350f" stroke-width="2.5"/>
        <circle cx="235" cy="250" r="8" fill="none" stroke="#9a3412" stroke-width="2"/>
        <circle cx="235" cy="250" r="3" fill="#1c0f07"/>

        <!-- Smaller lesion starting on top leaf -->
        <circle cx="220" cy="120" r="12" fill="#451a03"/>
        <circle cx="220" cy="120" r="8" fill="none" stroke="#78350f" stroke-width="1.5"/>
      `;
      break;

    case 'enset-wilt':
      bgColor = '#1e382b';
      innerElements = `
        <!-- Giant Enset (False Banana) leaf -->
        <path d="M 90 200 C 90 80, 160 30, 200 15 C 240 30, 310 80, 310 200 C 310 320, 250 375, 200 390 C 150 375, 90 320, 90 200 Z" fill="#22c55e" stroke="#16a34a" stroke-width="3"/>
        <!-- Thick central reddish midrib characteristic of Enset -->
        <path d="M 200 20 L 200 390" stroke="#dc2626" stroke-width="6"/>
        <!-- Xanthomonas bacterial wilt symptoms: leaf heart yellowing, dull bronze wilting & necrotic tip -->
        <path d="M 140 100 C 160 60, 200 30, 240 60 C 210 110, 180 130, 140 100 Z" fill="#eab308" opacity="0.85"/>
        <path d="M 180 40 C 190 25, 210 25, 220 40 C 210 65, 190 65, 180 40 Z" fill="#78350f"/>
        <!-- Yellow wilt streaks along midrib -->
        <path d="M 188 120 L 160 170 L 175 190 L 194 150 Z" fill="#facc15" opacity="0.8"/>
        <path d="M 206 140 L 240 200 L 225 215 L 206 170 Z" fill="#ca8a04" opacity="0.8"/>
        <!-- Water-soaked drooping margin -->
        <path d="M 95 240 C 90 280, 110 310, 140 320 C 120 290, 105 270, 95 240 Z" fill="#854d0e"/>
      `;
      break;

    case 'potato-late-blight':
      bgColor = '#213326';
      innerElements = `
        <!-- Potato leaflet -->
        <path d="M 110 210 C 90 140, 150 60, 200 30 C 250 60, 310 140, 290 210 C 270 290, 240 350, 200 380 C 160 350, 130 290, 110 210 Z" fill="#2e7d32" stroke="#1b5e20" stroke-width="3"/>
        <path d="M 200 35 L 200 375" stroke="#66bb6a" stroke-width="3"/>
        <!-- Late Blight (Phytophthora infestans): large dark water-soaked lesions with white mold border -->
        <path d="M 120 160 C 130 120, 170 130, 190 160 C 170 200, 140 210, 120 160 Z" fill="#18181b"/>
        <path d="M 122 158 C 131 122, 168 132, 187 159 C 168 197, 141 207, 122 158 Z" stroke="#f4f4f5" stroke-width="2" fill="none" opacity="0.8"/>

        <path d="M 210 220 C 230 190, 270 200, 280 240 C 270 280, 230 270, 210 220 Z" fill="#27272a"/>
        <path d="M 212 222 C 230 194, 268 202, 277 239 C 267 277, 231 268, 212 222 Z" stroke="#e4e4e7" stroke-width="2" fill="none" opacity="0.7"/>

        <!-- Leaf tip necrosis -->
        <path d="M 185 45 C 195 32, 205 32, 215 45 C 210 70, 190 70, 185 45 Z" fill="#09090b"/>
      `;
      break;

    case 'healthy-coffee':
    default:
      bgColor = '#143021';
      innerElements = `
        <!-- Beautiful healthy deep-gloss Arabica Coffee Leaf -->
        <path d="M 60 200 C 60 90, 160 30, 200 10 C 240 30, 340 90, 340 200 C 340 310, 250 370, 200 390 C 150 370, 60 310, 60 200 Z" fill="#15803d" stroke="#166534" stroke-width="3"/>
        <!-- Central midrib -->
        <path d="M 200 15 Q 198 200 200 388" stroke="#86efac" stroke-width="4" fill="none"/>
        <!-- Lateral parallel arching veins -->
        <path d="M 200 80 Q 150 95 110 120 M 200 80 Q 250 95 290 120" stroke="#4ade80" stroke-width="2.5" fill="none"/>
        <path d="M 200 140 Q 140 160 90 190 M 200 140 Q 260 160 310 190" stroke="#4ade80" stroke-width="2.5" fill="none"/>
        <path d="M 200 210 Q 140 235 95 270 M 200 210 Q 260 235 305 270" stroke="#4ade80" stroke-width="2.5" fill="none"/>
        <path d="M 200 280 Q 150 305 115 340 M 200 280 Q 250 305 285 340" stroke="#4ade80" stroke-width="2.5" fill="none"/>
        <!-- Glossy highlight on healthy cuticle -->
        <path d="M 170 100 C 160 180, 160 250, 175 320" stroke="#bbf7d0" stroke-width="4" stroke-linecap="round" opacity="0.3" fill="none"/>
        <!-- Subtle leaf texture dots -->
        <circle cx="150" cy="160" r="1.5" fill="#86efac" opacity="0.4"/>
        <circle cx="240" cy="220" r="1.5" fill="#86efac" opacity="0.4"/>
      `;
      break;
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
    <rect width="400" height="400" fill="${bgColor}"/>
    <!-- Agro Grid subtle pattern -->
    <defs>
      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="400" height="400" fill="url(#grid)" />
    ${innerElements}
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const sampleCrops: SampleCropItem[] = [
  {
    id: 'coffee-rust-sample',
    cropType: 'Coffee Arabica',
    name: {
      en: 'Arabica Coffee',
      om: 'Buna Arabikaa',
      am: 'አረቢካ ቡና'
    },
    diseaseName: {
      en: 'Coffee Leaf Rust (CLR)',
      om: 'Dhibee Baala Bunaa (Hemileia)',
      am: 'የቡና ቅጠል ዝገት'
    },
    scientificPathogen: 'Hemileia vastatrix',
    isHealthy: false,
    severity: 'severe',
    imageUrl: createSampleLeafSvg('coffee-rust'),
    defaultResult: {
      id: 'res-sample-coffee',
      timestamp: new Date().toISOString(),
      cropName: 'Arabica Coffee (Coffea arabica)',
      scientificCropName: 'Coffea arabica',
      diseaseName: 'Coffee Leaf Rust (CLR)',
      scientificPathogen: 'Hemileia vastatrix Berk. & Broome',
      isHealthy: false,
      confidence: 96.4,
      severity: 'severe',
      symptoms: [
        'Bright orange-yellow powdery pustules (urediniospores) on the lower leaf epidermis',
        'Chlorotic yellowish lesions visible on the upper surface matching spore pustules underneath',
        'Necrosis and premature dropping of infected foliage leading to bare branches',
        'Severely reduced photosynthesis and cherry dieback in high-bearing trees'
      ],
      causeEtiology: 'Obligate fungal parasite Hemileia vastatrix. Spore germination is triggered by free moisture (dew or rain) at 21-25°C in dense, humid highland coffee canopies (common in Jimma, Kaffa, and Sidama).',
      treatments: {
        organic: [
          'Apply wood ash and fermented cow urine spray (1:10 dilution with water) to raise leaf surface pH',
          'Spray bio-fungicidal neem seed oil or Trichoderma harzianum solution every 14 days during wet season',
          'Prune excessive shade trees (e.g. Albizia, Cordia) to allow morning sunlight penetration and reduce leaf wetness duration',
          'Interplant with rust-tolerant Ethiopian Coffee landraces (such as 74110, 74112, or 7440 developed by Jimma Agricultural Research Center - JARC)'
        ],
        chemical: [
          'Foliar spray with Copper Oxychloride 50% WP (dosage: 70g per 15L knapsack sprayer) before main rains',
          'Systemic fungicide application: Triadimefon (Bayleton) or Epoxiconazole during peak spore dispersal',
          'Apply 2-3 sprays timed 3 weeks apart during the onset of the Meher rainfall period',
          'Ensure uniform coverage on the underside of coffee leaves where fungal spores germinate'
        ],
        cultural: [
          'Regular pruning of diseased primary and secondary branches and burning fallen diseased leaves',
          'Maintain balanced soil fertility with compost and potash to strengthen plant cell walls',
          'Mulch around coffee base with dried grass to prevent rain-splash spore dispersal'
        ]
      },
      immediateNextSteps: [
        'Isolate infected coffee trees immediately and prune severely defoliated twigs',
        'Mix and spray copper oxychloride or organic wood ash slurry within the next 24-48 hours',
        'Inform local agricultural extension Development Agent (D.A.) in your kebele about rust presence'
      ],
      preventativeMeasures: [
        'Plant certified rust-resistant coffee selections from EIAR / JARC in upcoming planting season',
        'Space trees at least 2.5m x 2.5m to facilitate air circulation through the canopy',
        'Establish proper windbreaks and contour drainage to prevent water stagnation'
      ],
      regionalRiskNote: 'Very High Risk across Oromia (Jimma, Illubabor, West Welega) and Sidama. Rain-induced spore multiplication peaks between July and September.',
      audioSummaryScript: 'Your coffee leaf has severe Coffee Leaf Rust caused by Hemileia vastatrix. Notice the orange powder underneath. Prune dense shade immediately and apply copper oxychloride or wood-ash spray to stop tree defoliation.',
      imageUrl: createSampleLeafSvg('coffee-rust'),
      status: 'treating'
    }
  },
  {
    id: 'wheat-rust-sample',
    cropType: 'Bread Wheat',
    name: {
      en: 'Highland Bread Wheat',
      om: 'Qamadii Dawaa',
      am: 'የዳቦ ስንዴ'
    },
    diseaseName: {
      en: 'Wheat Stem Rust (Ug99 Lineage)',
      om: 'Dhibee Zangoo Qamadii (Ug99)',
      am: 'የስንዴ ግንድ ዝገት (ኡግ 99)'
    },
    scientificPathogen: 'Puccinia graminis f. sp. tritici',
    isHealthy: false,
    severity: 'severe',
    imageUrl: createSampleLeafSvg('wheat-rust'),
    defaultResult: {
      id: 'res-sample-wheat',
      timestamp: new Date().toISOString(),
      cropName: 'Bread Wheat (Triticum aestivum)',
      scientificCropName: 'Triticum aestivum',
      diseaseName: 'Wheat Stem Rust (Ug99 Pathotype)',
      scientificPathogen: 'Puccinia graminis f. sp. tritici',
      isHealthy: false,
      confidence: 97.8,
      severity: 'severe',
      symptoms: [
        'Elongated reddish-brown (brick-red) pustules erupting through the epidermis of stems and leaf sheaths',
        'Torn epidermal flaps visibly bordering individual rust pustules',
        'Severe lodging (stem breakage) as fungal mycelium weakens structural stem tissues',
        'Shriveled grain heads producing low test weight and up to 100% yield loss in susceptible varieties'
      ],
      causeEtiology: 'Airborne urediniospores carried by high-altitude winds across the Great Rift Valley. Thrives in warm temperatures (20-30°C) with prolonged dew periods.',
      treatments: {
        organic: [
          'Early sowing with early-maturing cultivars to escape peak rust spore clouds from the south',
          'Strip cropping with faba bean or field pea to form physical fungal spore barriers',
          'Field eradication of alternate barberry or Mahonia host shrubs near wheat fields'
        ],
        chemical: [
          'Immediate aerial or knapsack spray with Propiconazole (Tilt 250 EC) at 0.5L/ha in 200L water',
          'Alternative: Tebuconazole (Folicur 250 EW) at 0.75 L/ha when 1-5% stem severity is noticed',
          'Repeat fungicide application 14 days later if humid and foggy weather persists'
        ],
        cultural: [
          'Adoption of Ug99-resistant wheat varieties (e.g., Kingbird, Danda’a, Kakaba, Ogolcho released by Kulumsa Agricultural Research Center)',
          'Eradicate volunteer wheat plants and wheat stubble before the onset of the main season',
          'Avoid excessive nitrogen fertilization which produces lush, rust-vulnerable stem tissues'
        ]
      },
      immediateNextSteps: [
        'Alert the Woreda Agriculture Office immediately as Stem Rust is an epidemic alert pathogen',
        'Execute emergency foliar fungicide spraying (Tilt or Rex Duo) early morning before wind speeds pick up',
        'Avoid moving livestock through infected wheat parcels to prevent spore dissemination to neighbors'
      ],
      preventativeMeasures: [
        'Replace older susceptible varieties like Kubsa or Digalu with modern rust-resistant seeds',
        'Synchronize planting dates within your kebele to eliminate continuous green bridges'
      ],
      regionalRiskNote: 'Critical Epidemic Alert in Arsi, Bale, and West Shewa wheat belts. Urgent surveillance mandated by the Ethiopian Ministry of Agriculture.',
      audioSummaryScript: 'Alert: Your wheat has stem rust, likely the virulent Ug99 strain. Brick-red pustules are breaking the stem. Apply propiconazole fungicide immediately and notify your local agricultural kebele agent.',
      imageUrl: createSampleLeafSvg('wheat-rust'),
      status: 'treating'
    }
  },
  {
    id: 'teff-rust-sample',
    cropType: 'Teff',
    name: {
      en: 'Ethiopian Teff',
      om: 'Xaafii Itoophiyaa',
      am: 'የኢትዮጵያ ጤፍ'
    },
    diseaseName: {
      en: 'Teff Rust',
      om: 'Dhibee Baala Xaafii',
      am: 'የጤፍ ዝገት በሽታ'
    },
    scientificPathogen: 'Uromyces eragrostidis Tracy',
    isHealthy: false,
    severity: 'mild',
    imageUrl: createSampleLeafSvg('teff-rust'),
    defaultResult: {
      id: 'res-sample-teff',
      timestamp: new Date().toISOString(),
      cropName: 'Teff (Eragrostis tef)',
      scientificCropName: 'Eragrostis tef',
      diseaseName: 'Teff Rust',
      scientificPathogen: 'Uromyces eragrostidis Tracy',
      isHealthy: false,
      confidence: 91.2,
      severity: 'mild',
      symptoms: [
        'Small circular to oblong golden-brown to dark brown uredinia on both surfaces of teff leaves',
        'Slight chlorosis around individual pustules causing early leaf senescence',
        'In heavy infections, premature drying of lower foliage occurs before panicle filling'
      ],
      causeEtiology: 'Fungal infection promoted by warm humid weather and high plant density. Teff rust is endemic to Ethiopian mid-to-high elevation vertisol plains.',
      treatments: {
        organic: [
          'Practice row planting (20cm spacing) instead of broadcasting seed to optimize airflow and lower humidity',
          'Incorporate composted farmyard manure to boost natural systemic resistance',
          'Timely hand-weeding of grass weeds that harbor alternative rust inocula'
        ],
        chemical: [
          'In moderate-to-severe outbreaks, apply Mancozeb (Dithane M-45) at 2.5 kg/ha in 250-300 L water',
          'Apply when first spots appear on lower leaves prior to heading'
        ],
        cultural: [
          'Select rust-tolerant varieties like Quncho (DZ-Cr-387), Boset, or Kora developed by Debre Zeit Agricultural Research Center',
          'Rotate with chickpea or lentil to break rust spore persistence in the soil'
        ]
      },
      immediateNextSteps: [
        'Monitor field weekly for spread from lower canopy upward',
        'Avoid foliar irrigation or standing water; improve furrow drainage',
        'If infection remains mild (under 10% leaf area), monitor without heavy chemical expenditure'
      ],
      preventativeMeasures: [
        'Use recommended seed rate of 10-15 kg/ha rather than traditional high-density broadcasting',
        'Treat certified seed with registered fungicide seed dressing prior to sowing'
      ],
      regionalRiskNote: 'Moderate risk in East Shewa (Bishoftu, Ada’a, Lume) and Gojjam vertisols during the late August to October grain-filling window.',
      audioSummaryScript: 'Teff rust detected at an early mild stage. Small brown pustules are present. Ensure proper furrow drainage and monitor closely. If it spreads upward, apply Mancozeb spray.',
      imageUrl: createSampleLeafSvg('teff-rust'),
      status: 'monitoring'
    }
  },
  {
    id: 'maize-mlnd-sample',
    cropType: 'Maize / Corn',
    name: {
      en: 'Field Maize',
      om: 'Boqqoolloo',
      am: 'የማሳ በቆሎ'
    },
    diseaseName: {
      en: 'Maize Lethal Necrosis Disease (MLND)',
      om: 'Dhibee MLND Boqqoolloo',
      am: 'አጥፊ የበቆሎ ኔክሮሲስ (MLND)'
    },
    scientificPathogen: 'MCMV + Potyvirus Complex (SCMV)',
    isHealthy: false,
    severity: 'severe',
    imageUrl: createSampleLeafSvg('maize-mlnd'),
    defaultResult: {
      id: 'res-sample-maize',
      timestamp: new Date().toISOString(),
      cropName: 'Maize (Zea mays)',
      scientificCropName: 'Zea mays',
      diseaseName: 'Maize Lethal Necrosis Disease (MLND)',
      scientificPathogen: 'Maize chlorotic mottle virus (MCMV) + Sugarcane mosaic virus (SCMV)',
      isHealthy: false,
      confidence: 94.7,
      severity: 'severe',
      symptoms: [
        'Severe chlorotic mottling and mosaic patterns on young unfolding leaves',
        'Dead heart necrosis: young emerging whorl leaf dries up completely',
        'Drying and necrosis starting from leaf margins inward ("firing")',
        'Premature plant death and failure of ears to set grain or deformed cobs'
      ],
      causeEtiology: 'Synergistic co-infection of two viruses transmitted by insect vectors: corn thrips (Frankliniella williamsi) and maize aphids (Rhopalosiphum maidis).',
      treatments: {
        organic: [
          'Immediately rogue out (uproot) and bury or burn all symptomatic plants to halt insect vector transmission',
          'Spray bio-pesticide neem or garlic-pepper extract to suppress thrip and aphid vector populations',
          'Intercrop with silverleaf desmodium to deter insect pests (Push-Pull technology)'
        ],
        chemical: [
          'No chemical cures the viral infection inside the plant; management targets the insect vectors',
          'Seed dressing with Imidacloprid (Gaucho) before planting suppresses early-season vector feeding',
          'Foliar insecticide spray: Cypermethrin or Lambda-cyhalothrin at first detection of thrips/aphids'
        ],
        cultural: [
          'Strictly observe a maize-free period (crop break) between seasons to eliminate vector reservoirs',
          'Never plant new maize immediately adjacent to an old, infected standing crop',
          'Use certified MLND-free seed from authorized seed enterprises'
        ]
      },
      immediateNextSteps: [
        'Uproot infected plants carefully, place in plastic bags, and burn outside the field perimeter',
        'Inspect neighboring plants for thrips under leaf sheaths and apply vector control',
        'Report outbreak to the Kebele Agricultural Center to prevent community-wide infestation'
      ],
      preventativeMeasures: [
        'Adopt MLND-tolerant hybrids approved by EIAR (e.g., BH661, BH546, or CIMMYT MLND-screened lines)',
        'Rotate maize plots with legumes (haricot beans, soybeans) or sunflower'
      ],
      regionalRiskNote: 'High Alert in the Central Rift Valley (Hawassa, Ziway, Alaba) and Western Oromia. Insect vectors surge during warm dry spells.',
      audioSummaryScript: 'Warning: Severe Maize Lethal Necrosis Disease detected. The leaf exhibits bleached mosaic mottling and dead margins. Uproot infected stalks immediately and burn them to stop insect vectors from spreading the virus.',
      imageUrl: createSampleLeafSvg('maize-mlnd'),
      status: 'treating'
    }
  },
  {
    id: 'tomato-blight-sample',
    cropType: 'Tomato',
    name: {
      en: 'Roma Tomato',
      om: 'Timaatima',
      am: 'ሮማ ቲማቲም'
    },
    diseaseName: {
      en: 'Early Blight (Target Spot)',
      om: 'Dhibee Balayiti Timaatimaa',
      am: 'የቲማቲም ቅጠል መድረቅ (ዒላማ ምልክት)'
    },
    scientificPathogen: 'Alternaria solani Sorauer',
    isHealthy: false,
    severity: 'moderate',
    imageUrl: createSampleLeafSvg('tomato-blight'),
    defaultResult: {
      id: 'res-sample-tomato',
      timestamp: new Date().toISOString(),
      cropName: 'Tomato (Solanum lycopersicum)',
      scientificCropName: 'Solanum lycopersicum',
      diseaseName: 'Tomato Early Blight',
      scientificPathogen: 'Alternaria solani Sorauer',
      isHealthy: false,
      confidence: 93.5,
      severity: 'moderate',
      symptoms: [
        'Dark brown circular lesions with distinct concentric rings ("bullseye" target appearance)',
        'Bright yellow chlorotic halo surrounding the necrotic concentric lesions',
        'Progressive defoliation beginning on older lower leaves and moving up the vine',
        'Stem collar rot and sunken dark leathery spots at fruit calyx attachment'
      ],
      causeEtiology: 'Soil-borne and crop debris-persisting fungus Alternaria solani. Spores splash upward from bare soil onto lower leaves during irrigation or rain.',
      treatments: {
        organic: [
          'Prune all lower leaves up to 30cm off the ground to eliminate soil-splash contact',
          'Heavy grass or straw mulching around tomato bases to prevent rain splash of fungal spores',
          'Apply copper-soap or baking soda spray (1 tbsp baking soda + 1 tsp soap per 4L water) weekly',
          'Ensure drip or furrow irrigation rather than overhead hose spraying to keep foliage dry'
        ],
        chemical: [
          'Foliar spray with Chlorothalonil 75% WP or Mancozeb 80% WP at 2.5 kg/ha',
          'In established infections, alternate with Azoxystrobin (Amistar) or Difenoconazole (Score 250 EC)',
          'Re-apply after heavy rains; adhere strictly to pre-harvest intervals (PHI: 7 days)'
        ],
        cultural: [
          '3-year crop rotation avoiding Solanaceae family members (potatoes, peppers, eggplant)',
          'Staking and trellising indeterminate tomatoes to maximize ventilation'
        ]
      },
      immediateNextSteps: [
        'Pinch off heavily spotted lower leaves and sanitize shears with 70% alcohol',
        'Lay 5-8cm dry straw mulch under the plants before next watering',
        'Apply protective Mancozeb or copper spray early tomorrow morning'
      ],
      preventativeMeasures: [
        'Plant certified disease-free transplants with adequate spacing (50cm in-row x 80cm inter-row)',
        'Maintain balanced potassium nutrition to thicken leaf cell walls against fungal penetration'
      ],
      regionalRiskNote: 'Prevalent in vegetable irrigation perimeters in Rift Valley (Meki, Batu, Wonji) and Dire Dawa horticultural belts.',
      audioSummaryScript: 'Moderate Early Blight found on tomato foliage. Notice the concentric rings and yellow halos. Prune infected lower leaves immediately, mulch the ground, and spray Mancozeb or baking-soda solution.',
      imageUrl: createSampleLeafSvg('tomato-blight'),
      status: 'treating'
    }
  },
  {
    id: 'enset-wilt-sample',
    cropType: 'Enset / False Banana',
    name: {
      en: 'Enset (False Banana)',
      om: 'Qocho / Qandhee',
      am: 'እንሰት (የውሸት ሙዝ)'
    },
    diseaseName: {
      en: 'Enset Bacterial Wilt (BXW / EBW)',
      om: 'Dhibee Bakteeriyaa Qochoo',
      am: 'የእንሰት ባክቴሪያ አወዛዋዥ በሽታ'
    },
    scientificPathogen: 'Xanthomonas vasicola pv. musacearum',
    isHealthy: false,
    severity: 'severe',
    imageUrl: createSampleLeafSvg('enset-wilt'),
    defaultResult: {
      id: 'res-sample-enset',
      timestamp: new Date().toISOString(),
      cropName: 'Enset (Ensete ventricosum)',
      scientificCropName: 'Ensete ventricosum',
      diseaseName: 'Enset Bacterial Wilt',
      scientificPathogen: 'Xanthomonas vasicola pv. musacearum',
      isHealthy: false,
      confidence: 95.1,
      severity: 'severe',
      symptoms: [
        'Wilting and yellowing of the innermost emerging heart leaf while outer leaves remain green',
        'Characteristic dull bronze discoloration and collapse of leaf petioles',
        'Yellowish-brown bacterial ooze visibly exuding when cutting petiole or pseudostem',
        'Rotting of the corm (underground food organ) emitting a foul, sour fermentation odor'
      ],
      causeEtiology: 'Bacterial pathogen transmitted mechanically via infected harvesting knives, sickles, and moles/porcupines foraging on corms.',
      treatments: {
        organic: [
          'Fire sterilization: Hold all farm blades (machetes, knives) in an open flame for 30 seconds between every plant',
          'Disinfect tools in 20% household bleach (sodium hypochlorite) or wood ash slurry',
          'Strict quarantine: Do not move enset suckers or planting material from affected kebeles'
        ],
        chemical: [
          'No chemical bactericide effectively eradicates systemic Xanthomonas inside enset pseudostems',
          'Sanitation and eradication is the only proven scientific control mechanism'
        ],
        cultural: [
          'Immediately dig up the entire infected plant along with its root system and bury in a 1.5m deep pit',
          'Fence off the excavated pit to prevent livestock and wild animals from spreading bacterial debris',
          'Control porcupines and moles that chew corms and transport bacteria through root channels'
        ]
      },
      immediateNextSteps: [
        'Sterilize the knife used to inspect this plant immediately over an open flame',
        'Uproot the entire enset corm today, chop within the hole, and bury with quicklime or wood ash',
        'Instruct family members not to use the same tool on neighboring enset plants'
      ],
      preventativeMeasures: [
        'Plant clean disease-free suckers raised in certified community nurseries',
        'Clean fields of wild Enset relatives that may harbor Xanthomonas inoculum'
      ],
      regionalRiskNote: 'Severe threat to food security in Southern Ethiopia (Gurage, Hadiya, Wolayita, Kembata, Sidama). Immediate community containment required.',
      audioSummaryScript: 'Critical warning: Your Enset has Bacterial Wilt. The inner heart leaf is wilting with yellow discoloration. Sterilize your machete in fire immediately, uproot the entire plant and bury it to protect your plantation.',
      imageUrl: createSampleLeafSvg('enset-wilt'),
      status: 'treating'
    }
  },
  {
    id: 'potato-blight-sample',
    cropType: 'Irish Potato',
    name: {
      en: 'Highland Potato',
      om: 'Dinnicha Tulluu',
      am: 'የደጋ ድንች'
    },
    diseaseName: {
      en: 'Potato Late Blight',
      om: 'Dhibee Balayiti Dinnichaa',
      am: 'የድንች አረንጓዴ ቅጠል ድንገተኛ መጥቆር'
    },
    scientificPathogen: 'Phytophthora infestans (Mont.) de Bary',
    isHealthy: false,
    severity: 'severe',
    imageUrl: createSampleLeafSvg('potato-blight'),
    defaultResult: {
      id: 'res-sample-potato',
      timestamp: new Date().toISOString(),
      cropName: 'Potato (Solanum tuberosum)',
      scientificCropName: 'Solanum tuberosum',
      diseaseName: 'Potato Late Blight',
      scientificPathogen: 'Phytophthora infestans (Mont.) de Bary',
      isHealthy: false,
      confidence: 96.0,
      severity: 'severe',
      symptoms: [
        'Water-soaked, rapidly expanding dark brown to purplish-black lesions on leaf margins and tips',
        'Delicate white fungal down/mildew visible on the undersides of leaves during humid morning hours',
        'Dark brown necrotic lesions on petioles and stems causing sudden vine collapse',
        'Dry brown rot extending into harvested tubers below ground'
      ],
      causeEtiology: 'Oomycete pathogen Phytophthora infestans. Epidemics explode during cool, misty highland weather (12-18°C) with 90%+ humidity (common in Jeldu, Chencha, and Shashemene).',
      treatments: {
        organic: [
          'High hilling up (ridging) of soil around potato stems to create a barrier preventing spores from washing into tubers',
          'Foliar spray with certified copper hydroxide or Bordeaux mixture (copper sulfate + slaked lime)',
          'Plant blight-tolerant varieties released by Holeta Agricultural Research Center (e.g. Gudene, Belete, Jalene, Bubu)'
        ],
        chemical: [
          'Systemic fungicide spray: Metalaxyl-M + Mancozeb (Ridomil Gold MZ 68 WG) at 2.5 kg/ha',
          'Alternate with Cymoxanil (Curzate) to prevent fungicide resistance buildup',
          'Spray every 7-10 days throughout the rainy season when disease weather warning is triggered'
        ],
        cultural: [
          'De-haulm (cut and destroy all top foliage) 2 weeks before tuber harvest to stop tuber contamination',
          'Destroy all cull piles and volunteer potato sprouts before planting season begins'
        ]
      },
      immediateNextSteps: [
        'Spray Ridomil Gold or Mancozeb within 24 hours if sunny break occurs',
        'Hill up rows to add 5-10cm soil coverage over forming tubers',
        'Do not irrigate or weed while potato foliage is wet to avoid spreading sporangia'
      ],
      preventativeMeasures: [
        'Procure certified apical root cuttings or clean seed tubers from verified seed growers',
        'Avoid late planting in peak rainy months'
      ],
      regionalRiskNote: 'Very high risk in West Shewa (Jeldu), Gamo Gofa (Chencha), and Awi Zone highlands during the Meher season.',
      audioSummaryScript: 'Late Blight detected on your potato crop. Dark water-soaked lesions are actively spreading. Spray Ridomil Gold or copper immediately, and hill up soil around the base to protect tubers underground.',
      imageUrl: createSampleLeafSvg('potato-blight'),
      status: 'treating'
    }
  },
  {
    id: 'healthy-coffee-sample',
    cropType: 'Coffee Arabica',
    name: {
      en: 'Healthy Coffee Leaf',
      om: 'Baala Bunaa Fayyaa',
      am: 'ጤናማ የቡና ቅጠል'
    },
    diseaseName: {
      en: 'Healthy Foliage',
      om: 'Biqiltuu Fayyaa',
      am: 'ጤናማ ቅጠል'
    },
    scientificPathogen: 'None (Healthy Plant Tissue)',
    isHealthy: true,
    severity: 'healthy',
    imageUrl: createSampleLeafSvg('healthy-coffee'),
    defaultResult: {
      id: 'res-sample-healthy-coffee',
      timestamp: new Date().toISOString(),
      cropName: 'Arabica Coffee (Coffea arabica)',
      scientificCropName: 'Coffea arabica',
      diseaseName: 'No Disease Detected — Healthy Foliage',
      scientificPathogen: 'None (Healthy Cuticle & Mesophyll)',
      isHealthy: true,
      confidence: 99.1,
      severity: 'healthy',
      symptoms: [
        'Vibrant, uniform dark emerald green leaf pigmentation with high chlorophyll density',
        'Intact leaf margin with zero necrotic spotting or chlorotic halos',
        'Clear, unobstructed venation with healthy cellular turgor pressure',
        'Clean undersides free of fungal pustules, bacterial ooze, or sucking pests'
      ],
      causeEtiology: 'Optimal nutrient and water balance, sound agronomic management, and effective micro-climate shade management.',
      treatments: {
        organic: [
          'Continue organic compost top-dressing (5-10kg per tree) under canopy drip-line',
          'Maintain legume shade trees (Sesbania, Millettia ferruginea / Birbira) for biological nitrogen fixation',
          'Apply organic mulching with dry vetiver or teff straw to preserve soil moisture'
        ],
        chemical: [
          'No chemical intervention required; preserve beneficial soil microbes and predatory insects'
        ],
        cultural: [
          'Regular suckering (desuckering) and de-branching to maintain open tree architecture',
          'Routine scouting every 10 days during the rainy season to catch any early rust arrival'
        ]
      },
      immediateNextSteps: [
        'No corrective action required',
        'Record this healthy baseline in your farm logbook',
        'Ensure seasonal compost addition before upcoming flowering stage'
      ],
      preventativeMeasures: [
        'Maintain protective mulch layer before dry Bega season arrives',
        'Ensure clean pruning shears when shaping tree canopies'
      ],
      regionalRiskNote: 'Favorable plant health. Standard monitoring across Ethiopian coffee zones.',
      audioSummaryScript: 'Great news! Your coffee leaf is completely healthy with vibrant green pigmentation and no signs of rust or blight. Continue your good pruning and compost practices.',
      imageUrl: createSampleLeafSvg('healthy-coffee'),
      status: 'resolved'
    }
  }
];
