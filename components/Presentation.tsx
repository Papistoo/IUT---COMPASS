
import React, { useState } from 'react';
import { 
  Building, GraduationCap, Users, Globe, Network, 
  Briefcase, Code, TrendingUp, Plane, Phone, Mail, 
  MapPin, Facebook, Linkedin, Twitter, ExternalLink,
  ChevronRight, CheckCircle2, Music, Heart, ClipboardList, Bell, Search
} from 'lucide-react';
import { DepartmentDetail, ViewState } from '../types';

interface PresentationProps {
  onNavigate?: (view: ViewState) => void;
  searchQuery?: string;
}

// --- DATA: DEPARTMENTS ---
const DEPARTMENTS: DepartmentDetail[] = [
  {
    id: 'gea',
    title: 'Gestion des Entreprises et Administrations',
    shortName: 'Pôle GEA',
    description: "Le pôle GEA forme les futurs cadres capables de piloter la stratégie financière, comptable et humaine des organisations modernes.",
    role: "Pilotage financier, RH et stratégique",
    filieres: ['Finance-Banque', 'Comptabilité (CGE)', 'Logistique (MLT)', 'Ressources Humaines (GRH)'],
    iconName: 'TrendingUp'
  },
  {
    id: 'tc',
    title: 'Techniques de Commercialisation',
    shortName: 'Pôle TC',
    description: "Ce département prépare aux métiers de la vente, du marketing et de la communication stratégique dans un environnement concurrentiel.",
    role: "Marketing, Vente et Communication",
    filieres: ['Management Commercial (MUC)', 'Communication des Entreprises (CE)'],
    iconName: 'Briefcase'
  },
  {
    id: 'di',
    title: 'Département Informatique',
    shortName: 'Pôle DI',
    description: "Moteur de la transformation digitale, ce pôle assure la maîtrise des infrastructures réseaux et le développement de systèmes d'information robustes.",
    role: "Infrastructures IT et Développement",
    filieres: ['Maintenance & Réseaux (MIR)', 'Informatique de Gestion (IG)'],
    iconName: 'Code'
  },
  {
    id: 'ght',
    title: 'Gestion Hôtelière et Touristique',
    shortName: 'Pôle GHT',
    description: "Dédié à l'industrie de l'accueil, ce département forme des experts pour valoriser le patrimoine touristique et gérer des structures hôtelières de prestige.",
    role: "Hôtellerie, Tourisme et Accueil",
    filieres: ['Hôtellerie', 'Tourisme'],
    iconName: 'Plane'
  }
];

