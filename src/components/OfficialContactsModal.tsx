import { useEffect, useState } from 'react';
import { MapPin, Phone, ShieldCheck, X } from 'lucide-react';
import { OFFICIAL_CONTACTS } from '../data/officialContacts';

interface OfficialContactsModalProps {
  open: boolean;
  onClose: () => void;
}

export function OfficialContactsModal({ open, onClose }: OfficialContactsModalProps) {
  const [selectedUf, setSelectedUf] = useState<string>('ALL');

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const list =
    selectedUf === 'ALL'
      ? OFFICIAL_CONTACTS
      : OFFICIAL_CONTACTS.filter((c) => c.uf === selectedUf || c.uf === 'BR');

  return (
    <div
      className="fixed inset-0 z-50 bg-forest-deep/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Contatos oficiais da CEPLAC e Defesa Agropecuária"
    >
      <div className="w-full sm:max-w-xl bg-parchment rounded-t-3xl sm:rounded-3xl border border-borderSoft shadow-2xl overflow-hidden max-h-[92vh] flex flex-col animate-fade-in-up">
        <div className="bg-forest-primary text-white px-5 py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold leading-tight">
                Contatos Oficiais (100% Offline)
              </h2>
              <p className="text-xs text-emerald-100/85">
                CEPLAC, MAPA e Agências Estaduais de Defesa Agropecuária
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar contatos"
            className="p-2 rounded-xl bg-white/15 hover:bg-white/25 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-4 sm:px-5 pt-3 pb-2 bg-white border-b border-borderSoft overflow-x-auto no-scrollbar">
          <div className="inline-flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setSelectedUf('ALL')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
                selectedUf === 'ALL'
                  ? 'bg-forest-primary text-white'
                  : 'bg-warmSand text-slate-700 hover:bg-forest-soft'
              }`}
            >
              Todos
            </button>
            {OFFICIAL_CONTACTS.filter((c) => c.uf !== 'BR').map((c) => (
              <button
                key={c.uf}
                type="button"
                onClick={() => setSelectedUf(c.uf)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
                  selectedUf === c.uf
                    ? 'bg-forest-primary text-white'
                    : 'bg-warmSand text-slate-700 hover:bg-forest-soft'
                }`}
              >
                {c.uf}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 sm:p-5 overflow-y-auto space-y-3">
          {list.map((contact) => (
            <div
              key={contact.id}
              className="bg-white rounded-2xl border border-borderSoft p-4 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-forest-soft text-forest-deep text-xs font-extrabold">
                    <MapPin className="w-3 h-3" />
                    {contact.stateName}
                  </span>
                </div>
                <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                  {contact.agency}
                </h3>
                <p className="text-xs text-slate-600">{contact.notes}</p>
              </div>

              <a
                href={contact.phoneHref}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-forest-primary hover:bg-forest-deep text-white text-xs sm:text-sm font-bold shrink-0 shadow-sm transition-colors tabular-nums"
              >
                <Phone className="w-4 h-4" />
                <span>{contact.phone}</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
