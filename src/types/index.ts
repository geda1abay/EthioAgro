export type SupportedLanguage = 'en' | 'om' | 'am';

export interface CropDiseaseResult {
  id: string;
  timestamp: string;
  cropName: string;
  scientificCropName: string;
  diseaseName: string;
  scientificPathogen: string;
  isHealthy: boolean;
  confidence: number;
  severity: 'healthy' | 'mild' | 'moderate' | 'severe';
  symptoms: string[];
  causeEtiology: string;
  treatments: {
    organic: string[];
    chemical: string[];
    cultural: string[];
  };
  immediateNextSteps: string[];
  preventativeMeasures: string[];
  regionalRiskNote: string;
  audioSummaryScript: string;
  imageUrl: string;
  location?: string;
  notes?: string;
  status?: 'monitoring' | 'treating' | 'resolved';
}

export interface FarmerProfile {
  id: string;
  name: string;
  phone: string;
  region: string;
  zone: string;
  woreda: string;
  farmSizeHectares: number;
  soilType: string;
  primaryCrops: string[];
  avatarUrl?: string;
}

export interface WeatherData {
  regionId: string;
  regionName: string;
  zoneName: string;
  elevationMeters: number;
  temperatureC: number;
  humidityPercent: number;
  rainChancePercent: number;
  windSpeedKmh: number;
  condition: 'Sunny' | 'Partly Cloudy' | 'Rainy' | 'Humid & Overcast' | 'Highland Mist';
  sporeRiskLevel: 'Low' | 'Moderate' | 'High' | 'Severe';
  sporeRiskReason: string;
  sprayRecommendation: 'Favorable' | 'Caution: Rain Imminent' | 'Unfavorable: High Wind' | 'Optimal Morning Window';
  soilMoistureStatus: 'Adequate' | 'Deficit / Needs Irrigation' | 'Saturated / Drainage Risk';
  agriculturalTip: string;
}

export interface DiseaseSurveillanceItem {
  id: string;
  crop: string;
  disease: string;
  region: string;
  severityLevel: 'Alert' | 'Moderate' | 'Low Risk';
  activeCasesEstimated: number;
  lastUpdated: string;
  recommendedAction: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  language?: SupportedLanguage;
  suggestedFollowUps?: string[];
}
