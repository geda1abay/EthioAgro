import { WeatherData, DiseaseSurveillanceItem, FarmerProfile } from '../types';

export const initialWeatherZones: WeatherData[] = [
  {
    regionId: 'jimma',
    regionName: 'Oromia',
    zoneName: 'Jimma Zone (Mana / Gomma)',
    elevationMeters: 1780,
    temperatureC: 22.4,
    humidityPercent: 84,
    rainChancePercent: 68,
    windSpeedKmh: 7.2,
    condition: 'Humid & Overcast',
    sporeRiskLevel: 'High',
    sporeRiskReason: 'Relative humidity exceeding 80% with moderate warmth (22°C) creates prime incubation conditions for Coffee Leaf Rust (Hemileia) and Coffee Berry Disease (CBD).',
    sprayRecommendation: 'Caution: Rain Imminent',
    soilMoistureStatus: 'Adequate',
    agriculturalTip: 'Do not spray contact fungicides if afternoon rainfall is expected within 3 hours. Prune dense shade canopies to encourage rapid morning leaf drying.'
  },
  {
    regionId: 'bahirdar',
    regionName: 'Amhara',
    zoneName: 'West Gojjam & Lake Tana Basin',
    elevationMeters: 1820,
    temperatureC: 24.1,
    humidityPercent: 65,
    rainChancePercent: 25,
    windSpeedKmh: 9.8,
    condition: 'Partly Cloudy',
    sporeRiskLevel: 'Moderate',
    sporeRiskReason: 'Moderate humidity and warm breezes favor Teff rust dispersal and early Maize foliar blight in lowland perimeters.',
    sprayRecommendation: 'Optimal Morning Window',
    soilMoistureStatus: 'Adequate',
    agriculturalTip: 'Early morning (06:30 - 09:30 AM) is optimal for foliar sprays or bio-stimulants before winds pick up across Lake Tana plain.'
  },
  {
    regionId: 'debrezeit',
    regionName: 'Oromia',
    zoneName: 'East Shewa (Bishoftu / Ada’a)',
    elevationMeters: 1900,
    temperatureC: 25.6,
    humidityPercent: 52,
    rainChancePercent: 12,
    windSpeedKmh: 14.5,
    condition: 'Sunny',
    sporeRiskLevel: 'Low',
    sporeRiskReason: 'Dry air and high solar radiation suppress fungal spore germination on vertisol Teff and chickpea fields.',
    sprayRecommendation: 'Favorable',
    soilMoistureStatus: 'Adequate',
    agriculturalTip: 'Dry weather allows safe field scouting and mechanical weeding. Inspect lower teff canopy for any hidden early rust spots.'
  },
  {
    regionId: 'hawassa',
    regionName: 'Sidama',
    zoneName: 'Hawassa Zuria & Great Rift Basin',
    elevationMeters: 1708,
    temperatureC: 26.2,
    humidityPercent: 71,
    rainChancePercent: 40,
    windSpeedKmh: 11.0,
    condition: 'Partly Cloudy',
    sporeRiskLevel: 'Moderate',
    sporeRiskReason: 'Warm humid lake breeze elevates risk of Maize Lethal Necrosis insect vectors (thrips and aphids) and tomato early blight.',
    sprayRecommendation: 'Optimal Morning Window',
    soilMoistureStatus: 'Adequate',
    agriculturalTip: 'Scout maize crops for vector thrips under leaf sheaths. Apply protective neem sprays early in the morning.'
  },
  {
    regionId: 'asella',
    regionName: 'Oromia',
    zoneName: 'Arsi Zone (Wheat Belt)',
    elevationMeters: 2430,
    temperatureC: 18.5,
    humidityPercent: 79,
    rainChancePercent: 55,
    windSpeedKmh: 16.2,
    condition: 'Highland Mist',
    sporeRiskLevel: 'Severe',
    sporeRiskReason: 'Cool highland fog and prolonged dew period (8+ hours) combined with persistent winds trigger critical Wheat Stem Rust (Ug99) spore transport.',
    sprayRecommendation: 'Caution: Rain Imminent',
    soilMoistureStatus: 'Saturated / Drainage Risk',
    agriculturalTip: 'HIGH STEM RUST ALERT: Inspect wheat stems daily. If reddish pustules appear, spray Propiconazole fungicide during calm weather windows.'
  },
  {
    regionId: 'mekelle',
    regionName: 'Tigray',
    zoneName: 'South Tigray & Raya Valley',
    elevationMeters: 2084,
    temperatureC: 27.0,
    humidityPercent: 42,
    rainChancePercent: 10,
    windSpeedKmh: 18.0,
    condition: 'Sunny',
    sporeRiskLevel: 'Low',
    sporeRiskReason: 'Low relative humidity restricts fungal growth; watch for moisture stress and Sorghum stem borers instead.',
    sprayRecommendation: 'Favorable',
    soilMoistureStatus: 'Deficit / Needs Irrigation',
    agriculturalTip: 'Preserve soil water with stone terracing and crop residue mulching. Check Sorghum whorls for stem borer larvae.'
  },
  {
    regionId: 'harar',
    regionName: 'Harari / Oromia',
    zoneName: 'East Hararghe Highlands',
    elevationMeters: 1885,
    temperatureC: 23.8,
    humidityPercent: 58,
    rainChancePercent: 18,
    windSpeedKmh: 10.4,
    condition: 'Partly Cloudy',
    sporeRiskLevel: 'Low',
    sporeRiskReason: 'Mild conditions; moderate risk for Anthracnose in high-density sorghum and chat terraces.',
    sprayRecommendation: 'Favorable',
    soilMoistureStatus: 'Adequate',
    agriculturalTip: 'Maintain contour bunds to prevent soil wash during sporadic convective storms.'
  }
];

