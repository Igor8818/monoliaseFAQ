import { useEffect, useState } from 'react';
import { ArrowLeft, Bookmark, ZoomIn } from 'lucide-react';
import { useAppState } from '../context/AppStateContext';
import { SYMPTOMS_CATALOG } from '../data/symptoms';
import type { SymptomItem, SymptomStage } from '../types/guide';
import { DiseaseComparator } from '../components/DiseaseComparator';
import { SymptomDetailModal } from '../components/SymptomDetailModal';

type RecognizeTab = SymptomStage | 'comparacao';

interface RecognizeScreenProps {
  onBack: () => void;
  initialSymptomId?: string;
}

const SUB_TABS: Array<{ id: RecognizeTab; label: string }> = [
  { id: 'iniciais', label: 'Iniciais' },
  { id: 'intermediarios', label: 'Intermediários' },
  { id: 'avancados', label: 'Avançados' },
  { id: 'comparacao', label: 'Comparação' },
];

export function RecognizeScreen({ onBack, initialSymptomId }: RecognizeScreenProps) {
  const { isFavorite, toggleFavorite } = useAppState();
  const [activeTab, setActiveTab] = useState<RecognizeTab>('iniciais');
  const [selectedSymptom, setSelectedSymptom] = useState<SymptomItem | null>(null);

  useEffect(() => {
    if (!initialSymptomId) return;
    const found = SYMPTOMS_CATALOG.find((s) => s.id === initialSymptomId);
    if (found) {
      setActiveTab(found.stage);
      setSelectedSymptom(found);
    }
  }, [initialSymptomId]);

  const filteredSymptoms = SYMPTOMS_CATALOG.filter((s) => s.stage === activeTab);

  const stageBadgeClass = (stage: SymptomStage) =>
    stage === 'iniciais'
      ? 'bg-amber-500 text-white'
      : stage === 'intermediarios'
        ? 'bg-cacaoBrown text-white'
        : 'bg-dangerRed text-white';

  return (
    <div className="animate-fade-in-up">
      {/* Sticky Green Sub-Header with Smooth Pill Tabs (no ugly scrollbar!) */}
      <header className="bg-forest-primary text-white sticky top-0 z-20 shadow-sm md:rounded-3xl md:static">
        <div className="px-4 sm:px-6 pt-4 pb-3 flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            aria-label="Voltar para o início"
            className="w-10 h-10 rounded-xl bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-lg sm:text-xl font-extrabold tracking-tight">
              Como Reconhecer
            </h1>
            <p className="text-xs text-emerald-100/85">
              Toque em qualquer card para ampliar e ler os detalhes
            </p>
          </div>
        </div>

        <div className="px-4 sm:px-6 pb-3.5 overflow-x-auto no-scrollbar">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 pr-4">
            {SUB_TABS.map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all shrink-0 ${
                    active
                      ? 'bg-white text-forest-deep shadow-sm'
                      : 'bg-white/15 text-emerald-50 hover:bg-white/25'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      <div className="p-4 sm:p-6">
        {activeTab === 'comparacao' ? (
          <DiseaseComparator />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-4">
            {filteredSymptoms.map((symptom) => {
              const saved = isFavorite('sintomas', symptom.id);
              return (
                <article
                  key={symptom.id}
                  className="bg-white rounded-3xl border border-borderSoft overflow-hidden shadow-card hover:border-forest-primary/40 transition-all flex flex-col group"
                >
                  <div className="relative h-36 sm:h-44 bg-[#102414] overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setSelectedSymptom(symptom)}
                      className="w-full h-full block text-left"
                      aria-label={`Ampliar sintoma ${symptom.title}`}
                    >
                      <img
                        src={symptom.image}
                        alt={symptom.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </button>

                    <span
                      className={`absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-lg text-[11px] font-extrabold shadow-sm ${stageBadgeClass(
                        symptom.stage
                      )}`}
                    >
                      {symptom.stageLabel}
                    </span>

                    <button
                      type="button"
                      onClick={() => toggleFavorite('sintomas', symptom.id)}
                      aria-label={saved ? 'Remover dos favoritos' : 'Salvar nos favoritos'}
                      className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md border transition-colors ${
                        saved
                          ? 'bg-fitomolGold text-forest-deep border-amber-300'
                          : 'bg-black/45 text-white border-white/20 hover:bg-black/65'
                      }`}
                    >
                      <Bookmark className="w-4 h-4" fill={saved ? 'currentColor' : 'none'} />
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedSymptom(symptom)}
                      aria-label="Dar zoom na imagem"
                      className="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-black/50 text-white flex items-center justify-center opacity-85 group-hover:opacity-100"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedSymptom(symptom)}
                    className="p-3.5 text-left flex-1 flex flex-col justify-between"
                  >
                    <div>
                      <h2 className="font-extrabold text-slate-900 text-sm sm:text-base leading-snug">
                        {symptom.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed line-clamp-3">
                        {symptom.shortDesc}
                      </p>
                    </div>
                    <span className="mt-2.5 text-xs font-bold text-forest-primary">
                      Ver detalhes →
                    </span>
                  </button>
                </article>
              );
            })}
          </div>
        )}
      </div>

      <SymptomDetailModal
        symptom={selectedSymptom}
        onClose={() => setSelectedSymptom(null)}
      />
    </div>
  );
}
