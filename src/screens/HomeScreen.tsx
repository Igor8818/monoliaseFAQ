import {
  AlertTriangle,
  ArrowRight,
  Bookmark,
  Calculator,
  ChevronRight,
  HelpCircle,
  Info,
  PhoneCall,
  Search,
  Type,
} from 'lucide-react';
import { useAppState } from '../context/AppStateContext';
import { FAQ_ITEMS } from '../data/faq';
import { PREVENTION_DO_ITEMS } from '../data/prevention';
import type { AppRoute } from '../types/guide';
import { HomeMenuIcon } from '../components/icons/BotanicalIcons';

interface HomeScreenProps {
  onNavigate: (route: AppRoute, options?: { faqId?: string }) => void;
  onOpenSearch: () => void;
  onOpenCalculator: () => void;
  onOpenContacts: () => void;
}

export function HomeScreen({
  onNavigate,
  onOpenSearch,
  onOpenCalculator,
  onOpenContacts,
}: HomeScreenProps) {
  const {
    totalFavoritesCount,
    checkedPreventionIds,
    fontScale,
    cycleFontScale,
  } = useAppState();

  const featuredFaqs = FAQ_ITEMS.filter((item) => item.featuredOnHome);
  const fontBadge =
    fontScale === 'normal' ? 'Aa' : fontScale === 'large' ? 'Aa+' : 'Aa++';

  return (
    <div className="animate-fade-in-up">
      {/* Green Header matching prototype */}
      <header className="bg-forest-primary text-white px-4 sm:px-6 pt-5 pb-6 rounded-b-[28px] md:rounded-none md:bg-transparent md:text-slate-900 md:pt-7 md:pb-3 shadow-sm md:shadow-none">
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight truncate">
              Monilíase em Alerta
            </h1>
            <p className="text-xs text-emerald-100/90 md:text-slate-500 font-medium">
              CEPLAC · FITOMOL · Guia de prevenção do cacaueiro
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={cycleFontScale}
              title="Alternar tamanho da letra"
              aria-label="Alternar tamanho da letra"
              className="md:hidden inline-flex items-center gap-1 px-2.5 h-10 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold border border-white/15 transition-colors"
            >
              <Type className="w-3.5 h-3.5" />
              <span>{fontBadge}</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('welcome')}
              title="Sobre o guia (tela inicial)"
              aria-label="Sobre o guia"
              className="md:hidden w-10 h-10 rounded-xl bg-white/15 hover:bg-white/25 text-white flex items-center justify-center border border-white/15 transition-colors"
            >
              <Info className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate('favorites')}
              aria-label={`Favoritos (${totalFavoritesCount} salvos)`}
              className="relative w-10 h-10 md:w-auto md:px-3.5 rounded-xl bg-white/15 hover:bg-white/25 md:bg-white md:hover:bg-forest-soft text-white md:text-forest-deep flex items-center justify-center gap-2 border border-white/20 md:border-borderSoft shadow-sm transition-colors"
            >
              <Bookmark className="w-4 h-4" />
              <span className="hidden md:inline text-sm font-semibold">Favoritos</span>
              {totalFavoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 md:static min-w-[18px] h-[18px] px-1 rounded-full bg-fitomolGold text-forest-deep text-[11px] font-extrabold flex items-center justify-center tabular-nums">
                  {totalFavoritesCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Search Trigger Bar matching prototype */}
        <button
          type="button"
          onClick={onOpenSearch}
          className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-white text-left text-slate-400 border border-borderSoft shadow-card hover:border-forest-primary/40 transition-all"
        >
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <span className="text-sm sm:text-base truncate">
            Buscar sintomas, dicas, medidas...
          </span>
        </button>
      </header>

      <div className="px-4 sm:px-6 pt-5 space-y-6">
        {/* Hero Card: Encontrou um fruto suspeito? */}
        <section
          aria-label="Guia de emergência para fruto suspeito"
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#DC5205] via-[#EA7105] to-[#F59E0B] text-white p-5 sm:p-6 shadow-hero"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-300/25 border border-white/30 flex items-center justify-center shrink-0 animate-pulse-soft">
                <AlertTriangle className="w-8 h-8 text-yellow-200" strokeWidth={2.4} />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold leading-snug">
                  Encontrou um fruto suspeito?
                </h2>
                <p className="text-sm text-orange-50/95 font-medium mt-0.5">
                  Siga o guia passo a passo
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('suspect')}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white text-[#C2410C] font-extrabold text-sm sm:text-base shadow-md hover:bg-orange-50 active:scale-[0.98] transition-all shrink-0"
            >
              <span>Ver o que fazer</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* Main 2x2 Grid matching prototype cards */}
        <section aria-label="Áreas principais do guia" className="grid grid-cols-2 gap-3.5 sm:gap-4">
          <button
            type="button"
            onClick={() => onNavigate('recognize')}
            className="text-left rounded-3xl bg-forest-soft/90 hover:bg-forest-soft border border-forest-primary/15 p-4 sm:p-5 shadow-card transition-all active:scale-[0.99] flex flex-col justify-between min-h-[126px]"
          >
            <div className="w-11 h-11 rounded-2xl bg-white text-forest-primary border border-forest-primary/15 flex items-center justify-center shadow-sm">
              <HomeMenuIcon kind="recognize" className="w-6 h-6" />
            </div>
            <div className="mt-3">
              <h3 className="font-extrabold text-forest-deep text-sm sm:text-base leading-tight">
                Como Reconhecer
              </h3>
              <p className="text-xs text-forest-deep/75 mt-1 hidden sm:block">
                Sintomas iniciais, avançados e comparação
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('prevent')}
            className="text-left rounded-3xl bg-forest-soft/90 hover:bg-forest-soft border border-forest-primary/15 p-4 sm:p-5 shadow-card transition-all active:scale-[0.99] flex flex-col justify-between min-h-[126px]"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="w-11 h-11 rounded-2xl bg-white text-forest-primary border border-forest-primary/15 flex items-center justify-center shadow-sm">
                <HomeMenuIcon kind="prevent" className="w-6 h-6" />
              </div>
              {checkedPreventionIds.length > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-forest-primary text-white text-[11px] font-bold tabular-nums">
                  {checkedPreventionIds.length}/{PREVENTION_DO_ITEMS.length}
                </span>
              )}
            </div>
            <div className="mt-3">
              <h3 className="font-extrabold text-forest-deep text-sm sm:text-base leading-tight">
                Como Prevenir
              </h3>
              <p className="text-xs text-forest-deep/75 mt-1 hidden sm:block">
                Lista prática de FAÇA e EVITE na lavoura
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('biosecurity')}
            className="text-left rounded-3xl bg-warmSand hover:bg-[#E9E4DA] border border-borderSoft p-4 sm:p-5 shadow-card transition-all active:scale-[0.99] flex flex-col justify-between min-h-[126px]"
          >
            <div className="w-11 h-11 rounded-2xl bg-white text-cacaoBrown border border-borderSoft flex items-center justify-center shadow-sm">
              <HomeMenuIcon kind="biosecurity" className="w-6 h-6" />
            </div>
            <div className="mt-3">
              <h3 className="font-extrabold text-slate-900 text-sm sm:text-base leading-tight">
                Biossegurança
              </h3>
              <p className="text-xs text-slate-600 mt-1 hidden sm:block">
                8 barreiras de proteção + calculadora sanitária
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('about')}
            className="text-left rounded-3xl bg-warmSand hover:bg-[#E9E4DA] border border-borderSoft p-4 sm:p-5 shadow-card transition-all active:scale-[0.99] flex flex-col justify-between min-h-[126px]"
          >
            <div className="w-11 h-11 rounded-2xl bg-white text-forest-primary border border-borderSoft flex items-center justify-center shadow-sm">
              <HomeMenuIcon kind="about" className="w-6 h-6" />
            </div>
            <div className="mt-3">
              <h3 className="font-extrabold text-slate-900 text-sm sm:text-base leading-tight">
                O que é a Monilíase
              </h3>
              <p className="text-xs text-slate-600 mt-1 hidden sm:block">
                Ciclo oculto, hospedeiros e riscos
              </p>
            </div>
          </button>
        </section>

        {/* Quick Field Tools Strip */}
        <section aria-label="Ferramentas rápidas de campo" className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onOpenCalculator}
            className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-borderSoft shadow-card hover:border-forest-primary/40 transition-all text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-forest-soft text-forest-primary flex items-center justify-center shrink-0">
              <Calculator className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                Calculadora Sanitária
              </p>
              <p className="text-[11px] text-slate-500 truncate">
                Diluição p/ botas e caixas
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={onOpenContacts}
            className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-borderSoft shadow-card hover:border-forest-primary/40 transition-all text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-warningAmberSoft text-amber-800 flex items-center justify-center shrink-0">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                Contatos Oficiais
              </p>
              <p className="text-[11px] text-slate-500 truncate">
                CEPLAC e Defesa por UF
              </p>
            </div>
          </button>
        </section>

        {/* Perguntas mais acessadas */}
        <section aria-label="Perguntas mais acessadas" className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
              Perguntas mais acessadas
            </h2>
            <button
              type="button"
              onClick={() => onNavigate('faq')}
              className="text-xs sm:text-sm font-bold text-forest-primary hover:underline"
            >
              Ver todas →
            </button>
          </div>

          <div className="space-y-2.5">
            {featuredFaqs.map((faq) => (
              <button
                key={faq.id}
                type="button"
                onClick={() => onNavigate('faq', { faqId: faq.id })}
                className="w-full text-left bg-white hover:bg-forest-soft/35 border border-borderSoft rounded-2xl p-4 shadow-card transition-all flex items-center justify-between gap-3 group"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-dangerSoft text-dangerRed flex items-center justify-center shrink-0">
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-semibold text-slate-800 leading-snug">
                    {faq.question}
                  </span>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-forest-primary shrink-0 transition-transform group-hover:translate-x-0.5" />
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
