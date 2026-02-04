

import React, { useState, useEffect } from 'react';
import { ArrowLeft, MessageSquareQuote, Star, Quote, Briefcase, GraduationCap, UserCheck } from 'lucide-react';
import LazyImage from './LazyImage';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { Testimonial } from '../types';

interface TestimonialsProps {
  onBack: () => void;
}

const Testimonials: React.FC<TestimonialsProps> = ({ onBack }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
     const fetchTestimonials = async () => {
        try {
           const querySnapshot = await getDocs(collection(db, "testimonials"));
           const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Testimonial));
           setTestimonials(data);
        } catch (error) {
           console.error("Error fetching testimonials", error);
        }
     };
     fetchTestimonials();
  }, []);

  // Helper for consistent colors
  const getColor = (index: number) => {
     const colors = [
        "bg-blue-50 text-blue-700 border-blue-100",
        "bg-indigo-50 text-indigo-700 border-indigo-100",
        "bg-orange-50 text-orange-700 border-orange-100",
        "bg-emerald-50 text-emerald-700 border-emerald-100"
     ];
     return colors[index % colors.length];
  };

  return (
    <div className="space-y-6 pb-24 animate-in fade-in slide-in-from-bottom-8 duration-500 min-h-full">
      
      {/* Header & Navigation */}
      <div className="bg-gray-50 p-2 rounded-b-xl border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <button 
            onClick={onBack}
            className="p-2 bg-white rounded-full shadow-sm border border-gray-200 text-gray-600 hover:text-brand-600 transition-colors active:scale-95"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 font-title leading-none">Témoignages</h1>
            <p className="text-xs text-gray-500 mt-0.5">La parole aux Anciens (Alumni)</p>
          </div>
        </div>
      </div>

      {/* Hero Image Section */}
      <div className="flex justify-center w-full px-4 mb-4">
         <LazyImage 
            src="https://services.zerofiltre.tech/images/our-team-illustration-1.svg" 
            alt="Communauté IUT" 
            className="w-48 md:w-full md:max-w-sm h-auto object-contain drop-shadow-md animate-in zoom-in-95 duration-700"
            containerClassName="w-full max-w-sm flex justify-center"
         />
      </div>

      {/* Interactive Central Area */}
      <div className="relative min-h-[400px] flex flex-col items-center px-2">
         
         {!isRevealed ? (
            <div className="flex flex-col items-center justify-center space-y-6 mt-4 animate-in fade-in duration-500 w-full">
               <div className="text-center max-w-md px-6">
                  <h2 className="text-2xl font-bold text-gray-800 font-title mb-2">Ils ont réussi, pourquoi pas vous ?</h2>
                  <p className="text-gray-500 text-sm">Découvrez le parcours inspirant de nos diplômés qui font la fierté de l'IUT de Tahoua.</p>
               </div>

               <button 
                  onClick={() => setIsRevealed(true)}
                  className="group relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center bg-gradient-to-br from-brand-600 to-brand-400 rounded-full shadow-2xl hover:scale-110 transition-transform duration-500 ease-out cursor-pointer active:scale-95"
               >
                  <span className="absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-20 animate-ping"></span>
                  <span className="absolute inline-flex h-[120%] w-[120%] rounded-full border border-brand-200 opacity-30 animate-[spin_10s_linear_infinite]"></span>
                  <MessageSquareQuote size={40} className="text-white relative z-10 group-hover:rotate-12 transition-transform duration-300" strokeWidth={1.5} />
                  <span className="absolute -bottom-10 text-xs font-bold text-brand-600 bg-brand-50 px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                     Découvrir
                  </span>
               </button>
            </div>
         ) : (
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 animate-in slide-in-from-bottom-10 fade-in duration-700">
               {testimonials.length > 0 ? testimonials.map((item, idx) => (
                  <div 
                     key={item.id} 
                     className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-brand-200 transition-all duration-300 group flex flex-col relative overflow-hidden"
                  >
                     <div className="absolute top-4 right-4 text-gray-100 group-hover:text-brand-50 transition-colors">
                        <Quote size={64} />
                     </div>

                     <div className="flex items-center mb-4 relative z-10">
                        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-lg font-bold mr-3 border-2 ${getColor(idx)} shadow-sm bg-white`}>
                           {item.name.charAt(0)}
                        </div>
                        <div>
                           <h3 className="font-bold text-gray-900 text-sm md:text-base">{item.name}</h3>
                           <div className="flex items-center text-[10px] md:text-xs text-gray-500">
                              <GraduationCap size={12} className="mr-1" />
                              {item.promo}
                           </div>
                        </div>
                     </div>

                     <div className="mb-3 relative z-10">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] md:text-xs font-medium bg-gray-50 text-gray-800 border border-gray-200">
                           <Briefcase size={10} className="mr-1.5" />
                           {item.role}
                        </span>
                     </div>

                     <p className="text-gray-600 text-sm leading-relaxed italic relative z-10 flex-grow">
                        "{item.text}"
                     </p>

                     <div className="mt-4 pt-3 border-t border-gray-50 flex justify-between items-center relative z-10">
                        <div className="flex gap-0.5">
                           {[1,2,3,4,5].map(s => <Star key={s} size={10} className="text-yellow-400 fill-yellow-400" />)}
                        </div>
                        <span className="text-[10px] font-bold text-brand-600 flex items-center bg-brand-50 px-2 py-0.5 rounded-full">
                           <UserCheck size={10} className="mr-1" /> Vérifié
                        </span>
                     </div>
                  </div>
               )) : <div className="text-center col-span-2 text-gray-500 py-8">Chargement des témoignages...</div>}
               
               {/* Illustration Section */}
               <div className="col-span-1 md:col-span-2 mt-8 bg-gradient-to-br from-brand-50 to-white rounded-3xl p-8 border border-brand-100 relative overflow-hidden text-center">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-300 to-accent-500"></div>
                  
                  <div className="mb-6 flex justify-center">
                     <LazyImage 
                        src="https://services.zerofiltre.tech/images/our-approach-illustration-1.svg" 
                        alt="Success Illustration" 
                        className="w-full h-auto object-contain drop-shadow-md animate-in zoom-in-90 duration-700"
                        containerClassName="w-full max-w-xs"
                     />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 font-title mb-3">
                     Votre réussite est notre <span className="text-brand-600">priorité</span>
                  </h3>
                  <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
                     À l'IUT de Tahoua, chaque étudiant bénéficie d'un encadrement personnalisé pour transformer son potentiel en compétences.
                  </p>
               </div>

               <div className="col-span-1 md:col-span-2 text-center mt-4">
                  <button 
                     onClick={() => setIsRevealed(false)}
                     className="text-sm font-bold text-gray-400 hover:text-brand-600 transition-colors underline py-4"
                  >
                     Masquer les témoignages
                  </button>
               </div>
            </div>
         )}
      </div>
    </div>
  );
};

export default Testimonials;
