
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Mic2, Bus, Trophy, Play, Users, MapPin, Calendar, Star, Lightbulb, Rocket, Medal, CheckCircle2, Info, CreditCard, Globe, Ticket, Monitor, Percent, GraduationCap, Briefcase, TrendingUp, Truck, Wifi, Database, Megaphone, Layout, Hotel, ChefHat, School, Image as ImageIcon, BookOpen, Download, Shirt, Coffee, Home, HeartPulse, FileText, Compass, AlertCircle, X, Send, Search, User, Maximize2, ChevronLeft, ChevronRight, ZoomIn, Map, Footprints, CornerDownRight, Landmark, Eye, Navigation, Sparkles, ExternalLink, Library } from 'lucide-react';
import { ViewState } from '../types';
import LazyImage from './LazyImage';

interface StudentLifeProps {
  onBack: () => void;
  searchQuery?: string;
}

type SectionType = 'MAIN' | 'ORATORY' | 'TRIP' | 'FOOTBALL' | 'CONCIT' | 'IDCARD' | 'ACADEMICS' | 'CAMPUS' | 'GUIDE' | 'LOCATIONS';

const StudentLife: React.FC<StudentLifeProps> = ({ onBack, searchQuery = '' }) => {
  const [activeSection, setActiveSection] = useState<SectionType>('MAIN');
  const [selectedGuideStep, setSelectedGuideStep] = useState<any | null>(null);
  const [applicationToast, setApplicationToast] = useState<string | null>(null);
  const [academicsSearchQuery, setAcademicsSearchQuery] = useState('');
  
  // State for Campus Gallery
  const [activeCampusFilter, setActiveCampusFilter] = useState('TOUT');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // State for Location Navigation
  const [activeLocationFilter, setActiveLocationFilter] = useState('TOUT');
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);

  // SCROLL TO TOP ON SECTION CHANGE
  useEffect(() => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeSection, selectedLocationId]); // Added selectedLocationId to scroll top on detail view

  const handleApply = (majorName: string) => {
    // Redirection immédiate vers la plateforme officielle
    window.open('https://udh.campusniger.com/', '_blank');
    
    // Feedback visuel pour l'utilisateur
    setApplicationToast(`Redirection vers le portail d'inscription (CampusNiger)...`);
    setTimeout(() => {
      setApplicationToast(null);
    }, 3000);
  };

  // ... (Keep existing renderOratory, renderTrip, renderFootball, renderConcit, renderIdCard, renderAcademics, renderCampus, renderGuide functions as is) ...
  // NOTE: In the real file, I am keeping the previous render functions. I will only replace renderLocations below.

  // 1. ART ORATOIRE
  const renderOratory = () => (
    <div className="animate-in slide-in-from-right duration-500 space-y-6 pb-20">
      <div className="bg-gradient-to-r from-purple-900 to-purple-700 text-white p-8 rounded-3xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
        <h2 className="text-3xl font-bold font-title mb-2">Club Art Oratoire</h2>
        <p className="text-purple-100">La parole est une arme, apprenez à la maîtriser.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
           {/* Animation Personne qui parle */}
           <div className="relative w-32 h-32 flex-shrink-0 flex items-center justify-center bg-purple-50 rounded-full">
              <div className="absolute inset-0 bg-purple-400 rounded-full opacity-20 animate-soundwave"></div>
              <div className="absolute inset-2 bg-purple-400 rounded-full opacity-20 animate-soundwave" style={{animationDelay: '0.5s'}}></div>
              <Mic2 size={48} className="text-purple-600 relative z-10" />
           </div>
           
           <div>
             <h3 className="text-xl font-bold text-gray-900 mb-2">Formation d'Excellence</h3>
             <p className="text-gray-600 leading-relaxed text-sm">
               À l'IUT de Tahoua, nous ne formons pas seulement des techniciens, mais des leaders. 
               Le club d'Art Oratoire offre des ateliers hebdomadaires sur les techniques de 
               <strong> prise de parole en public</strong>, la gestion du stress, l'argumentation et le débat contradictoire.
             </p>
           </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
           <div className="flex items-start p-3 bg-purple-50 rounded-xl">
              <Star className="text-purple-600 mt-1 mr-3 flex-shrink-0" size={18} />
              <p className="text-sm text-gray-700">Participation aux compétitions nationales de débat.</p>
           </div>
           <div className="flex items-start p-3 bg-purple-50 rounded-xl">
              <Users className="text-purple-600 mt-1 mr-3 flex-shrink-0" size={18} />
              <p className="text-sm text-gray-700">Coaching personnalisé par des experts en communication.</p>
           </div>
        </div>
      </div>

      {/* NEW: VISUAL ANIMATION SECTION - THE DUEL */}
      <div className="my-8 rounded-2xl overflow-hidden shadow-xl border border-gray-800 bg-gray-900 relative">
          {/* Stage Lighting Effect */}
          <div className="absolute top-0 left-1/4 w-32 h-64 bg-purple-600/20 blur-3xl transform -skew-x-12 pointer-events-none"></div>
          <div className="absolute top-0 right-1/4 w-32 h-64 bg-amber-600/20 blur-3xl transform skew-x-12 pointer-events-none"></div>
          
          <div className="bg-gradient-to-b from-gray-800/80 to-gray-900 p-6 md:p-8">
             <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-bold text-white uppercase tracking-widest border border-white/20 px-2 py-1 rounded">La Grande Joute</span>
                <div className="flex items-center gap-1">
                   <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                   <span className="text-[10px] text-red-400 font-bold uppercase">En direct</span>
                </div>
             </div>

             <div className="flex justify-between items-end relative h-48 md:h-56 pb-4">
                
                {/* TEAM 1: GOUVERNEMENT (Purple) */}
                <div className="flex flex-col items-center w-1/3 relative z-10">
                   {/* Speech Bubble Animation */}
                   <div className="absolute -top-16 -right-4 md:-right-12 bg-white text-gray-900 p-3 rounded-2xl rounded-bl-none shadow-lg animate-bounce duration-1000 origin-bottom-left max-w-[120px] md:max-w-none z-20">
                      <p className="text-[10px] md:text-xs font-bold leading-tight">L'argument est irréfutable !</p>
                   </div>
                   
                   {/* Avatars */}
                   <div className="flex items-end -space-x-4 md:-space-x-6 mb-2">
                      <div className="w-10 h-10 md:w-14 md:h-14 rounded-full border-2 border-gray-900 bg-purple-200 flex items-center justify-center transform translate-y-2">
                         <User size={20} className="text-purple-800" />
                      </div>
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-gray-900 bg-purple-100 flex items-center justify-center z-10 relative">
                         <User size={24} className="text-purple-900" />
                         <div className="absolute -bottom-1 -right-1 bg-purple-600 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full">Chef</div>
                      </div>
                      <div className="w-10 h-10 md:w-14 md:h-14 rounded-full border-2 border-gray-900 bg-purple-200 flex items-center justify-center transform translate-y-2">
                         <User size={20} className="text-purple-800" />
                      </div>
                   </div>
                   <div className="bg-purple-900/50 text-purple-200 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-purple-500/30">
                      Gouvernement
                   </div>
                </div>

                {/* CENTER STAGE */}
                <div className="flex flex-col items-center justify-end h-full w-1/3 pb-2 opacity-80">
                   <div className="w-1 md:w-1.5 h-20 md:h-24 bg-gray-600 rounded-full relative mb-[-4px]">
                      {/* Mic Head */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-8 md:w-8 md:h-10 bg-gray-400 rounded-full border-2 border-gray-500 grid grid-cols-3 gap-[1px] overflow-hidden shadow-inner">
                         <div className="bg-gray-500/30 col-span-3 h-full"></div>
                      </div>
                   </div>
                   <div className="w-16 h-4 bg-gray-700 rounded-full shadow-lg blur-[1px]"></div>
                   <h4 className="text-white font-black text-2xl md:text-4xl mt-4 italic opacity-20">VS</h4>
                </div>

                {/* TEAM 2: OPPOSITION (Amber) */}
                <div className="flex flex-col items-center w-1/3 relative z-10">
                   {/* Speech Bubble Animation */}
                   <div className="absolute -top-10 -left-6 md:-left-16 bg-amber-500 text-white p-3 rounded-2xl rounded-br-none shadow-lg animate-pulse delay-700 max-w-[120px] md:max-w-none z-20">
                      <p className="text-[10px] md:text-xs font-bold leading-tight">Objection, votre honneur !</p>
                   </div>

                   {/* Avatars */}
                   <div className="flex items-end -space-x-4 md:-space-x-6 mb-2">
                      <div className="w-10 h-10 md:w-14 md:h-14 rounded-full border-2 border-gray-900 bg-amber-200 flex items-center justify-center transform translate-y-2">
                         <User size={20} className="text-amber-800" />
                      </div>
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-gray-900 bg-amber-100 flex items-center justify-center z-10 relative">
                         <User size={24} className="text-amber-900" />
                         <div className="absolute -bottom-1 -left-1 bg-amber-600 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full">Chef</div>
                      </div>
                      <div className="w-10 h-10 md:w-14 md:h-14 rounded-full border-2 border-gray-900 bg-amber-200 flex items-center justify-center transform translate-y-2">
                         <User size={20} className="text-amber-800" />
                      </div>
                   </div>
                   <div className="bg-amber-900/50 text-amber-200 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-amber-500/30">
                      Opposition
                   </div>
                </div>

             </div>
             
             {/* Floor Reflection */}
             <div className="h-2 w-full bg-gradient-to-r from-purple-500/30 via-white/10 to-amber-500/30 blur-md rounded-full mt-2"></div>
          </div>
      </div>

      {/* Videos Section */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
          <Play size={20} className="mr-2 text-purple-600 fill-current" />
          Prestations & Concours
        </h3>
        
        <div className="flex flex-col md:flex-row gap-6 overflow-x-auto pb-4">
          {/* VIDEO 1 : FACEBOOK REEL */}
          <div className="flex-shrink-0 bg-black rounded-xl overflow-hidden shadow-lg border border-gray-200 w-full md:w-[300px] flex justify-center pt-2">
             <iframe 
                src="https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F2133234114144539%2F&show_text=false&width=267&t=0" 
                width="267" 
                height="476" 
                style={{border:'none', overflow:'hidden'}} 
                scrolling="no" 
                frameBorder="0" 
                allowFullScreen={true} 
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
             ></iframe>
          </div>

          {/* Placeholders for future videos */}
          <div className="flex-shrink-0 w-full md:w-[300px] bg-gray-50 rounded-xl flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 min-h-[476px]">
             <Play size={48} className="mb-2 opacity-50" />
             <span className="text-sm font-semibold">Autres vidéos à venir</span>
          </div>
        </div>
      </div>
    </div>
  );

  // 2. VOYAGE D'ETUDE
  const renderTrip = () => (
    <div className="animate-in slide-in-from-right duration-500 space-y-6 pb-20">
      <div className="bg-gradient-to-r from-sky-500 to-blue-600 text-white p-8 rounded-3xl relative overflow-hidden">
         <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
         <h2 className="text-3xl font-bold font-title mb-2">Voyages d'Étude</h2>
         <p className="text-blue-100">Découvrir le monde professionnel sur le terrain.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* ANIMATION BUS */}
        <div className="w-full h-40 bg-gray-50 rounded-xl border-b-4 border-gray-300 relative overflow-hidden mb-6 flex items-end">
           {/* Background Elements */}
           <div className="absolute bottom-10 left-10 text-gray-300"><MapPin size={40} /></div>
           <div className="absolute bottom-12 right-20 text-gray-300"><MapPin size={30} /></div>
           
           {/* The Bus Container */}
           <div className="absolute bottom-2 left-0 w-48 h-24 animate-drive z-10">
              {/* Bus Body */}
              <div className="w-full h-full bg-brand-600 rounded-lg relative shadow-md">
                 {/* Windows with Students */}
                 <div className="absolute top-2 left-2 right-12 h-10 flex gap-1">
                    {[1, 2, 3].map(w => (
                      <div key={w} className="flex-1 bg-blue-200 rounded-sm overflow-hidden relative border border-blue-300">
                         {/* Student in Uniform: Chemise Bleu Ciel (#87CEEB), Pantalon Bleu Marine (#000080) */}
                         <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-6 bg-[#87CEEB] rounded-t-full"></div> {/* Shirt */}
                         <div className="absolute top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-amber-900 rounded-full"></div> {/* Head */}
                      </div>
                    ))}
                 </div>
                 {/* Windshield */}
                 <div className="absolute top-2 right-2 w-8 h-12 bg-blue-300 rounded-r-lg opacity-50"></div>
                 {/* Wheels */}
                 <div className="absolute -bottom-3 left-4 w-8 h-8 bg-gray-800 rounded-full border-2 border-gray-400 animate-spin"></div>
                 <div className="absolute -bottom-3 right-8 w-8 h-8 bg-gray-800 rounded-full border-2 border-gray-400 animate-spin"></div>
                 {/* Stripe */}
                 <div className="absolute bottom-4 left-0 right-0 h-2 bg-yellow-400"></div>
                 {/* Text on Bus */}
                 <div className="absolute bottom-7 left-2 text-[8px] font-bold text-white uppercase tracking-wider">IUT TAHOUA</div>
              </div>
           </div>
           
           {/* Road */}
           <div className="absolute bottom-0 w-full h-1 bg-gray-400">
             <div className="w-full h-full border-t border-dashed border-white"></div>
           </div>
        </div>

        <div className="prose prose-sm max-w-none text-gray-600">
          <p className="leading-relaxed">
            L'IUT de Tahoua organise régulièrement des voyages pédagogiques pour permettre aux étudiants de confronter la théorie à la pratique.
            Ces sorties incluent des visites d'usines, de sites miniers, d'institutions financières et de complexes hôteliers.
          </p>
          <p className="mt-4 font-semibold text-brand-700">
            Note : Le port de l'uniforme réglementaire (Chemise Bleu Ciel et Pantalon Bleu Marine) est obligatoire pour représenter l'institution avec élégance et discipline lors de ces sorties.
          </p>
        </div>
      </div>

      {/* Gallery Images (Simulated with Bus Animation placeholders) */}
      <h3 className="text-lg font-bold text-gray-900">Souvenirs de voyage</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
         {[1, 2, 3].map((i) => (
           <div key={i} className="bg-gray-100 rounded-xl h-32 flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-brand-900/10 group-hover:bg-transparent transition-colors"></div>
              {/* Abstract Representation of Bus/Trip */}
              <Bus className="text-gray-400 group-hover:text-brand-500 transition-colors transform group-hover:scale-110 duration-300" size={32} />
              <div className="absolute bottom-2 left-2 text-[10px] font-bold text-gray-500 bg-white/80 px-2 py-0.5 rounded">
                Promotion 202{i+1}
              </div>
           </div>
         ))}
      </div>
    </div>
  );

  // 3. FOOTBALL
  const renderFootball = () => (
    <div className="animate-in slide-in-from-right duration-500 space-y-6 pb-20">
      <div className="bg-gradient-to-r from-emerald-600 to-green-500 text-white p-8 rounded-3xl relative overflow-hidden">
         <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
         <h2 className="text-3xl font-bold font-title mb-2">Sports & Loisirs</h2>
         <p className="text-green-100">Esprit d'équipe et compétition saine.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
           <h3 className="text-xl font-bold text-gray-900">La Coupe du Directeur</h3>
           <Trophy size={32} className="text-yellow-500 drop-shadow-sm" />
        </div>

        <p className="text-gray-600 leading-relaxed mb-6">
          Chaque année, l'IUT vibre au rythme du tournoi de football inter-filières. 
          Cette compétition majeure, baptisée <strong>"Coupe du Directeur"</strong>, vise à renforcer la cohésion sociale entre les étudiants des différents départements (Informatique, GEA, TC, GHT, etc.).
        </p>

        <div className="bg-green-50 rounded-xl p-4 border border-green-100 mb-6">
           <div className="flex items-center mb-3">
             <Calendar size={18} className="text-green-700 mr-2" />
             <span className="font-bold text-green-800 text-sm">Prochains Matchs</span>
           </div>
           <div className="space-y-3">
              <div className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm">
                 <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-800">INFO</span>
                    <span className="text-xs text-gray-400">vs</span>
                    <span className="font-bold text-gray-800">GEA</span>
                 </div>
                 <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded">14 Mars - 16h</span>
              </div>
              <div className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm">
                 <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-800">TC</span>
                    <span className="text-xs text-gray-400">vs</span>
                    <span className="font-bold text-gray-800">GHT</span>
                 </div>
                 <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded">15 Mars - 16h</span>
              </div>
           </div>
        </div>
        
        <div className="relative h-40 bg-green-600 rounded-xl flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
           {/* Field markings */}
           <div className="absolute w-full h-0.5 bg-white/30"></div>
           <div className="absolute w-20 h-20 border-2 border-white/30 rounded-full"></div>
           <div className="text-white font-title font-black text-2xl uppercase tracking-widest z-10 text-center">
             Fair Play <br/> & <br/> Excellence
           </div>
        </div>
      </div>
    </div>
  );

  // 4. CONCIT
  const renderConcit = () => (
    <div className="animate-in slide-in-from-right duration-500 space-y-6 pb-20">
      <div className="bg-gradient-to-r from-amber-600 to-orange-500 text-white p-8 rounded-3xl relative overflow-hidden">
         <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
         <div className="absolute bottom-0 left-0 w-24 h-24 bg-yellow-400/20 rounded-full blur-xl -ml-5 -mb-5"></div>
         <h2 className="text-3xl font-bold font-title mb-2">CONCIT</h2>
         <p className="text-orange-50">Concours de Créativité et d'Innovation Technologique.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
         
         {/* ANIMATION PRESENTATION */}
         <div className="relative w-full h-56 bg-gray-900 rounded-xl overflow-hidden mb-8 shadow-inner border border-gray-800 flex flex-col items-center justify-end">
             {/* Screen / Projector */}
             <div className="absolute top-4 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-blue-100/10 rounded border border-white/20 backdrop-blur-sm animate-flicker">
                {/* Simulated Chart/Project Content */}
                <div className="absolute inset-2 flex flex-col gap-2">
                   <div className="w-1/2 h-2 bg-blue-400 rounded opacity-50"></div>
                   <div className="flex gap-2 items-end h-full pb-2">
                      <div className="w-8 h-1/3 bg-green-400 rounded-t"></div>
                      <div className="w-8 h-2/3 bg-yellow-400 rounded-t"></div>
                      <div className="w-8 h-1/2 bg-red-400 rounded-t"></div>
                   </div>
                </div>
             </div>

             {/* Presenter Student */}
             <div className="absolute bottom-4 left-1/4 z-10">
                 {/* Head */}
                 <div className="w-6 h-6 bg-amber-800 rounded-full mx-auto relative z-20"></div>
                 {/* Body */}
                 <div className="w-10 h-16 bg-white rounded-t-lg mx-auto relative z-10">
                    {/* Arm Pointing */}
                    <div className="absolute top-2 right-[-5px] w-8 h-2 bg-white origin-left -rotate-45 animate-sway rounded-full"></div>
                 </div>
                 {/* Legs */}
                 <div className="flex justify-center gap-1">
                    <div className="w-3 h-8 bg-gray-700"></div>
                    <div className="w-3 h-8 bg-gray-700"></div>
                 </div>
             </div>

             {/* Jury Table & Heads */}
             <div className="w-full h-12 bg-amber-900 absolute bottom-0 z-20 flex justify-center items-end border-t-4 border-amber-950">
                 <div className="absolute -top-5 flex gap-12">
                     <div className="flex flex-col items-center">
                        <div className="w-8 h-8 bg-gray-300 rounded-full"></div> {/* Jury 1 */}
                     </div>
                     <div className="flex flex-col items-center">
                        <div className="w-8 h-8 bg-gray-400 rounded-full"></div> {/* Jury 2 */}
                     </div>
                     <div className="flex flex-col items-center">
                        <div className="w-8 h-8 bg-gray-300 rounded-full"></div> {/* Jury 3 */}
                     </div>
                 </div>
                 <span className="text-white/20 text-[10px] font-bold mb-2 uppercase tracking-[0.5em]">JURY</span>
             </div>

             {/* Light Spot */}
             <div className="absolute top-0 left-1/4 w-20 h-full bg-white/5 skew-x-12 pointer-events-none"></div>
         </div>

         <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Rocket className="text-orange-500 mr-2" />
            Innover pour demain
         </h3>
         
         <p className="text-gray-600 leading-relaxed mb-6">
            L'IUT de Tahoua organise chaque année le <strong>CONCIT</strong> pour permettre aux étudiants de présenter leurs projets innovants.
            L'objectif est double : révéler les talents et accompagner concrètement la réalisation des meilleurs projets après le concours grâce au soutien de l'institut.
         </p>

         <div className="bg-orange-50 rounded-xl p-5 border border-orange-100 mb-6">
            <h4 className="text-sm font-bold text-orange-800 uppercase mb-4 flex items-center">
               <Trophy size={16} className="mr-2" />
               Prix & Récompenses
            </h4>
            
            <div className="space-y-3">
               {/* 1st Place */}
               <div className="flex items-center bg-white p-3 rounded-lg shadow-sm border-l-4 border-yellow-400">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 font-bold mr-3">1</div>
                  <div className="flex-1">
                     <p className="font-bold text-gray-900">Grand Prix Excellence</p>
                     <p className="text-xs text-gray-500">Financement projet</p>
                  </div>
                  <span className="font-bold text-lg text-orange-600">250.000 F</span>
               </div>

               {/* 2nd Place */}
               <div className="flex items-center bg-white p-3 rounded-lg shadow-sm border-l-4 border-gray-300">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 font-bold mr-3">2</div>
                  <div className="flex-1">
                     <p className="font-bold text-gray-900">Prix Innovation</p>
                  </div>
                  <span className="font-bold text-lg text-orange-600">150.000 F</span>
               </div>

               {/* 3rd Place */}
               <div className="flex items-center bg-white p-3 rounded-lg shadow-sm border-l-4 border-orange-300">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-700 font-bold mr-3">3</div>
                  <div className="flex-1">
                     <p className="font-bold text-gray-900">Prix Créativité</p>
                  </div>
                  <span className="font-bold text-lg text-orange-600">100.000 F</span>
               </div>

               {/* 4th Place */}
               <div className="flex items-center bg-white p-2 rounded-lg border border-dashed border-gray-300 opacity-80">
                  <div className="w-6 h-6 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 font-bold mr-3 text-xs">4</div>
                  <div className="flex-1">
                     <p className="font-semibold text-gray-700 text-sm">Prix d'Encouragement</p>
                  </div>
                  <span className="font-bold text-sm text-gray-500">50.000 F</span>
               </div>
            </div>

            <div className="mt-4 flex items-start text-xs text-orange-800 bg-orange-100/50 p-3 rounded-lg border border-orange-100">
               <Info size={14} className="flex-shrink-0 mt-0.5 mr-2" />
               <p className="italic">
                 Note : Les prix pour ce concours peuvent varier chaque année selon la performance acquise et les fonds disponibles.
               </p>
            </div>
         </div>

         <div className="flex flex-col gap-2 text-sm text-gray-600 bg-gray-50 p-4 rounded-xl">
            <div className="flex items-center">
               <CheckCircle2 size={16} className="text-green-500 mr-2" />
               <span>Participation individuelle ou en équipe (max 3).</span>
            </div>
            <div className="flex items-center">
               <CheckCircle2 size={16} className="text-green-500 mr-2" />
               <span>Ouvert aux étudiants actuels et aux anciens (Alumni).</span>
            </div>
         </div>
      </div>
    </div>
  );

  // 5. CARTE ETUDIANT
  const renderIdCard = () => (
    <div className="animate-in slide-in-from-right duration-500 space-y-6 pb-20">
      <div className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white p-8 rounded-3xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
        <h2 className="text-3xl font-bold font-title mb-2">Carte Étudiant ISIC</h2>
        <p className="text-teal-100">Votre passeport international d'étudiant.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
        
        {/* CARD VISUALIZATION - REPLACED WITH LAZY IMAGE */}
        <div className="w-full max-w-sm aspect-[1.58/1] rounded-2xl shadow-2xl relative overflow-hidden mb-8 transform hover:scale-105 transition-transform duration-500 group">
           <LazyImage 
             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyj9OhnW6Fvipl8gNPSOoy2dBhha32yP1Big&s" 
             alt="Carte Etudiant ISIC IUT Tahoua" 
             className="w-full h-full object-cover"
             containerClassName="w-full h-full"
           />
           {/* Holographic Effect Shim */}
           <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out pointer-events-none"></div>
        </div>

        <div className="w-full">
           <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <CreditCard className="mr-2 text-teal-600" />
              Statut International
           </h3>
           <p className="text-gray-600 leading-relaxed mb-6">
              L'IUT de Tahoua (Université Djibo Hamani) offre la <strong>Carte ISIC (International Student Identity Card)</strong> à tous ses étudiants régulièrement inscrits.
              Reconnue par l'UNESCO, elle est bien plus qu'une simple pièce d'identité : elle est votre sésame pour prouver votre statut d'étudiant partout dans le monde.
           </p>

           <div className="bg-teal-50 rounded-xl p-5 border border-teal-100">
              <h4 className="text-sm font-bold text-teal-800 uppercase mb-4 flex items-center">
                 <Percent size={16} className="mr-2" />
                 Vos Avantages & Réductions
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="bg-white p-3 rounded-xl shadow-sm border border-teal-50 flex items-start">
                    <div className="bg-blue-100 p-2 rounded-lg text-blue-600 mr-3">
                       <Bus size={20} />
                    </div>
                    <div>
                       <p className="font-bold text-gray-800 text-sm">Voyages & Transports</p>
                       <p className="text-xs text-gray-500 mt-1">Réductions sur les billets d'avion, bus et trains au Niger et à l'international.</p>
                    </div>
                 </div>

                 <div className="bg-white p-3 rounded-xl shadow-sm border border-teal-50 flex items-start">
                    <div className="bg-purple-100 p-2 rounded-lg text-purple-600 mr-3">
                       <Monitor size={20} />
                    </div>
                    <div>
                       <p className="font-bold text-gray-800 text-sm">Logiciels & Tech</p>
                       <p className="text-xs text-gray-500 mt-1">Accès gratuit ou réduit à Office 365, Adobe CC et matériel informatique.</p>
                    </div>
                 </div>

                 <div className="bg-white p-3 rounded-xl shadow-sm border border-teal-50 flex items-start">
                    <div className="bg-pink-100 p-2 rounded-lg text-pink-600 mr-3">
                       <Ticket size={20} />
                    </div>
                    <div>
                       <p className="font-bold text-gray-800 text-sm">Culture & Loisirs</p>
                       <p className="text-xs text-gray-500 mt-1">Tarifs préférentiels musées, cinémas et événements culturels.</p>
                    </div>
                 </div>

                 <div className="bg-white p-3 rounded-xl shadow-sm border border-teal-50 flex items-start">
                    <div className="bg-orange-100 p-2 rounded-lg text-orange-600 mr-3">
                       <Globe size={20} />
                    </div>
                    <div>
                       <p className="font-bold text-gray-800 text-sm">Mobilité</p>
                       <p className="text-xs text-gray-500 mt-1">Facilite les démarches lors de stages ou d'échanges à l'étranger.</p>
                    </div>
                 </div>
              </div>
           </div>

           {/* --- SECTION VIDÉO ISIC AJOUTÉE --- */}
           <div className="mt-8 pt-8 border-t border-gray-100">
              <div className="flex flex-col items-center text-center">
                 {/* Image d'illustration */}
                 <div className="mb-6 w-full max-w-xs">
                    <LazyImage 
                      src="https://ik.imagekit.io/lfegvix1p/community1__PF0EdVIS.svg" 
                      alt="Communauté ISIC" 
                      className="w-full h-auto object-contain drop-shadow-sm"
                    />
                 </div>

                 {/* Titre et Paragraphe */}
                 <h3 className="text-lg font-bold text-gray-900 mb-2">Une communauté mondiale</h3>
                 <p className="text-sm text-gray-600 mb-6 max-w-lg leading-relaxed">
                    Rejoignez des millions d'étudiants à travers le monde. Découvrez en vidéo comment la carte ISIC facilite votre vie quotidienne et vos voyages.
                 </p>

                 {/* Lecteur Vidéo YouTube */}
                 <div className="w-full rounded-2xl overflow-hidden shadow-lg border border-gray-200 aspect-video bg-black relative">
                    <iframe 
                      width="100%" 
                      height="100%" 
                      src="https://www.youtube.com/embed/7U1W8jPaPr0" 
                      title="Présentation Carte ISIC" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                      className="absolute inset-0"
                    ></iframe>
                 </div>
              </div>
           </div>
           {/* --- FIN SECTION VIDÉO --- */}

        </div>
      </div>
    </div>
  );

  // 6. ACADEMICS (OFFRE DE FORMATION)
  const renderAcademics = () => {
     // ... (Keep existing implementation) ...
     const departments = [
        {
           id: 'GEA',
           name: 'Département GEA',
           subtitle: 'Gestion des Entreprises et Administrations',
           icon: TrendingUp,
           color: 'text-indigo-600',
           bg: 'bg-indigo-50',
           border: 'border-indigo-100',
           majors: [
              {
                 name: 'Finance Banque',
                 desc: 'Formation de techniciens supérieurs et de cadres pour les institutions financières et bancaires.',
                 degrees: 'DUT (Bac C, D, E, G2) | Licence Pro (DUT, BTS)',
                 jobs: ['Employé de banque', 'Financier d\'IMF', 'Agent des impôts', 'Assurances']
              },
              {
                 name: 'Comptabilité et Gestion (CGE)',
                 desc: 'Formation de gestionnaires-comptables pour les institutions publiques et privées.',
                 degrees: 'DUT (Bac C, D, F, G2, Pro compta) | Licence Pro',
                 jobs: ['Assistant comptable', 'Gestionnaire-comptable', 'Responsable administratif', 'Contrôleur junior']
              },
              {
                 name: 'Management Logistique et Transport (MLT)',
                 desc: 'Experts en gestion des flux, approvisionnement et organisation du transport.',
                 degrees: 'DUT (Bac C, D, F, G2) | Licence Pro',
                 jobs: ['Responsable logistique', 'Agent de transit', 'Gestionnaire de stocks', 'Organisateur de transport']
              },
              {
                 name: 'Gestion des Ressources Humaines (GRH)',
                 desc: 'Spécialisation dans le pilotage du capital humain et du dialogue social.',
                 degrees: 'Licence Professionnelle (DUT, BTS d\'État ou équivalent)',
                 jobs: ['Manageur RH', 'Assistant RH', 'Chargé de recrutement', 'Responsable paie']
              }
           ]
        },
        {
           id: 'GHT',
           name: 'Département GHT',
           subtitle: 'Gestion Hôtelière et Touristique',
           icon: Hotel,
           color: 'text-pink-600',
           bg: 'bg-pink-50',
           border: 'border-pink-100',
           majors: [
              {
                 name: 'Gestion Hôtelière et Touristique',
                 desc: 'Formation aux métiers de l\'accueil, de la restauration et du tourisme.',
                 degrees: 'DUT & Licence Pro (Bac A, G3, G1, Pro Hôtellerie)',
                 jobs: ['Gestionnaire d\'hôtels', 'Responsable restaurant', 'Organisme de tourisme', 'Guide spécialisé']
              }
           ]
        },
        {
           id: 'TC',
           name: 'Département TC',
           subtitle: 'Techniques de Commercialisation',
           icon: Megaphone,
           color: 'text-orange-600',
           bg: 'bg-orange-50',
           border: 'border-orange-100',
           majors: [
              {
                 name: 'Management des Unités Commerciales (MUC)',
                 desc: 'Formation de responsables commerciaux pour banques, assurances et télécoms.',
                 degrees: 'DUT & Licence Pro (Bac D, G3, A, Pro marketing)',
                 jobs: ['Responsable commercial', 'Gestionnaire d\'unité de vente', 'Manager d\'équipe']
              },
              {
                 name: 'Communication des Entreprises (CE)',
                 desc: 'Spécialistes des stratégies de communication, IEC et relations publiques.',
                 degrees: 'DUT & Licence Pro (Bac A4, A8, G1)',
                 jobs: ['Services de communication', 'Responsable IEC (ONG)', 'Relations publiques']
              }
           ]
        },
        {
           id: 'INFO',
           name: 'Département Informatique',
           subtitle: 'Informatique & Télécoms',
           icon: Monitor,
           color: 'text-cyan-600',
           bg: 'bg-cyan-50',
           border: 'border-cyan-100',
           majors: [
              {
                 name: 'Maintenance Informatique & Réseaux (MIR)',
                 desc: 'Techniciens de haut niveau pour l\'administration et la maintenance des parcs informatiques.',
                 degrees: 'DUT & Licence Pro (Bac C, D, F, E, Pro MIE, MI)',
                 jobs: ['Technicien systèmes et réseaux', 'Technicien support', 'Gestionnaire de parc']
              },
              {
                 name: 'Informatique de Gestion (IG)',
                 desc: 'Formation aux systèmes d\'information pour banques, assurances et administrations.',
                 degrees: 'DUT (Bac C, D, E, F, G2, Pro informatique)',
                 jobs: ['Télécommunication', 'Bio-informatique', 'Admin bases de données', 'Développeur']
              }
           ]
        }
     ];

     const filteredDepartments = departments.map(dept => {
        const query = academicsSearchQuery.toLowerCase();
        if (!query) return dept;

        // Si le nom du département correspond, on montre tout
        if (dept.name.toLowerCase().includes(query) || dept.subtitle.toLowerCase().includes(query)) {
           return dept;
        }

        // Sinon on filtre les majeures
        const matchingMajors = dept.majors.filter(major => 
            major.name.toLowerCase().includes(query) || 
            major.desc.toLowerCase().includes(query) ||
            major.jobs.some(j => j.toLowerCase().includes(query)) ||
            major.degrees.toLowerCase().includes(query)
        );

        return { ...dept, majors: matchingMajors };
     }).filter(dept => dept.majors.length > 0);

     return (
       <div className="animate-in slide-in-from-right duration-500 space-y-8 pb-24">
         <div className="bg-gradient-to-r from-indigo-800 to-indigo-600 text-white p-8 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
            <h2 className="text-3xl font-bold font-title mb-2">Offre de Formation</h2>
            <p className="text-indigo-100">Découvrez nos filières d'avenir et préparez votre carrière.</p>
         </div>

         {/* Search Bar */}
         <div className="relative z-20">
             <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                     <Search className="h-5 w-5 text-gray-400" />
                 </div>
                 <input
                     type="text"
                     className="block w-full pl-10 pr-10 py-4 border-gray-200 rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                     placeholder="Rechercher une filière, un débouché..."
                     value={academicsSearchQuery}
                     onChange={(e) => setAcademicsSearchQuery(e.target.value)}
                 />
                 {academicsSearchQuery && (
                     <button
                         onClick={() => setAcademicsSearchQuery('')}
                         className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                     >
                         <X size={18} />
                     </button>
                 )}
             </div>
         </div>

         {filteredDepartments.length > 0 ? (
            filteredDepartments.map((dept) => (
            <div key={dept.id} className="space-y-4">
               <div className="flex items-center gap-3 mb-2 px-2">
                  <div className={`p-2 rounded-lg ${dept.bg} ${dept.color}`}>
                     <dept.icon size={24} />
                  </div>
                  <div>
                     <h3 className="text-xl font-bold text-gray-900">{dept.name}</h3>
                     <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">{dept.subtitle}</p>
                  </div>
               </div>

               <div className="grid grid-cols-1 gap-4">
                  {dept.majors.map((major, idx) => (
                     <div key={idx} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                        <div className="flex justify-between items-start mb-2">
                           <h4 className="font-bold text-gray-900 text-lg">{major.name}</h4>
                           <button
                              onClick={() => handleApply(major.name)}
                              className="flex-shrink-0 ml-4 flex items-center px-3 py-1.5 bg-brand-600 text-white text-xs font-bold rounded-lg hover:bg-brand-700 hover:shadow-md transition-all active:scale-95"
                           >
                              Postuler <Send size={12} className="ml-1.5" />
                           </button>
                        </div>
                        <p className="text-sm text-gray-600 mb-4 leading-relaxed">{major.desc}</p>
                        
                        <div className="space-y-3">
                           <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                              <div className="flex items-start">
                                 <GraduationCap size={16} className="text-brand-600 mt-0.5 mr-2 flex-shrink-0" />
                                 <div>
                                    <span className="text-xs font-bold text-gray-500 uppercase block mb-1">Diplômes & Conditions</span>
                                    <p className="text-sm font-semibold text-gray-800">{major.degrees}</p>
                                 </div>
                              </div>
                           </div>
                           
                           <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                              <div className="flex items-start">
                                 <Briefcase size={16} className="text-brand-600 mt-0.5 mr-2 flex-shrink-0" />
                                 <div>
                                    <span className="text-xs font-bold text-gray-500 uppercase block mb-1">Débouchés</span>
                                    <div className="flex flex-wrap gap-1.5">
                                       {major.jobs.map((job, j) => (
                                          <span key={j} className="text-[10px] font-bold bg-white border border-gray-200 text-gray-600 px-2 py-1 rounded-md">
                                             {job}
                                          </span>
                                       ))}
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
               
               {/* Separator */}
               <div className="h-px bg-gray-200 w-full my-6"></div>
            </div>
         ))
         ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500 bg-gray-50 rounded-2xl border border-gray-100">
                <Search size={48} className="text-gray-300 mb-4" />
                <p className="font-semibold">Aucun résultat trouvé pour "{academicsSearchQuery}"</p>
                <p className="text-sm">Essayez avec d'autres mots-clés.</p>
            </div>
         )}

         {/* Toast Notification */}
         {applicationToast && (
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300 w-full px-4 md:w-auto">
               <div className="bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">{applicationToast}</span>
               </div>
            </div>
         )}
       </div>
     );
  };

  // 7. CAMPUS
  const renderCampus = () => {
     // ... (Keep existing implementation) ...
     // Categorized Images for better navigation
     const categories = ['TOUT', 'EXTÉRIEUR', 'AMPHIS', 'VIE DE CAMPUS'];
     
     const allImages = [
        { url: 'https://udh.campusniger.com/assets/tahoua-79dbcdff7d37c1a629bf42a603b1fe870361efd895d343de62a97fd74882fb68.jpg', title: "Porte d'entrée principale", category: 'EXTÉRIEUR' },
        { url: 'https://udh.edu.ne/public/img/university/uploads/blogandnews/1695374310.jpg', title: "Vue générale du campus", category: 'EXTÉRIEUR' },
        { url: 'https://udh.edu.ne/public/img/university/uploads/blogandnews/1716468933.jpg', title: "Plan de l'IUT", category: 'EXTÉRIEUR' },
        { url: 'https://udh.edu.ne/public/img/university/uploads/blogandnews/1709634846.jpg', title: "Espace Harmonie UDH", category: 'VIE DE CAMPUS' },
        { url: 'https://udh.edu.ne/public/img/university/uploads/blogandnews/1709650605.jpg', title: "Bâtiment Central UDH", category: 'EXTÉRIEUR' },
        { url: 'https://www.udh.edu.ne/university/uploads/pages/1666346095UTA28.jpg', title: "Amphithéâtre Extérieur", category: 'EXTÉRIEUR' },
        { url: 'https://udh.edu.ne/public/img/university/uploads/blogandnews/1746271852.png', title: "Intérieur Amphi - Vue 1", category: 'AMPHIS' },
        { url: 'https://www.udh.edu.ne/public/img/university/uploads/blogandnews/1746271860.png', title: "Intérieur Amphi - Vue 2", category: 'AMPHIS' },
        { url: 'https://scontent-los2-1.xx.fbcdn.net/v/t39.30808-6/352523467_627319939106774_4647440678237645390_n.png?stp=dst-jpg_tt6&_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_ohc=QTctv36jwuAQ7kNvwEgVG6O&_nc_oc=Adnkh2zq_vs3hU4M6JFe3NWCg2d20O1U_oR_YDw3tlW1JCHV79g1mpZ9yFV_Kri66ng&_nc_zt=23&_nc_ht=scontent-los2-1.xx&_nc_gid=S8VeZwcw1M13M9GUq_mBWA&oh=00_Aft8eQxkbE6WVztkwvvt60WQxC-sXE0Mdfym2hOsqn-EVQ&oe=6986C303', title: "Vie étudiante sur le campus", category: 'VIE DE CAMPUS' },
        { url: 'https://www.udh.edu.ne/university/uploads/pages/1666346095UTA28.jpg', title: "Espaces Communs", category: 'VIE DE CAMPUS' }
     ];

     const filteredImages = activeCampusFilter === 'TOUT' 
        ? allImages 
        : allImages.filter(img => img.category === activeCampusFilter);

     // Lightbox Navigation Handlers
     const openLightbox = (index: number) => setLightboxIndex(index);
     const closeLightbox = () => setLightboxIndex(null);
     const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (lightboxIndex !== null) {
           setLightboxIndex((lightboxIndex + 1) % filteredImages.length);
        }
     };
     const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (lightboxIndex !== null) {
           setLightboxIndex((lightboxIndex - 1 + filteredImages.length) % filteredImages.length);
        }
     };

     return (
        <div className="animate-in slide-in-from-right duration-500 space-y-6 pb-20 relative">
           
           {/* Header Area */}
           <div className="bg-gradient-to-r from-blue-900 to-slate-800 text-white p-8 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
              <h2 className="text-3xl font-bold font-title mb-2">Nos Campus</h2>
              <p className="text-blue-100">Immersion au cœur de l'IUT et de l'Université de Tahoua.</p>
           </div>

           {/* Filter Pills */}
           <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
             {categories.map((cat) => (
                <button
                   key={cat}
                   onClick={() => setActiveCampusFilter(cat)}
                   className={`px-4 py-2 rounded-full text-xs font-bold uppercase whitespace-nowrap transition-all duration-300 ${
                      activeCampusFilter === cat 
                      ? 'bg-blue-600 text-white shadow-md transform scale-105' 
                      : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'
                   }`}
                >
                   {cat}
                </button>
             ))}
           </div>

           {/* Responsive Grid with Lazy Loading */}
           <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 min-h-[400px]">
              {filteredImages.map((img, idx) => {
                 return (
                    <div 
                       key={idx} 
                       onClick={() => openLightbox(idx)}
                       className="group relative rounded-xl overflow-hidden aspect-[4/3] bg-gray-100 shadow-sm cursor-pointer hover:shadow-lg transition-all border border-gray-100"
                    >
                       <LazyImage 
                          src={img.url} 
                          alt={img.title}
                          className="w-full h-full object-cover z-10 relative group-hover:scale-105 transition-transform duration-700"
                          containerClassName="w-full h-full"
                       />
                       
                       {/* Overlay on Hover */}
                       <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 z-20 pointer-events-none">
                          <p className="text-white font-bold text-xs md:text-sm flex items-center justify-between">
                             <span className="truncate mr-2">{img.title}</span>
                             <Maximize2 size={14} className="text-white/80" />
                          </p>
                       </div>
                       
                       {/* Icon indicating Zoom */}
                       <div className="absolute top-2 right-2 bg-black/30 p-1.5 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none">
                          <ZoomIn size={14} className="text-white" />
                       </div>
                    </div>
                 );
              })}
           </div>

           {/* LIGHTBOX MODAL */}
           {lightboxIndex !== null && (
              <div 
                 className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center animate-in fade-in duration-300"
                 onClick={closeLightbox}
              >
                 {/* Close Button */}
                 <button 
                    onClick={closeLightbox}
                    className="absolute top-4 right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-50"
                 >
                    <X size={24} />
                 </button>

                 {/* Navigation Buttons */}
                 <button 
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-50 hidden md:block"
                 >
                    <ChevronLeft size={32} />
                 </button>
                 <button 
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-50 hidden md:block"
                 >
                    <ChevronRight size={32} />
                 </button>

                 {/* Main Image Container */}
                 <div 
                    className="relative w-full h-full max-w-5xl max-h-[85vh] p-4 flex flex-col items-center justify-center"
                    onClick={(e) => e.stopPropagation()} // Prevent close on image click
                 >
                    <LazyImage 
                       src={filteredImages[lightboxIndex].url} 
                       alt={filteredImages[lightboxIndex].title}
                       className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                       containerClassName="flex items-center justify-center h-full w-full"
                    />
                    
                    {/* Caption Bar */}
                    <div className="absolute bottom-6 bg-black/60 backdrop-blur-sm text-white px-6 py-3 rounded-full text-center border border-white/10">
                       <p className="font-bold text-sm md:text-base">{filteredImages[lightboxIndex].title}</p>
                       <p className="text-xs text-gray-300 uppercase tracking-widest mt-1">
                          {filteredImages[lightboxIndex].category} • {lightboxIndex + 1} / {filteredImages.length}
                       </p>
                    </div>
                 </div>
              </div>
           )}
        </div>
     );
  };

  // 8. GUIDE ETUDIANT
  const renderGuide = () => {
    // ... (Keep existing implementation) ...
    const guideSteps = [
      { 
        step: 1, 
        title: 'Inscription', 
        icon: FileText, 
        desc: 'Scolarité & Dossier',
        modalContent: {
          title: "Procédure d'Inscription",
          subtitle: "De l'admission à la carte d'étudiant",
          steps: [
            "Création de compte obligatoire sur la plateforme campusniger.com",
            "Paiement des frais d'inscription auprès de la banque partenaire",
            "Visite médicale obligatoire à l'infirmerie du campus",
            "Dépôt physique du dossier complet (Relevés, Photos, Reçu bancaire) à la scolarité"
          ],
          info: "L'inscription n'est validée qu'après le dépôt physique du dossier."
        }
      },
      { 
        step: 2, 
        title: 'Pédagogie', 
        icon: School, 
        desc: 'Cours & TP Assidus',
        modalContent: {
          title: "Organisation Pédagogique",
          subtitle: "Système LMD & Rigueur",
          steps: [
            "Assiduité : La présence aux Travaux Dirigés (TD) et Travaux Pratiques (TP) est obligatoire.",
            "Contrôle Continu : Des notes sont attribuées tout au long du semestre.",
            "Examens terminaux : Une session à la fin de chaque semestre.",
            "Moyenne : Une moyenne générale de 10/20 est requise pour valider l'année."
          ],
          info: "3 absences non justifiées en TP peuvent entraîner une exclusion de l'UE."
        }
      },
      { 
        step: 3, 
        title: 'Recherche', 
        icon: BookOpen, 
        desc: 'Bibliothèque',
        modalContent: {
          title: "Ressources & Recherche",
          subtitle: "Accès au savoir",
          steps: [
            "Accès gratuit à la bibliothèque universitaire centrale.",
            "Consultation sur place et prêt d'ouvrages spécialisés.",
            "Accès aux salles de travail de groupe.",
            "Ressources numériques disponibles via le réseau wifi du campus."
          ],
          info: "La carte d'étudiant est obligatoire pour accéder à la bibliothèque."
        }
      },
      { 
        step: 4, 
        title: 'Pratique', 
        icon: Briefcase, 
        desc: 'Stages & Projets',
        modalContent: {
          title: "Professionnalisation",
          subtitle: "Immersion en entreprise",
          steps: [
            "Stage ouvrier (découverte) en fin de 1ère année (facultatif selon filière).",
            "Stage de technicien supérieur (2 mois min.) obligatoire en 2ème année.",
            "Rédaction d'un rapport de stage normé.",
            "Soutenance devant un jury composé d'enseignants et de professionnels."
          ],
          info: "Le bureau des stages (Bâtiment C) délivre les conventions."
        }
      },
      { 
        step: 5, 
        title: 'Diplômation', 
        icon: GraduationCap, 
        desc: 'Succès & Avenir',
        modalContent: {
          title: "Obtention du Diplôme",
          subtitle: "Vers la vie active ou la poursuite d'études",
          steps: [
            "Validation de l'ensemble des Unités d'Enseignement (UE).",
            "Obtention du Quitus (Bibliothèque, Scolarité, Comptabilité).",
            "Dépôt de la demande de retrait de diplôme.",
            "Cérémonie de remise et inscription au réseau Alumni."
          ],
          info: "Le DUT permet l'insertion pro ou la poursuite en Licence Pro."
        }
      },
    ];

    return (
       <div className="animate-in slide-in-from-right duration-500 space-y-8 pb-24 relative">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-brand-800 to-cyan-700 text-white p-8 rounded-3xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
             <div className="relative z-10 flex items-center">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mr-6 border border-white/30">
                   <Compass size={32} />
                </div>
                <div>
                  <h2 className="text-3xl font-bold font-title mb-1">Guide de l'Étudiant</h2>
                  <p className="text-cyan-100">Vivre, apprendre et réussir à l'IUT de Tahoua.</p>
                </div>
             </div>
          </div>

          {/* 1. DOCUMENT A TELECHARGER */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between group cursor-pointer hover:border-brand-300 transition-all">
             <div className="flex items-center">
                <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center mr-4">
                   <FileText size={24} />
                </div>
                <div>
                   <h3 className="font-bold text-gray-900">Règlement Intérieur</h3>
                   <p className="text-xs text-gray-500">Document officiel PDF • Édition 2025</p>
                </div>
             </div>
             <button className="p-3 bg-gray-50 text-gray-600 rounded-xl group-hover:bg-brand-600 group-hover:text-white transition-colors">
                <Download size={20} />
             </button>
          </div>

          {/* 2. FLUX ANIMÉ DU PARCOURS (Timeline) */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
             <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900 flex items-center">
                   <TrendingUp className="mr-2 text-brand-600" />
                   Le Parcours de la Réussite
                </h3>
                <span className="text-[10px] bg-brand-50 text-brand-600 px-2 py-1 rounded-full font-bold animate-pulse">
                   Cliquez les étapes
                </span>
             </div>
             
             <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-2">
                {/* Connector Line */}
                <div className="hidden md:block absolute top-6 left-0 w-full h-1 bg-gray-100 z-0"></div>
                <div className="md:hidden absolute top-4 bottom-4 left-6 w-1 bg-gray-100 z-0"></div>

                {guideSteps.map((item, idx) => (
                   <button 
                      key={idx} 
                      onClick={() => setSelectedGuideStep(item)}
                      className="relative z-10 flex md:flex-col items-center group w-full md:w-auto text-left md:text-center focus:outline-none"
                   >
                      <div className="w-12 h-12 rounded-full bg-white border-4 border-brand-100 flex items-center justify-center text-brand-600 font-bold shadow-sm group-hover:bg-brand-600 group-hover:text-white group-hover:border-brand-200 group-hover:scale-110 transition-all duration-300 cursor-pointer">
                         <item.icon size={20} />
                      </div>
                      <div className="ml-4 md:ml-0 md:mt-4 flex-1">
                         <h4 className="font-bold text-gray-800 text-sm group-hover:text-brand-700 transition-colors">{item.title}</h4>
                         <p className="text-xs text-gray-500">{item.desc}</p>
                      </div>
                   </button>
                ))}
             </div>
          </div>

          {/* 3. UNIFORME REGLEMENTAIRE */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row">
             <div className="bg-slate-50 p-8 flex items-center justify-center md:w-1/3 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-slate-200/50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"></div>
                {/* CSS Uniform Visualization */}
                <div className="relative flex flex-col items-center animate-bounce-slow">
                   {/* Shirt: Sky Blue #87CEEB */}
                   <div className="w-24 h-24 bg-[#87CEEB] rounded-t-xl relative shadow-md flex items-center justify-center">
                      <div className="w-0.5 h-full bg-black/5 absolute"></div> {/* Buttons Line */}
                      <Shirt className="text-white/80 w-12 h-12 relative z-10" strokeWidth={1.5} />
                      
                      {/* Tie (Cravate) - Added z-20 to sit on top of shirt */}
                      <div className="absolute top-1 left-1/2 -translate-x-1/2 flex flex-col items-center z-20">
                          <div className="w-4 h-4 bg-[#000080] rounded-sm shadow-sm"></div> {/* Knot */}
                          <div className="w-3 h-14 bg-[#000080] rounded-b-md shadow-sm -mt-1"></div> {/* Body */}
                      </div>

                      {/* Collar */}
                      <div className="absolute -top-3 w-12 h-6 bg-[#87CEEB] border-t border-black/5 clip-path-polygon z-30"></div>
                   </div>
                   {/* Pants: Navy Blue #000080 */}
                   <div className="w-20 h-24 bg-[#000080] rounded-b-lg shadow-md mt-[-4px] relative z-10">
                      <div className="w-0.5 h-full bg-white/10 absolute left-1/2 -translate-x-1/2"></div>
                   </div>
                   <div className="mt-4 bg-white/80 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-gray-500 shadow-sm border border-gray-200">
                      Tenue Officielle
                   </div>
                </div>
             </div>
             
             <div className="p-8 md:w-2/3">
                <div className="flex items-center mb-4">
                   <div className="p-2 bg-blue-100 text-blue-800 rounded-lg mr-3">
                      <Shirt size={24} />
                   </div>
                   <h3 className="text-xl font-bold text-gray-900">Code Vestimentaire</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                   L'élégance et la discipline sont au cœur des valeurs de l'IUT. Le port de l'uniforme réglementaire est <strong>strictement obligatoire</strong> pour accéder aux salles de cours et à l'administration.
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                   <div className="bg-sky-50 p-3 rounded-lg border border-sky-100">
                      <p className="text-xs font-bold text-sky-800 uppercase mb-1">Haut</p>
                      <p className="font-semibold text-gray-800">Chemise Bleu Ciel</p>
                   </div>
                   <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-100">
                      <p className="text-xs font-bold text-indigo-900 uppercase mb-1">Bas</p>
                      <p className="font-semibold text-gray-800">Pantalon Bleu Marine</p>
                   </div>
                   <div className="col-span-2 md:col-span-1 bg-slate-50 p-3 rounded-lg border border-slate-200">
                      <p className="text-xs font-bold text-slate-800 uppercase mb-1">Accessoire</p>
                      <p className="font-semibold text-gray-800">Cravate (Au choix)</p>
                      <p className="text-[10px] text-red-500 font-bold mt-0.5">* Obligatoire</p>
                   </div>
                </div>

                <div className="flex items-start bg-gray-50 p-4 rounded-xl text-xs text-gray-600 border border-gray-100">
                   <Info size={16} className="text-gray-400 mr-2 flex-shrink-0 mt-0.5" />
                   <p>
                      <strong>Jours obligatoires :</strong> Du Lundi au Jeudi inclus.<br/>
                      <span className="text-green-600 font-bold">Vendredi :</span> Tenue décontractée ou traditionnelle autorisée, dans le respect de la décence.
                   </p>
                </div>
             </div>
          </div>

          {/* 4. SERVICES VIE DE CAMPUS (Bento Grid) */}
          <div>
             <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <HeartPulse className="mr-2 text-red-500" />
                Services & Bien-être
             </h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Resto */}
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:border-orange-200 transition-colors group">
                   <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <ChefHat size={20} />
                   </div>
                   <h4 className="font-bold text-gray-900 mb-1">Restauration</h4>
                   <p className="text-xs text-gray-500 leading-relaxed">
                      Des repas équilibrés et subventionnés au restaurant universitaire. Menus variés locaux et internationaux.
                   </p>
                </div>

                {/* Logement */}
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:border-blue-200 transition-colors group">
                   <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <Home size={20} />
                   </div>
                   <h4 className="font-bold text-gray-900 mb-1">Cité Universitaire</h4>
                   <p className="text-xs text-gray-500 leading-relaxed">
                      Chambres équipées disponibles sur critères sociaux et pédagogiques. Proximité immédiate des amphis.
                   </p>
                </div>

                {/* Santé */}
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:border-red-200 transition-colors group">
                   <div className="w-10 h-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <HeartPulse size={20} />
                   </div>
                   <h4 className="font-bold text-gray-900 mb-1">Infirmerie</h4>
                   <p className="text-xs text-gray-500 leading-relaxed">
                      Soins de premiers secours, consultations médicales gratuites et accompagnement psychologique.
                   </p>
                </div>

                {/* Associations */}
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:border-purple-200 transition-colors group">
                   <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <Users size={20} />
                   </div>
                   <h4 className="font-bold text-gray-900 mb-1">Vie Associative</h4>
                   <p className="text-xs text-gray-500 leading-relaxed">
                      UEEPT, Clubs culturels, sportifs et scientifiques. Engagez-vous pour la communauté.
                   </p>
                </div>

                 {/* Transport */}
                 <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:border-yellow-200 transition-colors group">
                   <div className="w-10 h-10 bg-yellow-50 text-yellow-600 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <Bus size={20} />
                   </div>
                   <h4 className="font-bold text-gray-900 mb-1">Navettes Bus</h4>
                   <p className="text-xs text-gray-500 leading-relaxed">
                      Transport gratuit reliant le centre-ville au campus. Rotations régulières de 7h à 19h.
                   </p>
                </div>

                {/* Bibliothèque */}
                 <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:border-emerald-200 transition-colors group">
                   <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <BookOpen size={20} />
                   </div>
                   <h4 className="font-bold text-gray-900 mb-1">Bibliothèque</h4>
                   <p className="text-xs text-gray-500 leading-relaxed">
                      Plus de 10 000 ouvrages, salle de lecture climatisée et accès aux ressources numériques.
                   </p>
                </div>
             </div>
          </div>

          {/* MODAL OVERLAY */}
          {selectedGuideStep && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setSelectedGuideStep(null)}>
               <div 
                 className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
                 onClick={(e) => e.stopPropagation()} // Prevent close on content click
               >
                 {/* Header */}
                 <div className="bg-brand-600 p-6 flex justify-between items-start">
                    <div className="flex items-center text-white">
                       <div className="p-3 bg-white/20 rounded-xl mr-4 backdrop-blur-sm">
                          <selectedGuideStep.icon size={28} />
                       </div>
                       <div>
                          <h3 className="text-xl font-bold">{selectedGuideStep.modalContent.title}</h3>
                          <p className="text-brand-100 text-sm">{selectedGuideStep.modalContent.subtitle}</p>
                       </div>
                    </div>
                    <button 
                      onClick={() => setSelectedGuideStep(null)}
                      className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                    >
                       <X size={20} />
                    </button>
                 </div>

                 {/* Content */}
                 <div className="p-8">
                    <div className="space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
                       {selectedGuideStep.modalContent.steps.map((step: string, idx: number) => (
                          <div key={idx} className="relative pl-10">
                             <div className="absolute left-0 top-0.5 w-6 h-6 bg-brand-50 border-2 border-brand-200 rounded-full flex items-center justify-center text-xs font-bold text-brand-700 z-10">
                                {idx + 1}
                             </div>
                             <p className="text-gray-700 text-sm leading-relaxed">{step}</p>
                          </div>
                       ))}
                    </div>

                    <div className="mt-8 p-4 bg-amber-50 border border-amber-100 rounded-xl flex items-start">
                       <Info size={18} className="text-amber-600 flex-shrink-0 mr-3 mt-0.5" />
                       <p className="text-xs text-amber-800 font-medium leading-relaxed">
                          {selectedGuideStep.modalContent.info}
                       </p>
                    </div>

                    <div className="mt-6 flex justify-end">
                       <button 
                         onClick={() => setSelectedGuideStep(null)}
                         className="px-6 py-2 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors text-sm"
                       >
                          Fermer
                       </button>
                    </div>
                 </div>
               </div>
            </div>
          )}
       </div>
    );
  };

  // 9. NEW SECTION: LOCALISATION SERVICES - REFACTORED
  const renderLocations = () => {
    // Categories: ADMIN, PEDAGO, VIE
    const locationFlows = [
      {
        id: 'DIR_IUT',
        category: 'ADMIN',
        title: "Direction IUT",
        description: "Administration générale, Directeur et services rattachés.",
        icon: Landmark,
        color: "text-brand-600",
        bg: "bg-brand-50",
        question: "Où se situe la direction ?",
        answer: "Campus 1, bâtiment principal à l'entrée.",
        mapLink: "https://maps.google.com/?q=Université+de+Tahoua",
        steps: [
          { icon: MapPin, label: "Campus 1 (Entrée principale)" },
          { icon: CornerDownRight, label: "Tourner à droite après le portail" },
          { icon: Footprints, label: "Avancer environ 10 mètres" },
          { icon: Eye, label: "Regarder en haut : Enseigne 'Institut Universitaire de Technologie'" },
          { icon: Star, label: "Arrivée : Direction IUT" }
        ]
      },
      {
        id: 'RECTORAT',
        category: 'ADMIN',
        title: "Rectorat",
        description: "Services centraux de l'université.",
        icon: School,
        color: "text-blue-600",
        bg: "bg-blue-50",
        question: "Où se situe le rectorat ?",
        answer: "Campus 1, à proximité immédiate de la Direction IUT.",
        mapLink: "https://maps.google.com/?q=Rectorat+Université+de+Tahoua",
        steps: [
          { icon: MapPin, label: "Campus 1 (Même enceinte)" },
          { icon: Compass, label: "Repérer la Direction IUT" },
          { icon: Footprints, label: "Continuer à proximité immédiate" },
          { icon: Landmark, label: "Arrivée : Rectorat" }
        ]
      },
      {
        id: 'SCOLARITE',
        category: 'ADMIN',
        title: "Scolarité",
        description: "Inscriptions, retraits de diplômes et relevés.",
        icon: FileText,
        color: "text-purple-600",
        bg: "bg-purple-50",
        question: "Comment trouver la scolarité ?",
        answer: "Bâtiment A, Rez-de-chaussée.",
        steps: [
          { icon: MapPin, label: "Entrée Campus" },
          { icon: Navigation, label: "Suivre fléchage 'Bâtiment A'" },
          { icon: Footprints, label: "Rez-de-chaussée, couloir gauche" },
          { icon: Star, label: "Porte 102 : Service Scolarité" }
        ]
      },
      {
        id: 'BIBLIOTHEQUE',
        category: 'PEDAGO',
        title: "Bibliothèque",
        description: "Salle de lecture et emprunt d'ouvrages.",
        icon: Library,
        color: "text-emerald-600",
        bg: "bg-emerald-50",
        question: "Accès à la bibliothèque ?",
        answer: "Bâtiment central, 1er étage.",
        steps: [
          { icon: MapPin, label: "Campus principal" },
          { icon: Navigation, label: "Dirigez-vous vers le grand bâtiment central" },
          { icon: TrendingUp, label: "Monter au 1er étage" },
          { icon: BookOpen, label: "Arrivée : Bibliothèque Universitaire" }
        ]
      },
      {
        id: 'RESTO',
        category: 'VIE',
        title: "Restaurant U",
        description: "Restauration pour les étudiants.",
        icon: ChefHat,
        color: "text-orange-600",
        bg: "bg-orange-50",
        question: "Où manger ?",
        answer: "Zone Sud du campus, près des résidences.",
        steps: [
          { icon: MapPin, label: "Sortir des zones de cours" },
          { icon: Footprints, label: "Traverser vers la Zone Sud" },
          { icon: Home, label: "Repérer les résidences" },
          { icon: Coffee, label: "Arrivée : Restaurant Universitaire" }
        ]
      }
    ];

    const categories = [
      { id: 'TOUT', label: 'Tous' },
      { id: 'ADMIN', label: 'Administration' },
      { id: 'PEDAGO', label: 'Pédagogie' },
      { id: 'VIE', label: 'Vie Pratique' }
    ];

    const filteredLocations = activeLocationFilter === 'TOUT' 
      ? locationFlows 
      : locationFlows.filter(l => l.category === activeLocationFilter);

    const selectedLocation = locationFlows.find(l => l.id === selectedLocationId);

    // Detail View Component
    if (selectedLocation) {
      return (
        <div className="animate-in slide-in-from-right duration-300 pb-20">
           {/* Detail Header */}
           <div className="flex items-center gap-4 mb-6">
              <button 
                onClick={() => setSelectedLocationId(null)}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
              >
                <ArrowLeft size={24} className="text-gray-700" />
              </button>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{selectedLocation.title}</h2>
                <p className="text-xs text-gray-500">Itinéraire détaillé</p>
              </div>
           </div>

           {/* Map Card Placeholder (Interactive Feel) */}
           <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-6 relative group">
              <div className="h-48 bg-slate-100 relative flex items-center justify-center overflow-hidden">
                 {/* Decorative Map Pattern */}
                 <div className="absolute inset-0 opacity-10 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-repeat space-x-10"></div>
                 <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center animate-pulse">
                    <MapPin size={32} className="text-brand-600" />
                 </div>
              </div>
              <div className="p-6">
                 <div className="flex justify-between items-start mb-4">
                    <div>
                       <h3 className="font-bold text-lg text-gray-900 mb-1">{selectedLocation.question}</h3>
                       <p className="text-sm text-gray-600 leading-relaxed">{selectedLocation.answer}</p>
                    </div>
                    {selectedLocation.mapLink && (
                       <a 
                         href={selectedLocation.mapLink}
                         target="_blank"
                         rel="noreferrer"
                         className="flex flex-col items-center justify-center bg-blue-50 text-blue-600 p-3 rounded-xl hover:bg-blue-100 transition-colors"
                       >
                          <Navigation size={20} />
                          <span className="text-[10px] font-bold mt-1">Ouvrir</span>
                       </a>
                    )}
                 </div>

                 {/* Timeline Steps */}
                 <div className="relative pl-6 border-l-2 border-dashed border-gray-200 ml-4 space-y-8 py-2">
                    {selectedLocation.steps.map((step, idx) => (
                       <div key={idx} className="relative group/step">
                          <div className={`absolute -left-[31px] top-0 w-10 h-10 rounded-full border-4 border-white shadow-sm flex items-center justify-center ${idx === selectedLocation.steps.length - 1 ? 'bg-green-100 text-green-600' : 'bg-brand-50 text-brand-600'}`}>
                             <step.icon size={16} />
                          </div>
                          <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 group-hover/step:border-brand-200 transition-colors">
                             <p className="text-sm font-medium text-gray-800">{step.label}</p>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      );
    }

    // Grid View Component
    return (
      <div className="animate-in slide-in-from-right duration-500 space-y-6 pb-24">
        {/* Header Image */}
        <div className="w-full h-40 md:h-56 rounded-3xl overflow-hidden shadow-lg border border-gray-100 relative">
           <LazyImage 
              src="https://ik.imagekit.io/lfegvix1p/Cours_pR5bDOPMu.svg"
              alt="Plan Campus"
              className="w-full h-full object-cover"
              containerClassName="w-full h-full"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
              <div>
                 <h2 className="text-2xl font-bold text-white font-title mb-1">Localisation</h2>
                 <p className="text-white/80 text-sm">Trouvez votre chemin sur le campus.</p>
              </div>
           </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
           {categories.map((cat) => (
              <button
                 key={cat.id}
                 onClick={() => setActiveLocationFilter(cat.id)}
                 className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    activeLocationFilter === cat.id 
                    ? 'bg-brand-600 text-white shadow-md' 
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                 }`}
              >
                 {cat.label}
              </button>
           ))}
        </div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
           {filteredLocations.map((loc) => (
              <div 
                 key={loc.id}
                 onClick={() => setSelectedLocationId(loc.id)}
                 className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-brand-200 transition-all cursor-pointer flex items-center group active:scale-[0.98]"
              >
                 <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 ${loc.bg} ${loc.color} group-hover:scale-110 transition-transform`}>
                    <loc.icon size={24} />
                 </div>
                 <div className="flex-1">
                    <h4 className="font-bold text-gray-900 mb-0.5">{loc.title}</h4>
                    <p className="text-xs text-gray-500 line-clamp-1">{loc.description}</p>
                 </div>
                 <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors">
                    <ChevronRight size={16} />
                 </div>
              </div>
           ))}
        </div>

        {/* --- COMING SOON CARD (NOUVEAU) --- */}
        <div className="relative mt-8 overflow-hidden rounded-2xl bg-slate-900 p-8 shadow-xl border border-slate-700 group">
            {/* Décoration Blueprint en Arrière-plan */}
            <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:linear-gradient(0deg,transparent,black)]"></div>
            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-brand-500/20 blur-3xl transition-all duration-500 group-hover:bg-brand-500/30"></div>
            <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl transition-all duration-500 group-hover:bg-blue-500/30"></div>

            <div className="relative z-10">
                <div className="flex justify-center mb-6">
                     <LazyImage 
                        src="https://services.zerofiltre.tech/images/service_application_maintenance.svg" 
                        alt="Maintenance Illustration" 
                        className="w-full max-w-xs h-auto object-contain"
                        containerClassName="w-full max-w-xs"
                     />
                </div>
                <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                    {/* Icône Stylisée */}
                    <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md shadow-inner border border-white/10 group-hover:scale-105 transition-transform duration-300">
                        <Navigation size={32} className="text-brand-400" />
                        <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-red-500 animate-pulse"></div>
                    </div>

                    {/* Contenu Texte */}
                    <div>
                        <div className="mb-2 flex items-center justify-center md:justify-start gap-2">
                            <h3 className="text-xl font-bold font-title text-white">Cartographie Intégrale</h3>
                            <span className="rounded-full bg-brand-500/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-300 border border-brand-500/30 flex items-center">
                               <Sparkles size={10} className="mr-1" /> Bientôt
                            </span>
                        </div>
                        <p className="text-sm leading-relaxed text-slate-400 max-w-lg">
                            Nous développons actuellement une carte interactive complète incluant la <strong>Scolarité</strong>, la <strong>Bibliothèque</strong>, l'<strong>Infirmerie</strong> et tous les départements. 
                            Visualisez les flux réels et photos de chaque bâtiment à la prochaine mise à jour.
                        </p>
                    </div>
                </div>
            </div>
        </div>

      </div>
    );
  };

  // --- MENU DATA FOR FILTERING ---
  const menuItems = [
    { id: 'LOCATIONS', title: 'Localisation Services', desc: 'Trouver la Direction, le Rectorat et autres services.', icon: Map, color: 'text-red-600', bg: 'bg-red-50', border: 'hover:border-red-300' },
    { id: 'ORATORY', title: 'Art Oratoire', desc: 'Développez votre éloquence et débattez.', icon: Mic2, color: 'text-purple-600', bg: 'bg-purple-50', border: 'hover:border-purple-300' },
    { id: 'TRIP', title: 'Voyages d\'Étude', desc: 'Visites d\'entreprises et sorties terrain.', icon: Bus, color: 'text-sky-600', bg: 'bg-sky-50', border: 'hover:border-sky-300' },
    { id: 'FOOTBALL', title: 'Club Football', desc: 'Coupe du Directeur et matchs inter-filières.', icon: Trophy, color: 'text-green-600', bg: 'bg-green-50', border: 'hover:border-green-300' },
    { id: 'CONCIT', title: 'Concours Innovation', desc: 'Présentez vos projets au CONCIT. Prix jusqu\'à 250k F.', icon: Lightbulb, color: 'text-orange-600', bg: 'bg-orange-50', border: 'hover:border-orange-300' },
    { id: 'IDCARD', title: 'Carte Étudiant ISIC', desc: 'Carte internationale offerte aux étudiants. Réductions voyages & achats.', icon: CreditCard, color: 'text-teal-600', bg: 'bg-teal-50', border: 'hover:border-teal-300' },
    { id: 'ACADEMICS', title: 'Nos Filières', desc: 'Découvrez l\'offre de formation par département.', icon: GraduationCap, color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'hover:border-indigo-300' },
    { id: 'CAMPUS', title: 'Découvrir nos Campus', desc: 'Visite virtuelle des bâtiments et infrastructures.', icon: School, color: 'text-blue-600', bg: 'bg-blue-50', border: 'hover:border-blue-300' },
    { id: 'GUIDE', title: 'Guide de l\'Étudiant', desc: 'Code vestimentaire, règlement intérieur et services.', icon: Compass, color: 'text-cyan-600', bg: 'bg-cyan-50', border: 'hover:border-cyan-300' },
  ];

  const filteredMenu = menuItems.filter(item => 
    !searchQuery || 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );


  // --- MAIN MENU ---
  if (activeSection === 'MAIN') {
    return (
      <div className="space-y-6 pb-20 animate-in fade-in duration-500">
        {/* Header */}
        {!searchQuery && (
          <div className="flex items-center space-x-4 mb-4">
            <button 
              onClick={onBack}
              className="p-2 bg-white rounded-full shadow-sm border border-gray-200 text-gray-600 hover:text-brand-600 transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 font-title">Vie Étudiante</h1>
              <p className="text-sm text-gray-500">S'épanouir au-delà des cours</p>
            </div>
          </div>
        )}

        {filteredMenu.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-4">
            {filteredMenu.map((item) => (
              <button 
                key={item.id}
                onClick={() => setActiveSection(item.id as SectionType)}
                className={`group bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100 hover:shadow-lg ${item.border} transition-all text-left flex flex-col h-full`}
              >
                <div className={`w-10 h-10 md:w-12 md:h-12 ${item.bg} rounded-xl md:rounded-2xl flex items-center justify-center ${item.color} mb-3 md:mb-4 group-hover:scale-110 transition-transform`}>
                  <item.icon size={20} className="md:w-6 md:h-6" />
                </div>
                <h3 className="text-sm md:text-lg font-bold text-gray-900 mb-1 leading-tight">{item.title}</h3>
                <p className="text-gray-500 text-[10px] md:text-xs leading-relaxed mb-2 md:mb-3 flex-grow line-clamp-3 md:line-clamp-none">
                  {item.desc}
                </p>
                <div className={`flex items-center ${item.color} font-bold text-[10px] md:text-xs group-hover:translate-x-2 transition-transform mt-auto`}>
                  Détails <ArrowLeft className="rotate-180 ml-1 md:ml-2" size={12} />
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500 bg-gray-50 rounded-2xl border border-gray-100">
              <Search size={48} className="text-gray-300 mb-4" />
              <p className="font-semibold">Aucun résultat trouvé pour "{searchQuery}"</p>
              <p className="text-sm">Essayez avec d'autres mots-clés.</p>
          </div>
        )}
      </div>
    );
  }

  // --- SUB-VIEW WRAPPER ---
  return (
    <div className="h-full flex flex-col">
       {/* Removed overflow-y-auto here to use Layout's main scroll */}
       <button 
         onClick={() => setActiveSection('MAIN')}
         className="flex items-center text-gray-500 font-medium mb-4 hover:text-brand-600 w-fit transition-colors"
       >
         <ArrowLeft size={20} className="mr-2" />
         Retour au menu Vie Étudiante
       </button>
       
       <div className="flex-1 pb-20"> {/* Standard flex item, let Layout handle overflow */}
          {activeSection === 'LOCATIONS' && renderLocations()}
          {activeSection === 'ORATORY' && renderOratory()}
          {activeSection === 'TRIP' && renderTrip()}
          {activeSection === 'FOOTBALL' && renderFootball()}
          {activeSection === 'CONCIT' && renderConcit()}
          {activeSection === 'IDCARD' && renderIdCard()}
          {activeSection === 'ACADEMICS' && renderAcademics()}
          {activeSection === 'CAMPUS' && renderCampus()}
          {activeSection === 'GUIDE' && renderGuide()}
       </div>
    </div>
  );
};

export default StudentLife;
