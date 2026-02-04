
import React from 'react';
import { Target, ArrowRight, Building, Award, HelpCircle, Compass, Info, MessageSquareQuote, Briefcase, TrendingUp, Bell, Zap, Star, Search, UserCheck, Handshake } from 'lucide-react';
import LazyImage from './LazyImage';

interface HomeProps {
  onNavigate: (view: 'ASSISTANT' | 'FLOW' | 'DASHBOARD' | 'PRESENTATION' | 'MASTERY' | 'ABOUT' | 'TESTIMONIALS' | 'ADMINISTRATION' | 'SUCCESS_RATES' | 'NOTICE_BOARD' | 'QUALITY' | 'TEACHERS' | 'PARTNERS') => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  
  // Quick Actions Data
  const quickActions = [
    { label: "Assistant", icon: HelpCircle, action: () => onNavigate('ASSISTANT'), color: "bg-blue-100 text-blue-600" },
    { label: "Affichage", icon: Bell, action: () => onNavigate('NOTICE_BOARD'), color: "bg-red-100 text-red-600" },
    { label: "Services", icon: Briefcase, action: () => onNavigate('ADMINISTRATION'), color: "bg-teal-100 text-teal-600" },
    { label: "Parcours", icon: Target, action: () => onNavigate('FLOW'), color: "bg-purple-100 text-purple-600" },
  ];

