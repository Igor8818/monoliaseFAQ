import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  Bookmark,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Search,
  Share2,
  X,
} from 'lucide-react';
import { useAppState } from '../context/AppStateContext';
import { FAQ_ITEMS } from '../data/faq';
import type { FaqItem } from '../types/guide';
import { openWhatsappWithText } from '../utils/alertExport';
import { normalizeForSearch } from '../utils/searchEngine';
import { AudioReadButton } from '../components/common/AudioReadButton';

interface FaqScreenProps {
  onBack: () => void;
  initialOpenFaqId?: string;
}

const FAQ_CATEGORIES: Array<'Todas' | FaqItem['category']> = [
  'Todas',
  'Transporte e Lei',
  'Sintomas',
  'Manejo e Visitas',
  'Notificação',
];

export function FaqScreen({ onBack, initialOpenFaqId }: FaqScreenProps) {
  const { isFavorite, toggleFavorite } = useAppState();
  const [selectedCategory, setSelectedCategory] = useState<'Todas' | FaqItem['category']>('Todas');
  const [query, setQuery] = useState('');
  const [openId, setOpenId] = useState<string | null>(initialOpenFaqId ?? FAQ_ITEMS[0].id);

  useEffect(() => {
    if (initialOpenFaqId) {
      setSelectedCategory('Todas');
      setQuery('');
      setOpenId(initialOpenFaqId);
    }
  }, [initialOpenFaqId]);

  const filteredItems = useMemo(() => {
    const normQ = normalizeForSearch(query);
    return FAQ_ITEMS.filter((item) => {
      if (selectedCategory !== 'Todas' && item.category !== selectedCategory) return false;
      if (!normQ) return true;
      const hay = normalizeForSearch(`${item.question} ${item.answer} ${item.keyTakeaway}`);
      return hay.includes(normQ);
    });
  }, [selectedCategory, query]);

  const handleShareFaq = (faq: FaqItem) => {
    const text = [
      `*Dúvida sobre Monilíase do Cacau — CEPLAC · FITOMOL*`,
      `*Pergunta:* ${faq.question}`,
      `*Resposta:* ${faq.answer}`,
    ].join('\n\n');
    openWhatsappWithText(text);
  };

  return (
    <div className="animate-fade-in-up">
      <header className="bg-forest-primary text-white sticky top-0 z-20 shadow-sm">
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
            <h1 className="text-lg sm:text-xl font-extrabold tracking-tight">
              Perguntas Frequentes (FAQ)
            </h1>
            <p className="text-xs text-emerald-100/85">
              Tire dúvidas rápidas sobre sintomas, visitas, leis e notificação
            </p>
          </div>
        </div>

        {/* Internal Search + Category Pills */}
        <div className="px-4 sm:px-6 pb-3 space-y-2.5">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filtrar perguntas..."
              className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-white text-slate-900 placeholder:text-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-fitomolGold"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Limpar filtro"
                className="absolute right-2.5 p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="overflow-x-auto no-scrollbar">
            <div className="inline-flex items-center gap-2">
              {FAQ_CATEGORIES.map((cat) => {
                const active = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all shrink-0 ${
                      active
                        ? 'bg-white text-forest-deep shadow-sm'
                        : 'bg-white/15 text-emerald-50 hover:bg-white/25'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      <div className="p-4 sm:p-6 space-y-3">
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-3xl border border-borderSoft p-8 text-center shadow-card">
            <p className="font-bold text-slate-800">Nenhuma pergunta encontrada</p>
            <p className="text-sm text-slate-500 mt-1">
              Limpe o filtro ou tente outro tema acima.
            </p>
          </div>
        ) : (
          filteredItems.map((faq) => {
            const expanded = openId === faq.id;
            const saved = isFavorite('faq', faq.id);

            return (
              <article
                key={faq.id}
                className={`rounded-2xl bg-white border shadow-card overflow-hidden transition-all ${
                  expanded ? 'border-forest-primary/45' : 'border-borderSoft'
                }`}
              >
                <div className="p-4 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-dangerSoft text-dangerRed flex items-center justify-center shrink-0 mt-0.5">
                    <HelpCircle className="w-5 h-5" />
                  </div>

                  <button
                    type="button"
                    onClick={() => setOpenId(expanded ? null : faq.id)}
                    aria-expanded={expanded}
                    className="flex-1 text-left flex items-start justify-between gap-2"
                  >
                    <div>
                      <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-warmSand text-slate-600 mb-1">
                        {faq.category}
                      </span>
                      <h2 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                        {faq.question}
                      </h2>
                    </div>
                    <span className="text-slate-400 shrink-0 mt-1">
                      {expanded ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </span>
                  </button>
                </div>

                {expanded && (
                  <div className="px-4 pb-4 pt-2 border-t border-borderSoft/70 space-y-3 bg-parchment/35">
                    <p className="text-sm text-slate-700 leading-relaxed">{faq.answer}</p>

                    <div className="rounded-xl bg-forest-soft/80 border border-forest-primary/15 px-3.5 py-2.5 text-xs font-bold text-forest-deep">
                      Resumo prático: {faq.keyTakeaway}
                    </div>

                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <AudioReadButton
                        text={`${faq.question}. ${faq.answer}`}
                        label="Ouvir"
                        compact
                      />

                      <button
                        type="button"
                        onClick={() => toggleFavorite('faq', faq.id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold transition-colors ${
                          saved
                            ? 'bg-fitomolGold/30 text-amber-950 border-amber-400'
                            : 'bg-white text-slate-700 border-borderSoft hover:bg-warmSand'
                        }`}
                      >
                        <Bookmark className="w-3.5 h-3.5" fill={saved ? 'currentColor' : 'none'} />
                        <span>{saved ? 'Salvo' : 'Favoritar'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleShareFaq(faq)}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-borderSoft bg-white hover:bg-warmSand text-xs font-semibold text-slate-700 transition-colors"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </button>
                    </div>
                  </div>
                )}
              </article>
            );
          })
        )}
      </div>
    </div>
  );
}
