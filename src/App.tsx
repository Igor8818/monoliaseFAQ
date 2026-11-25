import { useCallback, useEffect, useState } from 'react';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { AppShell } from './components/layout/AppShell';
import { AppStateProvider, useAppState } from './context/AppStateContext';
import { AboutDiseaseScreen } from './screens/AboutDiseaseScreen';
import { HomeScreen } from './screens/HomeScreen';
import { RecognizeScreen } from './screens/RecognizeScreen';
import { WelcomeScreen } from './screens/WelcomeScreen';
import type { AppRoute, SearchResultItem } from './types/guide';

function parseHashRoute(): AppRoute | null {
  const raw = window.location.hash.replace(/^#\/?/, '').trim();
  const valid: AppRoute[] = [
    'welcome',
    'home',
    'recognize',
    'prevent',
    'biosecurity',
    'faq',
    'suspect',
    'about',
    'favorites',
  ];
  return valid.includes(raw as AppRoute) ? (raw as AppRoute) : null;
}

function AppContent() {
  const { hasSeenWelcome, markWelcomeSeen } = useAppState();

  const [route, setRoute] = useState<AppRoute>(() => {
    const hashRoute = parseHashRoute();
    if (hashRoute) return hashRoute;
    return hasSeenWelcome ? 'home' : 'welcome';
  });

  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedFaqId, setSelectedFaqId] = useState<string | undefined>(undefined);
  const [selectedSymptomId, setSelectedSymptomId] = useState<string | undefined>(undefined);
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const [contactsOpen, setContactsOpen] = useState(false);

  const navigate = useCallback(
    (nextRoute: AppRoute, options?: { faqId?: string; symptomId?: string }) => {
      if (options?.faqId) {
        setSelectedFaqId(options.faqId);
      } else if (nextRoute !== 'faq') {
        setSelectedFaqId(undefined);
      }

      if (options?.symptomId) {
        setSelectedSymptomId(options.symptomId);
      } else if (nextRoute !== 'recognize') {
        setSelectedSymptomId(undefined);
      }

      setRoute(nextRoute);
      window.location.hash = `#/${nextRoute}`;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    []
  );

  useEffect(() => {
    const onHashChange = () => {
      const next = parseHashRoute();
      if (next) setRoute(next);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const handleSearchSelect = (item: SearchResultItem) => {
    if (item.targetRoute === 'faq' && item.targetId) {
      navigate('faq', { faqId: item.targetId });
      return;
    }
    if (item.targetRoute === 'recognize' && item.targetId) {
      navigate('recognize', { symptomId: item.targetId });
      return;
    }
    navigate(item.targetRoute);
  };

  if (route === 'welcome') {
    return (
      <WelcomeScreen
        onStart={() => {
          markWelcomeSeen();
          navigate('home');
        }}
      />
    );
  }

  return (
    <>
      <AppShell
        currentRoute={route}
        onNavigate={(r) => navigate(r)}
        onOpenCalculator={() => setCalculatorOpen(true)}
        onOpenContacts={() => setContactsOpen(true)}
      >
        {route === 'home' && (
          <HomeScreen
            onNavigate={navigate}
            onOpenSearch={() => setSearchOpen(true)}
            onOpenCalculator={() => setCalculatorOpen(true)}
            onOpenContacts={() => setContactsOpen(true)}
          />
        )}

        {route === 'recognize' && (
          <RecognizeScreen
            onBack={() => navigate('home')}
            initialSymptomId={selectedSymptomId}
          />
        )}

        {route === 'about' && (
          <AboutDiseaseScreen
            onBack={() => navigate('home')}
            onGoToRecognize={() => navigate('recognize')}
          />
        )}

        {route !== 'home' && route !== 'recognize' && route !== 'about' && (
          <div className="p-6">
            <button
              type="button"
              onClick={() => navigate('home')}
              className="text-sm font-bold text-forest-primary mb-4"
            >
              ← Voltar ao Início
            </button>
            <div className="bg-white rounded-2xl border border-borderSoft p-6 shadow-card">
              <p className="font-bold text-slate-900">
                Rota em preparação: {route} {selectedFaqId ? `(${selectedFaqId})` : ''}
              </p>
            </div>
          </div>
        )}
      </AppShell>

      <GlobalSearchModal
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectResult={handleSearchSelect}
      />

      {(calculatorOpen || contactsOpen) && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full space-y-3">
            <p className="font-bold text-slate-900">
              {calculatorOpen ? 'Calculadora Sanitária' : 'Contatos Oficiais'}
            </p>
            <button
              type="button"
              onClick={() => {
                setCalculatorOpen(false);
                setContactsOpen(false);
              }}
              className="px-4 py-2 rounded-xl bg-forest-primary text-white text-sm font-semibold"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default function App() {
  return (
    <AppStateProvider>
      <AppContent />
    </AppStateProvider>
  );
}
