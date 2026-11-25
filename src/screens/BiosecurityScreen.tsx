import { useState } from 'react';
import { ArrowLeft, ArrowRight, Bookmark, Calculator } from 'lucide-react';
import { useAppState } from '../context/AppStateContext';
import { BIOSECURITY_CATEGORIES } from '../data/biosecurity';
import type { BiosecurityCategory } from '../types/guide';
import { BiosecurityDetailModal } from '../components/BiosecurityDetailModal';
import { BiosecurityCategoryIcon } from '../components/icons/BotanicalIcons';

interface BiosecurityScreenProps {
  onBack: () => void;
  onOpenCalculator: () => void;
}

export function BiosecurityScreen({ onBack, onOpenCalculator }: BiosecurityScreenProps) {
  const { isFavorite, toggleFavorite } = useAppState();
  const [selectedCategory, setSelectedCategory] = useState<BiosecurityCategory | null>(null);

  return (
    <div className="animate-fade-in-up">
      <header className="bg-forest-primary text-white sticky top-0 z-20 px-4 sm:px-6 pt-4 pb-4 shadow-sm md:rounded-3xl md:static">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            aria-label="Voltar"
            className="w-10 h-10 rounded-xl bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-lg sm:text-xl font-extrabold tracking-tight">
              Biossegurança
            </h1>
            <p className="text-xs text-emerald-100/90 mt-0.5">
              Selecione uma categoria para ver os cuidados necessários
            </p>
          </div>
        </div>
      </header>

      <div className="p-4 sm:p-6 space-y-5">
        {/* Dilution Calculator Banner */}
        <button
          type="button"
          onClick={onOpenCalculator}
          className="w-full text-left rounded-3xl bg-white hover:bg-forest-soft/40 border border-borderSoft hover:border-forest-primary/40 p-4 shadow-card transition-all flex items-center justify-between gap-3 group"
        >
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-12 h-12 rounded-2xl bg-forest-soft text-forest-primary flex items-center justify-center shrink-0">
              <Calculator className="w-6 h-6" />
            </div>
            <div className="min-w-0">
              <h2 className="font-extrabold text-slate-900 text-sm sm:text-base">
                Calculadora de Solução Desinfetante
              </h2>
              <p className="text-xs text-slate-600 mt-0.5">
                Calcule a medida exata em mL e copos de 200 mL para pedilúvio, botas e veículos
              </p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-forest-primary shrink-0 group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* 2x4 Biosecurity Matrix preserving alternating green / cacao brown */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4">
          {BIOSECURITY_CATEGORIES.map((category) => {
            const saved = isFavorite('biosseguranca', category.id);
            const isBrown = category.accentTheme === 'brown';

            return (
              <article
                key={category.id}
                className="relative bg-white rounded-3xl border border-borderSoft p-4 shadow-card hover:border-forest-primary/40 transition-all flex flex-col items-center text-center justify-between min-h-[190px]"
              >
                <button
                  type="button"
                  onClick={() => toggleFavorite('biosseguranca', category.id)}
                  aria-label={
                    saved
                      ? `Remover ${category.title} dos favoritos`
                      : `Salvar ${category.title} nos favoritos`
                  }
                  className={`absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                    saved
                      ? 'bg-fitomolGold text-forest-deep'
                      : 'text-slate-300 hover:text-slate-500'
                  }`}
                >
                  <Bookmark className="w-4 h-4" fill={saved ? 'currentColor' : 'none'} />
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className="w-full flex-1 flex flex-col items-center justify-between pt-2"
                >
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-3 ${
                      isBrown
                        ? 'bg-warmSand text-cacaoBrown'
                        : 'bg-forest-soft text-forest-primary'
                    }`}
                  >
                    <BiosecurityCategoryIcon categoryId={category.id} className="w-7 h-7" />
                  </div>

                  <div className="mb-3">
                    <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                      {category.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 hidden sm:block">
                      {category.shortSummary}
                    </p>
                  </div>

                  <span
                    className={`inline-flex items-center justify-center gap-1 px-4 py-2 rounded-full text-xs font-bold text-white shadow-sm ${
                      isBrown ? 'bg-cacaoBrown' : 'bg-forest-primary'
                    }`}
                  >
                    <span>Ver cuidados</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </button>
              </article>
            );
          })}
        </div>
      </div>

      <BiosecurityDetailModal
        category={selectedCategory}
        onClose={() => setSelectedCategory(null)}
      />
    </div>
  );
}
