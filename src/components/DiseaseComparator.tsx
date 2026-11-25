import { useState } from 'react';
import { CheckCircle2, Sparkles } from 'lucide-react';
import { COMPARATOR_SIGNAL_CHIPS, DISEASE_COMPARISONS } from '../data/symptoms';

export function DiseaseComparator() {
  const [selectedSignal, setSelectedSignal] = useState<string | null>(null);

  return (
    <div className="space-y-5 animate-fade-in-up">
      {/* Interactive Signal Filter ("Não Confunda!") */}
      <div className="bg-white rounded-3xl border border-borderSoft p-4 sm:p-5 shadow-card space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-forest-primary shrink-0" />
          <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
            Não confunda! Qual sinal você observou na roça?
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-600">
          Toque em uma característica abaixo para destacar rapidamente qual doença mais combina com o sintoma:
        </p>

        <div className="flex flex-wrap gap-2">
          {COMPARATOR_SIGNAL_CHIPS.map((chip) => {
            const active = selectedSignal === chip.id;
            return (
              <button
                key={chip.id}
                type="button"
                onClick={() => setSelectedSignal(active ? null : chip.id)}
                className={`px-3.5 py-2 rounded-full text-xs sm:text-sm font-semibold border transition-all ${
                  active
                    ? 'bg-forest-primary text-white border-forest-primary shadow-sm'
                    : 'bg-parchment text-slate-700 border-borderSoft hover:border-forest-primary/40'
                }`}
              >
                {chip.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3 Disease Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {DISEASE_COMPARISONS.map((disease) => {
          const isHighlighted =
            selectedSignal !== null && disease.quickSignals.includes(selectedSignal);
          const isDimmed = selectedSignal !== null && !isHighlighted;

          const badgeClass =
            disease.badgeColor === 'orange'
              ? 'bg-orange-600 text-white'
              : disease.badgeColor === 'brown'
                ? 'bg-cacaoBrown text-white'
                : 'bg-purple-800 text-white';

          return (
            <article
              key={disease.id}
              className={`rounded-3xl bg-white border overflow-hidden shadow-card transition-all flex flex-col ${
                isHighlighted
                  ? 'ring-2 ring-forest-primary border-forest-primary scale-[1.01]'
                  : isDimmed
                    ? 'opacity-55 border-borderSoft'
                    : 'border-borderSoft'
              }`}
            >
              <div className="relative h-44 bg-[#102414]">
                <img
                  src={disease.image}
                  alt={`Referência visual de ${disease.name}`}
                  className="w-full h-full object-cover"
                />
                <span
                  className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-extrabold shadow-sm ${badgeClass}`}
                >
                  {disease.name}
                </span>
                {isHighlighted && (
                  <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-forest-primary text-white text-xs font-bold shadow-sm">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Combina</span>
                  </span>
                )}
              </div>

              <div className="p-4 space-y-3 flex-1 flex flex-col">
                <div>
                  <h4 className="font-extrabold text-slate-900 text-base">{disease.name}</h4>
                  <p className="text-xs italic text-slate-500">{disease.scientificName}</p>
                  <p className="inline-block mt-1.5 text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-warmSand text-slate-700">
                    {disease.quarantineStatus}
                  </p>
                </div>

                <dl className="space-y-2.5 text-xs sm:text-sm border-t border-borderSoft pt-3">
                  <div>
                    <dt className="font-bold text-slate-800">Órgãos atacados:</dt>
                    <dd className="text-slate-600 mt-0.5">{disease.affectedOrgans}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-slate-800">Esporos / Pó:</dt>
                    <dd className="text-slate-600 mt-0.5">{disease.sporulation}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-slate-800">Aspecto da lesão:</dt>
                    <dd className="text-slate-600 mt-0.5">{disease.lesionAspect}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-slate-800">Interior do fruto:</dt>
                    <dd className="text-slate-600 mt-0.5">{disease.fruitInterior}</dd>
                  </div>
                </dl>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
