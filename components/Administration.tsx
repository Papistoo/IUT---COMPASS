

import React, { useState } from 'react';
import { ArrowLeft, Building2, UserCog, FileText, CreditCard, Wifi, BookOpen, HeartPulse, ShieldCheck, Mail, MapPin, Search, X, Filter, ChevronRight } from 'lucide-react';

interface AdministrationProps {
  onBack: () => void;
}

const Administration: React.FC<AdministrationProps> = ({ onBack }) => {
  const [activeCategory, setActiveCategory] = useState('TOUT');
  const [searchQuery, setSearchQuery] = useState('');

  const services = [
    {
      id: 'direction',
      title: "Direction Générale",
      role: "Pilotage Stratégique",
      category: "DIRECTION",
      description: "Le cœur décisionnel de l'IUT. Elle coordonne l'ensemble des départements, définit la politique académique et assure les relations institutionnelles.",
      icon: Building2,
      color: "text-brand-600",
      bg: "bg-brand-50",
      border: "border-brand-100"
    },
    {
      id: 'scolarite',
      title: "Service Scolarité",
      role: "Gestion des Étudiants",
      category: "SCOLARITÉ",
      description: "Votre point de contact principal pour les inscriptions, les dossiers administratifs, les relevés de notes et la délivrance des diplômes.",
      icon: UserCog,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-100"
    },
    {
      id: 'secretariat',
      title: "Secrétariat Principal",
      role: "Administration Centrale",
      category: "DIRECTION",
      description: "Assure la gestion du courrier, l'organisation des conseils d'administration et l'accueil institutionnel.",
      icon: FileText,
      color: "text-slate-600",
      bg: "bg-slate-50",
      border: "border-slate-100"
    },
    {
      id: 'compta',
      title: "Service Comptabilité",
      role: "Finances & Bourses",
      category: "SCOLARITÉ",
      description: "Gère le paiement des frais d'inscription, le budget de l'établissement et le suivi financier des projets étudiants.",
      icon: CreditCard,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-100"
    },
    {
      id: 'dsi',
      title: "Service Informatique",
      role: "Support Technique & Réseau",
      category: "SUPPORT",
      description: "Maintenance du parc informatique, gestion du réseau Wi-Fi campus et support pour les plateformes numériques.",
      icon: Wifi,
      color: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-100"
    },
    {
      id: 'bibliotheque',
      title: "Bibliothèque",
      role: "Ressources Documentaires",
      category: "SUPPORT",
      description: "Espace de travail calme offrant l'accès à des milliers d'ouvrages physiques et numériques pour vos recherches.",
      icon: BookOpen,
      color: "text-orange-600",
      bg: "bg-orange-50",
      border: "border-orange-100"
    },
    {
      id: 'infirmerie',
      title: "Infirmerie",
      role: "Santé & Prévention",
      category: "SUPPORT",
      description: "Service de soins primaires, conseils médicaux et accompagnement psychologique pour le bien-être des étudiants.",
      icon: HeartPulse,
      color: "text-red-500",
      bg: "bg-red-50",
      border: "border-red-100"
    },
    {
      id: 'securite',
      title: "Service Sécurité",
      role: "Sûreté du Campus",
      category: "SUPPORT",
      description: "Veille à la protection des biens et des personnes au sein de l'établissement 24h/24 et 7j/7.",
      icon: ShieldCheck,
      color: "text-gray-700",
      bg: "bg-gray-100",
      border: "border-gray-200"
    }
  ];

  const categories = ['TOUT', 'DIRECTION', 'SCOLARITÉ', 'SUPPORT'];

  const filteredServices = services.filter(service => {
    const matchesCategory = activeCategory === 'TOUT' || service.category === activeCategory;
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          service.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-24 animate-in fade-in slide-in-from-bottom-8 duration-500 font-sans relative">
      
      {/* Header Navigation & Search - REMOVED STICKY */}
      <div className="bg-gray-50 pt-2 pb-3 border-b border-gray-200">
        <div className="flex items-center space-x-4 px-2 mb-3">
          <button 
            onClick={onBack}
            className="p-2 bg-white rounded-full shadow-sm border border-gray-200 text-gray-600 hover:text-brand-600 transition-colors active:scale-95"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-900 font-title leading-none">Administration</h1>
            <p className="text-xs text-gray-500 mt-1">Services & Contacts</p>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col gap-3 px-2">
           {/* Search Input */}
           <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                 type="text" 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 placeholder="Rechercher (ex: Bourse, Stage...)"
                 className="w-full pl-10 pr-10 py-2.5 bg-white border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none text-sm appearance-none"
              />
              {searchQuery && (
                 <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                 >
                    <X size={16} />
                 </button>
              )}
           </div>

           {/* Category Pills (Horizontal Scroll) */}
           <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar -mx-2 px-2">
              {categories.map(cat => (
                 <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all border flex-shrink-0 ${
                       activeCategory === cat 
                       ? 'bg-brand-600 text-white border-brand-600 shadow-md' 
                       : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                    }`}
                 >
                    {cat}
                 </button>
              ))}
           </div>
        </div>
      </div>

      {/* Services List */}
      <div className="px-1">
         <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider flex items-center">
               <Filter size={14} className="mr-2" />
               {filteredServices.length} Résultat(s)
            </h3>
         </div>
         
         {filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
               {filteredServices.map((service) => (
                  <div 
                     key={service.id} 
                     className={`group bg-white p-4 md:p-6 rounded-2xl shadow-sm border ${service.border} hover:shadow-lg transition-all duration-300 flex flex-row md:flex-col items-center md:items-start relative overflow-hidden active:scale-[0.99] cursor-pointer`}
                  >
                     {/* Mobile Layout: Row (Compact) / Desktop Layout: Column (Detailed) */}
                     
                     {/* Icon Container */}
                     <div className={`p-3 rounded-xl ${service.bg} ${service.color} md:mb-4 flex-shrink-0 mr-4 md:mr-0 group-hover:scale-110 transition-transform duration-300`}>
                        <service.icon size={24} className="md:w-7 md:h-7" />
                     </div>

                     <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                           <div>
                              <span className={`text-[9px] md:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${service.bg} ${service.color} mb-1 inline-block`}>
                                 {service.role}
                              </span>
                              <h4 className="text-base md:text-lg font-bold text-gray-900 font-title group-hover:text-brand-700 transition-colors truncate pr-2">
                                 {service.title}
                              </h4>
                           </div>
                           {/* Chevron only visible on mobile for affordance */}
                           <ChevronRight size={20} className="text-gray-300 md:hidden flex-shrink-0 mt-2" />
                        </div>
                        
                        <p className="text-xs md:text-sm text-gray-600 leading-relaxed mt-1 md:mt-2 line-clamp-2 md:line-clamp-none">
                           {service.description}
                        </p>
                     </div>
                  </div>
               ))}
            </div>
         ) : (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
               <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Search size={24} />
               </div>
               <p className="font-medium text-center px-6">Aucun service ne correspond à "{searchQuery}".</p>
               <button onClick={() => {setSearchQuery(''); setActiveCategory('TOUT');}} className="mt-4 px-4 py-2 bg-brand-50 text-brand-700 rounded-lg text-sm font-bold hover:bg-brand-100 transition-colors">
                  Réinitialiser
               </button>
            </div>
         )}
      </div>

      {/* Contact Rapide Footer */}
      <div className="bg-slate-900 rounded-2xl p-6 text-white text-center shadow-xl mx-1">
         <h4 className="font-bold text-lg mb-2">Une question spécifique ?</h4>
         <p className="text-slate-400 text-sm mb-6">Si vous ne trouvez pas le service concerné, contactez le standard.</p>
         <div className="flex flex-col sm:flex-row justify-center gap-3">
            <button className="inline-flex items-center justify-center bg-brand-600 hover:bg-brand-500 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-lg active:scale-95">
               <Mail size={18} className="mr-2" />
               Email Administration
            </button>
            <div className="inline-flex items-center justify-center bg-slate-800 text-slate-300 font-bold py-3 px-6 rounded-xl border border-slate-700">
               <ClockIcon className="w-4 h-4 mr-2" />
               08h00 - 16h30
            </div>
         </div>
      </div>

    </div>
  );
};

// Simple Clock Icon Component for internal use
const ClockIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

export default Administration;