import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CropDiseaseResult, FarmerProfile } from '../types';
import {
  User,
  MapPin,
  Calendar,
  CheckCircle2,
  AlertCircle,
  FileText,
  Trash2,
  Edit3,
  Plus,
  ShieldCheck,
  Check,
  X,
  Layers,
} from 'lucide-react';

interface FarmerLogbookProps {
  farmer: FarmerProfile;
  onUpdateFarmer: (updated: FarmerProfile) => void;
  history: CropDiseaseResult[];
  onUpdateHistoryItem: (updated: CropDiseaseResult) => void;
  onDeleteHistoryItem: (id: string) => void;
  onSelectResultToView: (item: CropDiseaseResult) => void;
  onPrintReport: (item: CropDiseaseResult) => void;
}

export const FarmerLogbook: React.FC<FarmerLogbookProps> = ({
  farmer,
  onUpdateFarmer,
  history,
  onUpdateHistoryItem,
  onDeleteHistoryItem,
  onSelectResultToView,
  onPrintReport,
}) => {
  const { language, t } = useLanguage();

  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isEditingProfile, setIsEditingProfile] = useState<boolean>(false);
  const [profileForm, setProfileForm] = useState<FarmerProfile>(farmer);

  // Note editing state for individual log items
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState<string>('');

  const filteredHistory = history.filter((item) => {
    if (filterStatus === 'all') return true;
    return item.status === filterStatus;
  });

  const handleSaveProfile = () => {
    onUpdateFarmer(profileForm);
    setIsEditingProfile(false);
  };

  const handleStartEditNote = (item: CropDiseaseResult) => {
    setEditingNoteId(item.id);
    setNoteText(item.notes || '');
  };

  const handleSaveNote = (item: CropDiseaseResult) => {
    onUpdateHistoryItem({
      ...item,
      notes: noteText,
    });
    setEditingNoteId(null);
  };

  const handleToggleStatus = (item: CropDiseaseResult) => {
    const nextStatus: CropDiseaseResult['status'] =
      item.status === 'resolved' ? 'treating' : item.status === 'treating' ? 'monitoring' : 'resolved';
    onUpdateHistoryItem({
      ...item,
      status: nextStatus,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-stone-900 to-emerald-950 border border-emerald-800/60 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-3">
        <div className="inline-flex items-center gap-1.5 bg-emerald-800/80 text-emerald-200 px-3 py-0.5 rounded-full text-xs font-semibold border border-emerald-700/60 mb-2">
          <User className="w-3.5 h-3.5 text-amber-400" />
          <span>Smallholder Farm Registry & Disease History</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Plus_Jakarta_Sans']">
          {t.farmerProfileTitle}
        </h2>
        <p className="text-emerald-200/80 text-sm max-w-2xl">
          Track historical crop disease infections, monitor post-treatment recovery, and keep field agronomy notes across planting seasons.
        </p>
      </div>

      {/* Farmer Profile Card */}
      <div className="bg-stone-900/90 border border-emerald-900/40 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-emerald-600 p-0.5">
              <div className="w-full h-full bg-stone-950 rounded-[14px] flex items-center justify-center text-amber-400 font-bold text-xl">
                {farmer.name.charAt(0)}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white">{farmer.name}</h3>
                <span className="text-[11px] bg-emerald-950 text-emerald-300 border border-emerald-800/60 px-2 py-0.5 rounded-full font-mono">
                  ID: {farmer.id}
                </span>
              </div>
              <p className="text-xs text-stone-400 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                {farmer.woreda}, {farmer.zone}, {farmer.region}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setProfileForm(farmer);
              setIsEditingProfile(!isEditingProfile);
            }}
            className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white text-xs font-semibold border border-stone-700 transition flex items-center gap-2"
          >
            <Edit3 className="w-4 h-4 text-amber-400" />
            <span>{isEditingProfile ? 'Cancel Edit' : 'Edit Farm Profile'}</span>
          </button>
        </div>

        {/* Profile Details or Edit Form */}
        {isEditingProfile ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-stone-950/70 p-5 rounded-2xl border border-stone-800">
            <div>
              <label className="text-xs text-stone-400 block mb-1 font-semibold">{t.farmerName}</label>
              <input
                type="text"
                value={profileForm.name}
                onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-white text-xs focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs text-stone-400 block mb-1 font-semibold">Phone / Kebele Contact</label>
              <input
                type="text"
                value={profileForm.phone}
                onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-white text-xs focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs text-stone-400 block mb-1 font-semibold">Zone & Woreda</label>
              <input
                type="text"
                value={profileForm.woreda}
                onChange={(e) => setProfileForm({ ...profileForm, woreda: e.target.value })}
                className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-white text-xs focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs text-stone-400 block mb-1 font-semibold">{t.farmSize} (Hectares)</label>
              <input
                type="number"
                step="0.1"
                value={profileForm.farmSizeHectares}
                onChange={(e) => setProfileForm({ ...profileForm, farmSizeHectares: parseFloat(e.target.value) || 1 })}
                className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-white text-xs focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs text-stone-400 block mb-1 font-semibold">{t.soilType}</label>
              <input
                type="text"
                value={profileForm.soilType}
                onChange={(e) => setProfileForm({ ...profileForm, soilType: e.target.value })}
                className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-white text-xs focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div className="flex items-end">
              <button
                onClick={handleSaveProfile}
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-xs transition"
              >
                Save Farm Profile
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-stone-950/60 p-4 rounded-2xl border border-stone-800/80">
              <span className="text-[11px] text-stone-400 block font-medium">{t.farmSize}</span>
              <span className="text-lg font-bold text-white font-mono mt-0.5 block">
                {farmer.farmSizeHectares} Ha
              </span>
              <span className="text-[10px] text-emerald-400">Smallholder Tenure</span>
            </div>

            <div className="bg-stone-950/60 p-4 rounded-2xl border border-stone-800/80">
              <span className="text-[11px] text-stone-400 block font-medium">{t.soilType}</span>
              <span className="text-xs font-bold text-white mt-1 block truncate">
                {farmer.soilType}
              </span>
              <span className="text-[10px] text-amber-400">High Cation Capacity</span>
            </div>

            <div className="bg-stone-950/60 p-4 rounded-2xl border border-stone-800/80">
              <span className="text-[11px] text-stone-400 block font-medium">{t.mainCrops}</span>
              <span className="text-xs font-bold text-white mt-1 block truncate">
                {farmer.primaryCrops.slice(0, 2).join(', ')}
              </span>
              <span className="text-[10px] text-stone-400">+{farmer.primaryCrops.length - 2} other plots</span>
            </div>

            <div className="bg-stone-950/60 p-4 rounded-2xl border border-stone-800/80">
              <span className="text-[11px] text-stone-400 block font-medium">Scans Recorded</span>
              <span className="text-lg font-bold text-amber-400 font-mono mt-0.5 block">
                {history.length}
              </span>
              <span className="text-[10px] text-emerald-400">Field Inspections</span>
            </div>
          </div>
        )}
      </div>

      {/* Disease History Log Section */}
      <div className="bg-stone-900/90 border border-emerald-900/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-400" />
              <span>{t.scanHistory}</span>
            </h3>
            <p className="text-xs text-stone-400 mt-0.5">
              Field inspection records and ongoing remedy logs
            </p>
          </div>

          {/* Status Filter Buttons */}
          <div className="flex items-center gap-1.5 bg-stone-950/80 p-1.5 rounded-xl border border-stone-800">
            {['all', 'treating', 'monitoring', 'resolved'].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                  filterStatus === st
                    ? 'bg-amber-500 text-stone-950 font-bold shadow'
                    : 'text-stone-400 hover:text-white hover:bg-stone-800'
                }`}
              >
                {st === 'all'
                  ? t.all
                  : st === 'treating'
                  ? t.treating
                  : st === 'monitoring'
                  ? t.monitoring
                  : t.resolved}
              </button>
            ))}
          </div>
        </div>

        {/* History Items List */}
        {filteredHistory.length === 0 ? (
          <div className="p-8 text-center bg-stone-950/40 rounded-2xl border border-dashed border-stone-800 text-stone-400 text-xs">
            {t.noScansYet}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredHistory.map((item) => {
              const formattedDate = new Date(item.timestamp).toLocaleDateString([], {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              });

              return (
                <div
                  key={item.id}
                  className="bg-stone-950/80 border border-stone-800 hover:border-emerald-800/60 p-4 sm:p-5 rounded-2xl transition space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-stone-900 border border-stone-800 shrink-0">
                        <img
                          src={item.imageUrl}
                          alt={item.cropName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm sm:text-base font-bold text-white">
                            {item.cropName}
                          </h4>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                              item.isHealthy
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                : item.severity === 'severe'
                                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                                : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            }`}
                          >
                            {item.isHealthy ? 'Healthy' : item.severity}
                          </span>
                        </div>
                        <p className="text-xs text-stone-400">
                          {item.diseaseName} • <span className="text-stone-500">{formattedDate}</span>
                        </p>
                      </div>
                    </div>

                    {/* Status Pill & Action */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleStatus(item)}
                        className={`text-xs px-3 py-1 rounded-full font-semibold border flex items-center gap-1.5 transition ${
                          item.status === 'resolved'
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 hover:bg-emerald-500/30'
                            : item.status === 'treating'
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 hover:bg-amber-500/30'
                            : 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50 hover:bg-yellow-500/30'
                        }`}
                        title="Click to cycle status"
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            item.status === 'resolved'
                              ? 'bg-emerald-400'
                              : item.status === 'treating'
                              ? 'bg-amber-400 animate-pulse'
                              : 'bg-yellow-400'
                          }`}
                        />
                        <span className="capitalize">{item.status || 'treating'}</span>
                      </button>

                      <button
                        onClick={() => onSelectResultToView(item)}
                        className="p-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-800 text-xs transition"
                        title={t.viewDetails}
                      >
                        <FileText className="w-4 h-4 text-emerald-400" />
                      </button>

                      <button
                        onClick={() => onPrintReport(item)}
                        className="p-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-800 text-xs transition"
                        title={t.exportPdf}
                      >
                        <ShieldCheck className="w-4 h-4 text-amber-400" />
                      </button>

                      <button
                        onClick={() => onDeleteHistoryItem(item.id)}
                        className="p-2 rounded-lg bg-stone-900 hover:bg-rose-950 text-stone-400 hover:text-rose-300 border border-stone-800 text-xs transition"
                        title={t.deleteRecord}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Farm Notes Section */}
                  <div className="pt-2 border-t border-stone-800/60">
                    {editingNoteId === item.id ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={noteText}
                          onChange={(e) => setNoteText(e.target.value)}
                          placeholder="Add field note (e.g. Applied ash slurry; checked adjacent plot)..."
                          className="flex-1 bg-stone-900 border border-stone-700 rounded-lg px-3 py-1.5 text-xs text-white focus:border-amber-500 focus:outline-none"
                        />
                        <button
                          onClick={() => handleSaveNote(item)}
                          className="p-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs"
                          title="Save note"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setEditingNoteId(null)}
                          className="p-2 bg-stone-800 hover:bg-stone-700 text-stone-400 rounded-lg text-xs"
                          title="Cancel"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between text-xs text-stone-400">
                        <p className="italic">
                          {item.notes ? `Note: "${item.notes}"` : 'No field notes yet.'}
                        </p>
                        <button
                          onClick={() => handleStartEditNote(item)}
                          className="hover:text-amber-400 transition text-[11px] underline flex items-center gap-1"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>{item.notes ? 'Edit Note' : 'Add Note'}</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
