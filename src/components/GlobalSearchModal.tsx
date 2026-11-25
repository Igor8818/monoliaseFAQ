import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, Search, X } from 'lucide-react';
import type { SearchResultItem } from '../types/guide';
import { searchGuideContent } from '../utils/searchEngine';

interface GlobalSearchModalProps {
  open: boolean;
  onClose: () => void;
  onSelectResult: (result: SearchResultItem) => void;
}

const SUGGESTED_TERMS = [
  'manchas aquosas',
  'pó branco',
  'transportar frutos',
  'álcool 70%',
  'visitante',
  'calçados',
  'cupuaçu',
];

export function GlobalSearchModal({
  open,
  onClose,
  onSelectResult,
}: GlobalSearchModalProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      const id = setTimeout(() => inputRef.current?.focus(), 60);
      return () => clearTimeout(id);
    } else {
      setQuery('');
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  const results = useMemo(() => searchGuideContent(query), [query]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-forest-deep/60 backdrop-blur-sm flex items-start justify-center p-3 sm:p-6 pt-6 sm:pt-14"
      role="dialog"
      aria-modal="true"
      aria-label="Busca global no guia"
    >
      <div className="w-full max-w-2xl bg-parchment rounded-3xl shadow-2xl border border-borderSoft overflow-hidden flex flex-col max-h-[85vh] animate-fade-in-up">
        {/* Search Input Header */}
        <div className="bg-forest-primary p-4 flex items-center gap-3">
          <div className="flex-1 relative flex items-center">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar sintomas, dicas, medidas..."
              className="w-full pl-11 pr-10 py-3 rounded-2xl bg-white text-slate-900 placeholder:text-slate-400 text-sm sm:text-base font-medium focus:outline-none focus:ring-2 focus:ring-fitomolGold"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Limpar busca"
                className="absolute right-3 p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white text-sm font-semibold transition-colors"
          >
            Fechar
          </button>
        </div>

        {/* Results or Suggestions */}
        <div className="p-4 overflow-y-auto space-y-3">
          {!query.trim() ? (
            <div className="space-y-3 py-2">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
                Buscas frequentes no campo
              </p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_TERMS.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setQuery(term)}
                    className="px-3.5 py-2 rounded-full bg-white border border-borderSoft text-sm font-medium text-forest-deep hover:border-forest-primary hover:bg-forest-soft transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
              <p className="text-xs text-slate-500 px-1 pt-2">
                Dica: a busca funciona 100% offline e ignora acentos (ex.: &ldquo;alcool&rdquo; ou &ldquo;moniliase&rdquo;).
              </p>
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-10 px-4 bg-white rounded-2xl border border-borderSoft">
              <p className="text-base font-bold text-slate-800">
                Nenhum resultado para &ldquo;{query}&rdquo;
              </p>
              <p className="text-sm text-slate-500 mt-1">
                Tente buscar termos mais simples como &ldquo;mancha&rdquo;, &ldquo;pó&rdquo;, &ldquo;bota&rdquo; ou &ldquo;transporte&rdquo;.
              </p>
            </div>
          ) : (
            <div className="space-y-2.5">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
                {results.length} resultado{results.length > 1 ? 's' : ''} encontrado
                {results.length > 1 ? 's' : ''}
              </p>
              {results.map((item) => (
                <button
                  key={`${item.type}-${item.id}`}
                  type="button"
                  onClick={() => {
                    onSelectResult(item);
                    onClose();
                  }}
                  className="w-full text-left bg-white hover:bg-forest-soft/50 border border-borderSoft hover:border-forest-primary/40 rounded-2xl p-3.5 shadow-card transition-all flex items-center justify-between gap-3 group"
                >
                  <div className="min-w-0">
                    <span className="inline-block text-[11px] font-bold px-2 py-0.5 rounded-md bg-forest-soft text-forest-primary mb-1">
                      {item.typeLabel}
                    </span>
                    <p className="font-bold text-slate-900 text-sm sm:text-base truncate">
                      {item.title}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 mt-0.5">
                      {item.snippet}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-forest-primary shrink-0 transition-transform group-hover:translate-x-0.5" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
