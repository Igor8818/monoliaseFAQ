import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { PREVENTION_DO_ITEMS } from '../data/prevention';
import type { FavoriteCategory, FontScaleMode } from '../types/guide';

interface FavoritesState {
  sintomas: string[];
  biosseguranca: string[];
  faq: string[];
}

interface PersistedState {
  hasSeenWelcome: boolean;
  fontScale: FontScaleMode;
  favorites: FavoritesState;
  checkedPreventionIds: string[];
}

const STORAGE_KEY = 'moniliase_alerta_state_v1';

const DEFAULT_STATE: PersistedState = {
  hasSeenWelcome: false,
  fontScale: 'normal',
  favorites: {
    sintomas: [],
    biosseguranca: [],
    faq: [],
  },
  checkedPreventionIds: [],
};

function loadInitialState(): PersistedState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw) as Partial<PersistedState>;
    return {
      hasSeenWelcome: Boolean(parsed.hasSeenWelcome),
      fontScale:
        parsed.fontScale === 'large' || parsed.fontScale === 'xlarge'
          ? parsed.fontScale
          : 'normal',
      favorites: {
        sintomas: Array.isArray(parsed.favorites?.sintomas) ? parsed.favorites.sintomas : [],
        biosseguranca: Array.isArray(parsed.favorites?.biosseguranca)
          ? parsed.favorites.biosseguranca
          : [],
        faq: Array.isArray(parsed.favorites?.faq) ? parsed.favorites.faq : [],
      },
      checkedPreventionIds: Array.isArray(parsed.checkedPreventionIds)
        ? parsed.checkedPreventionIds
        : [],
    };
  } catch {
    return DEFAULT_STATE;
  }
}

interface AppStateContextValue {
  hasSeenWelcome: boolean;
  markWelcomeSeen: () => void;
  fontScale: FontScaleMode;
  cycleFontScale: () => FontScaleMode;
  favorites: FavoritesState;
  totalFavoritesCount: number;
  isFavorite: (category: FavoriteCategory, id: string) => boolean;
  toggleFavorite: (category: FavoriteCategory, id: string) => void;
  checkedPreventionIds: string[];
  togglePreventionCheck: (id: string) => void;
  preventionProtectionPct: number;
  resetPreventionChecks: () => void;
}

const AppStateContext = createContext<AppStateContextValue | null>(null);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<PersistedState>(loadInitialState);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore quota errors in private browsing
    }
  }, [state]);

  useEffect(() => {
    document.documentElement.setAttribute('data-font-scale', state.fontScale);
  }, [state.fontScale]);

  const value = useMemo<AppStateContextValue>(() => {
    const totalFavoritesCount =
      state.favorites.sintomas.length +
      state.favorites.biosseguranca.length +
      state.favorites.faq.length;

    const preventionProtectionPct = Math.round(
      (state.checkedPreventionIds.length / PREVENTION_DO_ITEMS.length) * 100
    );

    return {
      hasSeenWelcome: state.hasSeenWelcome,
      markWelcomeSeen: () =>
        setState((prev) => ({ ...prev, hasSeenWelcome: true })),
      fontScale: state.fontScale,
      cycleFontScale: () => {
        const order: FontScaleMode[] = ['normal', 'large', 'xlarge'];
        const next = order[(order.indexOf(state.fontScale) + 1) % order.length];
        setState((prev) => ({ ...prev, fontScale: next }));
        return next;
      },
      favorites: state.favorites,
      totalFavoritesCount,
      isFavorite: (category, id) => state.favorites[category].includes(id),
      toggleFavorite: (category, id) =>
        setState((prev) => {
          const list = prev.favorites[category];
          const updated = list.includes(id)
            ? list.filter((item) => item !== id)
            : [...list, id];
          return {
            ...prev,
            favorites: {
              ...prev.favorites,
              [category]: updated,
            },
          };
        }),
      checkedPreventionIds: state.checkedPreventionIds,
      togglePreventionCheck: (id) =>
        setState((prev) => {
          const exists = prev.checkedPreventionIds.includes(id);
          return {
            ...prev,
            checkedPreventionIds: exists
              ? prev.checkedPreventionIds.filter((x) => x !== id)
              : [...prev.checkedPreventionIds, id],
          };
        }),
      preventionProtectionPct,
      resetPreventionChecks: () =>
        setState((prev) => ({ ...prev, checkedPreventionIds: [] })),
    };
  }, [state]);

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState(): AppStateContextValue {
  const ctx = useContext(AppStateContext);
  if (!ctx) {
    throw new Error('useAppState must be used inside AppStateProvider');
  }
  return ctx;
}
