import React, { useEffect, useState } from 'react';
import { ArrowLeft, TrendingUp, Users, Award, PieChart, GraduationCap, CheckCircle2, RefreshCw, BarChart2, BookOpen, CalendarRange } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as ReTooltip, ResponsiveContainer, Cell } from 'recharts';
import { db } from '../firebaseConfig';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { StatGlobal, StatEvolution, StatCycle } from '../types';

interface SuccessRatesProps {
  onBack: () => void;
}

// --- MOCK DATA (FALLBACK) ---
const FALLBACK_GLOBAL = [
  { id: '1', label: 'Taux de Réussite Global', value: '87.5%', iconName: 'TrendingUp', colorClass: 'text-emerald-600', bgClass: 'bg-emerald-50' },
  { id: '2', label: 'Étudiants Inscrits', value: '1,240', iconName: 'Users', colorClass: 'text-blue-600', bgClass: 'bg-blue-50' },
  { id: '3', label: 'Diplômés 2024', value: '985', iconName: 'Award', colorClass: 'text-amber-600', bgClass: 'bg-amber-50' },
];

const FALLBACK_EVOLUTION = [
  { id: '1', year: '2020', rate: 78 },
  { id: '2', year: '2021', rate: 82 },
  { id: '3', year: '2022', rate: 85 },
  { id: '4', year: '2023', rate: 84 },
  { id: '5', year: '2024', rate: 87.5 },
];

const FALLBACK_DUT = [
  { id: '1', year: '2023-2024', inscrits: 450, taux: 87.7, type: 'DUT' },
  { id: '2', year: '2022-2023', inscrits: 420, taux: 93.1, type: 'DUT' },
  { id: '3', year: '2021-2022', inscrits: 400, taux: 83.3, type: 'DUT' },
];

const FALLBACK_LP = [
  { id: '1', year: '2023-2024', inscrits: 120, taux: 93.3, type: 'LP' },
  { id: '2', year: '2022-2023', inscrits: 110, taux: 96.6, type: 'LP' },
];

// Helper to render icon string
const IconRenderer = ({ name, size = 24 }: { name: string, size?: number }) => {
  switch (name) {
    case 'TrendingUp': return <TrendingUp size={size} />;
    case 'Users': return <Users size={size} />;
    case 'Award': return <Award size={size} />;
    case 'PieChart': return <PieChart size={size} />;
    default: return <TrendingUp size={size} />;
  }
};

