import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { initialSurveillanceData } from '../data/agroData';
import {
  Activity,
  AlertTriangle,
  TrendingUp,
  Calendar,
  ShieldAlert,
  MapPin,
  CheckCircle2,
  Users,
} from 'lucide-react';

export const SurveillanceDashboard: React.FC = () => {
  const { language, t } = useLanguage();

  const prevalenceData = [
    { crop: 'Arabica Coffee', pathogen: 'Coffee Leaf Rust (Hemileia)', percentage: 34, color: 'from-amber-500 to-amber-600', cases: '2,890 active ha' },
    { crop: 'Bread Wheat', pathogen: 'Stem Rust (Ug99 Lineage)', percentage: 28, color: 'from-rose-500 to-rose-600', cases: '1,420 active ha' },
    { crop: 'Field Maize', pathogen: 'MLND Viral Complex', percentage: 16, color: 'from-yellow-500 to-yellow-600', cases: '640 active ha' },
    { crop: 'Enset (False Banana)', pathogen: 'Bacterial Wilt (BXW)', percentage: 12, color: 'from-emerald-500 to-emerald-600', cases: '980 active ha' },
    { crop: 'Highland Potato', pathogen: 'Late Blight (Phytophthora)', percentage: 10, color: 'from-cyan-500 to-cyan-600', cases: '810 active ha' },
  ];

  const seasonalCalendar = [
    {
      season: 'Meher Season (Main Wet)',
      months: 'June — October',
      description: 'Main cropping season for highland cereals, coffee, and pulses. High rainfall and cloud cover drive high fungal rust & blight epidemics.',
      criticalDiseases: ['Wheat Stem Rust', 'Coffee Leaf Rust', 'Potato Late Blight'],
      status: 'Current Season Period',
    },
    {
      season: 'Belg Season (Short Rains)',
      months: 'February — May',
      description: 'Early season planting for barley, wheat, and maize in eastern & southern highlands. Vulnerable to insect vectors (aphids/thrips) and viral MLND.',
      criticalDiseases: ['Maize Lethal Necrosis', 'Sorghum Anthracnose', 'Teff Damping-off'],
      status: 'Upcoming Preparation',
    },
    {
      season: 'Bega Season (Dry / Harvest)',
      months: 'October — January',
      description: 'Grain maturity, drying, threshing, and coffee cherry harvesting. Danger of post-harvest storage molds and coffee berry borer.',
      criticalDiseases: ['Aspergillus grain mold', 'Coffee Berry Borer', 'Storage weevils'],
      status: 'Post-Harvest Protection',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-stone-900 to-emerald-950 border border-emerald-800/60 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-3">
        <div className="inline-flex items-center gap-1.5 bg-emerald-800/80 text-emerald-200 px-3 py-0.5 rounded-full text-xs font-semibold border border-emerald-700/60 mb-2">
          <Activity className="w-3.5 h-3.5 text-amber-400" />
          <span>Epidemiological Early Warning</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Plus_Jakarta_Sans']">
          {t.dashboardTitle}
        </h2>
        <p className="text-emerald-200/80 text-sm max-w-2xl">
          {t.dashboardSubtitle}
        </p>
      </div>

      {/* Outbreak Alert Grid & Prevalence */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 7 cols: Active Outbreak Alerts */}
        <div className="lg:col-span-7 bg-stone-900/90 border border-emerald-900/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-stone-800 pb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-400" />
              <span>{t.activeAlerts}</span>
            </h3>
            <span className="text-xs bg-rose-500/20 text-rose-300 border border-rose-500/40 px-2.5 py-1 rounded-full font-semibold">
              Live National Feed
            </span>
          </div>

          <div className="space-y-4">
            {initialSurveillanceData.map((alert) => (
              <div
                key={alert.id}
                className="bg-stone-950/70 border border-stone-800 hover:border-emerald-700/60 p-4 rounded-2xl transition space-y-2.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">
                      {alert.crop}: <span className="text-amber-400">{alert.disease}</span>
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      alert.severityLevel === 'Alert'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse'
                        : alert.severityLevel === 'Moderate'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    }`}
                  >
                    {alert.severityLevel}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-stone-400">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{alert.region}</span>
                  <span className="text-stone-600">•</span>
                  <span>{alert.lastUpdated}</span>
                </div>

                <p className="text-xs text-stone-300 leading-relaxed bg-stone-900/60 p-2.5 rounded-xl border border-stone-800/60">
                  <strong>Action:</strong> {alert.recommendedAction}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right 5 cols: Pathogen Prevalence Breakdown */}
        <div className="lg:col-span-5 bg-stone-900/90 border border-emerald-900/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-stone-800 pb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <span>{t.prevalenceTitle}</span>
            </h3>
          </div>

          <div className="space-y-4">
            {prevalenceData.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-stone-200">{item.crop}</span>
                  <span className="font-mono font-bold text-amber-400">{item.percentage}%</span>
                </div>
                <div className="w-full bg-stone-950 rounded-full h-2.5 overflow-hidden border border-stone-800">
                  <div
                    className={`h-2.5 rounded-full bg-gradient-to-r ${item.color}`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-stone-400">
                  <span className="italic">{item.pathogen}</span>
                  <span>{item.cases}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Community Sentinel Tip */}
          <div className="bg-emerald-950/50 border border-emerald-800/60 p-4 rounded-2xl space-y-2 mt-6">
            <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold">
              <Users className="w-4 h-4 text-amber-400" />
              <span>Community Early Detection Sentinel</span>
            </div>
            <p className="text-xs text-emerald-100/90 leading-relaxed">
              When farmers detect novel leaf lesions and log them in AgroAI, outbreak warnings help neighboring kebeles mobilize protective sprays 7-10 days before widespread devastation.
            </p>
          </div>
        </div>
      </div>

      {/* Seasonal Agro-Calendar */}
      <div className="bg-stone-900/90 border border-emerald-900/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center gap-2 border-b border-stone-800 pb-4">
          <Calendar className="w-5 h-5 text-amber-400" />
          <h3 className="text-lg font-bold text-white">
            {t.seasonCalendarTitle}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {seasonalCalendar.map((item, idx) => (
            <div
              key={idx}
              className="bg-stone-950/70 border border-stone-800 p-5 rounded-2xl space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                    {item.months}
                  </span>
                  <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-800/60">
                    {item.status}
                  </span>
                </div>
                <h4 className="text-base font-bold text-white leading-tight">
                  {item.season}
                </h4>
                <p className="text-xs text-stone-300 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-stone-800/80">
                <span className="text-[11px] font-semibold text-stone-400 block">
                  High-Risk Pathogens:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {item.criticalDiseases.map((d, i) => (
                    <span
                      key={i}
                      className="text-[10px] bg-stone-900 text-stone-200 px-2 py-0.5 rounded border border-stone-700"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
