import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone, Share, PlusSquare } from 'lucide-react';

const InstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Détection iOS
    const isIosDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(isIosDevice);

    // Détection si déjà installé (Standalone mode)
    const isInStandaloneMode = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;
    setIsStandalone(isInStandaloneMode);

    // Écouteur pour Android/Desktop (Chrome, Edge, etc.)
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      if (!isInStandaloneMode) {
        setIsVisible(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Afficher l'invite iOS si non installé
    if (isIosDevice && !isInStandaloneMode) {
       setTimeout(() => setIsVisible(true), 3000); 
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      setIsVisible(false);
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    }
    setDeferredPrompt(null);
    setIsVisible(false);
  };

  if (!isVisible || isStandalone) return null;

  return (
    // Utilisation de padding-bottom safe area pour remonter au-dessus de la barre home
    <div className="fixed bottom-[calc(5rem+env(safe-area-inset-bottom,20px))] md:bottom-4 left-4 right-4 z-[60] animate-in slide-in-from-bottom-10 duration-500">
      <div className="bg-brand-900 text-white p-5 rounded-2xl shadow-2xl border border-brand-700 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
         <div className="flex items-center gap-3 w-full">
            <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm flex-shrink-0">
               <Smartphone size={28} className="text-brand-200" />
            </div>
            <div className="flex-1">
               <p className="font-bold text-base">Installer l'Application</p>
               <p className="text-xs text-brand-200 mt-1">
                 {isIOS 
                   ? "Ajoutez à l'écran d'accueil pour une meilleure expérience." 
                   : "Installez IUT-COMPASS pour un accès hors-ligne rapide."}
               </p>
            </div>
            <button 
               onClick={() => setIsVisible(false)}
               className="p-2 text-brand-300 hover:text-white transition-colors self-start md:self-center"
            >
               <X size={20} />
            </button>
         </div>

         {/* Instructions spécifiques iOS */}
         {isIOS ? (
            <div className="w-full bg-brand-800/50 p-3 rounded-xl text-xs border border-brand-700">
               <div className="flex items-center gap-2 mb-2">
                  1. Appuyez sur <Share size={16} /> dans votre navigateur
               </div>
               <div className="flex items-center gap-2">
                  2. Sélectionnez <span className="font-bold inline-flex items-center gap-1"><PlusSquare size={14}/> Sur l'écran d'accueil</span>
               </div>
            </div>
         ) : (
            <button 
               onClick={handleInstallClick}
               className="w-full md:w-auto bg-white text-brand-900 px-6 py-3 rounded-xl text-sm font-bold hover:bg-brand-50 transition-colors flex items-center justify-center shadow-lg active:scale-95"
            >
               <Download size={18} className="mr-2" />
               Installer maintenant
            </button>
         )}
      </div>
    </div>
  );
};

export default InstallPrompt;