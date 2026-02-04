
import React, { useEffect, useRef } from 'react';
import { Home as HomeIcon, MessageSquare, GitMerge, BarChart2, Building, Search, X } from 'lucide-react';
import { ViewState } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeView: ViewState;
  onNavigate: (view: ViewState) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, onNavigate, searchQuery, onSearchChange }) => {
  const mainContentRef = useRef<HTMLDivElement>(null);

  // Scroll to top whenever the active view changes
  useEffect(() => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeView]);

  const showSearchBar = ['ASSISTANT', 'PRESENTATION', 'STUDENT_LIFE', 'NOTICE_BOARD'].includes(activeView);

  return (
    <div className="flex flex-col h-[100dvh] w-full bg-gray-50 overflow-hidden shadow-2xl md:shadow-none md:flex-row">
      
      {/* Desktop Sidebar (Visible on md+) - Safe Area Left added for landscape modes */}
      <aside className="hidden md:flex flex-col w-64 bg-brand-900 text-white flex-shrink-0 pl-safe">
        <div className="p-6 border-b border-brand-800 pt-safe-4">
          <h1 className="text-2xl font-bold tracking-tight">IUT-COMPASS</h1>
          <p className="text-brand-300 text-xs mt-1">Orienter • Informer • Piloter</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
           <button onClick={() => onNavigate('HOME')} className={`w-full flex items-center p-3 rounded-lg transition-colors ${activeView === 'HOME' ? 'bg-brand-700 text-white' : 'text-brand-200 hover:bg-brand-800'}`}>
              <HomeIcon size={20} className="mr-3" /> Accueil
           </button>
           <button onClick={() => onNavigate('PRESENTATION')} className={`w-full flex items-center p-3 rounded-lg transition-colors ${activeView === 'PRESENTATION' ? 'bg-brand-700 text-white' : 'text-brand-200 hover:bg-brand-800'}`}>
              <Building size={20} className="mr-3" /> IUT & Services
           </button>
           <button onClick={() => onNavigate('ASSISTANT')} className={`w-full flex items-center p-3 rounded-lg transition-colors ${activeView === 'ASSISTANT' ? 'bg-brand-700 text-white' : 'text-brand-200 hover:bg-brand-800'}`}>
              <MessageSquare size={20} className="mr-3" /> Assistant
           </button>
           <button onClick={() => onNavigate('FLOW')} className={`w-full flex items-center p-3 rounded-lg transition-colors ${activeView === 'FLOW' ? 'bg-brand-700 text-white' : 'text-brand-200 hover:bg-brand-800'}`}>
              <GitMerge size={20} className="mr-3" /> Flux & Parcours
           </button>
           <button onClick={() => onNavigate('DASHBOARD')} className={`w-full flex items-center p-3 rounded-lg transition-colors ${activeView === 'DASHBOARD' ? 'bg-brand-700 text-white' : 'text-brand-200 hover:bg-brand-800'}`}>
              <BarChart2 size={20} className="mr-3" /> Pilotage
           </button>
        </nav>
        <div className="p-4 bg-brand-950 text-xs text-brand-400 text-center pb-safe-4">
          © 2026 IUT Tahoua
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative w-full">
        {/* Mobile Header - With explicit Safe Area Top Padding and background to prevent overlap */}
        <header className="md:hidden bg-white border-b border-gray-200 sticky top-0 z-30 pt-[env(safe-area-inset-top)] shadow-sm">
          <div className="p-4 flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center overflow-hidden border border-gray-100 shadow-sm">
                  <img src="https://udh.edu.ne/public/img/university/uploads/domains/1721405330.jpg" alt="Logo IUT" className="w-full h-full object-cover" />
               </div>
               <h1 className="text-lg font-bold text-brand-900">IUT-COMPASS</h1>
            </div>

            {/* SEARCH ICON - GLOBAL SHORTCUT */}
            <button 
               onClick={() => onNavigate('ASSISTANT')}
               className="p-2.5 bg-gray-50 text-gray-500 rounded-full hover:bg-brand-50 hover:text-brand-600 transition-all active:scale-95 border border-transparent hover:border-brand-100"
               aria-label="Recherche globale"
            >
               <Search size={20} />
            </button>
          </div>
        </header>

        {/* Global Search Bar (Conditional) */}
        {showSearchBar && (
           <div className="bg-white/90 backdrop-blur-md border-b border-gray-200 p-4 sticky top-0 md:static z-20 animate-in slide-in-from-top-2 duration-200">
              <div className="max-w-4xl mx-auto relative">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                 <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Filtrer le contenu de la page..."
                    className="w-full pl-10 pr-10 py-2.5 bg-gray-100 border border-transparent focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-100 rounded-xl outline-none text-sm font-medium transition-all"
                 />
                 {searchQuery && (
                    <button 
                       onClick={() => onSearchChange('')}
                       className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                       <X size={16} />
                    </button>
                 )}
              </div>
           </div>
        )}

        {/* Scrollable Content - Added pl-safe and pr-safe for landscape on notch phones */}
        <div 
          id="main-content"
          ref={mainContentRef}
          className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-8 scroll-smooth pl-safe pr-safe"
        >
          <div className="max-w-4xl mx-auto h-full pb-24 md:pb-0">
            {children}
          </div>
        </div>

        {/* Mobile Bottom Navigation - With Safe Area Bottom Padding */}
        <nav className="md:hidden bg-white/95 backdrop-blur-lg border-t border-gray-200 flex justify-around p-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] sticky bottom-0 z-30 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] w-full">
           <button onClick={() => onNavigate('HOME')} className={`flex flex-col items-center p-2 rounded-lg flex-1 ${activeView === 'HOME' ? 'text-brand-600' : 'text-gray-400'}`}>
              <HomeIcon size={24} />
              <span className="text-[10px] mt-1 font-medium">Accueil</span>
           </button>
           <button onClick={() => onNavigate('PRESENTATION')} className={`flex flex-col items-center p-2 rounded-lg flex-1 ${activeView === 'PRESENTATION' ? 'text-brand-600' : 'text-gray-400'}`}>
              <Building size={24} />
              <span className="text-[10px] mt-1 font-medium">IUT</span>
           </button>
           <button onClick={() => onNavigate('ASSISTANT')} className={`flex flex-col items-center p-2 rounded-lg flex-1 ${activeView === 'ASSISTANT' ? 'text-brand-600' : 'text-gray-400'}`}>
              <MessageSquare size={24} />
              <span className="text-[10px] mt-1 font-medium">Aide</span>
           </button>
           <button onClick={() => onNavigate('FLOW')} className={`flex flex-col items-center p-2 rounded-lg flex-1 ${activeView === 'FLOW' ? 'text-brand-600' : 'text-gray-400'}`}>
              <GitMerge size={24} />
              <span className="text-[10px] mt-1 font-medium">Flux</span>
           </button>
           <button onClick={() => onNavigate('DASHBOARD')} className={`flex flex-col items-center p-2 rounded-lg flex-1 ${activeView === 'DASHBOARD' ? 'text-brand-600' : 'text-gray-400'}`}>
              <BarChart2 size={24} />
              <span className="text-[10px] mt-1 font-medium">Pilotage</span>
           </button>
        </nav>
      </main>
    </div>
  );
};

export default Layout;
