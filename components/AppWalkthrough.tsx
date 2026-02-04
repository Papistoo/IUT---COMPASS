
import React, { useState, useEffect, TouchEvent } from 'react';
import { ArrowRight, ChevronRight, Check, ArrowLeft, School, Bot, GitMerge, Heart, Bell } from 'lucide-react';

interface AppWalkthroughProps {
  onComplete: () => void;
}

// Configuration des slides
const SLIDES = [
  {
    id: 1,
    title: "Bienvenue à l'IUT",
    description: "Votre compagnon numérique tout-en-un pour réussir vos études et votre vie sur le campus.",
    icon: <School size={120} strokeWidth={1} />,
    color: "text-teal-600",
    bg: "bg-teal-50",
    blob: "bg-teal-200"
  },
  {
    id: 2,
    title: "Assistant Intelligent",
    description: "Une question sur les inscriptions ou les examens ? L'assistant répond instantanément à vos besoins 24/7.",
    icon: <Bot size={120} strokeWidth={1} />,
    color: "text-blue-600",
    bg: "bg-blue-50",
    blob: "bg-blue-200"
  },
  {
    id: 3,
    title: "Flux & Parcours",
    description: "Plus de confusion. Visualisez clairement les démarches administratives complexes étape par étape.",
    icon: <GitMerge size={120} strokeWidth={1} />,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    blob: "bg-indigo-200"
  },
  {
    id: 4,
    title: "Vie Étudiante",
    description: "Art oratoire, sports, clubs et culture. Épanouissez-vous au-delà des cours.",
    icon: <Heart size={120} strokeWidth={1} />,
    color: "text-purple-600",
    bg: "bg-purple-50",
    blob: "bg-purple-200"
  },
  {
    id: 5,
    title: "Toujours Informé",
    description: "Accédez au tableau d'affichage numérique pour les notes de service et résultats officiels en temps réel.",
    icon: <Bell size={120} strokeWidth={1} />,
    color: "text-orange-600",
    bg: "bg-orange-50",
    blob: "bg-orange-200"
  }
];

const AppWalkthrough: React.FC<AppWalkthroughProps> = ({ onComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Keyboard Navigation Support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  // Touch / Swipe Logic
  const minSwipeDistance = 50;
  
  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) handleNext();
    if (isRightSwipe) handlePrev();
  };

  const handleNext = () => {
    if (currentSlide < SLIDES.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      finish();
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  const finish = () => {
    setIsExiting(true);
    // Délai réduit à 0ms pour une réactivité instantanée comme demandé
    setTimeout(() => {
      onComplete();
    }, 0); 
  };

  const activeSlide = SLIDES[currentSlide];

  return (
    <div 
      className={`fixed inset-0 z-50 bg-white flex flex-col transition-opacity duration-300 h-[100dvh] w-full pt-[env(safe-area-inset-top)] ${isExiting ? 'opacity-0' : 'opacity-100'}`}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      
      {/* Top Bar: Progress & Skip - With Explicit Safe Area Padding */}
      <div className="flex justify-between items-center p-6 md:p-8 w-full relative z-20">
        <div className="flex space-x-1.5">
           {SLIDES.map((_, idx) => (
             <div 
               key={idx} 
               className={`h-1.5 rounded-full transition-all duration-300 ease-out ${idx === currentSlide ? 'w-8 bg-brand-600' : 'w-2 bg-gray-200'}`}
             ></div>
           ))}
        </div>
        <button 
          onClick={finish} 
          className="px-4 py-2 text-sm font-bold text-gray-400 hover:text-brand-600 hover:bg-gray-50 rounded-full transition-all active:scale-95"
        >
          Passer
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
        
        {/* Animated Background Blob */}
        <div 
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] md:w-[400px] md:h-[400px] rounded-full blur-3xl opacity-40 transition-colors duration-500 ${activeSlide.blob}`}
        ></div>

        {/* Slide Content */}
        <div className="relative z-10 max-w-md w-full flex flex-col items-center">
           
           {/* Icon Container */}
           <div 
             key={`icon-${currentSlide}`} 
             className={`mb-8 md:mb-12 w-48 h-48 md:w-64 md:h-64 rounded-full ${activeSlide.bg} flex items-center justify-center shadow-lg animate-in zoom-in-50 duration-300`}
           >
             <div className={`${activeSlide.color} animate-bounce-slow drop-shadow-sm`}>
               {activeSlide.icon}
             </div>
           </div>

           {/* Text Content */}
           <div key={`text-${currentSlide}`} className="animate-in slide-in-from-bottom-8 fade-in duration-300">
             <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 font-title leading-tight tracking-tight">
               {activeSlide.title}
             </h2>
             <p className="text-gray-500 text-lg md:text-xl leading-relaxed px-4">
               {activeSlide.description}
             </p>
           </div>
        </div>

      </div>

      {/* Bottom Action Area - With Safe Area Bottom Padding */}
      <div className="p-8 pb-[calc(2rem+env(safe-area-inset-bottom))] md:pb-12 flex flex-col items-center gap-4 bg-white/80 backdrop-blur-sm">
        
        <div className="flex w-full max-w-sm gap-4">
            {/* Back Button */}
            <button
                onClick={handlePrev}
                disabled={currentSlide === 0}
                className={`w-14 h-14 flex items-center justify-center rounded-2xl border-2 border-gray-100 text-gray-400 hover:border-brand-200 hover:text-brand-600 hover:bg-brand-50 transition-all duration-200 active:scale-95 ${currentSlide === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                aria-label="Précédent"
            >
                <ArrowLeft size={24} />
            </button>

            {/* Next / Finish Button */}
            <button
            onClick={handleNext}
            className="group flex-1 relative bg-brand-900 text-white font-bold text-lg h-14 rounded-2xl shadow-xl shadow-brand-900/20 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 overflow-hidden"
            >
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <div className="relative flex items-center justify-center">
                {currentSlide === SLIDES.length - 1 ? (
                    <>C'est parti ! <Check className="ml-2" /></>
                ) : (
                    <>Suivant <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" /></>
                )}
            </div>
            </button>
        </div>
        
        <p className="text-xs text-gray-300 md:hidden">Glissez pour naviguer</p>
      </div>

    </div>
  );
};

export default AppWalkthrough;
