

import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ChevronDown, ChevronUp, User, BookOpen, Monitor, TrendingUp, Users, Award, Briefcase, GraduationCap } from 'lucide-react';
import LazyImage from './LazyImage';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { Teacher } from '../types';

interface TeachersViewProps {
  onBack: () => void;
}

interface Department {
  id: string;
  name: string;
  description: string;
  image: string;
  icon: any;
  colorTheme: 'brand' | 'indigo' | 'orange' | 'pink';
  teachers: Teacher[];
}

const TeachersView: React.FC<TeachersViewProps> = ({ onBack }) => {
  const [expandedDept, setExpandedDept] = useState<string | null>(null);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [allTeachers, setAllTeachers] = useState<Teacher[]>([]);
  const lastScrollY = useRef(0);

  useEffect(() => {
     const fetchTeachers = async () => {
        try {
           const querySnapshot = await getDocs(collection(db, "teachers"));
           const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Teacher));
           setAllTeachers(data);
        } catch (error) {
           console.error("Error fetching teachers", error);
        }
     };
     fetchTeachers();
  }, []);

  // Gestion du Smart Header (Cache au scroll bas, Affiche au scroll haut)
  useEffect(() => {
    const mainContent = document.getElementById('main-content');
    if (!mainContent) return;

    const handleScroll = () => {
      const currentScrollY = mainContent.scrollTop;
      const scrollDiff = currentScrollY - lastScrollY.current;

      // Seuil de 10px pour éviter les micro-tremblements
      if (Math.abs(scrollDiff) < 10) return;

      if (scrollDiff > 0 && currentScrollY > 60) {
        // Scroll vers le bas et pas tout en haut -> Cacher
        setIsHeaderVisible(false);
      } else {
        // Scroll vers le haut -> Afficher
        setIsHeaderVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    mainContent.addEventListener('scroll', handleScroll, { passive: true });
    return () => mainContent.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDept = (id: string) => {
    setExpandedDept(expandedDept === id ? null : id);
  };

  const departments: Department[] = [
    {
      id: 'INFO',
      name: "Département Informatique",
      description: "Le pôle d'excellence numérique formant les développeurs et administrateurs réseaux de demain.",
      image: "https://services.zerofiltre.tech/images/trades-illustration-1.svg",
      icon: Monitor,
      colorTheme: 'brand',
      teachers: []
    },
    {
      id: 'GEA',
      name: "Département GEA",
      description: "Gestion des Entreprises et Administrations. Former des gestionnaires polyvalents.",
      image: "https://ik.imagekit.io/lfegvix1p/services_dsZIq509t.svg",
      icon: TrendingUp,
      colorTheme: 'indigo',
      teachers: []
    },
    {
        id: 'TC',
        name: "Techniques de Commercialisation",
        description: "Formation aux métiers de la vente, du marketing et de la négociation commerciale.",
        image: "https://services.zerofiltre.tech/images/our-service-illustration-3.svg",
        icon: Briefcase,
        colorTheme: 'orange',
        teachers: []
    },
    {
        id: 'GHT',
        name: "Gestion Hôtelière et Touristique",
        description: "L'art de l'accueil et du service. Préparation aux carrières du tourisme.",
        image: "https://services.zerofiltre.tech/images/our-approach-illustration-3.svg",
        icon: Users,
        colorTheme: 'pink',
        teachers: []
    }
  ];

  const getThemeClasses = (theme: string) => {
      switch(theme) {
          case 'brand': return { bg: 'bg-brand-50', text: 'text-brand-600', border: 'border-brand-100', btn: 'bg-brand-600', badge: 'bg-brand-100 text-brand-800' };
          case 'indigo': return { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-100', btn: 'bg-indigo-600', badge: 'bg-indigo-100 text-indigo-800' };
          case 'orange': return { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-100', btn: 'bg-orange-600', badge: 'bg-orange-100 text-orange-800' };
          case 'pink': return { bg: 'bg-pink-50', text: 'text-pink-600', border: 'border-pink-100', btn: 'bg-pink-600', badge: 'bg-pink-100 text-pink-800' };
          default: return { bg: 'bg-gray-50', text: 'text-gray-600', border: 'border-gray-100', btn: 'bg-gray-600', badge: 'bg-gray-100 text-gray-800' };
      }
  };

  return (
    <div className="space-y-8 pb-24 animate-in fade-in slide-in-from-right duration-500 font-sans bg-gray-50 min-h-screen">
      
      {/* Smart Header */}
      <div 
        className={`bg-white/95 backdrop-blur-sm p-4 pt-safe-4 border-b border-gray-200 sticky top-0 z-40 shadow-sm transition-transform duration-300 ease-in-out will-change-transform ${isHeaderVisible ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <div className="flex items-center space-x-4">
            <button 
            onClick={onBack}
            className="p-2 bg-gray-50 rounded-full shadow-sm border border-gray-200 text-gray-600 hover:text-brand-600 transition-colors active:scale-95"
            >
            <ArrowLeft size={24} />
            </button>
            <div>
            <h1 className="text-xl font-bold text-gray-900 font-title leading-none">Nos Enseignants</h1>
            <p className="text-xs text-gray-500 mt-1">Découvrez l'équipe pédagogique</p>
            </div>
        </div>
      </div>

      {/* Top Hero Section */}
      <div className="px-4">
         <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-400 to-indigo-500"></div>
            <div className="mb-6 flex justify-center">
                <LazyImage 
                    src="https://services.zerofiltre.tech/images/our-service-illustration-2.svg" 
                    alt="Corps Enseignant" 
                    className="w-full max-w-xs h-auto object-contain drop-shadow-sm"
                    containerClassName="w-full max-w-xs"
                />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 font-title mb-2">L'Excellence par la Pédagogie</h2>
            <p className="text-gray-600 text-sm leading-relaxed max-w-lg mx-auto">
                L'IUT de Tahoua dispose d'un corps enseignant qualifié, composé d'ingénieurs, de docteurs et de professionnels expérimentés.
            </p>
         </div>
      </div>

      {/* Departments List */}
      <div className="px-4 space-y-6">
         {departments.map((dept) => {
             const theme = getThemeClasses(dept.colorTheme);
             const isExpanded = expandedDept === dept.id;
             // Filter teachers for this department from fetched data
             const deptTeachers = allTeachers.filter(t => t.departmentId === dept.id);

             return (
                 <div key={dept.id} className={`bg-white rounded-2xl border ${isExpanded ? theme.border : 'border-gray-100'} shadow-sm overflow-hidden transition-all duration-300`}>
                     
                     <div className="p-6">
                        <div className="flex flex-col md:flex-row gap-6 items-center">
                            <div className="w-full md:w-1/3 flex justify-center">
                                <LazyImage 
                                    src={dept.image} 
                                    alt={dept.name} 
                                    className="w-48 h-auto object-contain"
                                />
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <div className={`inline-flex items-center p-2 rounded-lg ${theme.bg} ${theme.text} mb-3`}>
                                    <dept.icon size={20} className="mr-2" />
                                    <span className="text-xs font-bold uppercase tracking-wider">{dept.id}</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{dept.name}</h3>
                                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                                    {dept.description}
                                </p>
                                
                                <button 
                                    onClick={() => toggleDept(dept.id)}
                                    className={`w-full md:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl text-white font-bold shadow-lg transition-all active:scale-95 ${theme.btn} hover:opacity-90`}
                                >
                                    {isExpanded ? (
                                        <>Masquer l'équipe <ChevronUp size={18} className="ml-2" /></>
                                    ) : (
                                        <>Découvrir l'équipe <ChevronDown size={18} className="ml-2" /></>
                                    )}
                                </button>
                            </div>
                        </div>
                     </div>

                     {isExpanded && (
                         <div className="bg-gray-50/50 border-t border-gray-100 p-4 md:p-6 animate-in slide-in-from-top-4 fade-in duration-300">
                             {deptTeachers.length > 0 ? (
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                     {deptTeachers.map((teacher) => (
                                         <div key={teacher.id} className={`bg-white p-4 rounded-xl border ${teacher.isDirector ? 'border-amber-200 ring-1 ring-amber-100 shadow-md' : 'border-gray-200 shadow-sm'} flex items-start gap-4 transition-transform hover:scale-[1.01]`}>
                                             <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${teacher.isDirector ? 'bg-amber-100 text-amber-600' : theme.bg + ' ' + theme.text}`}>
                                                 {teacher.isDirector ? <Award size={24} /> : <User size={24} />}
                                             </div>
                                             <div>
                                                 <h4 className="font-bold text-gray-900 text-base">{teacher.name}</h4>
                                                 <p className={`text-xs font-bold uppercase mb-2 ${teacher.isDirector ? 'text-amber-600' : theme.text}`}>
                                                     {teacher.role}
                                                 </p>
                                                 <div className="flex items-start text-xs text-gray-500">
                                                     <BookOpen size={14} className="mr-1.5 mt-0.5 flex-shrink-0" />
                                                     <span>{teacher.courses}</span>
                                                 </div>
                                             </div>
                                         </div>
                                     ))}
                                 </div>
                             ) : (
                                 <div className="text-center py-8 text-gray-500">
                                     <GraduationCap size={48} className="mx-auto mb-2 text-gray-300" />
                                     <p>La liste des enseignants pour ce département sera bientôt mise à jour.</p>
                                 </div>
                             )}
                         </div>
                     )}
                 </div>
             );
         })}
      </div>

    </div>
  );
};

export default TeachersView;
