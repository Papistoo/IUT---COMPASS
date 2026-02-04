

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Bell, Calendar, Download, FileText, Filter, Pin, Search, AlertTriangle, CheckCircle2, Clock, RefreshCw, X } from 'lucide-react';
import { Notice } from '../types';

// Firebase Imports
import { db } from '../firebaseConfig';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

interface NoticeBoardProps {
  onBack: () => void;
  searchQuery?: string;
}

const NoticeBoard: React.FC<NoticeBoardProps> = ({ onBack, searchQuery = '' }) => {
  const [filter, setFilter] = useState<string>('TOUT');
  const [notices, setNotices] = useState<Notice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // État pour la modale de lecture
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

  // Fetch Data from Firebase
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        // Query notices ordered by creation time if possible
        const q = query(collection(db, "notices"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const data: Notice[] = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Notice));
        setNotices(data);
      } catch (error) {
        console.error("Error fetching notices:", error);
        // Fallback or empty state handled by UI
        try {
           const querySnapshot = await getDocs(collection(db, "notices"));
           const data: Notice[] = querySnapshot.docs.map(doc => ({
             id: doc.id,
             ...doc.data()
           } as Notice));
           setNotices(data);
        } catch (e) {
           console.error("Fallback failed", e);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotices();
    
    // Scroll to top
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const filteredNotices = notices.filter(notice => {
    const matchesFilter = filter === 'TOUT' || notice.category === filter;
    const matchesSearch = searchQuery === '' ||
                          notice.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          notice.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getCategoryColor = (cat: string) => {
    switch(cat) {
      case 'URGENT': return 'bg-red-100 text-red-700 border-red-200';
      case 'PEDAGOGIE': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'ADMINISTRATION': return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'BOURSES': return 'bg-green-100 text-green-700 border-green-200';
      case 'STAGES': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-500 space-y-6 pb-20">
      
      {/* Header with Back Button */}
      <div className="flex flex-col space-y-4">
        <button 
          onClick={onBack}
          className="flex items-center text-gray-500 font-medium hover:text-brand-600 w-fit transition-colors p-2 -ml-2 rounded-lg hover:bg-gray-100"
        >
          <ArrowLeft size={20} className="mr-2" />
          Retour
        </button>

        <div className="bg-gradient-to-r from-slate-800 to-brand-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-10 -mt-10 blur-3xl pointer-events-none"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
               <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Bell size={24} className="text-yellow-400" />
               </div>
               <span className="text-xs font-bold uppercase tracking-wider text-brand-200 border border-brand-500/50 px-2 py-0.5 rounded-full">Officiel</span>
            </div>
            <h1 className="text-3xl font-bold font-title">Tableau d'Affichage</h1>
            <p className="text-brand-100 mt-2 max-w-lg">
              {searchQuery ? `Recherche : "${searchQuery}"` : "Retrouvez toutes les notes de service, résultats d'examens et communiqués officiels."}
            </p>
          </div>
        </div>
      </div>

      {/* Filters - REMOVED STICKY */}
      <div className="flex gap-4 items-center justify-start py-2 overflow-x-auto no-scrollbar">
         {['TOUT', 'URGENT', 'PEDAGOGIE', 'ADMINISTRATION', 'BOURSES'].map((cat) => (
            <button
               key={cat}
               onClick={() => setFilter(cat)}
               className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                  filter === cat 
                  ? 'bg-brand-700 text-white border-brand-700 shadow-md' 
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-100'
               }`}
            >
               {cat}
            </button>
         ))}
      </div>

      {/* Notices Grid (Simulating a Cork Board) */}
      <div className="bg-amber-50/50 p-4 md:p-6 rounded-3xl border border-amber-100/50 min-h-[500px]">
         {isLoading ? (
             <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                <RefreshCw size={32} className="animate-spin text-brand-500 mb-4" />
                <p>Chargement des affichages...</p>
             </div>
         ) : filteredNotices.length > 0 ? (
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {filteredNotices.map((notice) => (
               <div 
                 key={notice.id} 
                 onClick={() => setSelectedNotice(notice)}
                 className="group bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative flex flex-col cursor-pointer"
               >
                 {/* Pin Visual */}
                 <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <div className="w-4 h-4 rounded-full bg-red-500 shadow-md border-2 border-white/50 relative">
                       <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-white/50 rounded-full"></div>
                    </div>
                    <div className="w-0.5 h-2 bg-gray-400 mx-auto -mt-1"></div>
                 </div>

                 {/* New Badge */}
                 {notice.isNew && (
                    <div className="absolute -right-2 -top-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-md animate-pulse">
                       NOUVEAU
                    </div>
                 )}

                 {/* Header */}
                 <div className="flex justify-between items-start mb-4 mt-2">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded border uppercase tracking-wider ${getCategoryColor(notice.category)}`}>
                       {notice.category}
                    </span>
                    <div className="flex items-center text-gray-400 text-xs">
                       <Calendar size={12} className="mr-1" />
                       {notice.date}
                    </div>
                 </div>

                 {/* Title & Content Preview */}
                 <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight group-hover:text-brand-700 transition-colors">
                    {notice.title}
                 </h3>
                 <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                    {notice.content}
                 </p>

                 {/* Footer Actions */}
                 <div className="pt-4 border-t border-gray-50 flex items-center justify-between mt-auto">
                    {notice.category === 'URGENT' ? (
                       <div className="flex items-center text-red-600 text-xs font-bold">
                          <AlertTriangle size={14} className="mr-1" /> Important
                       </div>
                    ) : (
                       <div className="flex items-center text-gray-400 text-xs">
                          <Clock size={14} className="mr-1" /> Publié par l'Admin
                       </div>
                    )}
                    
                    <button 
                       className="flex items-center text-brand-700 bg-brand-50 hover:bg-brand-100 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
                    >
                       {notice.fileSize ? (
                          <>
                             <Download size={14} className="mr-1.5" /> 
                             {notice.fileSize}
                          </>
                       ) : (
                          <>
                             <FileText size={14} className="mr-1.5" /> 
                             Lire la suite
                          </>
                       )}
                    </button>
                 </div>
               </div>
             ))}
           </div>
         ) : (
           <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
                 <Search size={24} />
              </div>
              <p className="font-medium">Aucun affichage trouvé.</p>
              <button onClick={() => setFilter('TOUT')} className="text-brand-600 text-sm font-bold mt-2 hover:underline">
                 Réinitialiser les filtres
              </button>
           </div>
         )}
      </div>

      <div className="flex items-start bg-blue-50 p-4 rounded-xl border border-blue-100">
         <CheckCircle2 size={20} className="text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
         <div>
            <p className="font-bold text-blue-900 text-sm">Authenticité des documents</p>
            <p className="text-xs text-blue-700 mt-1">
               Seuls les documents affichés ici ou portant le cachet physique de l'administration font foi. 
               Pour toute réclamation, veuillez vous adresser au service de la scolarité.
            </p>
         </div>
      </div>

      {/* MODAL / POPUP DE LECTURE */}
      {selectedNotice && (
        <div 
           className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/70 backdrop-blur-sm animate-in fade-in duration-200"
           onClick={() => setSelectedNotice(null)}
        >
           <div 
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
           >
              {/* Modal Header */}
              <div className="bg-gray-50 border-b border-gray-100 p-4 flex justify-between items-center sticky top-0 z-10">
                 <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded border uppercase tracking-wider ${getCategoryColor(selectedNotice.category)}`}>
                       {selectedNotice.category}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center">
                       <Calendar size={12} className="mr-1" /> {selectedNotice.date}
                    </span>
                 </div>
                 <button 
                    onClick={() => setSelectedNotice(null)}
                    className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full text-gray-600 transition-colors"
                 >
                    <X size={20} />
                 </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
                 <h2 className="text-2xl font-bold text-gray-900 mb-6 font-title">{selectedNotice.title}</h2>
                 <div className="prose prose-sm md:prose-base max-w-none text-gray-700 whitespace-pre-line leading-relaxed">
                    {selectedNotice.content}
                 </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
                 {selectedNotice.fileSize ? (
                    <button className="flex items-center px-4 py-2 bg-brand-600 text-white rounded-xl font-bold hover:bg-brand-700 transition-colors shadow-lg shadow-brand-200">
                       <Download size={18} className="mr-2" />
                       Télécharger le document ({selectedNotice.fileSize})
                    </button>
                 ) : (
                    <button 
                       onClick={() => setSelectedNotice(null)}
                       className="px-6 py-2 bg-gray-200 text-gray-800 rounded-xl font-bold hover:bg-gray-300 transition-colors"
                    >
                       Fermer
                    </button>
                 )}
              </div>
           </div>
        </div>
      )}

    </div>
  );
};

export default NoticeBoard;