
import React, { useState, useMemo, useEffect } from 'react';
import { Search, ChevronRight, Clock, MapPin, User, FileText, ArrowLeft, Info, GitMerge, MessageCircle, PhoneCall, RefreshCw } from 'lucide-react';
import { Category, FaqItem } from '../types';
import { FAQ_DATA } from '../constants';

// Firebase Imports
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

interface AssistantProps {
  onNavigateToFlow?: (flowId: string) => void;
  searchQuery?: string;
}

const Assistant: React.FC<AssistantProps> = ({ onNavigateToFlow, searchQuery = '' }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'ALL'>('ALL');
  const [selectedItem, setSelectedItem] = useState<FaqItem | null>(null);
  
  // Data State
  const [faqData, setFaqData] = useState<FaqItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch Data from Firebase on Mount
  useEffect(() => {
    const fetchFaqs = async () => {
      try {
         const querySnapshot = await getDocs(collection(db, "faqs"));
         if (querySnapshot.empty) {
            console.log("Firebase empty, using mock");
            setFaqData(FAQ_DATA);
         } else {
            const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as FaqItem));
            setFaqData(data);
         }
      } catch (error) {
         console.warn("Using local mock data (Firebase not configured)", error);
         setFaqData(FAQ_DATA);
      } finally {
         setIsLoading(false);
      }
    };
    fetchFaqs();
  }, []);

  // Scroll to top whenever the view changes (List <-> Detail)
  useEffect(() => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedItem]);

  // Filter Logic
  const filteredData = useMemo(() => {
    return faqData.filter(item => {
      const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory;
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = searchQuery === '' || 
                            item.question.toLowerCase().includes(searchLower) ||
                            item.procedure.toLowerCase().includes(searchLower) ||
                            item.keywords.some(k => k.toLowerCase().includes(searchLower));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, faqData]);

  const categories = Object.values(Category);

  // View: Detailed Answer
  if (selectedItem) {
    return (
      <div className="flex flex-col pb-20 animate-in fade-in slide-in-from-right-8 duration-500">
        <button 
          onClick={() => setSelectedItem(null)}
          className="flex items-center text-gray-500 font-medium mb-6 hover:text-brand-600 hover:bg-gray-50 p-2 -ml-2 rounded-lg w-fit transition-all"
        >
          <ArrowLeft size={20} className="mr-2" />
          Retour à la liste
        </button>

        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden mb-8">
          {/* Header */}
          <div className="bg-gradient-to-r from-brand-700 to-brand-600 p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl pointer-events-none"></div>
            
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm border border-white/10">
                {selectedItem.category}
              </span>
            </div>
            <h2 className="text-2xl font-bold leading-tight relative z-10">{selectedItem.question}</h2>
          </div>
          
          <div className="p-6 md:p-8 space-y-8">
            
            {/* Context Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start p-4 bg-brand-50/50 rounded-xl border border-brand-100/50 hover:border-brand-200 transition-colors">
                <div className="bg-brand-100 p-2 rounded-lg mr-4 text-brand-600">
                  <User size={20} />
                </div>
                <div>
                  <p className="text-xs text-brand-400 uppercase font-bold tracking-wide">Service Responsable</p>
                  <p className="font-semibold text-gray-900 mt-1">{selectedItem.service}</p>
                </div>
              </div>
              
              <div className="flex items-start p-4 bg-amber-50/50 rounded-xl border border-amber-100/50 hover:border-amber-200 transition-colors">
                <div className="bg-amber-100 p-2 rounded-lg mr-4 text-amber-600">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="text-xs text-amber-500 uppercase font-bold tracking-wide">Délai Traitement</p>
                  <p className="font-semibold text-gray-900 mt-1">{selectedItem.timing}</p>
                </div>
              </div>

              <div className="flex items-start p-4 bg-emerald-50/50 rounded-xl border border-emerald-100/50 hover:border-emerald-200 transition-colors md:col-span-2">
                <div className="bg-emerald-100 p-2 rounded-lg mr-4 text-emerald-600">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs text-emerald-500 uppercase font-bold tracking-wide">Localisation</p>
                  <p className="font-semibold text-gray-900 mt-1">{selectedItem.location}</p>
                </div>
              </div>
            </div>

            {/* Procedure */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center border-b border-gray-100 pb-2">
                <FileText className="mr-3 text-brand-500" size={24} />
                Démarche à suivre
              </h3>
              <div className="space-y-6 relative before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
                {selectedItem.steps.map((step, idx) => (
                  <div key={idx} className="relative pl-12">
                    <div className="absolute left-0 top-0 w-8 h-8 bg-brand-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md ring-4 ring-white z-10">
                      {idx + 1}
                    </div>
                    <p className="text-gray-700 leading-relaxed bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Flow Link */}
            {selectedItem.linkedFlowId && onNavigateToFlow && (
              <div className="mt-8">
                <button
                  onClick={() => onNavigateToFlow(selectedItem.linkedFlowId!)}
                  className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white p-1 rounded-2xl shadow-lg hover:shadow-xl transition-all group"
                >
                  <div className="bg-gray-900 rounded-[14px] p-4 flex items-center justify-between border border-white/10 group-hover:bg-gray-800 transition-colors">
                    <div className="flex items-center">
                       <div className="p-3 bg-white/10 rounded-xl mr-4 group-hover:bg-white/20 transition-colors">
                          <GitMerge size={24} />
                       </div>
                       <div className="text-left">
                         <p className="font-bold text-base">Voir le circuit visuel</p>
                         <p className="text-sm text-gray-400">Comprendre le flux en un coup d'œil</p>
                       </div>
                    </div>
                    <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform">
                      <ChevronRight size={18} />
                    </div>
                  </div>
                </button>
              </div>
            )}
            
            {/* Contact Button */}
            <div className="mt-6 pt-6 border-t border-gray-100 text-center">
              <p className="text-sm text-gray-500 mb-3">Besoin d'informations complémentaires ?</p>
              <button 
                className="inline-flex items-center px-6 py-3 bg-brand-50 text-brand-700 font-bold rounded-xl border border-brand-200 hover:bg-brand-100 hover:border-brand-300 transition-all shadow-sm"
              >
                <PhoneCall size={18} className="mr-2" />
                Contacter le service {selectedItem.service}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // View: Search & List (FAQ)
  return (
    <div className="space-y-6 pb-24 flex flex-col animate-in fade-in duration-500">
      
      {/* Introduction Hero (No local search bar anymore) */}
      <div className="text-center py-6">
        <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-600 mx-auto mb-4 shadow-sm transform rotate-3">
          <MessageCircle size={32} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Assistant & FAQ</h2>
        <p className="text-gray-500 mt-2 max-w-sm mx-auto">
          {searchQuery 
            ? `Résultats pour : "${searchQuery}"`
            : "Posez votre question ou explorez les thématiques fréquentes."
          }
        </p>
      </div>

      {/* Category Chips */}
      <div className="flex gap-2 overflow-x-auto pb-4 pt-2 no-scrollbar px-1">
        <button
          onClick={() => setSelectedCategory('ALL')}
          className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
            selectedCategory === 'ALL' 
              ? 'bg-brand-900 text-white shadow-md transform scale-105' 
              : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          Tout
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat 
                ? 'bg-brand-600 text-white shadow-md transform scale-105' 
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results List */}
      <div className="flex-1 px-1">
        {isLoading ? (
           <div className="flex flex-col items-center justify-center py-20">
              <RefreshCw size={32} className="text-brand-500 animate-spin mb-4" />
              <p className="text-gray-500 font-medium">Chargement des réponses...</p>
           </div>
        ) : filteredData.length > 0 ? (
          <div className="space-y-3">
            {filteredData.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="group w-full flex items-center justify-between p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-brand-300 transition-all text-left relative overflow-hidden"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="flex-1 pr-4">
                  <div className="flex items-center mb-1">
                     <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md mr-2 ${item.category === Category.ADMISSION ? 'bg-accent-100 text-accent-700' : 'bg-gray-100 text-gray-500'} group-hover:text-brand-500 transition-colors`}>
                        {item.category}
                     </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-lg group-hover:text-brand-700 transition-colors">
                    {item.question}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-1 group-hover:text-gray-600">
                    Concerne : {item.procedure}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 group-hover:bg-brand-50 group-hover:text-brand-600 transition-all">
                   <ChevronRight size={20} />
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <Info className="h-10 w-10 text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Aucun résultat</h3>
            <p className="text-gray-500 mt-2 max-w-xs">
              Essayez un autre mot-clé ou modifiez la catégorie.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Assistant;
