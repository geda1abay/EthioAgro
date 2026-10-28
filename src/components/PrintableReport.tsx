import React from 'react';
import { CropDiseaseResult, FarmerProfile } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { Printer, X, ShieldCheck, CheckCircle2, AlertTriangle } from 'lucide-react';

interface PrintableReportProps {
  result: CropDiseaseResult;
  farmer: FarmerProfile;
  onClose: () => void;
}

export const PrintableReport: React.FC<PrintableReportProps> = ({
  result,
  farmer,
  onClose,
}) => {
  const { t } = useLanguage();

  const handlePrint = () => {
    window.print();
  };

  const formattedDate = new Date(result.timestamp).toLocaleDateString([], {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto print:p-0 print:bg-white print:fixed print:inset-0">
      <div className="bg-white text-stone-900 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 print:max-w-none print:w-full print:max-h-none print:shadow-none print:border-none print:rounded-none">
        {/* Modal Controls (Hidden in Print) */}
        <div className="sticky top-0 bg-stone-100 border-b border-stone-200 p-4 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2 text-stone-700 font-bold text-sm">
            <Printer className="w-4 h-4 text-emerald-600" />
            <span>Agronomic Diagnostic Field Report</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-stone-500 hover:text-stone-800 rounded-lg hover:bg-stone-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Certificate Body */}
        <div className="p-8 space-y-6 print:p-6 print:text-black font-['Plus_Jakarta_Sans']">
          {/* Institutional Header */}
          <div className="text-center border-b-2 border-stone-800 pb-4 space-y-1">
            <div className="flex items-center justify-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-widest">
              <span>Federal Democratic Republic of Ethiopia</span>
              <span>•</span>
              <span>Agricultural Extension & Pathology</span>
            </div>
            <h1 className="text-2xl font-black text-stone-950 tracking-tight">
              AGRO-AI CROP DIAGNOSTIC & REMEDY PRESCRIPTION
            </h1>
            <p className="text-xs text-stone-600 italic">
              Integrated Pest Management (IPM) Field Certificate • Protocol EIAR-MoA-2026
            </p>
          </div>

          {/* Farmer & Field Metadata Block */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-stone-50 border border-stone-200 p-4 rounded-xl text-xs">
            <div>
              <span className="text-stone-500 font-medium block">Farmer Name:</span>
              <span className="font-bold text-stone-900">{farmer.name}</span>
            </div>
            <div>
              <span className="text-stone-500 font-medium block">Woreda / Kebele:</span>
              <span className="font-bold text-stone-900">{farmer.woreda}</span>
            </div>
            <div>
              <span className="text-stone-500 font-medium block">Zone / Region:</span>
              <span className="font-bold text-stone-900">{farmer.zone}, {farmer.region}</span>
            </div>
            <div>
              <span className="text-stone-500 font-medium block">Inspection Date:</span>
              <span className="font-bold text-stone-900">{formattedDate}</span>
            </div>
          </div>

          {/* Specimen and Pathology Identification */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border border-stone-200 rounded-2xl p-4 items-center">
            <div className="w-full aspect-square rounded-xl overflow-hidden bg-stone-100 border border-stone-300 max-w-[160px] mx-auto">
              <img
                src={result.imageUrl}
                alt={result.cropName}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="sm:col-span-2 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                  Botanical Host:
                </span>
                <span className="text-sm font-bold text-stone-900">
                  {result.cropName} ({result.scientificCropName})
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-stone-600 uppercase tracking-wider">
                  Diagnosis:
                </span>
                <span className="text-base font-black text-stone-950">
                  {result.diseaseName}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-stone-600">Pathogen:</span>
                <span className="font-serif italic font-semibold text-stone-800">
                  {result.scientificPathogen}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
                <span className="px-2.5 py-0.5 rounded bg-stone-100 border border-stone-300 font-bold">
                  Confidence: {result.confidence.toFixed(1)}%
                </span>
                <span className="px-2.5 py-0.5 rounded bg-amber-100 border border-amber-300 font-bold text-amber-900 uppercase">
                  Severity: {result.severity}
                </span>
              </div>
            </div>
          </div>

          {/* Symptoms Observed */}
          <div className="space-y-1.5 text-xs">
            <h3 className="font-bold text-stone-900 uppercase tracking-wider text-[11px] border-b border-stone-200 pb-1">
              Foliar Symptoms Observed
            </h3>
            <ul className="list-disc list-inside space-y-1 text-stone-700">
              {result.symptoms.map((s, idx) => (
                <li key={idx}>{s}</li>
              ))}
            </ul>
          </div>

          {/* Immediate 48-Hour Smallholder Protocol */}
          <div className="space-y-1.5 text-xs bg-amber-50 border border-amber-200 p-3.5 rounded-xl">
            <h3 className="font-bold text-amber-950 uppercase tracking-wider text-[11px]">
              Immediate 48-Hour Field Emergency Actions
            </h3>
            <ol className="list-decimal list-inside space-y-1 text-amber-900">
              {result.immediateNextSteps.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>
          </div>

          {/* Prescribed Remedies (Organic & Chemical) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="border border-stone-200 p-3.5 rounded-xl space-y-1.5 bg-emerald-50/50">
              <h4 className="font-bold text-emerald-950 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                Organic & Cultural Measures
              </h4>
              <ul className="list-disc list-inside space-y-1 text-stone-700">
                {result.treatments.organic.map((org, i) => (
                  <li key={i}>{org}</li>
                ))}
              </ul>
            </div>

            <div className="border border-stone-200 p-3.5 rounded-xl space-y-1.5 bg-stone-50">
              <h4 className="font-bold text-stone-950 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                Prescribed Chemical & Dosage
              </h4>
              <ul className="list-disc list-inside space-y-1 text-stone-700">
                {result.treatments.chemical.map((chem, i) => (
                  <li key={i}>{chem}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Extension Official Sign-Off and Seal */}
          <div className="pt-6 border-t-2 border-stone-300 grid grid-cols-2 gap-8 text-xs text-stone-600">
            <div>
              <p className="font-bold text-stone-900 mb-1">Development Agent (D.A.) / Extension Officer:</p>
              <div className="h-10 border-b border-dashed border-stone-400 mt-2 flex items-end">
                <span className="text-[10px] italic text-stone-500">AgroAI Digital Verification Signature</span>
              </div>
            </div>

            <div className="text-right flex flex-col justify-between">
              <div>
                <p className="font-bold text-stone-900 mb-1">Official Kebele Agri Seal:</p>
                <div className="inline-block border-2 border-emerald-800 text-emerald-800 font-bold px-3 py-1 rounded-lg text-[10px] uppercase tracking-widest mt-1">
                  ✓ VERIFIED PATHOLOGY REPORT
                </div>
              </div>
              <p className="text-[10px] text-stone-400 mt-2">
                Report generated via AgroAI Crop Doctor System
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
