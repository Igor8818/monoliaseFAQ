import React from 'react';
import {
  AlertTriangle,
  BookOpen,
  Bookmark,
  Calculator,
  PhoneCall,
  Type,
} from 'lucide-react';
import { useAppState } from '../../context/AppStateContext';
import type { AppRoute, AppTab } from '../../types/guide';
import { CacaoPodLogo, NavTabIcon } from '../icons/BotanicalIcons';

interface AppShellProps {
  currentRoute: AppRoute;
  onNavigate: (route: AppRoute) => void;
  onOpenCalculator: () => void;
  onOpenContacts: () => void;
  children: React.ReactNode;
}

const BOTTOM_TABS: Array<{ id: AppTab; label: string; desktopLabel: string }> = [
  { id: 'home', label: 'Início', desktopLabel: 'Início' },
  { id: 'recognize', label: 'Reconhecer', desktopLabel: 'Como Reconhecer' },
  { id: 'prevent', label: 'Prevenir', desktopLabel: 'Como Prevenir' },
  { id: 'biosecurity', label: 'Biosseg.', desktopLabel: 'Biossegurança' },
  { id: 'faq', label: 'FAQ', desktopLabel: 'Perguntas (FAQ)' },
];

export function AppShell({
  currentRoute,
  onNavigate,
  onOpenCalculator,
  onOpenContacts,
  children,
}: AppShellProps) {
  const { totalFavoritesCount, fontScale, cycleFontScale } = useAppState();

  const fontLabel =
    fontScale === 'normal' ? 'Normal' : fontScale === 'large' ? 'Grande' : 'Extra';

  return (
    <div className="min-h-screen bg-parchment flex flex-col md:flex-row">
      {/* Desktop Botanical Sidebar */}
      <aside className="hidden md:flex md:w-72 lg:w-80 md:flex-col md:fixed md:inset-y-0 bg-gradient-to-b from-forest-deep via-forest-primary to-forest-deep text-white border-r border-white/10 z-30">
        <div className="p-6 border-b border-white/15">
          <button
            type="button"
            onClick={() => onNavigate('welcome')}
            className="flex items-center gap-3.5 text-left group w-full"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <CacaoPodLogo className="w-9 h-9" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight tracking-tight">
                Monilíase em Alerta
              </h1>
              <p className="text-xs text-emerald-100/80">CEPLAC · FITOMOL</p>
            </div>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1.5" aria-label="Menu principal">
          <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-emerald-200/70">
            Navegação
          </p>
          {BOTTOM_TABS.map((tab) => {
            const active = currentRoute === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onNavigate(tab.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  active
                    ? 'bg-white text-forest-deep shadow-sm'
                    : 'text-emerald-50/90 hover:bg-white/10'
                }`}
              >
                <NavTabIcon tab={tab.id} active={active} />
                <span>{tab.desktopLabel}</span>
              </button>
            );
          })}

          <div className="pt-4 mt-4 border-t border-white/15 space-y-1.5">
            <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-emerald-200/70">
              Ações de Campo
            </p>
            <button
              type="button"
              onClick={() => onNavigate('suspect')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                currentRoute === 'suspect'
                  ? 'bg-amber-400 text-forest-deep shadow-sm'
                  : 'bg-orange-600/90 hover:bg-orange-500 text-white'
              }`}
            >
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <span>Fruto Suspeito (1–6)</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('about')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                currentRoute === 'about'
                  ? 'bg-white text-forest-deep shadow-sm'
                  : 'text-emerald-50/90 hover:bg-white/10'
              }`}
            >
              <BookOpen className="w-5 h-5 shrink-0" />
              <span>O que é a Monilíase</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('favorites')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                currentRoute === 'favorites'
                  ? 'bg-white text-forest-deep shadow-sm'
                  : 'text-emerald-50/90 hover:bg-white/10'
              }`}
            >
              <span className="flex items-center gap-3">
                <Bookmark className="w-5 h-5 shrink-0" />
                <span>Favoritos</span>
              </span>
              {totalFavoritesCount > 0 && (
                <span
                  className={`px-2 py-0.5 text-xs rounded-full font-bold tabular-nums ${
                    currentRoute === 'favorites'
                      ? 'bg-forest-soft text-forest-deep'
                      : 'bg-white/20 text-white'
                  }`}
                >
                  {totalFavoritesCount}
                </span>
              )}
            </button>
          </div>

          <div className="pt-4 mt-4 border-t border-white/15 space-y-1.5">
            <button
              type="button"
              onClick={onOpenCalculator}
              className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-sm font-medium text-emerald-50/90 hover:bg-white/10 transition-colors"
            >
              <Calculator className="w-4 h-4 shrink-0" />
              <span>Calculadora Sanitária</span>
            </button>
            <button
              type="button"
              onClick={onOpenContacts}
              className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-sm font-medium text-emerald-50/90 hover:bg-white/10 transition-colors"
            >
              <PhoneCall className="w-4 h-4 shrink-0" />
              <span>Contatos Oficiais</span>
            </button>
          </div>
        </nav>

        <div className="p-4 border-t border-white/15 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={cycleFontScale}
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold transition-colors"
          >
            <span className="flex items-center gap-2">
              <Type className="w-4 h-4" />
              <span>Tamanho da Fonte</span>
            </span>
            <span className="px-2 py-0.5 rounded-md bg-white/15">{fontLabel}</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 md:pl-72 lg:pl-80 flex flex-col min-h-screen">
        <div className="flex-1 w-full max-w-4xl mx-auto pb-24 md:pb-10">
          {children}
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <nav
        aria-label="Navegação inferior"
        className="md:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-borderSoft shadow-nav z-40 safe-bottom"
      >
        <div className="grid grid-cols-5 items-center max-w-lg mx-auto px-1.5 py-1.5">
          {BOTTOM_TABS.map((tab) => {
            const active = currentRoute === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onNavigate(tab.id)}
                className="flex flex-col items-center justify-center py-1 px-0.5 rounded-xl transition-colors"
                aria-current={active ? 'page' : undefined}
              >
                <span
                  className={`flex items-center justify-center w-11 h-7 rounded-full transition-colors ${
                    active ? 'bg-forest-soft text-forest-primary' : 'text-slate-500'
                  }`}
                >
                  <NavTabIcon tab={tab.id} active={active} />
                </span>
                <span
                  className={`mt-0.5 text-[11px] leading-tight truncate max-w-full ${
                    active
                      ? 'font-bold text-forest-primary'
                      : 'font-medium text-slate-500'
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