  return (
    <div className="space-y-6 pb-24 font-sans touch-pan-y">
      
      {/* 1. HERO SECTION (Optimized for GPU) */}
      <div className="animate-in fade-in slide-in-from-top-4 duration-500 transform-gpu will-change-transform">
        <div className="bg-gradient-to-r from-brand-900 to-brand-700 rounded-3xl p-6 md:p-8 shadow-lg shadow-brand-900/20 text-white relative overflow-hidden">
           {/* Decor - Reduced complexity for scroll performance */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none translate-z-0"></div>
           <div className="absolute bottom-0 left-0 w-40 h-40 bg-accent-500/10 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none translate-z-0"></div>

           <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex-1">
                 <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-[10px] font-bold text-brand-100 mb-3 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-500 mr-2 animate-pulse"></span>
                    Année Académique 2025-2026
                 </div>
                 <h1 className="text-2xl md:text-3xl font-extrabold font-title mb-2 tracking-tight">
                    Bienvenue sur IUT-COMPASS
                 </h1>
                 <p className="text-brand-100 text-sm md:text-base max-w-lg leading-relaxed opacity-90">
                    Votre portail numérique unique pour orienter, informer et piloter votre réussite à l'Université de Tahoua.
                 </p>
                 
                 {/* Fake Search Bar for UX affordance */}
                 <div 
                    onClick={() => onNavigate('ASSISTANT')}
                    className="mt-6 flex items-center bg-white/10 border border-white/20 rounded-xl p-3 cursor-pointer hover:bg-white/20 transition-colors w-full max-w-sm backdrop-blur-sm group active:scale-[0.98] transform transition-transform"
                 >
                    <Search size={18} className="text-brand-200 mr-3 group-hover:text-white transition-colors" />
                    <span className="text-sm text-brand-200 group-hover:text-white transition-colors font-medium">Posez une question...</span>
                 </div>
              </div>

              <div className="w-full md:w-auto flex flex-col gap-3">
                 <button 
                    onClick={() => onNavigate('ASSISTANT')}
                    className="w-full md:w-auto bg-white text-brand-900 px-6 py-3.5 rounded-xl font-bold text-sm shadow-xl hover:shadow-2xl hover:bg-brand-50 transition-all flex items-center justify-center group active:scale-95 transform-gpu"
                 >
                    <Zap size={18} className="mr-2 text-amber-500 fill-amber-500" />
                    Assistant Intelligent
                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform opacity-50" />
                 </button>
              </div>
           </div>
        </div>
      </div>

      {/* 2. QUICK ACCESS BAR (Horizontal Scroll Optimized) */}
      <div className="animate-in fade-in slide-in-from-right-8 duration-500 delay-75 transform-gpu">
         <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-1">Accès Rapide</h3>
         <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar snap-x px-1 touch-pan-x">
            {quickActions.map((item, idx) => (
               <button 
                  key={idx}
                  onClick={item.action}
                  className="flex flex-col items-center gap-2 min-w-[72px] snap-start group"
               >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm border border-gray-50 group-active:scale-90 transition-transform duration-200 ${item.color}`}>
                     <item.icon size={24} />
                  </div>
                  <span className="text-xs font-medium text-gray-600 whitespace-nowrap">{item.label}</span>
               </button>
            ))}
         </div>
      </div>

      {/* 3. BENTO GRID NAVIGATION (Visual Hierarchy & GPU Layers) */}
      <div className="space-y-4">
         <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider px-1 animate-in fade-in delay-100">Explorer</h3>
         
         <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            
            {/* FEATURED: QUALITY (1/2 width on mobile) */}
            <div 
               onClick={() => onNavigate('QUALITY')}
               className="col-span-1 md:col-span-2 bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl p-4 md:p-6 text-white relative overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all active:scale-[0.98] animate-in zoom-in-95 duration-500 delay-100 transform-gpu min-h-[160px] md:min-h-[140px]"
            >
               <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-white/10 rounded-full -mr-8 -mt-8 md:-mr-10 md:-mt-10 blur-2xl translate-z-0"></div>
               <div className="relative z-10 flex flex-col h-full justify-between">
                  <div className="bg-white/20 w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20 mb-2">
                     <Star size={20} className="text-white fill-white" />
                  </div>
                  <div>
                     <h3 className="text-sm md:text-lg font-bold font-title mb-1 leading-tight">Qualité de l'Enseignement</h3>
                     <p className="text-orange-50 text-[10px] md:text-xs leading-relaxed opacity-90">
                        Rigueur, valeur et discipline.
                     </p>
                  </div>
               </div>
            </div>

            {/* FEATURED: TEACHERS (1/2 width on mobile) */}
            <div 
               onClick={() => onNavigate('TEACHERS')}
               className="col-span-1 md:col-span-2 bg-gradient-to-br from-brand-500 to-brand-700 rounded-3xl p-4 md:p-6 text-white relative overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all active:scale-[0.98] animate-in zoom-in-95 duration-500 delay-125 transform-gpu min-h-[160px] md:min-h-[140px]"
            >
               <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-white/10 rounded-full -mr-8 -mt-8 md:-mr-10 md:-mt-10 blur-2xl translate-z-0"></div>
               <div className="relative z-10 flex flex-col h-full justify-between">
                  <div className="bg-white/20 w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20 mb-2">
                     <UserCheck size={20} className="text-white" />
                  </div>
                  <div>
                     <h3 className="text-sm md:text-lg font-bold font-title mb-1 leading-tight">Nos Enseignants</h3>
                     <p className="text-brand-100 text-[10px] md:text-xs leading-relaxed opacity-90">
                        Rencontrez l'équipe pédagogique.
                     </p>
                  </div>
               </div>
            </div>

            {/* FEATURED: MASTERY (1/2 width on mobile - LEFT) */}
            <div 
               onClick={() => onNavigate('MASTERY')}
               className="col-span-1 md:col-span-2 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-4 md:p-6 text-white relative overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all active:scale-[0.98] animate-in zoom-in-95 duration-500 delay-150 transform-gpu min-h-[160px] md:min-h-[140px]"
            >
               <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-white/5 rounded-full -mr-8 -mt-8 md:-mr-10 md:-mt-10 blur-2xl translate-z-0"></div>
               <div className="relative z-10 flex flex-col h-full justify-between">
                  <div className="bg-white/10 w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/10 mb-2">
                     <Compass size={20} className="text-brand-300" />
                  </div>
                  <div>
                     <h3 className="text-sm md:text-lg font-bold font-title mb-1 leading-tight">Notre Identité</h3>
                     <p className="text-slate-300 text-[10px] md:text-xs leading-relaxed opacity-90">
                        Valeurs et vision.
                     </p>
                  </div>
               </div>
            </div>

            {/* FEATURED: PARTNERS (1/2 width on mobile - RIGHT - GREEN THEME) */}
            <div 
               onClick={() => onNavigate('PARTNERS')}
               className="col-span-1 md:col-span-2 bg-gradient-to-br from-emerald-600 to-green-700 rounded-3xl p-4 md:p-6 text-white relative overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all active:scale-[0.98] animate-in zoom-in-95 duration-500 delay-175 transform-gpu min-h-[160px] md:min-h-[140px]"
            >
               <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-white/10 rounded-full -mr-8 -mt-8 md:-mr-10 md:-mt-10 blur-2xl translate-z-0"></div>
               <div className="relative z-10 flex flex-col h-full justify-between">
                  <div className="bg-white/20 w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20 mb-2">
                     <Handshake size={20} className="text-white" />
                  </div>
                  <div>
                     <h3 className="text-sm md:text-lg font-bold font-title mb-1 leading-tight">Nos Partenaires</h3>
                     <p className="text-emerald-100 text-[10px] md:text-xs leading-relaxed opacity-90">
                        Réseau & Coopération.
                     </p>
                  </div>
               </div>
            </div>

            {/* CARD: SUCCESS RATES (Data) */}
            <div 
               onClick={() => onNavigate('SUCCESS_RATES')}
               className="col-span-1 bg-white p-4 rounded-3xl border border-gray-100 shadow-sm hover:border-emerald-200 hover:shadow-md transition-all active:scale-[0.98] cursor-pointer flex flex-col justify-between h-40 animate-in zoom-in-95 duration-500 delay-200 transform-gpu"
            >
               <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <TrendingUp size={20} />
               </div>
               <div>
                  <h3 className="font-bold text-gray-900 text-sm leading-tight mb-1">Taux de Réussite</h3>
                  <p className="text-[10px] text-gray-500">Statistiques 2024</p>
               </div>
            </div>

            {/* CARD: DASHBOARD (Admin) - UPDATED WITH LAZY IMAGE */}
            <div 
               onClick={() => onNavigate('DASHBOARD')}
               className="col-span-1 bg-white p-2 rounded-3xl border border-gray-100 shadow-sm hover:border-brand-200 hover:shadow-md transition-all active:scale-[0.98] cursor-pointer flex flex-col justify-between h-40 animate-in zoom-in-95 duration-500 delay-200 transform-gpu overflow-hidden"
            >
               <div className="w-full flex-1 flex items-center justify-center p-2 relative">
                  <LazyImage 
                    src="https://services.zerofiltre.tech/images/our-service-illustration-4.svg" 
                    alt="Espace Direction" 
                    className="w-full h-full object-contain"
                    containerClassName="w-full h-full"
                  />
               </div>
               <div className="px-2 pb-2">
                  <h3 className="font-bold text-gray-900 text-sm leading-tight mb-1">Espace Direction</h3>
                  <p className="text-[10px] text-gray-500">Pilotage & Admin</p>
               </div>
            </div>

            {/* WIDE CARD: TESTIMONIALS */}
            <div 
               onClick={() => onNavigate('TESTIMONIALS')}
               className="col-span-2 bg-gradient-to-r from-brand-50 to-white p-5 rounded-3xl border border-brand-100 hover:shadow-md transition-all active:scale-[0.99] cursor-pointer flex items-center justify-between animate-in slide-in-from-bottom-4 duration-500 delay-300 transform-gpu"
            >
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-brand-600 border border-brand-50 flex-shrink-0">
                     <MessageSquareQuote size={24} />
                  </div>
                  <div>
                     <h3 className="font-bold text-gray-900 text-base">Témoignages</h3>
                     <p className="text-xs text-gray-600">La parole aux Alumni</p>
                  </div>
               </div>
               <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <ArrowRight size={16} className="text-gray-400" />
               </div>
            </div>

            {/* CARD: PRESENTATION (IUT) */}
            <div 
               onClick={() => onNavigate('PRESENTATION')}
               className="col-span-1 bg-white p-4 rounded-3xl border border-gray-100 shadow-sm hover:border-orange-200 hover:shadow-md transition-all active:scale-[0.98] cursor-pointer flex flex-col justify-center items-center text-center gap-2 h-32 animate-in zoom-in-95 duration-500 delay-300 transform-gpu"
            >
               <Building size={24} className="text-orange-500" />
               <span className="font-bold text-xs text-gray-700">L'Institut</span>
            </div>

            {/* CARD: ABOUT */}
            <div 
               onClick={() => onNavigate('ABOUT')}
               className="col-span-1 bg-white p-4 rounded-3xl border border-gray-100 shadow-sm hover:border-indigo-200 hover:shadow-md transition-all active:scale-[0.98] cursor-pointer flex flex-col justify-center items-center text-center gap-2 h-32 animate-in zoom-in-95 duration-500 delay-300 transform-gpu"
            >
               <Info size={24} className="text-indigo-500" />
               <span className="font-bold text-xs text-gray-700">À Propos</span>
            </div>

         </div>
      </div>

    </div>
  );
};

export default Home;
