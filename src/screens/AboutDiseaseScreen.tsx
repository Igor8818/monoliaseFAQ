import { ArrowLeft, ArrowRight, Bug, Clock, Globe, Microscope, Sprout, Wind } from 'lucide-react';
import { DISEASE_OVERVIEW } from '../data/diseaseInfo';
import { AudioReadButton } from '../components/common/AudioReadButton';

interface AboutDiseaseScreenProps {
  onBack: () => void;
  onGoToRecognize: () => void;
}

export function AboutDiseaseScreen({ onBack, onGoToRecognize }: AboutDiseaseScreenProps) {
  const fullNarration = [
    DISEASE_OVERVIEW.title,
    DISEASE_OVERVIEW.subtitle,
    ...DISEASE_OVERVIEW.summaryCards.map((c) => `${c.title}. ${c.body}`),
    ...DISEASE_OVERVIEW.cyclePhases.map(
      (p) => `Fase ${p.phase}, ${p.timeframe}: ${p.title}. ${p.description}`
    ),
    DISEASE_OVERVIEW.institutionalRole,
  ].join(' ');

  return (
    <div className="animate-fade-in-up">
      <header className="bg-forest-primary text-white sticky top-0 z-20 px-4 sm:px-6 py-4 flex items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={onBack}
            aria-label="Voltar"
            className="w-10 h-10 rounded-xl bg-white/15 hover:bg-white/25 flex items-center justify-center shrink-0 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="min-w-0">
            <h1 className="text-lg sm:text-xl font-extrabold truncate">
              {DISEASE_OVERVIEW.title}
            </h1>
            <p className="text-xs italic text-emerald-100/85 truncate">
              {DISEASE_OVERVIEW.scientificName}
            </p>
          </div>
        </div>

        <AudioReadButton text={fullNarration} label="Ouvir" variant="dark" compact />
      </header>

      <div className="p-4 sm:p-6 space-y-5">
        {/* Intro cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {DISEASE_OVERVIEW.summaryCards.map((card, idx) => (
            <section
              key={card.id}
              className="bg-white rounded-3xl border border-borderSoft p-5 shadow-card space-y-2.5"
            >
              <div className="w-10 h-10 rounded-2xl bg-forest-soft text-forest-primary flex items-center justify-center">
                {idx === 0 ? <Bug className="w-5 h-5" /> : <Sprout className="w-5 h-5" />}
              </div>
              <h2 className="font-extrabold text-slate-900 text-base">{card.title}</h2>
              <p className="text-sm text-slate-700 leading-relaxed">{card.body}</p>
            </section>
          ))}
        </div>

        {/* Disease Cycle Timeline */}
        <section className="bg-white rounded-3xl border border-borderSoft p-5 shadow-card space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-warningAmberSoft text-amber-800 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-slate-900 text-base sm:text-lg">
                Ciclo da Doença nos Frutos
              </h2>
              <p className="text-xs text-slate-500">
                Atenção especial às semanas de infecção oculta sem sinal externo
              </p>
            </div>
          </div>

          <ol className="relative border-l-2 border-forest-primary/25 ml-3.5 space-y-4 pl-6">
            {DISEASE_OVERVIEW.cyclePhases.map((phase) => (
              <li key={phase.phase} className="relative">
                <span
                  className={`absolute -left-[33px] top-0.5 w-6 h-6 rounded-full text-xs font-extrabold flex items-center justify-center ${
                    phase.isHiddenStage
                      ? 'bg-amber-500 text-white ring-4 ring-amber-100'
                      : 'bg-forest-primary text-white'
                  }`}
                >
                  {phase.phase}
                </span>

                <div
                  className={`rounded-2xl p-3.5 border ${
                    phase.isHiddenStage
                      ? 'bg-warningAmberSoft border-amber-300'
                      : 'bg-parchment/70 border-borderSoft'
                  }`}
                >
                  <span className="inline-block text-[11px] font-extrabold uppercase tracking-wider text-forest-primary">
                    {phase.timeframe}
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-sm sm:text-base mt-0.5">
                    {phase.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">
                    {phase.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Short vs Long Distance Dispersion */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <section className="bg-forest-soft/70 rounded-3xl border border-forest-primary/15 p-5 space-y-3">
            <div className="flex items-center gap-2 text-forest-deep">
              <Wind className="w-5 h-5 text-forest-primary" />
              <h2 className="font-extrabold text-base">Curta distância (na roça)</h2>
            </div>
            <ul className="space-y-2 text-sm text-forest-deep/90">
              {DISEASE_OVERVIEW.dispersionComparison.shortDistance.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-forest-primary mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-dangerSoft/80 rounded-3xl border border-red-200 p-5 space-y-3">
            <div className="flex items-center gap-2 text-red-900">
              <Globe className="w-5 h-5 text-dangerRed" />
              <h2 className="font-extrabold text-base">Longa distância (entre regiões)</h2>
            </div>
            <ul className="space-y-2 text-sm text-red-950">
              {DISEASE_OVERVIEW.dispersionComparison.longDistance.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-dangerRed mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Institutional role + CTA */}
        <section className="bg-white rounded-3xl border border-borderSoft p-5 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-forest-soft text-forest-primary flex items-center justify-center shrink-0">
              <Microscope className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-slate-900 text-sm sm:text-base">
                Atuação CEPLAC · FITOMOL
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                {DISEASE_OVERVIEW.institutionalRole}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onGoToRecognize}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-forest-primary hover:bg-forest-deep text-white font-bold text-sm shrink-0 transition-colors"
          >
            <span>Ver sintomas</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </section>
      </div>
    </div>
  );
}
