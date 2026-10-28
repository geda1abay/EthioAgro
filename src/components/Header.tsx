import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SupportedLanguage, FarmerProfile } from '../types';
import {
  Sprout,
  ScanLine,
  CloudSun,
  Bot,
  Activity,
  BookOpen,
  Globe,
  User,
  ShieldCheck,
} from 'lucide-react';

interface HeaderProps {
  activeTab: 'diagnose' | 'weather' | 'chat' | 'surveillance' | 'history';
  setActiveTab: (tab: 'diagnose' | 'weather' | 'chat' | 'surveillance' | 'history') => void;
  farmer: FarmerProfile;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, farmer }) => {
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { id: 'diagnose', label: t.navDiagnose, icon: ScanLine },
    { id: 'weather', label: t.navWeather, icon: CloudSun },
    { id: 'chat', label: t.navAdvisor, icon: Bot },
    { id: 'surveillance', label: t.navSurveillance, icon: Activity },
    { id: 'history', label: t.navHistory, icon: BookOpen },
  ] as const;

  const languages: { code: SupportedLanguage; label: string; native: string; flag: string }[] = [
    { code: 'en', label: 'English', native: 'English', flag: '🇬🇧' },
    { code: 'om', label: 'Afaan Oromoo', native: 'Oromiffa', flag: '🌳' },
    { code: 'am', label: 'Amharic', native: 'አማርኛ', flag: '🇪🇹' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-emerald-950/95 backdrop-blur-md border-b border-emerald-800/50 text-white shadow-xl">
      {/* Top micro bar for Ethiopian farming notice & language */}
      <div className="bg-emerald-900/60 border-b border-emerald-800/40 px-4 py-1.5 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-emerald-200">
            <span className="inline-flex items-center gap-1 bg-emerald-800/80 text-emerald-100 px-2 py-0.5 rounded text-[11px] font-semibold border border-emerald-600/50">
              <ShieldCheck className="w-3 h-3 text-emerald-300" />
              EIAR / MoA Aligned
            </span>
            <span className="hidden sm:inline text-emerald-300/80">
              {t.tagline}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Language Selector */}
            <div className="flex items-center gap-1.5 bg-emerald-950/80 px-2 py-1 rounded-lg border border-emerald-700/60">
              <Globe className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <div className="flex items-center gap-1">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setLanguage(l.code)}
                    className={`px-2 py-0.5 rounded text-xs font-medium transition-all ${
                      language === l.code
                        ? 'bg-amber-500 text-stone-950 font-bold shadow'
                        : 'text-emerald-200 hover:text-white hover:bg-emerald-800/50'
                    }`}
                    title={l.label}
                  >
                    <span>{l.flag}</span> <span className="ml-0.5">{l.native}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Farmer quick badge */}
            <button
              onClick={() => setActiveTab('history')}
              className="flex items-center gap-1.5 bg-emerald-800/50 hover:bg-emerald-800/80 px-2 py-1 rounded-lg text-emerald-200 hover:text-white text-xs border border-emerald-700/40 transition"
              title="View Farmer Logbook"
            >
              <User className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden md:inline font-medium">{farmer.name}</span>
              <span className="text-[11px] text-emerald-300 hidden lg:inline">({farmer.zone})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <div
          onClick={() => setActiveTab('diagnose')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 via-emerald-600 to-amber-600 p-0.5 shadow-lg group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-emerald-950 rounded-[10px] flex items-center justify-center">
              <Sprout className="w-6 h-6 text-emerald-400 group-hover:text-amber-400 transition-colors" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5 font-['Plus_Jakarta_Sans']">
                Agro<span className="text-amber-400">AI</span>
                <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.2 rounded font-mono">
                  v2.5
                </span>
              </h1>
            </div>
            <p className="text-xs text-emerald-300 font-medium font-['Noto_Sans_Ethiopic']">
              {t.appTitle.split('—')[1]?.trim() || 'Intelligent Crop Doctor'}
            </p>
          </div>
        </div>

        {/* Tab navigation buttons */}
        <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-1 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-amber-500 text-stone-950 shadow-md font-bold'
                    : 'text-emerald-100 hover:text-white hover:bg-emerald-900/60 border border-transparent hover:border-emerald-700/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-stone-950' : 'text-emerald-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
