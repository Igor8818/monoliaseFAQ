import { useEffect, useMemo, useState } from 'react';
import { AlertTriangle, Calculator, Droplets, Info, X } from 'lucide-react';
import {
  calculateBleachDilution,
  DISINFECTANT_TARGETS,
  type DisinfectantTarget,
} from '../utils/dilutionCalculator';

interface DilutionCalculatorModalProps {
  open: boolean;
  onClose: () => void;
}

const VOLUME_PRESETS = [1, 5, 10, 20];

export function DilutionCalculatorModal({ open, onClose }: DilutionCalculatorModalProps) {
  const [target, setTarget] = useState<DisinfectantTarget>('pediluvio');
  const [waterLiters, setWaterLiters] = useState<number>(10);
  const [bleachPct, setBleachPct] = useState<number>(2.5);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const targetConfig = DISINFECTANT_TARGETS[target];

  const result = useMemo(
    () =>
      calculateBleachDilution(
        waterLiters,
        bleachPct,
        targetConfig.recommendedTargetPct,
        target
      ),
    [waterLiters, bleachPct, targetConfig.recommendedTargetPct, target]
  );

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-forest-deep/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Calculadora de solução desinfetante"
    >
      <div className="w-full sm:max-w-lg bg-parchment rounded-t-3xl sm:rounded-3xl border border-borderSoft shadow-2xl overflow-hidden max-h-[88vh] sm:max-h-[85vh] flex flex-col animate-fade-in-up">
        <div className="bg-forest-primary text-white px-5 py-4 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold leading-tight">
                Calculadora Sanitária
              </h2>
              <p className="text-xs text-emerald-100/85">
                Diluição prática de água sanitária (cloro ativo)
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar calculadora"
            className="p-2 rounded-xl bg-white/15 hover:bg-white/25 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-5 overflow-y-auto space-y-4">
          {/* Target Selector */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-600">
              1. O que você vai desinfetar?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {(Object.keys(DISINFECTANT_TARGETS) as DisinfectantTarget[]).map((key) => {
                const active = target === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setTarget(key)}
                    className={`px-3 py-2.5 rounded-2xl text-xs font-bold border text-left transition-all ${
                      active
                        ? 'bg-forest-primary text-white border-forest-primary shadow-sm'
                        : 'bg-white text-slate-700 border-borderSoft hover:border-forest-primary/40'
                    }`}
                  >
                    <span className="block">{DISINFECTANT_TARGETS[key].label}</span>
                    <span
                      className={`text-[10px] font-medium ${
                        active ? 'text-emerald-100' : 'text-slate-500'
                      }`}
                    >
                      Solução {DISINFECTANT_TARGETS[key].recommendedTargetPct}%
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Water Volume */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-600">
              2. Volume total desejado (litros)
            </label>
            <div className="flex flex-wrap gap-2">
              {VOLUME_PRESETS.map((vol) => (
                <button
                  key={vol}
                  type="button"
                  onClick={() => setWaterLiters(vol)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold border tabular-nums transition-all ${
                    waterLiters === vol
                      ? 'bg-forest-soft text-forest-deep border-forest-primary'
                      : 'bg-white text-slate-700 border-borderSoft'
                  }`}
                >
                  {vol} L
                </button>
              ))}
              <input
                type="number"
                min={0.5}
                max={500}
                step={0.5}
                value={waterLiters || ''}
                onChange={(e) => setWaterLiters(Number(e.target.value))}
                aria-label="Volume personalizado em litros"
                className="w-24 px-3 py-2 rounded-xl bg-white border border-borderSoft text-sm font-bold text-slate-900 tabular-nums focus:outline-none focus:ring-2 focus:ring-forest-primary"
              />
            </div>
          </div>

          {/* Commercial Bleach Strength */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-600">
              3. Concentração do rótulo da água sanitária
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {[2.0, 2.5].map((pct) => (
                <button
                  key={pct}
                  type="button"
                  onClick={() => setBleachPct(pct)}
                  className={`py-2.5 px-3 rounded-xl text-sm font-bold border tabular-nums transition-all ${
                    bleachPct === pct
                      ? 'bg-forest-soft text-forest-deep border-forest-primary'
                      : 'bg-white text-slate-700 border-borderSoft'
                  }`}
                >
                  {pct.toFixed(1).replace('.', ',')}% cloro ativo
                </button>
              ))}
            </div>
          </div>

          {/* Result Card */}
          {result.valid ? (
            <div className="rounded-3xl bg-forest-deep text-white p-5 space-y-3 shadow-md">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs uppercase tracking-wider font-bold text-emerald-200">
                  Medida recomendada
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/15 text-xs font-bold whitespace-nowrap shrink-0">
                  Contato mín.: {result.contactMinutes} min
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white/10 p-3.5">
                  <p className="text-xs text-emerald-100/85">Água sanitária</p>
                  <p className="text-2xl sm:text-3xl font-extrabold text-fitomolGold tabular-nums mt-0.5 whitespace-nowrap">
                    {result.bleachMl} mL
                  </p>
                  <p className="text-xs text-emerald-100 mt-1 tabular-nums whitespace-nowrap">
                    ≈ {result.cups200ml} copo{result.cups200ml === 1 ? '' : 's'} de 200 mL
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 p-3.5">
                  <p className="text-xs text-emerald-100/85">Completar com água</p>
                  <p className="text-2xl sm:text-3xl font-extrabold text-white tabular-nums mt-0.5">
                    {(result.waterToAddMl / 1000).toFixed(2).replace('.', ',')} L
                  </p>
                  <p className="text-xs text-emerald-100 mt-1 tabular-nums">
                    ({result.waterToAddMl} mL de água limpa)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2 text-xs text-emerald-50/90 pt-1">
                <Droplets className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
                <p>{result.practicalTip}</p>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl bg-dangerSoft border border-red-200 p-4 text-sm font-semibold text-dangerRed">
              {result.errorMessage}
            </div>
          )}

          {/* Organic matter warning */}
          <div className="rounded-2xl bg-warningAmberSoft border border-amber-300/70 p-3.5 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p className="text-xs font-semibold text-amber-950 leading-relaxed">
              Lave a lama e resíduos orgânicos antes de aplicar o cloro: terra e seiva inativam a água sanitária rapidamente. Prepare em balde protegido do sol.
            </p>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <Info className="w-3.5 h-3.5 shrink-0" />
            <span>
              Para corte entre plantas em campo, o álcool 70% pronto para uso continua sendo o método mais prático por não enferrujar lâminas.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
