import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { CropDiseaseResult, FarmerProfile } from './types';
import { sampleCrops } from './data/sampleCrops';
import { defaultFarmerProfile } from './data/agroData';
import { Header } from './components/Header';
import { CropDoctor } from './components/CropDoctor';
import { AgroWeather } from './components/AgroWeather';
import { AgroChat } from './components/AgroChat';
import { SurveillanceDashboard } from './components/SurveillanceDashboard';
import { FarmerLogbook } from './components/FarmerLogbook';
import { PrintableReport } from './components/PrintableReport';

function MainApp() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'diagnose' | 'weather' | 'chat' | 'surveillance' | 'history'>('diagnose');

  // Farmer state stored in localStorage
  const [farmer, setFarmer] = useState<FarmerProfile>(() => {
    const saved = localStorage.getItem('agroai_farmer');
    return saved ? JSON.parse(saved) : defaultFarmerProfile;
  });

  // History state stored in localStorage with default seed samples
  const [history, setHistory] = useState<CropDiseaseResult[]>(() => {
    const saved = localStorage.getItem('agroai_history');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return [
      sampleCrops[0].defaultResult,
      sampleCrops[1].defaultResult,
      sampleCrops[7].defaultResult,
    ];
  });

  // Printable report modal state
  const [reportToPrint, setReportToPrint] = useState<CropDiseaseResult | null>(null);

  // Chat context passing from diagnostic view
  const [chatCropContext, setChatCropContext] = useState<string | undefined>(undefined);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('agroai_farmer', JSON.stringify(farmer));
  }, [farmer]);

  useEffect(() => {
    localStorage.setItem('agroai_history', JSON.stringify(history));
  }, [history]);

  const handleSaveResult = (newResult: CropDiseaseResult) => {
    setHistory((prev) => [newResult, ...prev]);
  };

  const handleUpdateHistoryItem = (updated: CropDiseaseResult) => {
    setHistory((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
  };

  const handleDeleteHistoryItem = (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  const handleOpenChatWithCrop = (cropName: string, diseaseName: string) => {
    setChatCropContext(`${cropName} — ${diseaseName}`);
    setActiveTab('chat');
  };

  const handleSelectResultToView = (item: CropDiseaseResult) => {
    setReportToPrint(item);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-['Plus_Jakarta_Sans'] selection:bg-amber-500 selection:text-stone-950">
      {/* Sticky Header */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} farmer={farmer} />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {activeTab === 'diagnose' && (
          <CropDoctor
            onSaveResult={handleSaveResult}
            onOpenChatWithCrop={handleOpenChatWithCrop}
            onPrintReport={(res) => setReportToPrint(res)}
          />
        )}

        {activeTab === 'weather' && <AgroWeather />}

        {activeTab === 'chat' && <AgroChat initialCropContext={chatCropContext} />}

        {activeTab === 'surveillance' && <SurveillanceDashboard />}

        {activeTab === 'history' && (
          <FarmerLogbook
            farmer={farmer}
            onUpdateFarmer={setFarmer}
            history={history}
            onUpdateHistoryItem={handleUpdateHistoryItem}
            onDeleteHistoryItem={handleDeleteHistoryItem}
            onSelectResultToView={handleSelectResultToView}
            onPrintReport={(res) => setReportToPrint(res)}
          />
        )}
      </main>

      {/* Printable Report Modal */}
      {reportToPrint && (
        <PrintableReport
          result={reportToPrint}
          farmer={farmer}
          onClose={() => setReportToPrint(null)}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-emerald-950 bg-stone-950 py-6 px-4 text-center text-xs text-stone-500">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-stone-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>AgroAI Ethiopian Crop Doctor System</span>
            <span>•</span>
            <span>Multilingual: Afaan Oromoo, አማርኛ, English</span>
          </div>
          <p className="text-stone-600">
            Aligned with EIAR & Ministry of Agriculture integrated pest management guidelines.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MainApp />
    </LanguageProvider>
  );
}