export const initialSurveillanceData: DiseaseSurveillanceItem[] = [
  {
    id: 'alert-1',
    crop: 'Bread Wheat',
    disease: 'Wheat Stem Rust (Ug99)',
    region: 'Arsi & Bale Zones, Oromia',
    severityLevel: 'Alert',
    activeCasesEstimated: 1420,
    lastUpdated: 'Today',
    recommendedAction: 'Immediate kebele-level surveillance and prophylactic fungicide distribution by Regional Ag Bureau.'
  },
  {
    id: 'alert-2',
    crop: 'Arabica Coffee',
    disease: 'Coffee Leaf Rust (Hemileia)',
    region: 'Jimma & Kaffa Zones, Oromia / South West',
    severityLevel: 'Alert',
    activeCasesEstimated: 2890,
    lastUpdated: '1 day ago',
    recommendedAction: 'Prune excessive shade tree branches and apply copper oxychloride sprays before heavy Meher rains.'
  },
  {
    id: 'alert-3',
    crop: 'Enset (False Banana)',
    disease: 'Bacterial Wilt (BXW)',
    region: 'Gurage, Hadiya, & Sidama Zones',
    severityLevel: 'Alert',
    activeCasesEstimated: 980,
    lastUpdated: '2 days ago',
    recommendedAction: 'Strict quarantine: Sterilize knives over flame; immediately uproot and deep-bury diseased corms.'
  },
  {
    id: 'alert-4',
    crop: 'Field Maize',
    disease: 'Maize Lethal Necrosis (MLND)',
    region: 'Central Rift Valley (Alaba / Ziway)',
    severityLevel: 'Moderate',
    activeCasesEstimated: 640,
    lastUpdated: '3 days ago',
    recommendedAction: 'Rogue out infected maize stalks to eliminate viral vectors (thrips/aphids).'
  },
  {
    id: 'alert-5',
    crop: 'Highland Potato',
    disease: 'Potato Late Blight',
    region: 'West Shewa (Jeldu) & Awi Zone',
    severityLevel: 'Moderate',
    activeCasesEstimated: 810,
    lastUpdated: '3 days ago',
    recommendedAction: 'Hill up soil around stems and spray Ridomil Gold systemic fungicide.'
  },
  {
    id: 'alert-6',
    crop: 'Ethiopian Teff',
    disease: 'Teff Rust & Head Smut',
    region: 'East Shewa (Ada’a / Lume)',
    severityLevel: 'Low Risk',
    activeCasesEstimated: 310,
    lastUpdated: '4 days ago',
    recommendedAction: 'Maintain clean weeding and avoid standing water in vertisol furrows.'
  }
];

export const defaultFarmerProfile: FarmerProfile = {
  id: 'farmer-eth-001',
  name: 'Taye Bekele',
  phone: '+251 91 123 4567',
  region: 'Oromia',
  zone: 'Jimma Zone',
  woreda: 'Mana Woreda (Kebele 03)',
  farmSizeHectares: 2.8,
  soilType: 'Clay Loam (Eutric Vertisol / Nitisol)',
  primaryCrops: ['Arabica Coffee (74110 variety)', 'Teff (Quncho)', 'Highland Maize', 'Enset']
};
