
import React, { useState } from 'react';
import { ArrowLeft, Compass, Target, Zap, Shield, Users, Layers, Activity, User, Code } from 'lucide-react';
import LazyImage from './LazyImage';

interface AboutProps {
  onBack: () => void;
}

const About: React.FC<AboutProps> = ({ onBack }) => {
  return (
    <div className="space-y-12 pb-24 animate-in fade-in slide-in-from-bottom-8 duration-500">
      
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button 
          onClick={onBack}
          className="p-2 bg-white rounded-full shadow-sm border border-gray-200 text-gray-600 hover:text-brand-600 transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-title">À Propos</h1>
          <p className="text-sm text-gray-500">La vision derrière IUT-COMPASS</p>
        </div>
      </div>

      {/* 1. HERO SECTION: POURQUOI IUT-COMPASS ? */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-brand-50 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
         
         {/* IMAGE 1: Top of Hero Card */}
         <div className="flex justify-center mb-8 relative z-10">
            <LazyImage 
               src="https://services.zerofiltre.tech/images/about_zerofiltre_team.svg" 
               alt="Team Collaboration" 
               className="w-full max-w-sm h-auto object-contain drop-shadow-sm"
               containerClassName="w-full max-w-sm"
            />
         </div>

         <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            <div className="md:w-1/2">
               <div className="inline-flex items-center px-3 py-1 bg-brand-100 text-brand-700 text-xs font-bold rounded-full mb-4">
                  <Compass size={14} className="mr-2" /> Notre Mission
               </div>
               <h2 className="text-3xl font-bold text-gray-900 mb-4 font-title leading-tight">
                  Pourquoi avons-nous créé <span className="text-brand-600">IUT-COMPASS</span> ?
               </h2>
               <p className="text-gray-600 leading-relaxed mb-4">
                  L'environnement universitaire peut parfois ressembler à un labyrinthe. Entre les procédures administratives, la vie pédagogique et les activités étudiantes, l'information est souvent dispersée.
               </p>
               <p className="text-gray-600 leading-relaxed font-semibold">
                  IUT-COMPASS est né d'un besoin simple : centraliser, clarifier et simplifier la vie sur le campus pour tout le monde.
               </p>
            </div>
            
            {/* SVG ILLUSTRATION: CHAOS VS ORDER */}
            <div className="md:w-1/2 flex justify-center">
               <svg width="300" height="200" viewBox="0 0 300 200" className="w-full h-auto max-w-sm">
                  {/* Background Blob */}
                  <defs>
                     <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{stopColor:'#e0f7fa', stopOpacity:1}} />
                        <stop offset="100%" style={{stopColor:'#b2ebf2', stopOpacity:1}} />
                     </linearGradient>
                  </defs>
                  <circle cx="150" cy="100" r="90" fill="url(#grad1)" opacity="0.5" />
                  
                  {/* Left Side: Chaos Points */}
                  <g transform="translate(40, 60)">
                     <circle cx="0" cy="0" r="4" fill="#94a3b8" />
                     <circle cx="20" cy="40" r="4" fill="#94a3b8" />
                     <circle cx="-10" cy="70" r="4" fill="#94a3b8" />
                     <path d="M0,0 Q10,20 20,40 T-10,70" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4,4" />
                     <text x="5" y="95" fontSize="10" fill="#64748b" fontWeight="bold">AVANT</text>
                  </g>

                  {/* Arrow Transition */}
                  <path d="M90,100 L130,100" stroke="#00acc1" strokeWidth="2" markerEnd="url(#arrowhead)" />
                  <defs>
                     <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#00acc1" />
                     </marker>
                  </defs>

                  {/* Right Side: Order (Compass) */}
                  <g transform="translate(200, 100)">
                     <circle cx="0" cy="0" r="35" fill="white" stroke="#00acc1" strokeWidth="3" />
                     <path d="M0,-25 L5,0 L0,25 L-5,0 Z" fill="#00acc1" />
                     <circle cx="0" cy="0" r="3" fill="white" />
                     <text x="-35" y="55" fontSize="10" fill="#00838f" fontWeight="bold">IUT-COMPASS</text>
                  </g>
               </svg>
            </div>
         </div>
      </div>

      {/* IMAGE 2: Before How it Works */}
      <div className="flex justify-center py-4">
          <LazyImage 
            src="https://services.zerofiltre.tech/images/our-service-illustration-5.svg" 
            alt="Process Illustration" 
            className="w-full max-w-xs md:max-w-md h-auto object-contain"
            containerClassName="w-full max-w-md"
          />
      </div>

      {/* 2. COMMENT ÇA MARCHE ? */}
      <div>
         <h2 className="text-2xl font-bold text-gray-900 mb-6 font-title text-center">Comment ça marche ?</h2>
         {/* GRID UPDATED: grid-cols-2 on mobile for better UX */}
         <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
            
            {/* Card 1 */}
            <div className="bg-white p-4 md:p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all text-center group">
               <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                  <Layers size={24} className="md:w-8 md:h-8" />
               </div>
               <h3 className="font-bold text-sm md:text-lg text-gray-900 mb-2">1. Centralisation</h3>
               <p className="text-xs md:text-sm text-gray-500 leading-relaxed hidden md:block">
                  Nous regroupons les données de la scolarité, des départements et de l'administration en une seule base.
               </p>
               <p className="text-xs text-gray-500 leading-relaxed md:hidden">
                  Toutes les infos au même endroit.
               </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-4 md:p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all text-center group">
               <div className="w-12 h-12 md:w-16 md:h-16 bg-brand-50 text-brand-600 rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                  <Zap size={24} className="md:w-8 md:h-8" />
               </div>
               <h3 className="font-bold text-sm md:text-lg text-gray-900 mb-2">2. Intelligence</h3>
               <p className="text-xs md:text-sm text-gray-500 leading-relaxed hidden md:block">
                  Notre assistant transforme ces informations brutes en réponses claires et adaptées à votre profil.
               </p>
               <p className="text-xs text-gray-500 leading-relaxed md:hidden">
                  Des réponses claires et instantanées.
               </p>
            </div>

            {/* Card 3 (Spans 2 cols on mobile to center it or looks good in grid) */}
            <div className="col-span-2 md:col-span-1 bg-white p-4 md:p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all text-center group">
               <div className="w-12 h-12 md:w-16 md:h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                  <Activity size={24} className="md:w-8 md:h-8" />
               </div>
               <h3 className="font-bold text-sm md:text-lg text-gray-900 mb-2">3. Action</h3>
               <p className="text-xs md:text-sm text-gray-500 leading-relaxed hidden md:block">
                  Vous obtenez l'information, le formulaire ou le contact dont vous avez besoin pour agir sans attendre.
               </p>
                <p className="text-xs text-gray-500 leading-relaxed md:hidden">
                  Passez à l'action directement.
               </p>
            </div>
         </div>
      </div>

      {/* IMAGE 3: Before Importance */}
      <div className="flex justify-center py-4">
          <LazyImage 
            src="https://services.zerofiltre.tech/images/trades-illustration-3.svg" 
            alt="Community Illustration" 
            className="w-full max-w-xs md:max-w-md h-auto object-contain"
            containerClassName="w-full max-w-md"
          />
      </div>

      {/* 3. IMPORTANCE (Valeurs) */}
      <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
         <div className="absolute top-0 right-0 w-80 h-80 bg-brand-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
         
         <div className="relative z-10">
            <h2 className="text-2xl font-bold font-title mb-8 text-center md:text-left">Pourquoi c'est important ?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="flex items-start">
                  <div className="bg-white/10 p-3 rounded-xl mr-4 backdrop-blur-sm">
                     <Shield className="text-green-400" size={24} />
                  </div>
                  <div>
                     <h4 className="font-bold text-lg mb-1">Fiabilité</h4>
                     <p className="text-slate-300 text-sm">Fini les rumeurs. Accédez à l'information officielle, validée par l'administration.</p>
                  </div>
               </div>

               <div className="flex items-start">
                  <div className="bg-white/10 p-3 rounded-xl mr-4 backdrop-blur-sm">
                     <Target className="text-red-400" size={24} />
                  </div>
                  <div>
                     <h4 className="font-bold text-lg mb-1">Gain de temps</h4>
                     <p className="text-slate-300 text-sm">Moins de files d'attente pour de simples renseignements. Plus de temps pour étudier.</p>
                  </div>
               </div>

               <div className="flex items-start">
                  <div className="bg-white/10 p-3 rounded-xl mr-4 backdrop-blur-sm">
                     <Users className="text-brand-400" size={24} />
                  </div>
                  <div>
                     <h4 className="font-bold text-lg mb-1">Inclusion</h4>
                     <p className="text-slate-300 text-sm">Que vous soyez nouveau bachelier ou étudiant étranger, l'application vous guide.</p>
                  </div>
               </div>

               <div className="flex items-start">
                  <div className="bg-white/10 p-3 rounded-xl mr-4 backdrop-blur-sm">
                     <Compass className="text-yellow-400" size={24} />
                  </div>
                  <div>
                     <h4 className="font-bold text-lg mb-1">Modernisation</h4>
                     <p className="text-slate-300 text-sm">L'IUT de Tahoua s'inscrit dans une démarche de digitalisation aux standards internationaux.</p>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* 4. PORTEUR DU PROJET (New Section) */}
      <div className="bg-gradient-to-br from-brand-50 to-white rounded-3xl p-8 border border-brand-100 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-brand-100/50 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

         <h2 className="text-2xl font-bold text-gray-900 font-title mb-8 text-center md:text-left flex items-center justify-center md:justify-start">
            <User size={28} className="mr-3 text-brand-600" />
            Porteur du Projet
         </h2>

         <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 relative z-10">
             
             {/* Text Content */}
             <div className="flex-1 order-2 md:order-1 text-center md:text-left">
                <p className="text-gray-700 leading-relaxed mb-6 font-medium text-lg">
                   Développé avec passion pour l'<strong>Institut Universitaire de Technologie</strong> de l'<strong>Université Djibo Hamani de Tahoua</strong>.
                </p>
                
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-brand-100 inline-block w-full">
                   <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                      <div className="bg-brand-100 p-3 rounded-full text-brand-600">
                         <Code size={24} />
                      </div>
                      <div>
                         <p className="text-sm text-gray-500 uppercase font-bold tracking-wider mb-1">Créé par</p>
                         <h3 className="text-xl font-bold text-gray-900">M. MOUTARI DAREY Zakari</h3>
                         <p className="text-brand-600 font-medium mt-1">
                            Étudiant en 1ère année • Informatique de Gestion (IG)
                         </p>
                         <p className="text-gray-500 text-sm mt-1">IUT de Tahoua</p>
                      </div>
                   </div>
                </div>
             </div>

             {/* Illustration */}
             <div className="flex-1 order-1 md:order-2 flex justify-center">
                <LazyImage 
                  src="https://services.zerofiltre.tech/images/our-service-illustration.svg" 
                  alt="Developer Illustration" 
                  className="w-full max-w-sm h-auto object-contain drop-shadow-md"
                  containerClassName="w-full max-w-sm"
                />
             </div>
         </div>
      </div>

      {/* Footer / Credits */}
      <div className="text-center pt-8 border-t border-gray-200">
         <p className="text-xs text-gray-400">© 2026 IUT-COMPASS • Version 1.0.0</p>
      </div>

    </div>
  );
};

export default About;
