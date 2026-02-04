

import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Handshake, Globe, Building2, Landmark, ArrowRight, Network } from 'lucide-react';
import LazyImage from './LazyImage';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { Partner } from '../types';

interface PartnersViewProps {
  onBack: () => void;
}

const PartnersView: React.FC<PartnersViewProps> = ({ onBack }) => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [partners, setPartners] = useState<Partner[]>([]);
  const lastScrollY = useRef(0);

  useEffect(() => {
     const fetchPartners = async () => {
        try {
           const querySnapshot = await getDocs(collection(db, "partners"));
           const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Partner));
           setPartners(data);
        } catch (error) {
           console.error("Error fetching partners", error);
        }
     };
     fetchPartners();
  }, []);

  // Gestion du Smart Header (Cache au scroll bas, Affiche au scroll haut)
  useEffect(() => {
    const mainContent = document.getElementById('main-content');
    if (!mainContent) return;

    const handleScroll = () => {
      const currentScrollY = mainContent.scrollTop;
      const scrollDiff = currentScrollY - lastScrollY.current;

      // Seuil de 10px pour éviter les micro-tremblements
      if (Math.abs(scrollDiff) < 10) return;

      if (scrollDiff > 0 && currentScrollY > 60) {
        // Scroll vers le bas et pas tout en haut -> Cacher
        setIsHeaderVisible(false);
      } else {
        // Scroll vers le haut -> Afficher
        setIsHeaderVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    mainContent.addEventListener('scroll', handleScroll, { passive: true });
    return () => mainContent.removeEventListener('scroll', handleScroll);
  }, []);

  const getPartnerIcon = (type: string) => {
     switch(type) {
        case 'ONG': return <Globe size={24} />;
        case 'INSTITUTION': return <Landmark size={24} />;
        case 'UNIVERSITE': return <Building2 size={24} />;
        default: return <Handshake size={24} />;
     }
  };

  const getPartnerColor = (type: string) => {
     switch(type) {
        case 'ONG': return 'bg-brand-50 text-brand-600 border-brand-100';
        case 'INSTITUTION': return 'bg-blue-50 text-blue-600 border-blue-100';
        case 'UNIVERSITE': return 'bg-purple-50 text-purple-600 border-purple-100';
        default: return 'bg-gray-50 text-gray-600 border-gray-100';
     }
  };

  return (
    <div className="space-y-8 pb-24 animate-in fade-in slide-in-from-right duration-500 font-sans bg-gray-50 min-h-screen">
      
      {/* Smart Header */}
      <div 
        className={`bg-white/95 backdrop-blur-sm p-4 pt-safe-4 border-b border-gray-200 sticky top-0 z-30 shadow-sm transition-transform duration-300 ease-in-out will-change-transform ${isHeaderVisible ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <div className="flex items-center space-x-4">
            <button 
            onClick={onBack}
            className="p-2 bg-gray-50 rounded-full shadow-sm border border-gray-200 text-gray-600 hover:text-brand-600 transition-colors active:scale-95"
            >
            <ArrowLeft size={24} />
            </button>
            <div>
            <h1 className="text-xl font-bold text-gray-900 font-title leading-none">Nos Partenaires</h1>
            <p className="text-xs text-gray-500 mt-1">Coopération & Développement</p>
            </div>
        </div>
      </div>

      {/* --- SECTION 1: L'ÉCOSYSTÈME --- */}
      <div className="px-4">
         <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-50 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
            
            <div className="mb-6 flex justify-center relative z-10">
                <LazyImage 
                    src="https://services.zerofiltre.tech/images/our-team-illustration.svg" 
                    alt="Collaboration Partenaires" 
                    className="w-full max-w-xs h-auto object-contain drop-shadow-sm"
                    containerClassName="w-full max-w-xs"
                />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 font-title mb-4">Un Réseau Solide</h2>
            <p className="text-gray-600 text-sm leading-relaxed max-w-lg mx-auto mb-8">
                L'IUT de Tahoua ne fonctionne pas en vase clos. Nous avons tissé un réseau dense de collaborations stratégiques.
            </p>

            {/* List of Partners from DB */}
            {partners.length > 0 ? (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
                  {partners.map(partner => (
                     <div key={partner.id} className={`p-4 rounded-2xl border flex items-start ${getPartnerColor(partner.type)}`}>
                        <div className="bg-white p-2 rounded-xl mr-3 shadow-sm">
                           {getPartnerIcon(partner.type)}
                        </div>
                        <div>
                           <h3 className="font-bold text-sm">{partner.name}</h3>
                           <p className="text-xs mt-1 opacity-80 line-clamp-2">
                               {partner.description}
                           </p>
                           {partner.website && (
                              <a href={partner.website} target="_blank" rel="noreferrer" className="text-[10px] font-bold underline mt-2 block hover:opacity-75">Site Web</a>
                           )}
                        </div>
                     </div>
                  ))}
               </div>
            ) : (
               <div className="text-center text-gray-500 py-4">Chargement des partenaires...</div>
            )}
         </div>
      </div>

      {/* --- SECTION 2: APPEL A PARTENARIAT --- */}
      <div className="px-4">
         <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] left-[-20%] w-64 h-64 bg-brand-500/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[-20%] right-[-20%] w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2 text-center md:text-left">
                    <div className="inline-flex items-center px-3 py-1 bg-white/10 rounded-full text-brand-300 text-xs font-bold mb-4 border border-white/10">
                        <Network size={14} className="mr-2" /> Expansion Continue
                    </div>
                    <h2 className="text-2xl font-bold font-title mb-4">Construisons l'avenir ensemble</h2>
                    <p className="text-slate-300 text-sm leading-relaxed mb-6">
                        L'IUT de Tahoua est en recherche permanente de nouveaux partenaires. Entreprises, laboratoires, ou institutions : associez votre image à l'excellence académique.
                    </p>
                    
                    <button className="w-full md:w-auto px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-brand-900/50 flex items-center justify-center active:scale-95">
                        <Handshake size={20} className="mr-2" />
                        Devenir Partenaire
                        <ArrowRight size={16} className="ml-2 opacity-70" />
                    </button>
                </div>

                <div className="md:w-1/2 flex justify-center">
                    <div className="bg-white/5 backdrop-blur-sm p-4 rounded-3xl border border-white/10">
                        <LazyImage 
                            src="https://services.zerofiltre.tech/images/trades-illustration-2.svg" 
                            alt="Croissance et Partenariat" 
                            className="w-full max-w-xs h-auto object-contain"
                            containerClassName="w-full max-w-xs"
                        />
                    </div>
                </div>
            </div>
         </div>
      </div>

    </div>
  );
};

export default PartnersView;
