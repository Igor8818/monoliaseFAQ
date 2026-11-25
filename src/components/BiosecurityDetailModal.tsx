import { useEffect } from 'react';
import { Bookmark, CheckCircle2, LogIn, LogOut, Share2, ShieldAlert, X } from 'lucide-react';
import { useAppState } from '../context/AppStateContext';
import type { BiosecurityCategory } from '../types/guide';
import { openWhatsappWithText } from '../utils/alertExport';
import { AudioReadButton } from './common/AudioReadButton';
import { BiosecurityCategoryIcon } from './icons/BotanicalIcons';

interface BiosecurityDetailModalProps {
  category: BiosecurityCategory | null;
  onClose: () => void;
}

export function BiosecurityDetailModal({ category, onClose }: BiosecurityDetailModalProps) {
  const { isFavorite, toggleFavorite } = useAppState();

  useEffect(() => {
    if (!category) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [category, onClose]);

  if (!category) return null;

  const saved = isFavorite('biosseguranca', category.id);
  const ttsText = `Biossegurança: ${category.title}. ${category.whyCritical}. Na entrada: ${category.entrySteps.join('. ')}. Na saída: ${category.exitSteps.join('. ')}`;

  const handleShareWhatsapp = () => {
    const msg = [
      `*Biossegurança no Cacaueiro — ${category.title}* (Monilíase em Alerta)`,
      '',
      `*Por que é crítico:* ${category.whyCritical}`,
      '',
      '*Na entrada:*',
      ...category.entrySteps.map((s) => `- ${s}`),
      '',
      '*Na saída:*',
      ...category.exitSteps.map((s) => `- ${s}`),
    ].join('\n');
    openWhatsappWithText(msg);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-forest-deep/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Cuidados de biossegurança: ${category.title}`}
    >
      <div className="w-full sm:max-w-xl bg-parchment rounded-t-3xl sm:rounded-3xl border border-borderSoft shadow-2xl overflow-hidden max-h-[92vh] flex flex-col animate-fade-in-up">
        {/* Header */}
        <div
          className={`text-white px-5 py-4 flex items-center justify-between gap-3 ${
            category.accentTheme === 'brown' ? 'bg-cacaoBrown' : 'bg-forest-primary'
          }`}
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 rounded-2xl bg-white/15 flex items-center justify-center shrink-0">
              <BiosecurityCategoryIcon categoryId={category.id} className="w-6 h-6 text-white" />
            </div>
            <div className="min-w-0">
              <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/20">
                Risco {category.riskLevel}
              </span>
              <h2 className="text-lg font-extrabold truncate mt-0.5">{category.title}</h2>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => toggleFavorite('biosseguranca', category.id)}
              aria-label={saved ? 'Remover dos favoritos' : 'Salvar nos favoritos'}
              className={`p-2.5 rounded-xl border transition-colors ${
                saved
                  ? 'bg-fitomolGold text-forest-deep border-amber-300'
                  : 'bg-white/15 text-white border-white/20 hover:bg-white/25'
              }`}
            >
              <Bookmark className="w-5 h-5" fill={saved ? 'currentColor' : 'none'} />
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar detalhes"
              className="p-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white border border-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-bold text-slate-800">{category.shortSummary}</p>
            <AudioReadButton text={ttsText} label="Ouvir" compact />
          </div>

          <section className="bg-warningAmberSoft border border-amber-300/70 rounded-2xl p-4 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-amber-900">
                Por que este cuidado é crítico
              </h3>
              <p className="text-sm text-amber-950 mt-1 leading-relaxed">
                {category.whyCritical}
              </p>
            </div>
          </section>

          <section className="bg-white rounded-2xl border border-borderSoft p-4 shadow-card space-y-2.5">
            <div className="flex items-center gap-2 text-forest-primary">
              <LogIn className="w-4 h-4" />
              <h3 className="text-sm font-extrabold">Protocolo na Entrada</h3>
            </div>
            <ul className="space-y-2">
              {category.entrySteps.map((step) => (
                <li key={step} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-forest-primary shrink-0 mt-0.5" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-white rounded-2xl border border-borderSoft p-4 shadow-card space-y-2.5">
            <div className="flex items-center gap-2 text-cacaoBrown">
              <LogOut className="w-4 h-4" />
              <h3 className="text-sm font-extrabold">Protocolo na Saída</h3>
            </div>
            <ul className="space-y-2">
              {category.exitSteps.map((step) => (
                <li key={step} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-cacaoBrown shrink-0 mt-0.5" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-forest-soft/80 rounded-2xl border border-forest-primary/15 p-4 space-y-2">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-forest-deep">
              Agentes e Métodos Recomendados
            </h3>
            <ul className="space-y-1 text-sm text-forest-deep">
              {category.recommendedDisinfectants.map((item) => (
                <li key={item} className="font-semibold">
                  • {item}
                </li>
              ))}
            </ul>
          </section>

          <button
            type="button"
            onClick={handleShareWhatsapp}
            className="w-full py-3.5 px-4 rounded-2xl bg-forest-primary hover:bg-forest-deep text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span>Compartilhar orientação no WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
}
