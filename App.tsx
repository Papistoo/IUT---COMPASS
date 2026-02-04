
import React, { useState, useEffect, Suspense, lazy } from 'react';
import Layout from './components/Layout';
import InstallPrompt from './components/InstallPrompt';
import { ViewState } from './types';
import { RefreshCw, WifiOff } from 'lucide-react';

// --- LAZY LOADING OPTIMIZATION ---
// Chargement à la demande des composants pour un démarrage ultra-rapide
const Home = lazy(() => import('./components/Home'));
const Assistant = lazy(() => import('./components/Assistant'));
const Flowchart = lazy(() => import('./components/Flowchart'));
const Dashboard = lazy(() => import('./components/Dashboard'));
const Presentation = lazy(() => import('./components/Presentation'));
const StudentLife = lazy(() => import('./components/StudentLife'));
const NoticeBoard = lazy(() => import('./components/NoticeBoard'));
const MasteryView = lazy(() => import('./components/MasteryView'));
const Onboarding = lazy(() => import('./components/Onboarding'));
const AppWalkthrough = lazy(() => import('./components/AppWalkthrough'));
const About = lazy(() => import('./components/About'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const Administration = lazy(() => import('./components/Administration'));
const SuccessRates = lazy(() => import('./components/SuccessRates'));
const QualityView = lazy(() => import('./components/QualityView'));
const TeachersView = lazy(() => import('./components/TeachersView'));
const PartnersView = lazy(() => import('./components/PartnersView'));

// Composant de chargement intelligent avec Timeout de 8s
const PageLoader = () => {
  const [showTimeout, setShowTimeout] = useState(false);

  useEffect(() => {
    // Si le composant charge pendant plus de 8 secondes, on affiche l'erreur
    const timer = setTimeout(() => {
      setShowTimeout(true);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  const handleRetry = () => {
    window.location.reload();
  };

  if (showTimeout) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] w-full animate-in fade-in duration-300 px-6 text-center">
        <div className="w-20 h-20 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mb-6 shadow-sm border border-orange-100">
           <WifiOff size={32} />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2 font-title">Le chargement prend du temps</h3>
        <p className="text-sm text-gray-500 mb-8 max-w-xs mx-auto leading-relaxed">
           Votre connexion semble lente ou instable. Si le contenu ne s'affiche pas, veuillez réessayer.
        </p>
        <button
          onClick={handleRetry}
          className="flex items-center px-8 py-3.5 bg-brand-600 text-white rounded-xl font-bold shadow-xl shadow-brand-200 hover:bg-brand-700 transition-all active:scale-95"
        >
          <RefreshCw size={18} className="mr-2" />
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-[50vh] w-full animate-in fade-in duration-200">
      <RefreshCw className="animate-spin text-brand-500 mb-2" size={32} />
      <p className="text-gray-400 text-xs font-medium">Chargement...</p>
    </div>
  );
};

const App: React.FC = () => {
  // --- 1. STATE INITIALIZATION WITH URL CHECK ---
  const getInitialView = (): ViewState => {
    const params = new URLSearchParams(window.location.search);
    const viewParam = params.get('view') as ViewState;
    const validViews: ViewState[] = [
      'HOME', 'ASSISTANT', 'FLOW', 'DASHBOARD', 'PRESENTATION', 
      'STUDENT_LIFE', 'NOTICE_BOARD', 'MASTERY', 'ABOUT', 
      'TESTIMONIALS', 'ADMINISTRATION', 'SUCCESS_RATES', 'QUALITY', 'TEACHERS', 'PARTNERS'
    ];
    
    if (viewParam && validViews.includes(viewParam)) {
      return viewParam;
    }
    return 'WALKTHROUGH';
  };

  const [currentView, setCurrentView] = useState<ViewState>(getInitialView);
  
  const getInitialFlowId = (): string | null => {
    const params = new URLSearchParams(window.location.search);
    return params.get('flowId');
  };
  
  const [targetFlowId, setTargetFlowId] = useState<string | null>(getInitialFlowId);
  const [globalSearch, setGlobalSearch] = useState('');

  // --- 2. BROWSER HISTORY MANAGEMENT ---
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const params = new URLSearchParams(window.location.search);
      const view = params.get('view') as ViewState;
      const flowId = params.get('flowId');

      if (view) {
        setCurrentView(view);
        setTargetFlowId(flowId || null);
      } else {
        const isAppInitialized = currentView !== 'WALKTHROUGH' && currentView !== 'LANDING';
        if (isAppInitialized) {
           setCurrentView('HOME');
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [currentView]);

  const updateHistory = (view: ViewState, flowId?: string | null) => {
    const url = new URL(window.location.href);
    url.searchParams.set('view', view);
    
    if (flowId) {
      url.searchParams.set('flowId', flowId);
    } else {
      url.searchParams.delete('flowId');
    }

    window.history.pushState({ view, flowId }, '', url.toString());
  };

  // --- 3. NAVIGATION HANDLERS ---
  const handleViewChange = (view: ViewState) => {
    setGlobalSearch('');
    // Optimisation : startTransition pourrait être utilisé ici si React 18+ complet
    setCurrentView(view);
    setTargetFlowId(null);
    updateHistory(view, null);
  };

  const handleNavigateToFlow = (flowId: string) => {
    setTargetFlowId(flowId);
    setCurrentView('FLOW');
    updateHistory('FLOW', flowId);
  };

  const handleWalkthroughComplete = () => {
    setCurrentView('LANDING');
  };

  const handleStartApp = () => {
    setCurrentView('HOME');
    const url = new URL(window.location.href);
    url.searchParams.set('view', 'HOME');
    window.history.replaceState({ view: 'HOME' }, '', url.toString());
  };

  // 1. Walkthrough
  if (currentView === 'WALKTHROUGH') {
     return (
        <Suspense fallback={<PageLoader />}>
           <AppWalkthrough onComplete={handleWalkthroughComplete} />
        </Suspense>
     );
  }

  // 2. Landing
  if (currentView === 'LANDING') {
    return (
      <Suspense fallback={<PageLoader />}>
        <Onboarding onStart={handleStartApp} />
        <InstallPrompt />
      </Suspense>
    );
  }

  // 3. Main Application
  const renderContent = () => {
    // Utilisation de switch pour un rendu conditionnel propre
    switch (currentView) {
      case 'HOME': return <Home onNavigate={handleViewChange} />;
      case 'PRESENTATION': return <Presentation onNavigate={handleViewChange} searchQuery={globalSearch} />;
      case 'STUDENT_LIFE': return <StudentLife onBack={() => handleViewChange('PRESENTATION')} searchQuery={globalSearch} />;
      case 'NOTICE_BOARD': return <NoticeBoard onBack={() => handleViewChange('PRESENTATION')} searchQuery={globalSearch} />;
      case 'MASTERY': return <MasteryView onBack={() => handleViewChange('HOME')} />;
      case 'ASSISTANT': return <Assistant onNavigateToFlow={handleNavigateToFlow} searchQuery={globalSearch} />;
      case 'FLOW': return <Flowchart initialFlowId={targetFlowId} />;
      case 'DASHBOARD': return <Dashboard />;
      case 'ABOUT': return <About onBack={() => handleViewChange('HOME')} />;
      case 'TESTIMONIALS': return <Testimonials onBack={() => handleViewChange('HOME')} />;
      case 'ADMINISTRATION': return <Administration onBack={() => handleViewChange('HOME')} />;
      case 'SUCCESS_RATES': return <SuccessRates onBack={() => handleViewChange('HOME')} />;
      case 'QUALITY': return <QualityView onBack={() => handleViewChange('HOME')} />;
      case 'TEACHERS': return <TeachersView onBack={() => handleViewChange('HOME')} />;
      case 'PARTNERS': return <PartnersView onBack={() => handleViewChange('HOME')} />;
      default: return <Home onNavigate={handleViewChange} />;
    }
  };

  return (
    <Layout 
      activeView={currentView} 
      onNavigate={handleViewChange}
      searchQuery={globalSearch}
      onSearchChange={setGlobalSearch}
    >
      {/* Suspense Boundary pour gérer le chargement asynchrone des pages */}
      <Suspense fallback={<PageLoader />}>
        {renderContent()}
      </Suspense>
      
      <InstallPrompt />
    </Layout>
  );
};

export default App;
