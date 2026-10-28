import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { WeatherData } from '../types';
import { initialWeatherZones } from '../data/agroData';
import {
  CloudSun,
  Droplets,
  Wind,
  Thermometer,
  ShieldAlert,
  Calendar,
  Compass,
  CheckCircle,
  AlertTriangle,
  Flame,
  Info,
} from 'lucide-react';

export const AgroWeather: React.FC = () => {
  const { language, t } = useLanguage();
  const [selectedZoneId, setSelectedZoneId] = useState<string>('jimma');

  const currentZone =
    initialWeatherZones.find((z) => z.regionId === selectedZoneId) || initialWeatherZones[0];

  const getSporeRiskColor = (level: WeatherData['sporeRiskLevel']) => {
    switch (level) {
      case 'Severe':
        return {
          bg: 'bg-rose-500/20 text-rose-300 border-rose-500/50',
          indicator: 'bg-rose-500 animate-pulse',
        };
      case 'High':
        return {
          bg: 'bg-amber-500/20 text-amber-300 border-amber-500/50',
          indicator: 'bg-amber-400',
        };
      case 'Moderate':
        return {
          bg: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50',
          indicator: 'bg-yellow-400',
        };
      case 'Low':
      default:
        return {
          bg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50',
          indicator: 'bg-emerald-400',
        };
    }
  };

  const riskBadge = getSporeRiskColor(currentZone.sporeRiskLevel);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      {/* Weather Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-stone-900 to-emerald-950 border border-emerald-800/60 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-emerald-800/80 text-emerald-200 px-3 py-0.5 rounded-full text-xs font-semibold border border-emerald-700/60 mb-2">
              <CloudSun className="w-3.5 h-3.5 text-amber-400" />
              <span>Agro-Meteorological Surveillance</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Plus_Jakarta_Sans']">
              {t.weatherHeader}
            </h2>
            <p className="text-emerald-200/80 text-sm max-w-2xl">
              {t.weatherSubtitle}
            </p>
          </div>

          {/* Farming Zone Selector Dropdown */}
          <div className="bg-stone-950/80 border border-emerald-700/60 p-2.5 rounded-2xl flex items-center gap-3">
            <Compass className="w-5 h-5 text-amber-400 shrink-0" />
            <div className="flex flex-col">
              <span className="text-[11px] text-stone-400 font-medium">{t.selectZone}</span>
              <select
                value={selectedZoneId}
                onChange={(e) => setSelectedZoneId(e.target.value)}
                className="bg-transparent text-white font-bold text-sm focus:outline-none cursor-pointer pr-4"
              >
                {initialWeatherZones.map((z) => (
                  <option key={z.regionId} value={z.regionId} className="bg-stone-900 text-white">
                    {z.zoneName} ({z.regionName})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Meteorological Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Temperature Card */}
        <div className="bg-stone-900/90 border border-emerald-900/40 p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-stone-400 text-xs font-semibold">
            <span>{t.temp}</span>
            <Thermometer className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white font-mono">
              {currentZone.temperatureC}°C
            </span>
            <span className="text-xs text-stone-400 font-medium">Elevation: {currentZone.elevationMeters}m</span>
          </div>
          <p className="text-[11px] text-emerald-300/80">{currentZone.condition}</p>
        </div>

        {/* Relative Humidity Card */}
        <div className="bg-stone-900/90 border border-emerald-900/40 p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-stone-400 text-xs font-semibold">
            <span>{t.humidity}</span>
            <Droplets className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-cyan-400 font-mono">
              {currentZone.humidityPercent}%
            </span>
            <span className="text-xs text-stone-400">Atmospheric Dew Point</span>
          </div>
          <div className="w-full bg-stone-800 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-cyan-400 h-1.5 rounded-full"
              style={{ width: `${currentZone.humidityPercent}%` }}
            />
          </div>
        </div>

        {/* Rain Chance */}
        <div className="bg-stone-900/90 border border-emerald-900/40 p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-stone-400 text-xs font-semibold">
            <span>{t.rainChance}</span>
            <CloudSun className="w-4 h-4 text-blue-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-blue-400 font-mono">
              {currentZone.rainChancePercent}%
            </span>
            <span className="text-xs text-stone-400">Precipitation Index</span>
          </div>
          <p className="text-[11px] text-stone-300">
            {currentZone.rainChancePercent > 50
              ? 'Frequent afternoon showers expected'
              : 'Mainly dry with intermittent cloud cover'}
          </p>
        </div>

        {/* Wind Speed */}
        <div className="bg-stone-900/90 border border-emerald-900/40 p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-stone-400 text-xs font-semibold">
            <span>{t.windSpeed}</span>
            <Wind className="w-4 h-4 text-teal-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white font-mono">
              {currentZone.windSpeedKmh}
            </span>
            <span className="text-xs text-stone-400">km/h</span>
          </div>
          <p className="text-[11px] text-stone-300">
            {currentZone.windSpeedKmh > 14
              ? 'Active spore dispersion winds'
              : 'Calm highland air currents'}
          </p>
        </div>
      </div>

      {/* Critical Pathogen & Spore Dispersal Risk Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 cols: Fungal Spore Risk & Agronomy Advisory */}
        <div className="lg:col-span-2 bg-stone-900/90 border border-emerald-800/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-800 pb-4">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
                Foliar Epidemiology Index
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {t.sporeRisk}
              </h3>
            </div>

            <div
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-bold ${riskBadge.bg}`}
            >
              <span className={`w-2 h-2 rounded-full ${riskBadge.indicator}`} />
              <span>{currentZone.sporeRiskLevel} Risk</span>
            </div>
          </div>

          <div className="bg-stone-950/70 border border-stone-800/80 p-5 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 text-stone-300 text-xs font-semibold">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>Micro-Climate Incubation Analysis:</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
              {currentZone.sporeRiskReason}
            </p>
          </div>

          {/* Agronomist Climate Advisory */}
          <div className="bg-emerald-950/40 border border-emerald-800/50 p-5 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 text-emerald-300 text-xs font-semibold">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>{t.agriTip}:</span>
            </div>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
              {currentZone.agriculturalTip}
            </p>
          </div>
        </div>

        {/* Right 1 col: Spray Window & Soil Moisture */}
        <div className="space-y-4">
          {/* Spray Window Status */}
          <div className="bg-stone-900/90 border border-emerald-900/40 rounded-3xl p-6 space-y-3 shadow-lg">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block">
              {t.sprayWindow}
            </span>
            <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                🚿
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">
                  {currentZone.sprayRecommendation}
                </h4>
                <p className="text-[11px] text-stone-400">
                  Knapsack & Bio-fungicide timing
                </p>
              </div>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Never spray when ambient wind exceeds 15 km/h to prevent spray drift into neighboring bee hives or non-target crops.
            </p>
          </div>

          {/* Soil Moisture */}
          <div className="bg-stone-900/90 border border-emerald-900/40 rounded-3xl p-6 space-y-3 shadow-lg">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block">
              {t.soilMoisture}
            </span>
            <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold">
                🌱
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">
                  {currentZone.soilMoistureStatus}
                </h4>
                <p className="text-[11px] text-stone-400">
                  Root zone hydration index
                </p>
              </div>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Ensure proper furrow drainage on Vertisol soils to avoid waterlogging and root rot.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
