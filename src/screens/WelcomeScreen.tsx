import { ArrowRight, WifiOff } from 'lucide-react';
import { BotanicalLeafWatermark, CacaoPodLogo } from '../components/icons/BotanicalIcons';

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-forest-primary via-forest-deep to-[#0A2E19] text-white flex flex-col items-center justify-between gap-6 px-6 pt-8 pb-12 safe-top safe-bottom">
      {/* Subtle botanical watermarks */}
      <BotanicalLeafWatermark className="w-80 h-80 text-white absolute -top-16 -right-16 pointer-events-none" />
      <BotanicalLeafWatermark className="w-72 h-72 text-white absolute -bottom-20 -left-20 rotate-180 pointer-events-none" />

      {/* Top badge */}
      <div className="relative z-10 w-full max-w-md flex justify-center">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-medium text-emerald-100 backdrop-blur-sm">
          <WifiOff className="w-3.5 h-3.5 text-emerald-300" />
          <span>Guia de campo 100% offline</span>
        </span>
      </div>

      {/* Center Hero */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-md my-auto py-8 animate-fade-in-up">
        <div className="w-24 h-24 rounded-3xl bg-white/12 border border-white/20 shadow-lg flex items-center justify-center mb-7 backdrop-blur-md">
          <CacaoPodLogo className="w-16 h-16" />
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.08] mb-3">
          Monilíase
          <span className="block">em Alerta</span>
        </h1>

        <p className="text-base sm:text-lg text-emerald-100/90 font-medium mb-9">
          Guia de prevenção do cacaueiro
        </p>

        <button
          type="button"
          onClick={onStart}
          className="inline-flex items-center justify-center gap-2.5 min-w-[200px] px-8 py-4 rounded-2xl bg-white text-forest-primary font-bold text-lg shadow-xl hover:bg-emerald-50 active:scale-[0.98] transition-all"
        >
          <span>Começar</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Institutional Footer Badges (CEPLAC & FITOMOL only — no personal developer credits) */}
      <div className="relative z-10 w-full max-w-md">
        <div className="grid grid-cols-2 gap-3.5">
          <div className="rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm px-4 py-3.5 text-center">
            <p className="text-sm font-extrabold tracking-wider text-white">CEPLAC</p>
            <p className="text-[11px] leading-snug text-emerald-100/85 mt-1">
              Comissão Exec. do Plano da Lavoura Cacaueira
            </p>
          </div>

          <div className="rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm px-4 py-3.5 text-center">
            <p className="text-sm font-extrabold tracking-wider text-fitomolGold">
              FITOMOL
            </p>
            <p className="text-[11px] leading-snug text-emerald-100/85 mt-1">
              Fitopatologia Molecular
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
