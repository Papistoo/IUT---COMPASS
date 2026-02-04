
import React, { useState } from 'react';
import { ArrowLeft, Star, Plus, ShieldCheck, Award, GraduationCap, Target, Lightbulb, Users, CheckCircle2, X, ChevronDown } from 'lucide-react';
import LazyImage from './LazyImage';

interface QualityViewProps {
  onBack: () => void;
}

const QualityView: React.FC<QualityViewProps> = ({ onBack }) => {
  // State for Flow 1 (Teaching Quality)
  // 0: Initial Icon, 1: Quality Card, 2: Value Card, 3: Rigor Card
  const [flow1Step, setFlow1Step] = useState(0);

  // State for Flow 2 (Why IUT)
  const [flow2Revealed, setFlow2Revealed] = useState(false);
  const [activeWhyCard, setActiveWhyCard] = useState<'IDENTITY' | 'CHOICE' | 'FUTURE' | null>(null);

  // Helper to scroll to section 2
  const scrollToNext = () => {
    const el = document.getElementById('why-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="space-y-0 pb-12 animate-in fade-in slide-in-from-right duration-500 font-sans bg-gray-50 min-h-screen">
      
      {/* Header Navigation - CHANGED: Removed 'sticky top-0' for better immersive scrolling */}
      <div className="p-4 pt-safe-4 flex items-center space-x-4 bg-white border-b border-gray-200 shadow-sm relative z-30">
        <button 
          onClick={onBack}
          className="p-2 bg-gray-50 rounded-full shadow-sm border border-gray-200 text-gray-600 hover:text-brand-600 transition-colors active:scale-95"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-xl font-bold text-gray-900 font-title leading-none">Excellence Académique</h1>
          <p className="text-xs text-gray-500 mt-1">La qualité au cœur de la formation</p>
        </div>
      </div>

      {/* --- SECTION 1: L'EXPÉRIENCE QUALITÉ (Séquentielle) --- */}
      <div className="px-4 py-8 bg-white rounded-b-3xl shadow-sm mb-6">
         {/* Top Illustration */}
         <div className="flex justify-center mb-8">
            <LazyImage 
               src="https://services.zerofiltre.tech/images/our-service-illustration-1.svg" 
               alt="Qualité Enseignement" 
               className="w-full max-w-sm h-auto object-contain drop-shadow-md animate-in zoom-in-95 duration-700"
               containerClassName="w-full max-w-sm"
            />
         </div>

         {/* Interactive Flow Container */}
         <div className="relative min-h-[320px] flex flex-col items-center justify-center">
            
            {/* STEP 0: INITIAL ICON */}
            {flow1Step === 0 && (
               <div className="flex flex-col items-center gap-4 animate-in zoom-in duration-300">
                  <button 
                     onClick={() => setFlow1Step(1)}
                     className="group relative w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-xl shadow-orange-200 hover:scale-110 transition-transform duration-200 active:scale-95"
                  >
                     <div className="absolute inset-0 bg-white rounded-full opacity-0 group-hover:opacity-20 animate-ping"></div>
                     <Star size={40} className="text-white fill-white drop-shadow-sm" />
                  </button>
                  <p className="text-sm font-bold text-gray-500 uppercase tracking-widest animate-pulse">Cliquez pour découvrir</p>
               </div>
            )}

            {/* STEP 1: QUALITÉ */}
            {flow1Step === 1 && (
               <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-gray-100 border-l-4 border-l-amber-500 animate-in slide-in-from-bottom-10 duration-300 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-full -mr-10 -mt-10 z-0"></div>
                  <div className="relative z-10">
                     <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600">
                           <Award size={24} />
                        </div>
                        <span className="text-xs font-bold text-amber-300">01 / 03</span>
                     </div>
                     <h3 className="text-xl font-bold text-gray-900 mb-2">Qualité de l'Enseignement</h3>
                     <p className="text-gray-600 text-sm leading-relaxed mb-6">
                        Nos enseignants sont des experts reconnus, alliant savoir académique et expérience terrain. Chaque cours est conçu pour maximiser l'apprentissage pratique.
                     </p>
                     
                     <div className="flex justify-end">
                        <button 
                           onClick={() => setFlow1Step(2)}
                           className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 text-white rounded-xl font-bold hover:bg-amber-600 transition-all duration-100 shadow-lg shadow-amber-200 active:scale-95 transform"
                        >
                           <Plus size={18} /> Continuer
                        </button>
                     </div>
                  </div>
               </div>
            )}

            {/* STEP 2: VALEUR */}
            {flow1Step === 2 && (
               <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-gray-100 border-l-4 border-l-blue-500 animate-in slide-in-from-right-10 duration-300 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-10 -mt-10 z-0"></div>
                  <div className="relative z-10">
                     <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                           <GraduationCap size={24} />
                        </div>
                        <span className="text-xs font-bold text-blue-300">02 / 03</span>
                     </div>
                     <h3 className="text-xl font-bold text-gray-900 mb-2">Valeur de la Formation</h3>
                     <p className="text-gray-600 text-sm leading-relaxed mb-6">
                        Un diplôme de l'IUT de Tahoua est un passeport pour l'emploi. Reconnus par les entreprises, nos cursus (DUT & Licence Pro) garantissent une employabilité immédiate.
                     </p>
                     
                     <div className="flex justify-end">
                        <button 
                           onClick={() => setFlow1Step(3)}
                           className="flex items-center gap-2 px-5 py-2.5 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 transition-all duration-100 shadow-lg shadow-blue-200 active:scale-95 transform"
                        >
                           <Plus size={18} /> Et ensuite ?
                        </button>
                     </div>
                  </div>
               </div>
            )}

            {/* STEP 3: RIGUEUR */}
            {flow1Step === 3 && (
               <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-gray-100 border-l-4 border-l-red-500 animate-in slide-in-from-bottom-10 duration-300 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full -mr-10 -mt-10 z-0"></div>
                  <div className="relative z-10">
                     <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-red-600">
                           <ShieldCheck size={24} />
                        </div>
                        <span className="text-xs font-bold text-red-300">03 / 03</span>
                     </div>
                     <h3 className="text-xl font-bold text-gray-900 mb-2">Rigueur & Discipline</h3>
                     <p className="text-gray-600 text-sm leading-relaxed mb-6">
                        L'excellence ne s'obtient pas sans effort. La ponctualité, l'assiduité et le respect du règlement sont les piliers qui forgent le caractère de nos futurs cadres.
                     </p>
                     
                     <div className="flex justify-between items-center mt-8">
                        <button 
                           onClick={() => setFlow1Step(0)}
                           className="text-xs font-bold text-gray-400 hover:text-gray-600 underline"
                        >
                           Recommencer
                        </button>
                        <button 
                           onClick={scrollToNext}
                           className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-all duration-100 shadow-lg active:scale-95 transform"
                        >
                           Découvrir la suite <ChevronDown size={18} />
                        </button>
                     </div>
                  </div>
               </div>
            )}
         </div>
      </div>

      {/* --- SECTION 2: POURQUOI L'IUT ? (Explicative) --- */}
      <div id="why-section" className="py-12 px-6 relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-10 left-[-10%] w-64 h-64 bg-brand-100 rounded-full blur-3xl opacity-60"></div>
            <div className="absolute bottom-10 right-[-10%] w-64 h-64 bg-orange-100 rounded-full blur-3xl opacity-60"></div>
         </div>
         
         <div className="relative z-10 max-w-md mx-auto">
            <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 mb-8">
               <LazyImage 
                  src="https://services.zerofiltre.tech/images/our-approach-illustration-2.svg" 
                  alt="Approche Pédagogique" 
                  className="w-full h-auto object-contain drop-shadow-sm"
               />
            </div>
            
            <h2 className="text-2xl font-extrabold text-gray-900 mb-4 font-title text-center leading-tight">
               Pourquoi choisir l'<span className="text-brand-600">IUT de Tahoua</span> ?
            </h2>
            
            <div className="prose prose-sm text-gray-600 leading-relaxed text-justify bg-white/60 p-6 rounded-2xl backdrop-blur-sm border border-white/50">
               <p className="mb-4">
                  L'Institut Universitaire de Technologie de Tahoua se distingue par son approche professionnalisante unique au Niger.
                  Contrairement aux cursus purement théoriques, nous plongeons nos étudiants dans la réalité du monde du travail dès la première année.
               </p>
               <p className="font-medium text-brand-800">
                  Choisir l'IUT, c'est choisir un environnement où chaque talent est cultivé, où l'innovation technologique rencontre les besoins concrets du développement national.
               </p>
            </div>
         </div>
      </div>

      {/* --- SECTION 3: INTERACTIVE (Ramifiée - FAST ANIMATIONS) --- */}
      <div className="px-4 py-8 min-h-[450px] relative">
         <div className="text-center mb-10">
            <h3 className="text-lg font-bold text-gray-800 uppercase tracking-widest flex items-center justify-center">
               <span className="w-8 h-0.5 bg-brand-300 mr-3"></span>
               Nos Piliers
               <span className="w-8 h-0.5 bg-brand-300 ml-3"></span>
            </h3>
            <p className="text-xs text-gray-400 mt-2">Cliquez sur le centre pour explorer</p>
         </div>

         <div className="flex flex-col items-center justify-center relative h-[300px]">
            
            {/* ORBIT CIRCLES DECORATION */}
            <div className={`absolute border border-dashed border-gray-300 rounded-full transition-all duration-300 ${flow2Revealed ? 'w-64 h-64 opacity-100 rotate-180' : 'w-0 h-0 opacity-0'}`}></div>

            {/* MAIN CENTRAL ICON */}
            <button 
               onClick={() => {
                  setFlow2Revealed(!flow2Revealed);
                  setActiveWhyCard(null);
               }}
               className={`z-20 w-20 h-20 bg-brand-900 rounded-full flex items-center justify-center shadow-2xl transition-all duration-200 active:scale-90 ${flow2Revealed ? 'scale-90 rotate-45 ring-4 ring-brand-100' : 'hover:scale-105 animate-bounce-slow'}`}
            >
               {flow2Revealed ? <Plus size={32} className="text-white" /> : <Target size={32} className="text-white" />}
            </button>

            {/* REVEALED BUTTONS (SATELLITES) - FASTER ENTRY */}
            {flow2Revealed && (
               <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
                  {/* Btn 1: Left (Identité) */}
                  <button 
                     onClick={() => setActiveWhyCard('IDENTITY')}
                     className="pointer-events-auto absolute transform -translate-x-24 -translate-y-16 flex flex-col items-center gap-2 group animate-in zoom-in duration-200 delay-0 active:scale-90 transition-transform"
                  >
                     <div className="w-14 h-14 bg-white border-2 border-brand-200 rounded-2xl flex items-center justify-center shadow-lg group-hover:bg-brand-50 group-hover:scale-110 transition-all">
                        <Users size={24} className="text-brand-600" />
                     </div>
                     <span className="text-[10px] font-bold text-gray-500 bg-white/80 px-2 py-0.5 rounded-full shadow-sm">Identité</span>
                  </button>

                  {/* Btn 2: Center Bottom (Choix) */}
                  <button 
                     onClick={() => setActiveWhyCard('CHOICE')}
                     className="pointer-events-auto absolute transform translate-y-28 flex flex-col items-center gap-2 group animate-in zoom-in duration-200 delay-75 active:scale-90 transition-transform"
                  >
                     <div className="w-14 h-14 bg-white border-2 border-green-200 rounded-2xl flex items-center justify-center shadow-lg group-hover:bg-green-50 group-hover:scale-110 transition-all">
                        <CheckCircle2 size={24} className="text-green-600" />
                     </div>
                     <span className="text-[10px] font-bold text-gray-500 bg-white/80 px-2 py-0.5 rounded-full shadow-sm">Le Choix</span>
                  </button>

                  {/* Btn 3: Right (Avenir) */}
                  <button 
                     onClick={() => setActiveWhyCard('FUTURE')}
                     className="pointer-events-auto absolute transform translate-x-24 -translate-y-16 flex flex-col items-center gap-2 group animate-in zoom-in duration-200 delay-100 active:scale-90 transition-transform"
                  >
                     <div className="w-14 h-14 bg-white border-2 border-purple-200 rounded-2xl flex items-center justify-center shadow-lg group-hover:bg-purple-50 group-hover:scale-110 transition-all">
                        <Lightbulb size={24} className="text-purple-600" />
                     </div>
                     <span className="text-[10px] font-bold text-gray-500 bg-white/80 px-2 py-0.5 rounded-full shadow-sm">Avenir</span>
                  </button>
               </div>
            )}
         </div>
      </div>

      {/* --- MODAL CONTENT DISPLAY (Better UX) --- */}
      {activeWhyCard && (
         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
               
               {/* Close Button */}
               <button 
                  onClick={() => setActiveWhyCard(null)}
                  className="absolute top-4 right-4 p-2 bg-black/5 hover:bg-black/10 rounded-full transition-colors z-20"
               >
                  <X size={20} className="text-gray-700" />
               </button>

               {activeWhyCard === 'IDENTITY' && (
                  <div className="flex flex-col">
                     <div className="bg-brand-50 p-8 flex justify-center border-b border-brand-100">
                        <Users size={64} className="text-brand-600 drop-shadow-md" />
                     </div>
                     <div className="p-8">
                        <h4 className="text-2xl font-bold text-brand-900 mb-4 font-title">Identité Forte</h4>
                        <p className="text-gray-600 leading-relaxed">
                           L'IUT de Tahoua est un carrefour culturel et intellectuel. Nous formons une communauté soudée où solidarité et excellence se côtoient au quotidien.
                        </p>
                        <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-2">
                           <ShieldCheck size={16} className="text-brand-500" />
                           <span className="text-xs font-bold text-gray-500">Esprit d'équipe & Intégrité</span>
                        </div>
                     </div>
                  </div>
               )}

               {activeWhyCard === 'CHOICE' && (
                  <div className="flex flex-col">
                     <div className="bg-green-50 p-8 flex justify-center border-b border-green-100">
                        <CheckCircle2 size={64} className="text-green-600 drop-shadow-md" />
                     </div>
                     <div className="p-8">
                        <h4 className="text-2xl font-bold text-green-900 mb-4 font-title">Le Bon Choix</h4>
                        <p className="text-gray-600 leading-relaxed">
                           Opter pour l'IUT, c'est choisir la sécurité d'un diplôme d'État reconnu et la flexibilité d'une formation qui ouvre aussi bien les portes de l'entreprise que celles de la poursuite d'études.
                        </p>
                        <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-2">
                           <Target size={16} className="text-green-500" />
                           <span className="text-xs font-bold text-gray-500">Diplôme reconnu CAMES</span>
                        </div>
                     </div>
                  </div>
               )}

               {activeWhyCard === 'FUTURE' && (
                  <div className="flex flex-col">
                     <div className="bg-purple-50 p-8 flex justify-center border-b border-purple-100">
                        <Lightbulb size={64} className="text-purple-600 drop-shadow-md" />
                     </div>
                     <div className="p-8">
                        <h4 className="text-2xl font-bold text-purple-900 mb-4 font-title">Filières d'Avenir</h4>
                        <p className="text-gray-600 leading-relaxed">
                           Informatique, Gestion, Commerce, Hôtellerie... Nos programmes sont constamment mis à jour pour répondre aux défis technologiques et économiques de demain.
                        </p>
                        <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-2">
                           <Award size={16} className="text-purple-500" />
                           <span className="text-xs font-bold text-gray-500">Insertion pro garantie</span>
                        </div>
                     </div>
                  </div>
               )}
            </div>
         </div>
      )}

      {/* --- FOOTER IMAGE --- */}
      <div className="px-4 pb-4 mt-8">
         <LazyImage 
            src="https://services.zerofiltre.tech/images/our-team-illustration-2.svg" 
            alt="L'équipe IUT" 
            className="w-full max-w-md mx-auto h-auto object-contain opacity-90"
            containerClassName="w-full max-w-md mx-auto"
         />
         <p className="text-center text-xs text-gray-400 mt-4 italic font-medium">
            "La réussite commence ici."
         </p>
      </div>

    </div>
  );
};

export default QualityView;