const Presentation: React.FC<PresentationProps> = ({ onNavigate, searchQuery = '' }) => {
  const [selectedEntity, setSelectedEntity] = useState<string | null>(null);

  const getDepartment = (id: string) => DEPARTMENTS.find(d => d.id === id);
  const activeDept = selectedEntity ? getDepartment(selectedEntity) : null;

  const scrollToContact = () => {
    const el = document.getElementById('contacts-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  // Filter Logic
  const filteredDepartments = DEPARTMENTS.filter(dept => 
     !searchQuery || 
     dept.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     dept.shortName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
     dept.filieres.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const missions = [
    { title: "Formation Initiale", icon: GraduationCap, desc: "Former des techniciens supérieurs et ingénieurs qualifiés." },
    { title: "Formation Continue", icon: TrendingUp, desc: "Perfectionner les cadres en activité pour booster leur carrière." },
    { title: "Recherche Appliquée", icon: Network, desc: "Innover en lien direct avec les industries et administrations." },
    { title: "Collaboration", icon: Globe, desc: "Coopérer avec les institutions nationales et la diaspora." }
  ];

  const filteredMissions = missions.filter(m => 
    !searchQuery || 
    m.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    m.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const showAccessCards = !searchQuery; // Hide access cards if searching specific departments/missions

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20 font-sans">
      
      {/* 1. HERO SECTION (Only if no search) */}
      {!searchQuery && (
        <div className="relative bg-white rounded-3xl shadow-lg border border-brand-100 overflow-hidden text-center p-8 md:p-12">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-400 to-brand-600"></div>
          <div className="mb-6 inline-flex p-4 bg-brand-50 rounded-full text-brand-600 shadow-sm">
            <Building size={48} strokeWidth={1.5} />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-brand-800 font-title mb-3 tracking-tight">
            IUT de Tahoua
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Un pôle d'excellence technologique au service du développement, formant les cadres de demain.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <button 
              onClick={scrollToContact}
              className="px-6 py-3 bg-brand-600 text-white font-bold rounded-xl shadow-lg shadow-brand-200 hover:bg-brand-700 hover:-translate-y-1 transition-all flex items-center"
            >
              Nous contacter <ChevronRight size={18} className="ml-2" />
            </button>
            <a 
              href="https://www.iut-udh.ne" 
              target="_blank" 
              rel="noreferrer"
              className="px-6 py-3 bg-white text-brand-700 border-2 border-brand-100 font-bold rounded-xl hover:bg-brand-50 hover:border-brand-200 transition-all flex items-center"
            >
              Site Web <ExternalLink size={18} className="ml-2" />
            </a>
          </div>
        </div>
      )}

      {/* 2. ACCÈS RAPIDES (VIE ÉTUDIANTE & TABLEAU D'AFFICHAGE) */}
      {showAccessCards && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* CARTE TABLEAU D'AFFICHAGE (NEW) */}
          {onNavigate && (
             <div 
               onClick={() => onNavigate('NOTICE_BOARD')}
               className="relative bg-slate-900 rounded-3xl p-8 shadow-xl cursor-pointer hover:shadow-2xl hover:scale-[1.01] transition-all group overflow-hidden border border-slate-700"
             >
               <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
               
               <div className="relative z-10 flex justify-between items-start h-full flex-col">
                 <div className="w-full flex justify-between items-start mb-6">
                    <div className="bg-slate-800 p-3 rounded-xl text-yellow-400 border border-slate-700 group-hover:bg-yellow-400 group-hover:text-slate-900 transition-colors duration-300">
                       <ClipboardList size={32} />
                    </div>
                    <div className="flex items-center space-x-1">
                       <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                       <span className="text-[10px] font-bold text-slate-400 uppercase">Nouveaux avis</span>
                    </div>
                 </div>
                 
                 <div>
                    <h2 className="text-2xl font-bold text-white font-title mb-2 group-hover:text-yellow-400 transition-colors">Tableau d'Affichage</h2>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4">
                       Consultez les notes de services officielles, résultats d'examens et communiqués administratifs.
                    </p>
                    <span className="text-sm font-bold text-white flex items-center group-hover:underline">
                       Voir les documents <ChevronRight size={16} className="ml-1" />
                    </span>
                 </div>
               </div>
             </div>
          )}

          {/* CARTE VIE ETUDIANTE */}
          {onNavigate && (
            <div 
              onClick={() => onNavigate('STUDENT_LIFE')}
              className="relative bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 shadow-xl cursor-pointer hover:shadow-2xl hover:scale-[1.01] transition-all group overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-pink-500/20 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none"></div>
              
              <div className="relative z-10 flex flex-col justify-between h-full">
                 <div className="flex justify-between items-start mb-6">
                    <div className="bg-white/10 p-3 rounded-xl text-white backdrop-blur-sm border border-white/20 group-hover:bg-white group-hover:text-purple-600 transition-colors duration-300">
                       <Music size={32} />
                    </div>
                    <div className="inline-flex items-center px-2 py-1 rounded-full bg-white/20 border border-white/20 text-white text-[10px] font-bold backdrop-blur-md">
                       <Heart size={10} className="mr-1 fill-white" /> Campus Life
                    </div>
                 </div>

                 <div>
                   <h2 className="text-2xl font-bold text-white font-title mb-2">Vie Étudiante</h2>
                   <p className="text-indigo-100 text-sm leading-relaxed mb-4">
                     Clubs, voyages d'études, compétitions sportives (Coupe du Directeur) et vie associative.
                   </p>
                   <span className="text-sm font-bold text-white flex items-center group-hover:underline">
                     Explorer les activités <ChevronRight size={16} className="ml-1" />
                   </span>
                 </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. MISSIONS (Slider/Grid) */}
      {filteredMissions.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-brand-800 mb-6 font-title border-l-4 border-brand-500 pl-4">
            Nos Missions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
            {filteredMissions.map((mission, idx) => (
              <div key={idx} className="group bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-brand-300 hover:shadow-md transition-all duration-300 flex flex-col md:flex-row items-center md:items-start text-center md:text-left h-full">
                <div className="p-3 bg-brand-50 text-brand-600 rounded-xl mb-3 md:mb-0 md:mr-4 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300 flex-shrink-0">
                  <mission.icon size={24} className="md:w-7 md:h-7" />
                </div>
                <div>
                  <h3 className="text-sm md:text-lg font-bold text-gray-900 font-title mb-1 md:mb-2 leading-tight">{mission.title}</h3>
                  <p className="text-xs md:text-sm text-gray-600 leading-relaxed">{mission.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. ORGANIGRAMME INTERACTIF (Filtered) */}
      <div className="bg-slate-50 rounded-3xl p-6 md:p-8 border border-slate-200">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-brand-800 font-title">Organigramme Administratif</h2>
          <p className="text-sm text-gray-500 mt-2">Cliquez sur un département pour voir les détails</p>
        </div>

        {/* Tree Structure */}
        <div className="flex flex-col items-center">
          
          {/* Level 1: Director */}
          {!searchQuery && (
             <div className="relative z-10 mb-8">
               <div className="bg-brand-800 text-white px-8 py-4 rounded-xl shadow-lg font-bold font-title text-center transform hover:scale-105 transition-transform cursor-pointer border-4 border-white">
                 Directeur de l'IUT
               </div>
               <div className="absolute left-1/2 -translate-x-1/2 top-full h-8 w-0.5 bg-gray-300"></div>
             </div>
          )}

          {/* Level 2: Secrétariat */}
          {!searchQuery && (
             <div className="relative z-10 mb-8">
               <div 
                 onClick={() => setSelectedEntity('secretariat')}
                 className={`bg-white px-6 py-3 rounded-lg shadow-md border-2 font-semibold text-gray-700 cursor-pointer transition-all hover:border-brand-400 ${selectedEntity === 'secretariat' ? 'border-brand-500 ring-2 ring-brand-100' : 'border-gray-200'}`}
               >
                 Secrétariat Principal
               </div>
               <div className="absolute left-1/2 -translate-x-1/2 top-full h-8 w-0.5 bg-gray-300"></div>
             </div>
          )}

          {/* Level 3: Departments Branch */}
          <div className="w-full max-w-3xl relative">
            {/* Horizontal Connector (Only show if not searching or all are shown) */}
            {!searchQuery && <div className="absolute top-0 left-4 right-4 h-0.5 bg-gray-300 hidden md:block"></div>}
            
            {filteredDepartments.length > 0 ? (
               <div className={`grid grid-cols-1 md:grid-cols-${Math.min(filteredDepartments.length, 4)} gap-4 pt-8 md:pt-4`}>
                  {filteredDepartments.map((dept) => {
                    const isActive = selectedEntity === dept.id;
                    const Icons = { TrendingUp, Briefcase, Code, Plane };
                    // @ts-ignore
                    const Icon = Icons[dept.iconName] || Building;

                    return (
                      <div key={dept.id} className="relative flex flex-col items-center">
                         {!searchQuery && <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-4 h-4 w-0.5 bg-gray-300 hidden md:block"></div>}
                         <button
                           onClick={() => setSelectedEntity(dept.id)}
                           className={`w-full md:w-auto p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center text-center bg-white shadow-sm hover:shadow-md ${isActive ? 'border-brand-500 bg-brand-50 transform -translate-y-1' : 'border-gray-200 hover:border-brand-300'}`}
                         >
                           <Icon size={24} className={`mb-2 ${isActive ? 'text-brand-600' : 'text-gray-400'}`} />
                           <span className={`text-xs font-bold font-title leading-tight ${isActive ? 'text-brand-800' : 'text-gray-700'}`}>
                             {dept.shortName || dept.title}
                           </span>
                         </button>
                      </div>
                    );
                  })}
               </div>
            ) : (
               <div className="text-center text-gray-500 py-4">Aucun département ne correspond à votre recherche.</div>
            )}
          </div>
        </div>

        {/* DETAILS PANEL (Appears when clicked) */}
        {selectedEntity && (
          <div className="mt-8 animate-in slide-in-from-bottom-4 duration-300">
            {selectedEntity === 'secretariat' ? (
               <div className="bg-white p-6 rounded-2xl border-l-4 border-brand-500 shadow-md">
                 <h3 className="text-xl font-bold text-gray-900 font-title mb-2">Secrétariat Principal</h3>
                 <p className="text-gray-600 mb-4">Le cœur administratif de l'institut.</p>
                 <ul className="space-y-2">
                   <li className="flex items-center text-sm text-gray-700"><CheckCircle2 size={16} className="text-brand-500 mr-2" /> Organisation technique administrative</li>
                   <li className="flex items-center text-sm text-gray-700"><CheckCircle2 size={16} className="text-brand-500 mr-2" /> Préparation des réunions et conseils</li>
                   <li className="flex items-center text-sm text-gray-700"><CheckCircle2 size={16} className="text-brand-500 mr-2" /> Rédaction des rapports et archivage</li>
                 </ul>
               </div>
            ) : activeDept ? (
              <div className="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
                <div className="bg-brand-600 p-4 text-white flex justify-between items-center">
                   <h3 className="font-bold text-lg font-title">{activeDept.title}</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 leading-relaxed mb-6 font-medium">
                    {activeDept.description}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <h4 className="text-xs font-bold text-gray-400 uppercase mb-3 tracking-wider">Filières Rattachées</h4>
                      <ul className="space-y-2">
                        {activeDept.filieres.map((f, i) => (
                          <li key={i} className="flex items-start text-sm text-gray-800 font-semibold">
                            <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-brand-50 p-4 rounded-xl border border-brand-100">
                      <h4 className="text-xs font-bold text-brand-400 uppercase mb-2 tracking-wider">Missions Clés</h4>
                      <div className="flex items-center text-brand-900 font-bold mb-2">
                         {activeDept.role}
                      </div>
                      <button className="text-xs bg-white text-brand-600 px-3 py-2 rounded-lg font-bold border border-brand-200 shadow-sm w-full hover:bg-brand-600 hover:text-white transition-colors">
                        Explorer le pôle
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>

      {/* 5. LOCALISATION (MAP SECTION) */}
      {!searchQuery && (
      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-8 pb-4">
           <h2 className="text-2xl font-bold text-brand-800 font-title mb-2 border-l-4 border-brand-500 pl-4">
             Localisation
           </h2>
           <p className="text-gray-600 pl-5">
             Le campus de l'IUT est situé au sein de l'Université de Tahoua.
           </p>
        </div>
        <div className="w-full h-96 relative bg-gray-100">
           <iframe 
             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3896.671387661854!2d5.249487376036669!3d14.896207985624734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x11d08e1e0a2d45a7%3A0x6b8f36502280598!2sUniversit%C3%A9%20de%20Tahoua!5e0!3m2!1sfr!2sne!4v1709907106888!5m2!1sfr!2sne" 
             width="100%" 
             height="100%" 
             style={{ border: 0 }} 
             allowFullScreen={true} 
             loading="lazy" 
             referrerPolicy="no-referrer-when-downgrade"
             className="grayscale hover:grayscale-0 transition-all duration-700"
             title="Carte de l'Université de Tahoua"
           ></iframe>
           
           {/* Overlay Card */}
           <div className="absolute bottom-4 left-4 right-4 md:right-auto md:w-80 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/50">
              <div className="flex items-start">
                 <div className="bg-brand-100 p-2 rounded-lg text-brand-600 mr-3">
                    <MapPin size={20} />
                 </div>
                 <div>
                    <h4 className="font-bold text-gray-900 text-sm">Adresse Postale</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Université de Tahoua<br/>
                      Route Nationale N1<br/>
                      BP 418, Tahoua
                    </p>
                    <a 
                      href="https://maps.google.com?q=Université+de+Tahoua" 
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex items-center text-xs font-bold text-brand-600 hover:text-brand-800"
                    >
                      Obtenir l'itinéraire <ChevronRight size={14} />
                    </a>
                 </div>
              </div>
           </div>
        </div>
      </div>
      )}

      {/* 6. CONTACTS UTILES */}
      <div id="contacts-section" className="bg-brand-900 text-white rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-accent-500/20 rounded-full -ml-10 -mb-10 blur-2xl pointer-events-none"></div>

        <h2 className="text-2xl font-bold font-title mb-8 relative z-10 text-center md:text-left">Contacts & Réseaux</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          <div className="space-y-4">
             <div className="flex items-center p-4 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-colors group cursor-pointer">
                <div className="bg-white text-brand-900 p-2 rounded-lg mr-4 group-hover:scale-110 transition-transform">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs text-brand-200 uppercase font-bold">Standard Direction</p>
                  <p className="font-bold text-lg">+227 20 610 648</p>
                </div>
             </div>

             <div className="flex items-center p-4 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-colors group cursor-pointer">
                <div className="bg-white text-brand-900 p-2 rounded-lg mr-4 group-hover:scale-110 transition-transform">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs text-brand-200 uppercase font-bold">Email Officiel</p>
                  <p className="font-bold text-lg">iut@udh.edu.ne</p>
                </div>
             </div>
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <p className="text-brand-200 text-sm mb-4">Suivez l'actualité de l'IUT sur nos réseaux officiels :</p>
              <div className="flex gap-3">
                <a href="#" className="p-3 bg-blue-600 rounded-full hover:scale-110 transition-transform shadow-lg"><Facebook size={20} /></a>
                <a href="#" className="p-3 bg-sky-500 rounded-full hover:scale-110 transition-transform shadow-lg"><Twitter size={20} /></a>
                <a href="#" className="p-3 bg-blue-700 rounded-full hover:scale-110 transition-transform shadow-lg"><Linkedin size={20} /></a>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-white/10 flex items-start">
               <MapPin className="text-accent-500 mr-3 mt-1 flex-shrink-0" />
               <p className="text-sm text-brand-100">
                 Campus Universitaire de Tahoua<br/>
                 BP : 418, Tahoua, NIGER
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Presentation;
