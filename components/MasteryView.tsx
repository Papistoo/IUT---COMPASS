import React, { useState } from 'react';
import { ArrowLeft, Globe, Briefcase, Lightbulb, Megaphone, Plus, X } from 'lucide-react';

interface MasteryViewProps {
  onBack: () => void;
}

// Configuration des 4 pôles
const NODES = [
  {
    id: 'OUVERTURE',
    positionClass: 'md:right-[10%] md:top-1/2 md:-translate-y-1/2 top-[50%] right-[2%] -translate-y-1/2', 
    lineEndpoint: { x1: '50%', y1: '50%', x2: '90%', y2: '50%' }, 
    icon: <Globe size={32} className="text-blue-500" />,
    colorTheme: 'blue',
    title: "OUVERTURE",
    badge: "International",
    content: (
      <>
        <h4 className="font-bold text-blue-900 mb-2 font-title">Une vision sans frontières</h4>
        <p className="text-xs text-slate-600 leading-relaxed font-medium">
            L'IUT cultive des partenariats stratégiques avec des universités et entreprises internationales. Nous accueillons tous les bacheliers pour offrir une chance égale de réussite.
        </p>
      </>
    )
  },
  {
    id: 'PROFESSIONNALISME',
    positionClass: 'md:top-[10%] md:left-1/2 md:-translate-x-1/2 top-[12%] left-1/2 -translate-x-1/2', 
    lineEndpoint: { x1: '50%', y1: '50%', x2: '50%', y2: '12%' },
    icon: <Briefcase size={32} className="text-emerald-500" />,
    colorTheme: 'emerald',
    title: "PROFESSIONNALISME",
    badge: "Expertise",
    content: (
      <>
        <h4 className="font-bold text-emerald-900 mb-2 font-title">L'Excellence Pratique</h4>
        <p className="text-xs text-slate-600 leading-relaxed font-medium">
            Alternance théorie-pratique, stages obligatoires et interventions d'experts font de nos diplômés des cadres opérationnels immédiatement.
        </p>
        <p className="text-[10px] text-gray-400 mt-2 font-bold uppercase border-t pt-1 border-gray-100">Insertion Pro : 95%</p>
      </>
    )
  },
  {
    id: 'INNOVATION',
    positionClass: 'md:left-[10%] md:top-1/2 md:-translate-y-1/2 top-[50%] left-[2%] -translate-y-1/2', 
    lineEndpoint: { x1: '50%', y1: '50%', x2: '10%', y2: '50%' },
    icon: <Lightbulb size={32} className="text-amber-500" />,
    colorTheme: 'amber',
    title: "INNOVATION",
    badge: "Créativité",
    content: (
      <>
         <h4 className="font-bold text-amber-900 mb-2 font-title">Créer le Futur</h4>
         <p className="text-xs text-slate-600 leading-relaxed font-medium">
            À travers le CONCIT et nos laboratoires, nous encourageons l'esprit entrepreneurial. Nos étudiants inventent les solutions technologiques de demain.
         </p>
      </>
    )
  },
  {
    id: 'SLOGAN',
    positionClass: 'md:bottom-[10%] md:left-1/2 md:-translate-x-1/2 bottom-[12%] left-1/2 -translate-x-1/2', 
    lineEndpoint: { x1: '50%', y1: '50%', x2: '50%', y2: '88%' },
    icon: <Megaphone size={32} className="text-brand-500" />,
    colorTheme: 'brand',
    title: "NOTRE DEVISE",
    badge: "Identité",
    content: (
      <div className="text-center">
         <div className="mb-2 text-4xl">🎓</div>
         <h4 className="font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-700 to-brand-500 text-lg leading-tight font-title italic">
            « La maîtrise d’un métier ! »
         </h4>
      </div>
    )
  }
];