// Mobile Table Row as Card
const CycleCard: React.FC<{ item: StatCycle }> = ({ item }) => (
  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-3">
     <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
           <CalendarRange size={18} className="text-gray-400" />
           <h4 className="font-bold text-gray-900">{item.year}</h4>
        </div>
        <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-bold ${item.taux >= 90 ? 'bg-green-100 text-green-700' : item.taux >= 80 ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>
           {item.taux}% Réussite
        </span>
     </div>
     
     {/* Visual Progress Bar */}
     <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full bg-brand-500" style={{ width: `${Math.min(item.taux, 100)}%` }}></div>
     </div>

     <div className="flex items-center justify-between text-sm text-gray-500 mt-1">
        <span>Étudiants Inscrits :</span>
        <span className="font-bold text-gray-900 text-base">{item.inscrits}</span>
     </div>
  </div>
);

type TabType = 'SYNTHESE' | 'DUT' | 'LP';

const SuccessRates: React.FC<SuccessRatesProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<TabType>('SYNTHESE');
  const [globalStats, setGlobalStats] = useState<StatGlobal[]>([]);
  const [evolutionStats, setEvolutionStats] = useState<StatEvolution[]>([]);
  const [dutStats, setDutStats] = useState<StatCycle[]>([]);
  const [lpStats, setLpStats] = useState<StatCycle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // 1. Global Stats
        const globalSnap = await getDocs(query(collection(db, "stats_global"), orderBy("order", "asc")));
        if (!globalSnap.empty) {
           setGlobalStats(globalSnap.docs.map(d => ({ id: d.id, ...d.data() } as StatGlobal)));
        } else {
           setGlobalStats(FALLBACK_GLOBAL);
        }

        // 2. Evolution
        const evoSnap = await getDocs(query(collection(db, "stats_evolution"), orderBy("year", "asc")));
        if (!evoSnap.empty) {
           setEvolutionStats(evoSnap.docs.map(d => ({ id: d.id, ...d.data() } as StatEvolution)));
        } else {
           setEvolutionStats(FALLBACK_EVOLUTION);
        }

        // 3. Cycles (DUT & LP)
        const dutSnap = await getDocs(query(collection(db, "stats_dut")));
        if (!dutSnap.empty) {
           setDutStats(dutSnap.docs.map(d => ({ id: d.id, ...d.data() } as StatCycle)));
        } else {
           setDutStats(FALLBACK_DUT as StatCycle[]);
        }

        const lpSnap = await getDocs(query(collection(db, "stats_lp")));
        if (!lpSnap.empty) {
           setLpStats(lpSnap.docs.map(d => ({ id: d.id, ...d.data() } as StatCycle)));
        } else {
           setLpStats(FALLBACK_LP as StatCycle[]);
        }

      } catch (error) {
        console.error("Error fetching stats:", error);
        // Apply fallbacks on error
        setGlobalStats(FALLBACK_GLOBAL);
        setEvolutionStats(FALLBACK_EVOLUTION);
        setDutStats(FALLBACK_DUT as StatCycle[]);
        setLpStats(FALLBACK_LP as StatCycle[]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const handleTabChange = (tab: TabType) => {
     setActiveTab(tab);
     window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <RefreshCw size={32} className="text-brand-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-24 animate-in fade-in slide-in-from-bottom-8 duration-500 font-sans">
      
      {/* Header & Navigation REMOVED STICKY */}
      <div className="bg-gray-50 pt-2 pb-4 space-y-3 border-b border-gray-200">
         <div className="flex items-center space-x-4 px-2">
            <button 
               onClick={onBack}
               className="p-2 bg-white rounded-full shadow-sm border border-gray-200 text-gray-600 hover:text-brand-600 transition-colors active:scale-95"
            >
               <ArrowLeft size={24} />
            </button>
            <div>
               <h1 className="text-xl md:text-2xl font-bold text-gray-900 font-title leading-none">Réussite</h1>
               <p className="text-xs text-gray-500 mt-1">Statistiques & Performance</p>
            </div>
         </div>

         {/* Navigation Tabs - Enhanced for Mobile Scrolling */}
         <div className="bg-white/50 p-1 mx-2 rounded-xl flex overflow-x-auto no-scrollbar scroll-smooth snap-x">
            <button 
               onClick={() => handleTabChange('SYNTHESE')}
               className={`flex-1 min-w-[100px] flex items-center justify-center px-4 py-2.5 rounded-lg text-xs md:text-sm font-bold transition-all whitespace-nowrap snap-center ${
                  activeTab === 'SYNTHESE' ? 'bg-brand-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'
               }`}
            >
               <PieChart size={16} className="mr-2" /> Synthèse
            </button>
            <button 
               onClick={() => handleTabChange('DUT')}
               className={`flex-1 min-w-[100px] flex items-center justify-center px-4 py-2.5 rounded-lg text-xs md:text-sm font-bold transition-all whitespace-nowrap snap-center ${
                  activeTab === 'DUT' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'
               }`}
            >
               <GraduationCap size={16} className="mr-2" /> Cycle DUT
            </button>
            <button 
               onClick={() => handleTabChange('LP')}
               className={`flex-1 min-w-[100px] flex items-center justify-center px-4 py-2.5 rounded-lg text-xs md:text-sm font-bold transition-all whitespace-nowrap snap-center ${
                  activeTab === 'LP' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'
               }`}
            >
               <Award size={16} className="mr-2" /> Licence Pro
            </button>
         </div>
      </div>

      {/* CONTENT: SYNTHESE */}
      {activeTab === 'SYNTHESE' && (
         <div className="space-y-6 animate-in slide-in-from-right duration-300">
            {/* Hero Image */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 overflow-hidden relative mx-2">
               <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
                  <div className="flex-1 text-center md:text-left">
                     <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded-full mb-3 uppercase tracking-wider">
                        Officiel 2024
                     </span>
                     <h2 className="text-2xl font-extrabold text-gray-900 mb-2 font-title">
                        L'Excellence par les <span className="text-brand-600">Chiffres</span>
                     </h2>
                     <p className="text-sm text-gray-600 leading-relaxed">
                        L'IUT de Tahoua s'engage dans une démarche de transparence. Nos résultats témoignent de la qualité de l'encadrement pédagogique.
                     </p>
                  </div>
                  <div className="w-32 md:w-40 flex-shrink-0">
                     <img 
                        src="https://services.zerofiltre.tech/images/our-approach-illustration-4.svg" 
                        alt="Statistics" 
                        className="w-full h-auto object-contain drop-shadow-md"
                     />
                  </div>
               </div>
               <div className="absolute top-[-50px] left-[-50px] w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-2">
               {globalStats.map((stat) => (
               <div key={stat.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                  <div>
                     <p className="text-xs text-gray-500 font-bold uppercase mb-1">{stat.label}</p>
                     <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.bgClass} ${stat.colorClass}`}>
                     <IconRenderer name={stat.iconName} size={24} />
                  </div>
               </div>
               ))}
            </div>

            {/* Chart */}
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm mx-2">
               <div className="flex items-center justify-between mb-6">
                  <div>
                     <h3 className="text-lg font-bold text-gray-900 flex items-center">
                        <TrendingUp className="mr-2 text-brand-600" size={20} />
                        Évolution
                     </h3>
                     <p className="text-xs text-gray-400">Taux de réussite sur 5 ans</p>
                  </div>
               </div>
               
               <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                     <BarChart data={evolutionStats} margin={{top: 10, right: 0, left: -25, bottom: 0}}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} domain={[0, 100]} />
                        <ReTooltip 
                           cursor={{fill: '#f8fafc'}}
                           contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}}
                        />
                        <Bar dataKey="rate" radius={[4, 4, 0, 0]} barSize={40}>
                        {evolutionStats.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={index === evolutionStats.length - 1 ? '#00acc1' : '#cbd5e1'} />
                        ))}
                        </Bar>
                     </BarChart>
                  </ResponsiveContainer>
               </div>
            </div>
         </div>
      )}

      {/* CONTENT: DUT */}
      {activeTab === 'DUT' && (
         <div className="space-y-4 animate-in slide-in-from-right duration-300 mx-2">
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mb-4">
               <h3 className="text-lg font-bold text-blue-900 flex items-center mb-1">
                  <GraduationCap className="mr-2" size={20} />
                  Cycle DUT
               </h3>
               <p className="text-xs text-blue-700">Diplôme Universitaire de Technologie (Bac+2)</p>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
               <table className="w-full text-left border-collapse">
                  <thead>
                     <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                        <th className="p-4 font-semibold">Année Académique</th>
                        <th className="p-4 font-semibold text-center">Inscrits</th>
                        <th className="p-4 font-semibold text-right">Taux de Réussite</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm">
                     {dutStats.map((row) => (
                        <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                           <td className="p-4 font-bold text-gray-800">{row.year}</td>
                           <td className="p-4 text-center text-gray-600">{row.inscrits}</td>
                           <td className="p-4 text-right">
                              <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-bold ${row.taux >= 90 ? 'bg-green-100 text-green-700' : row.taux >= 80 ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                 {row.taux}%
                              </span>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-3">
               {dutStats.map((row) => <CycleCard key={row.id} item={row} />)}
            </div>
         </div>
      )}

      {/* CONTENT: LP */}
      {activeTab === 'LP' && (
         <div className="space-y-4 animate-in slide-in-from-right duration-300 mx-2">
            <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 mb-4">
               <h3 className="text-lg font-bold text-purple-900 flex items-center mb-1">
                  <Award className="mr-2" size={20} />
                  Licence Professionnelle
               </h3>
               <p className="text-xs text-purple-700">Spécialisation (Bac+3)</p>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
               <table className="w-full text-left border-collapse">
                  <thead>
                     <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                        <th className="p-4 font-semibold">Année Académique</th>
                        <th className="p-4 font-semibold text-center">Inscrits</th>
                        <th className="p-4 font-semibold text-right">Taux de Réussite</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm">
                     {lpStats.map((row) => (
                        <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                           <td className="p-4 font-bold text-gray-800">{row.year}</td>
                           <td className="p-4 text-center text-gray-600">{row.inscrits}</td>
                           <td className="p-4 text-right">
                              <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-bold ${row.taux >= 90 ? 'bg-green-100 text-green-700' : row.taux >= 80 ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                 {row.taux}%
                              </span>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-3">
               {lpStats.map((row) => <CycleCard key={row.id} item={row} />)}
            </div>
         </div>
      )}

      {/* Footer Note */}
      <div className="flex items-start bg-gray-50 p-4 rounded-xl border border-gray-200 text-xs text-gray-500 mx-2 mt-auto">
         <CheckCircle2 size={16} className="text-gray-400 mr-2 flex-shrink-0 mt-0.5" />
         <p>
            Ces statistiques sont basées sur les résultats définitifs des jurys de l'année académique précédente. 
            Le taux de réussite inclut les sessions de rattrapage.
         </p>
      </div>

    </div>
  );
};

export default SuccessRates;