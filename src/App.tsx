import { useCallback, useEffect, useState } from 'react';
import { DilutionCalculatorModal } from './components/DilutionCalculatorModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { AppShell } from './components/layout/AppShell';
import { AppStateProvider, useAppState } from './context/AppStateContext';
import { AboutDiseaseScreen } from './screens/AboutDiseaseScreen';
import { BiosecurityScreen } from './screens/BiosecurityScreen';
import { FaqScreen } from './screens/FaqScreen';
import { FavoritesScreen } from './screens/FavoritesScreen';
import { HomeScreen } from './screens/HomeScreen';
import { PreventScreen } from './screens/PreventScreen';
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

        {route === 'prevent' && (
          <PreventScreen
            onBack={() => navigate('home')}
            onOpenCalculator={() => setCalculatorOpen(true)}
          />
        )}

        {route === 'biosecurity' && (
          <BiosecurityScreen
            onBack={() => navigate('home')}
            onOpenCalculator={() => setCalculatorOpen(true)}
          />
        )}

        {route === 'faq' && (
          <FaqScreen
            onBack={() => navigate('home')}
            initialOpenFaqId={selectedFaqId}
          />
        )}

        {route === 'favorites' && (
          <FavoritesScreen onBack={() => navigate('home')} onNavigate={navigate} />
        )}

        {route === 'about' && (
          <AboutDiseaseScreen
            onBack={() => navigate('home')}
            onGoToRecognize={() => navigate('recognize')}
          />
        )}

        {route === 'suspect' && (
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
                Wizard Fruto Suspeito (1/6–6/6) — próximo passo
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

      <DilutionCalculatorModal
        open={calculatorOpen}
        onClose={() => setCalculatorOpen(false)}
      />

      {contactsOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full space-y-3">
            <p className="font-bold text-slate-900">Contatos Oficiais (Etapa 6)</p>
            <button
              type="button"
              onClick={() => setContactsOpen(false)}
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