const MasteryView: React.FC<MasteryViewProps> = ({ onBack }) => {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const getColors = (theme: string) => {
    const maps: Record<string, any> = {
      blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', btn: 'bg-blue-600', shadow: 'shadow-blue-200' },
      emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', btn: 'bg-emerald-600', shadow: 'shadow-emerald-200' },
      amber: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', btn: 'bg-amber-600', shadow: 'shadow-amber-200' },
      brand: { bg: 'bg-brand-50', border: 'border-brand-200', text: 'text-brand-700', btn: 'bg-brand-600', shadow: 'shadow-brand-200' },
    };
    return maps[theme] || maps['brand'];
  };

  return (
    <div className="min-h-[100dvh] bg-slate-50 flex flex-col relative overflow-hidden font-sans">
      
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-slate-50 to-slate-200"></div>
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] border border-brand-100/50 rounded-full"></div>
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] md:w-[700px] md:h-[700px] border border-brand-100/30 rounded-full"></div>
      </div>

      {/* Header - With Safe Area Top Padding */}
      <div className="relative z-50 p-6 pt-safe-4 flex justify-between items-center">
        <button 
          onClick={onBack}
          className="flex items-center text-gray-600 font-bold hover:text-brand-700 bg-white/90 backdrop-blur px-5 py-2.5 rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100"
        >
          <ArrowLeft size={20} className="mr-2" /> Retour
        </button>
        <div className="flex flex-col items-end">
           <h1 className="text-lg md:text-xl font-extrabold text-slate-800 font-title tracking-tight text-right">IDENTITÉ & VALEURS</h1>
           <span className="text-[10px] text-brand-600 font-bold uppercase tracking-widest">IUT de Tahoua</span>
        </div>
      </div>

      {/* Main Interactive Area */}
      <div className="flex-1 relative w-full h-full min-h-[600px] pb-safe-4">
         
         {/* --- FLUX (SVG LINES) --- */}
         <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
            <defs>
               <linearGradient id="fluxGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.1" />
                  <stop offset="50%" stopColor="#0ea5e9" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.1" />
               </linearGradient>
            </defs>
            {NODES.map((node) => (
               <line 
                  key={`line-${node.id}`}
                  x1="50%" 
                  y1="50%" 
                  x2={node.lineEndpoint.x2} 
                  y2={node.lineEndpoint.y2} 
                  stroke="url(#fluxGradient)" 
                  strokeWidth={activeCardId === node.id ? "4" : "2"} 
                  strokeDasharray="8,4" 
                  className={`transition-all duration-500 ${activeCardId === node.id ? 'opacity-100' : 'opacity-60 animate-[dash_20s_linear_infinite]'}`}
               />
            ))}
         </svg>

         {/* --- CENTER: REAL IUT LOGO --- */}
         <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 group cursor-default">
            <div className="relative w-32 h-32 md:w-52 md:h-52 bg-white rounded-full shadow-[0_10px_40px_-10px_rgba(0,188,212,0.5)] flex items-center justify-center z-20 border-[6px] border-white/50 backdrop-blur-sm">
               <div className="w-full h-full rounded-full overflow-hidden p-1 bg-white relative z-10">
                  <img 
                     src="https://udh.edu.ne/public/img/university/uploads/domains/1721405330.jpg" 
                     alt="Logo IUT Tahoua" 
                     className="w-full h-full object-contain"
                  />
               </div>
               <div className="absolute inset-0 rounded-full shadow-[inset_0_0_20px_rgba(0,0,0,0.1)] pointer-events-none z-20"></div>
            </div>
            <div className="absolute inset-0 -m-4 rounded-full border-2 border-brand-400/30 border-dashed animate-[spin_10s_linear_infinite]"></div>
         </div>

         {/* --- NODES (CARDS OR BUTTONS) --- */}
         {NODES.map((node) => {
            const colors = getColors(node.colorTheme);
            const isOpen = activeCardId === node.id;
            const isOtherOpen = activeCardId !== null && !isOpen;

            return (
               <div 
                  key={node.id} 
                  className={`absolute z-30 transition-all duration-500 ${node.positionClass} ${isOtherOpen ? 'opacity-20 scale-75 pointer-events-none blur-sm' : 'opacity-100 scale-100'}`}
               >
                  {!isOpen ? (
                     <button
                        onClick={() => setActiveCardId(node.id)}
                        className={`group relative flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-white shadow-lg border-2 ${colors.border} hover:scale-110 transition-transform duration-300`}
                     >
                        <span className={`absolute inset-0 rounded-full opacity-20 animate-ping ${colors.bg}`}></span>
                        <Plus size={24} className={`${colors.text} group-hover:rotate-90 transition-transform duration-300`} />
                        
                        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] md:text-xs font-bold bg-white/80 px-2 py-1 rounded text-gray-500 whitespace-nowrap shadow-sm">
                           {node.title}
                        </span>
                     </button>
                  ) : (
                     <div className={`relative w-[280px] md:w-[320px] bg-white rounded-3xl p-6 shadow-2xl border ${colors.border} animate-in zoom-in-95 duration-300`}>
                        <button 
                           onClick={() => setActiveCardId(null)}
                           className="absolute top-3 right-3 p-1.5 bg-gray-100 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-full transition-colors"
                        >
                           <X size={18} />
                        </button>

                        <div className="flex flex-col items-center text-center">
                           <div className={`p-4 rounded-2xl mb-4 ${colors.bg} ${colors.text} shadow-inner`}>
                              {node.icon}
                           </div>
                           
                           {node.badge && (
                              <span className="mb-2 text-[9px] font-extrabold uppercase tracking-widest bg-gray-100 px-2 py-0.5 rounded text-gray-500">
                                 {node.badge}
                              </span>
                           )}

                           <h3 className={`text-lg font-bold font-title mb-3 ${colors.text}`}>{node.title}</h3>
                           
                           <div className="text-sm text-gray-600">
                              {node.content}
                           </div>
                        </div>
                        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-white to-gray-50 rounded-3xl"></div>
                     </div>
                  )}
               </div>
            );
         })}

      </div>
    </div>
  );
};

export default MasteryView;