import { useState } from 'react';
import { ArrowLeft, Bookmark, Eye, HelpCircle, Tag, Tractor, Trash2 } from 'lucide-react';
import { useAppState } from '../context/AppStateContext';
import { BIOSECURITY_CATEGORIES } from '../data/biosecurity';
import { FAQ_ITEMS } from '../data/faq';
import { SYMPTOMS_CATALOG } from '../data/symptoms';
import type { AppRoute, BiosecurityCategory, FavoriteCategory, SymptomItem } from '../types/guide';
import { BiosecurityDetailModal } from '../components/BiosecurityDetailModal';
import { SymptomDetailModal } from '../components/SymptomDetailModal';

interface FavoritesScreenProps {
  onBack: () => void;
  onNavigate: (route: AppRoute, options?: { faqId?: string }) => void;
}

export function FavoritesScreen({ onBack, onNavigate }: FavoritesScreenProps) {
  const { favorites, toggleFavorite } = useAppState();
  const [activeTab, setActiveTab] = useState<FavoriteCategory>(() => {
    if (favorites.sintomas.length > 0) return 'sintomas';
    if (favorites.biosseguranca.length > 0) return 'biosseguranca';
    if (favorites.faq.length > 0) return 'faq';
    return 'sintomas';
  });
  const [selectedSymptom, setSelectedSymptom] = useState<SymptomItem | null>(null);
  const [selectedBio, setSelectedBio] = useState<BiosecurityCategory | null>(null);

  const savedSymptoms = SYMPTOMS_CATALOG.filter((s) => favorites.sintomas.includes(s.id));
  const savedBio = BIOSECURITY_CATEGORIES.filter((b) => favorites.biosseguranca.includes(b.id));
  const savedFaqs = FAQ_ITEMS.filter((f) => favorites.faq.includes(f.id));

  const tabs: Array<{
    id: FavoriteCategory;
    label: string;
    count: number;
    icon: typeof Eye;
  }> = [
    { id: 'sintomas', label: 'Sintomas', count: savedSymptoms.length, icon: Eye },
    { id: 'biosseguranca', label: 'Biossegurança', count: savedBio.length, icon: Tractor },
    { id: 'faq', label: 'FAQ', count: savedFaqs.length, icon: HelpCircle },
  ];

  const isEmpty =
    (activeTab === 'sintomas' && savedSymptoms.length === 0) ||
    (activeTab === 'biosseguranca' && savedBio.length === 0) ||
    (activeTab === 'faq' && savedFaqs.length === 0);

  return (
    <div className="animate-fade-in-up">
      <header className="bg-forest-primary text-white sticky top-0 z-20 shadow-sm md:rounded-3xl md:static">
        <div className="px-4 sm:px-6 pt-4 pb-3 flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            aria-label="Voltar"
            className="w-10 h-10 rounded-xl bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-lg sm:text-xl font-extrabold tracking-tight">Favoritos</h1>
            <p className="text-xs text-emerald-100/85">
              Itens salvos para consulta rápida sem internet
            </p>
          </div>
        </div>

        <div className="px-4 sm:px-6 pb-3.5 overflow-x-auto no-scrollbar">
          <div className="inline-flex items-center gap-2">
            {tabs.map((tab) => {
              const active = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all shrink-0 ${
                    active
                      ? 'bg-white text-forest-deep shadow-sm'
                      : 'bg-white/15 text-emerald-50 hover:bg-white/25'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  {tab.count > 0 && (
                    <span
                      className={`px-1.5 py-0.5 rounded-full text-[10px] font-extrabold tabular-nums ${
                        active ? 'bg-forest-soft text-forest-deep' : 'bg-white/20 text-white'
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      <div className="p-4 sm:p-6">
        {isEmpty ? (
          <div className="py-16 px-6 text-center flex flex-col items-center justify-center max-w-md mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-warmSand border border-borderSoft text-slate-500 flex items-center justify-center mb-4">
              <Tag className="w-8 h-8" strokeWidth={1.8} />
            </div>
            <p className="text-base font-bold text-slate-700">
              Nenhum item salvo nesta categoria.
            </p>
            <p className="text-sm text-slate-500 mt-1">
              Explore o conteúdo e salve nos favoritos.
            </p>
            <button
              type="button"
              onClick={() =>
                onNavigate(
                  activeTab === 'sintomas'
                    ? 'recognize'
                    : activeTab === 'biosseguranca'
                      ? 'biosecurity'
                      : 'faq'
                )
              }
              className="mt-6 px-5 py-2.5 rounded-2xl bg-forest-primary hover:bg-forest-deep text-white text-sm font-bold transition-colors"
            >
              Explorar{' '}
              {activeTab === 'sintomas'
                ? 'Como Reconhecer'
                : activeTab === 'biosseguranca'
                  ? 'Biossegurança'
                  : 'Perguntas (FAQ)'}
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {activeTab === 'sintomas' &&
              savedSymptoms.map((sym) => (
                <div
                  key={sym.id}
                  className="bg-white rounded-2xl border border-borderSoft p-3 shadow-card flex items-center gap-3.5"
                >
                  <button
                    type="button"
                    onClick={() => setSelectedSymptom(sym)}
                    className="flex items-center gap-3.5 flex-1 text-left min-w-0"
                  >
                    <img
                      src={sym.image}
                      alt={sym.title}
                      className="w-16 h-16 rounded-xl object-cover shrink-0 bg-[#102414]"
                    />
                    <div className="min-w-0">
                      <span className="inline-block text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-forest-soft text-forest-primary">
                        {sym.stageLabel}
                      </span>
                      <p className="font-extrabold text-slate-900 text-sm sm:text-base truncate mt-0.5">
                        {sym.title}
                      </p>
                      <p className="text-xs text-slate-600 line-clamp-1">{sym.shortDesc}</p>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleFavorite('sintomas', sym.id)}
                    aria-label={`Remover ${sym.title} dos favoritos`}
                    className="p-2.5 rounded-xl text-slate-400 hover:text-dangerRed hover:bg-dangerSoft transition-colors shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

            {activeTab === 'biosseguranca' &&
              savedBio.map((bio) => (
                <div
                  key={bio.id}
                  className="bg-white rounded-2xl border border-borderSoft p-4 shadow-card flex items-center justify-between gap-3"
                >
                  <button
                    type="button"
                    onClick={() => setSelectedBio(bio)}
                    className="flex-1 text-left min-w-0"
                  >
                    <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-forest-soft text-forest-primary">
                      <Bookmark className="w-3 h-3" /> Risco {bio.riskLevel}
                    </span>
                    <p className="font-extrabold text-slate-900 text-sm sm:text-base mt-1">
                      {bio.title}
                    </p>
                    <p className="text-xs text-slate-600 mt-0.5">{bio.shortSummary}</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleFavorite('biosseguranca', bio.id)}
                    aria-label={`Remover ${bio.title} dos favoritos`}
                    className="p-2.5 rounded-xl text-slate-400 hover:text-dangerRed hover:bg-dangerSoft transition-colors shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

            {activeTab === 'faq' &&
              savedFaqs.map((faq) => (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border border-borderSoft p-4 shadow-card flex items-start justify-between gap-3"
                >
                  <button
                    type="button"
                    onClick={() => onNavigate('faq', { faqId: faq.id })}
                    className="flex-1 text-left min-w-0"
                  >
                    <span className="inline-block text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-warmSand text-slate-600">
                      {faq.category}
                    </span>
                    <p className="font-bold text-slate-900 text-sm sm:text-base mt-1">
                      {faq.question}
                    </p>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2">{faq.keyTakeaway}</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleFavorite('faq', faq.id)}
                    aria-label="Remover pergunta dos favoritos"
                    className="p-2.5 rounded-xl text-slate-400 hover:text-dangerRed hover:bg-dangerSoft transition-colors shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
          </div>
        )}
      </div>

      <SymptomDetailModal
        symptom={selectedSymptom}
        onClose={() => setSelectedSymptom(null)}
      />

      <BiosecurityDetailModal
        category={selectedBio}
        onClose={() => setSelectedBio(null)}
      />
    </div>
  );
}
