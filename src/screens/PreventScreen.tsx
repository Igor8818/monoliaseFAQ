import { useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  Calculator,
  Check,
  CheckSquare,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  XOctagon,
} from 'lucide-react';
import { useAppState } from '../context/AppStateContext';
import { PREVENTION_AVOID_ITEMS, PREVENTION_DO_ITEMS } from '../data/prevention';
import { AudioReadButton } from '../components/common/AudioReadButton';

interface PreventScreenProps {
  onBack: () => void;
  onOpenCalculator: () => void;
}

export function PreventScreen({ onBack, onOpenCalculator }: PreventScreenProps) {
  const {
    checkedPreventionIds,
    togglePreventionCheck,
    preventionProtectionPct,
    resetPreventionChecks,
  } = useAppState();

  const [expandedDoId, setExpandedDoId] = useState<string | null>(null);
  const [expandedAvoidId, setExpandedAvoidId] = useState<string | null>(null);

  const fullNarration = [
    'Como prevenir a Monilíase. Faça:',
    ...PREVENTION_DO_ITEMS.map((item) => item.text),
    'Evite:',
    ...PREVENTION_AVOID_ITEMS.map((item) => item.text),
  ].join('. ');

  return (
    <div className="animate-fade-in-up">
      <header className="bg-forest-primary text-white sticky top-0 z-20 px-4 sm:px-6 py-4 flex items-center justify-between gap-3 shadow-sm">
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
              Como Prevenir
            </h1>
            <p className="text-xs text-emerald-100/85">
              Marque as práticas já aplicadas na propriedade
            </p>
          </div>
        </div>

        <AudioReadButton text={fullNarration} label="Ouvir" variant="dark" compact />
      </header>

      <div className="p-4 sm:p-6 space-y-6">
        {/* Property Protection Meter */}
        <section className="bg-white rounded-3xl border border-borderSoft p-4 sm:p-5 shadow-card space-y-2.5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-wider text-forest-primary">
                Autovistoria da Propriedade
              </p>
              <p className="text-sm sm:text-base font-extrabold text-slate-900 mt-0.5 tabular-nums">
                Índice de Proteção: {preventionProtectionPct}% ({checkedPreventionIds.length}/
                {PREVENTION_DO_ITEMS.length})
              </p>
            </div>
            {checkedPreventionIds.length > 0 && (
              <button
                type="button"
                onClick={resetPreventionChecks}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-warmSand hover:bg-borderSoft text-xs font-bold text-slate-700 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Limpar</span>
              </button>
            )}
          </div>

          <div className="w-full h-2.5 rounded-full bg-forest-soft overflow-hidden">
            <div
              className="h-full bg-forest-primary rounded-full transition-all duration-300"
              style={{ width: `${preventionProtectionPct}%` }}
            />
          </div>
        </section>

        {/* FAÇA Section */}
        <section aria-label="Práticas recomendadas - FAÇA" className="space-y-3">
          <div className="flex items-center gap-2.5 px-1">
            <span className="w-8 h-8 rounded-xl bg-forest-primary text-white flex items-center justify-center shadow-sm">
              <CheckSquare className="w-4 h-4" />
            </span>
            <h2 className="text-base sm:text-lg font-extrabold tracking-wide text-forest-deep">
              FAÇA
            </h2>
          </div>

          <div className="space-y-2.5">
            {PREVENTION_DO_ITEMS.map((item) => {
              const checked = checkedPreventionIds.includes(item.id);
              const expanded = expandedDoId === item.id;

              return (
                <div
                  key={item.id}
                  className={`rounded-2xl bg-white border transition-all shadow-card overflow-hidden ${
                    checked ? 'border-forest-primary/60 bg-forest-soft/20' : 'border-borderSoft'
                  }`}
                >
                  <div className="p-3.5 sm:p-4 flex items-start gap-3">
                    <button
                      type="button"
                      onClick={() => togglePreventionCheck(item.id)}
                      aria-label={`Marcar prática: ${item.text}`}
                      aria-pressed={checked}
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 border transition-all ${
                        checked
                          ? 'bg-forest-primary border-forest-primary text-white shadow-sm'
                          : 'bg-forest-soft border-forest-primary/25 text-forest-primary hover:bg-forest-soft/70'
                      }`}
                    >
                      <Check className="w-4 h-4" strokeWidth={2.8} />
                    </button>

                    <button
                      type="button"
                      onClick={() => setExpandedDoId(expanded ? null : item.id)}
                      className="flex-1 text-left flex items-start justify-between gap-2"
                    >
                      <span
                        className={`text-sm sm:text-base font-medium leading-snug ${
                          checked ? 'text-forest-deep font-semibold' : 'text-slate-800'
                        }`}
                      >
                        {item.text}
                      </span>
                      <span className="text-slate-400 shrink-0 mt-0.5">
                        {expanded ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </span>
                    </button>
                  </div>

                  {expanded && (
                    <div className="px-4 pb-4 pt-1 ml-10 space-y-2.5 border-t border-borderSoft/60">
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pt-2">
                        {item.howTo}
                      </p>

                      {item.quarantineNote && (
                        <div className="rounded-xl bg-warningAmberSoft border border-amber-300 p-3 flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                          <p className="text-xs font-bold text-amber-950 leading-relaxed">
                            {item.quarantineNote}
                          </p>
                        </div>
                      )}

                      {item.hasCalculatorShortcut && (
                        <button
                          type="button"
                          onClick={onOpenCalculator}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-forest-soft text-forest-deep text-xs font-bold hover:bg-forest-primary hover:text-white transition-colors"
                        >
                          <Calculator className="w-3.5 h-3.5" />
                          <span>Abrir Calculadora Sanitária</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* EVITE Section */}
        <section aria-label="Práticas proibidas - EVITE" className="space-y-3 pt-2">
          <div className="flex items-center gap-2.5 px-1">
            <span className="w-8 h-8 rounded-xl bg-dangerRed text-white flex items-center justify-center shadow-sm">
              <XOctagon className="w-4 h-4" />
            </span>
            <h2 className="text-base sm:text-lg font-extrabold tracking-wide text-dangerRed">
              EVITE
            </h2>
          </div>

          <div className="space-y-2.5">
            {PREVENTION_AVOID_ITEMS.map((item) => {
              const expanded = expandedAvoidId === item.id;
              return (
                <div
                  key={item.id}
                  className="rounded-2xl bg-white border border-red-200/80 shadow-card overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setExpandedAvoidId(expanded ? null : item.id)}
                    className="w-full p-3.5 sm:p-4 text-left flex items-start gap-3"
                  >
                    <span className="w-7 h-7 rounded-lg bg-dangerSoft text-dangerRed flex items-center justify-center shrink-0 mt-0.5">
                      <XOctagon className="w-4 h-4" />
                    </span>
                    <span className="flex-1 text-sm sm:text-base font-medium text-slate-800 leading-snug">
                      {item.text}
                    </span>
                    <span className="text-slate-400 shrink-0 mt-0.5">
                      {expanded ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </span>
                  </button>

                  {expanded && (
                    <div className="px-4 pb-4 pt-2 ml-10 border-t border-red-100">
                      <p className="text-xs sm:text-sm text-red-950 bg-dangerSoft/60 rounded-xl p-3 leading-relaxed">
                        <strong>Por que evitar:</strong> {item.whyAvoid}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
