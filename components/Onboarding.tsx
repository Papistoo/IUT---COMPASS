
import React from 'react';
import { ArrowRight, Compass, BookOpen, BarChart3, ShieldCheck } from 'lucide-react';

interface OnboardingProps {
  onStart: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onStart }) => {
  return (
    // Ajout de pt-[env(safe-area-inset-top)] pour respecter la barre d'état
    <div className="h-[100dvh] w-full bg-gradient-to-br from-brand-900 via-brand-800 to-brand-600 flex flex-col items-center justify-center p-6 text-white font-sans relative overflow-hidden pt-[calc(1.5rem+env(safe-area-inset-top))] pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-80 h-80 bg-accent-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl w-full z-10 flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-700 my-auto">
        
        {/* Logo / Badge */}
        <div className="mb-6 md:mb-8 p-4 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl shadow-brand-900/50">
          <Compass size={64} className="text-accent-500" strokeWidth={1.5} />
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-6xl font-extrabold tracking-tight font-title mb-4">
          IUT-COMPASS
        </h1>
        <p className="text-lg md:text-2xl text-brand-100 max-w-2xl font-light mb-8 md:mb-12 leading-relaxed">
          La plateforme numérique unifiée de l'Institut Universitaire de Technologie de Tahoua.
        </p>

        {/* Features Grid - Hidden on small screens if height is constrained, shown otherwise */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 w-full mb-8 md:mb-12 overflow-y-auto max-h-[30vh] md:max-h-none no-scrollbar">
          {/* Feature 1 */}
          <div className="bg-white/10 backdrop-blur-sm p-4 md:p-6 rounded-2xl border border-white/10 hover:bg-white/20 transition-all text-left group">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 rounded-xl flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform">
              <Compass className="text-brand-200" size={20} />
            </div>
            <h3 className="text-sm md:text-lg font-bold mb-1 md:mb-2">Orienter</h3>
            <p className="text-xs md:text-sm text-brand-100 leading-relaxed">
              Un guide interactif pour les étudiants.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white/10 backdrop-blur-sm p-4 md:p-6 rounded-2xl border border-white/10 hover:bg-white/20 transition-all text-left group">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 rounded-xl flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform">
              <BookOpen className="text-brand-200" size={20} />
            </div>
            <h3 className="text-sm md:text-lg font-bold mb-1 md:mb-2">Informer</h3>
            <p className="text-xs md:text-sm text-brand-100 leading-relaxed">
              Accès centralisé aux documents administratifs.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="col-span-2 md:col-span-1 bg-white/10 backdrop-blur-sm p-4 md:p-6 rounded-2xl border border-white/10 hover:bg-white/20 transition-all text-left group">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 rounded-xl flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform">
              <BarChart3 className="text-brand-200" size={20} />
            </div>
            <h3 className="text-sm md:text-lg font-bold mb-1 md:mb-2">Piloter</h3>
            <p className="text-xs md:text-sm text-brand-100 leading-relaxed">
              Tableau de bord de direction temps réel.
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <button 
          onClick={onStart}
          className="group relative px-8 py-4 bg-white text-brand-800 font-bold text-lg rounded-2xl shadow-xl shadow-brand-900/30 hover:shadow-2xl hover:scale-105 transition-all duration-100 active:scale-95 flex items-center overflow-hidden shrink-0"
        >
          <span className="relative z-10 flex items-center">
            Accéder à l'application
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
          </span>
          <div className="absolute inset-0 bg-brand-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>

        {/* Footer */}
        <div className="mt-8 md:mt-12 text-xs text-brand-300 flex items-center gap-2 shrink-0">
          <ShieldCheck size={14} />
          <span>Application Officielle • Université de Tahoua</span>
        </div>

      </div>
    </div>
  );
};

export default Onboarding;
