

import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as ReTooltip, ResponsiveContainer, 
} from 'recharts';
import { Lock, LogIn, TrendingUp, Users, AlertCircle, GraduationCap, Download, Filter, Settings, Edit2, X, Check, Eye, Plus, Trash2, Phone, MapPin, Clock, RefreshCw, Mail, GitMerge, MoveDown, MoveUp, Bell, Pin, Calendar, CheckCircle2, Info, LogOut, PieChart, LayoutDashboard, Shield, User, Handshake, MessageSquareQuote } from 'lucide-react';
import { DASHBOARD_STATS, FAQ_DATA, AVAILABLE_ICONS } from '../constants';
import { FaqItem, Category, ProcessFlow, FlowStep, Notice, NoticeCategory, StatGlobal, StatEvolution, StatCycle, Teacher, Partner, Testimonial } from '../types';

// Firebase Imports
import { db, auth } from '../firebaseConfig';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, Timestamp, query, orderBy } from 'firebase/firestore';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';

const Dashboard: React.FC = () => {
  // Auth State
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true); // Loading initial state check
  
  // Login Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  // Dashboard Content State
  const [activeTab, setActiveTab] = useState<'STATS' | 'ADMIN'>('STATS');
  const [activeAdminSection, setActiveAdminSection] = useState<'FAQ' | 'FLOWS' | 'NOTICES' | 'SUCCESS' | 'TEACHERS' | 'PARTNERS' | 'TESTIMONIALS'>('FAQ');
  const [selectedYear, setSelectedYear] = useState('2025-2026');

  // Admin Data State
  const [localFaqData, setLocalFaqData] = useState<FaqItem[]>([]);
  const [localFlowsData, setLocalFlowsData] = useState<ProcessFlow[]>([]);
  const [localNoticesData, setLocalNoticesData] = useState<Notice[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);

  // Success Rates Data State (Admin)
  const [successDataType, setSuccessDataType] = useState<'GLOBAL' | 'EVOLUTION' | 'DUT' | 'LP'>('GLOBAL');
  const [localStatsGlobal, setLocalStatsGlobal] = useState<StatGlobal[]>([]);
  const [localStatsEvo, setLocalStatsEvo] = useState<StatEvolution[]>([]);
  const [localStatsDut, setLocalStatsDut] = useState<StatCycle[]>([]);
  const [localStatsLp, setLocalStatsLp] = useState<StatCycle[]>([]);

  // NEW DATA STATES FOR TEACHERS, PARTNERS, TESTIMONIALS
  const [localTeachers, setLocalTeachers] = useState<Teacher[]>([]);
  const [localPartners, setLocalPartners] = useState<Partner[]>([]);
  const [localTestimonials, setLocalTestimonials] = useState<Testimonial[]>([]);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'ADD' | 'EDIT'>('ADD');

  // TOAST NOTIFICATION STATE
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  
  // FAQ Form State
  const initialFaqFormState = {
    id: '',
    question: '',
    category: Category.ADMISSION,
    procedure: '',
    service: '',
    location: '',
    timing: '',
    steps: '', // String representation for textarea
    contact: ''
  };
  const [faqFormData, setFaqFormData] = useState(initialFaqFormState);

  // Flow Form State
  const initialFlowFormState: ProcessFlow = {
     id: '',
     title: '',
     steps: []
  };
  const [flowFormData, setFlowFormData] = useState<ProcessFlow>(initialFlowFormState);

  // Notice Form State
  const initialNoticeFormState: Notice = {
    id: '',
    title: '',
    date: new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }),
    category: 'ADMINISTRATION',
    content: '',
    fileSize: '',
    isNew: true
  };
  const [noticeFormData, setNoticeFormData] = useState<Notice>(initialNoticeFormState);

  // Success Data Form States
  const [statGlobalForm, setStatGlobalForm] = useState<StatGlobal>({ id: '', label: '', value: '', iconName: 'TrendingUp', colorClass: 'text-emerald-600', bgClass: 'bg-emerald-50', order: 1 });
  const [statEvoForm, setStatEvoForm] = useState<StatEvolution>({ id: '', year: '', rate: 0 });
  const [statCycleForm, setStatCycleForm] = useState<StatCycle>({ id: '', year: '', inscrits: 0, taux: 0, type: 'DUT' });

  // NEW FORM STATES
  const [teacherForm, setTeacherForm] = useState<Teacher>({ id: '', name: '', role: '', courses: '', departmentId: 'INFO', isDirector: false });
  const [partnerForm, setPartnerForm] = useState<Partner>({ id: '', name: '', type: 'ENTREPRISE', description: '', website: '' });
  const [testimonialForm, setTestimonialForm] = useState<Testimonial>({ id: '', name: '', promo: '', role: '', text: '' });

  // --- HELPER: SHOW TOAST ---
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    // Auto hide after 4 seconds
    setTimeout(() => {
       setToast(null);
    }, 4000);
  };

  // --- AUTH LISTENER ---
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthLoading(false);
      if (user && activeTab === 'ADMIN') {
         fetchAdminData();
      }
    });
    return () => unsubscribe();
  }, [activeTab]);

  useEffect(() => {
     if (currentUser && activeTab === 'ADMIN' && activeAdminSection === 'SUCCESS') {
        fetchSuccessData();
     }
  }, [activeAdminSection, currentUser]);

  const fetchAdminData = () => {
     fetchFaqs();
     fetchFlows();
     fetchNotices();
     fetchTeachers();
     fetchPartners();
     fetchTestimonials();
  };

  // --- SCROLL TO TOP LOGIC ---
  useEffect(() => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentUser, activeTab]);

  // --- FETCH DATA FROM FIREBASE ---
  const fetchFaqs = async () => {
    setIsLoadingData(true);
    try {
      const querySnapshot = await getDocs(collection(db, "faqs"));
      const data: FaqItem[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as FaqItem));
      setLocalFaqData(data);
    } catch (error) {
      console.error("Erreur récupération données FAQ:", error);
    } finally {
      setIsLoadingData(false);
    }
  };

  const fetchFlows = async () => {
    setIsLoadingData(true);
    try {
       const querySnapshot = await getDocs(collection(db, "flows"));
       const data: ProcessFlow[] = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
       } as ProcessFlow));
       setLocalFlowsData(data);
    } catch (error) {
       console.error("Erreur récupération données Flux:", error);
    } finally {
       setIsLoadingData(false);
    }
  };

  const fetchNotices = async () => {
    setIsLoadingData(true);
    try {
      const q = query(collection(db, "notices"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const data: Notice[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Notice));
      setLocalNoticesData(data);
    } catch (error) {
       console.error("Erreur récupération données Notices:", error);
       try {
         const querySnapshot = await getDocs(collection(db, "notices"));
         const data: Notice[] = querySnapshot.docs.map(doc => ({
           id: doc.id,
           ...doc.data()
         } as Notice));
         setLocalNoticesData(data);
       } catch (e) {
         console.error("Erreur fallback:", e);
       }
    } finally {
      setIsLoadingData(false);
    }
  };

  const fetchSuccessData = async () => {
    setIsLoadingData(true);
    try {
      const gSnap = await getDocs(query(collection(db, "stats_global"), orderBy("order", "asc")));
      setLocalStatsGlobal(gSnap.docs.map(d => ({ id: d.id, ...d.data() } as StatGlobal)));
      
      const eSnap = await getDocs(query(collection(db, "stats_evolution"), orderBy("year", "asc")));
      setLocalStatsEvo(eSnap.docs.map(d => ({ id: d.id, ...d.data() } as StatEvolution)));
      
      const dutSnap = await getDocs(collection(db, "stats_dut"));
      setLocalStatsDut(dutSnap.docs.map(d => ({ id: d.id, ...d.data() } as StatCycle)));

      const lpSnap = await getDocs(collection(db, "stats_lp"));
      setLocalStatsLp(lpSnap.docs.map(d => ({ id: d.id, ...d.data() } as StatCycle)));
    } catch (e) {
      console.error("Erreur fetch success data", e);
    } finally {
      setIsLoadingData(false);
    }
  };

  const fetchTeachers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "teachers"));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Teacher));
      setLocalTeachers(data);
    } catch (error) { console.error("Error fetching teachers", error); }
  };

  const fetchPartners = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "partners"));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Partner));
      setLocalPartners(data);
    } catch (error) { console.error("Error fetching partners", error); }
  };

  const fetchTestimonials = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "testimonials"));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Testimonial));
      setLocalTestimonials(data);
    } catch (error) { console.error("Error fetching testimonials", error); }
  };


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoggingIn(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      showToast("Bienvenue dans votre espace d'administration.", "success");
    } catch (err: any) {
      console.error("Login Error:", err);
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError('Email ou mot de passe incorrect.');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Trop de tentatives. Veuillez réessayer plus tard.');
      } else {
        setError('Une erreur est survenue lors de la connexion.');
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setPassword('');
      showToast("Vous avez été déconnecté avec succès.", "info");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  // --- CRUD HELPERS FOR NEW SECTIONS ---
  const handleGenericSave = async (collectionName: string, data: any, id: string, fetcher: () => void) => {
     setIsLoadingData(true);
     try {
        const { id: _, ...dataToSave } = data; // remove id from payload
        if (modalMode === 'ADD') {
           await addDoc(collection(db, collectionName), dataToSave);
           showToast("Ajouté avec succès.", "success");
        } else {
           await updateDoc(doc(db, collectionName, id), dataToSave);
           showToast("Mis à jour avec succès.", "success");
        }
        await fetcher();
        setIsModalOpen(false);
     } catch (e) {
        console.error("Save error", e);
        showToast("Erreur lors de la sauvegarde.", "error");
     } finally {
        setIsLoadingData(false);
     }
  };

  const handleGenericDelete = async (collectionName: string, id: string, fetcher: () => void) => {
     if(!confirm("Supprimer cet élément ?")) return;
     setIsLoadingData(true);
     try {
        await deleteDoc(doc(db, collectionName, id));
        await fetcher();
        showToast("Supprimé avec succès.", "success");
     } catch (e) {
        console.error("Delete error", e);
        showToast("Erreur lors de la suppression.", "error");
     } finally {
        setIsLoadingData(false);
     }
  };

  // --- SPECIFIC MODAL OPENERS ---
  const openTeacherModal = (mode: 'ADD' | 'EDIT', item?: Teacher) => {
     setModalMode(mode);
     if (mode === 'EDIT' && item) setTeacherForm(item);
     else setTeacherForm({ id: '', name: '', role: '', courses: '', departmentId: 'INFO', isDirector: false });
     setIsModalOpen(true);
  };

  const openPartnerModal = (mode: 'ADD' | 'EDIT', item?: Partner) => {
     setModalMode(mode);
     if (mode === 'EDIT' && item) setPartnerForm(item);
     else setPartnerForm({ id: '', name: '', type: 'ENTREPRISE', description: '', website: '' });
     setIsModalOpen(true);
  };

  const openTestimonialModal = (mode: 'ADD' | 'EDIT', item?: Testimonial) => {
     setModalMode(mode);
     if (mode === 'EDIT' && item) setTestimonialForm(item);
     else setTestimonialForm({ id: '', name: '', promo: 'Promotion 2023', role: '', text: '' });
     setIsModalOpen(true);
  };

  // --- CRUD HANDLERS : SUCCESS STATS, FAQS, FLOWS, NOTICES (Existing) ---
  const openSuccessModal = (mode: 'ADD' | 'EDIT', type: 'GLOBAL' | 'EVOLUTION' | 'DUT' | 'LP', item?: any) => {
    setModalMode(mode);
    setSuccessDataType(type);
    
    if (type === 'GLOBAL') {
       if (mode === 'EDIT' && item) setStatGlobalForm(item);
       else setStatGlobalForm({ id: '', label: '', value: '', iconName: 'TrendingUp', colorClass: 'text-emerald-600', bgClass: 'bg-emerald-50', order: localStatsGlobal.length + 1 });
    } else if (type === 'EVOLUTION') {
       if (mode === 'EDIT' && item) setStatEvoForm(item);
       else setStatEvoForm({ id: '', year: new Date().getFullYear().toString(), rate: 50 });
    } else {
       if (mode === 'EDIT' && item) setStatCycleForm(item);
       else setStatCycleForm({ id: '', year: '2023-2024', inscrits: 0, taux: 0, type: type as 'DUT' | 'LP' });
    }
    setIsModalOpen(true);
  };

  const handleSaveSuccessStat = async () => {
    setIsLoadingData(true);
    try {
      let collectionName = '';
      let dataToSave: any = {};
      let docId = '';

      if (successDataType === 'GLOBAL') {
         collectionName = 'stats_global';
         const { id, ...rest } = statGlobalForm;
         dataToSave = rest;
         docId = id;
      } else if (successDataType === 'EVOLUTION') {
         collectionName = 'stats_evolution';
         const { id, ...rest } = statEvoForm;
         dataToSave = { ...rest, rate: Number(rest.rate) };
         docId = id;
      } else {
         collectionName = successDataType === 'DUT' ? 'stats_dut' : 'stats_lp';
         const { id, ...rest } = statCycleForm;
         dataToSave = { ...rest, taux: Number(rest.taux), type: successDataType };
         docId = id;
      }

      if (modalMode === 'ADD') {
         await addDoc(collection(db, collectionName), dataToSave);
         showToast("Statistique ajoutée.", "success");
      } else {
         await updateDoc(doc(db, collectionName, docId), dataToSave);
         showToast("Statistique mise à jour.", "success");
      }
      await fetchSuccessData();
      setIsModalOpen(false);

    } catch (e) {
      console.error("Save Success Error", e);
      showToast("Erreur lors de la sauvegarde.", "error");
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleDeleteSuccessStat = async (id: string, type: string) => {
     if(!confirm("Supprimer cette entrée ?")) return;
     setIsLoadingData(true);
     try {
       let col = '';
       if (type === 'GLOBAL') col = 'stats_global';
       else if (type === 'EVOLUTION') col = 'stats_evolution';
       else if (type === 'DUT') col = 'stats_dut';
       else col = 'stats_lp';

       await deleteDoc(doc(db, col, id));
       await fetchSuccessData();
       showToast("Supprimé avec succès.", "success");
     } catch (e) {
       console.error(e);
       showToast("Erreur lors de la suppression.", "error");
     } finally {
       setIsLoadingData(false);
     }
  };

  const openFaqModal = (mode: 'ADD' | 'EDIT', item?: FaqItem) => {
    setModalMode(mode);
    if (mode === 'EDIT' && item) {
       setFaqFormData({
          id: item.id,
          question: item.question,
          category: item.category,
          procedure: item.procedure,
          service: item.service,
          location: item.location,
          timing: item.timing,
          steps: item.steps.join('\n'),
          contact: item.contact || ''
       });
    } else {
       setFaqFormData({ ...initialFaqFormState, id: '' });
    }
    setIsModalOpen(true);
  };

  const handleSaveFaq = async () => {
    if (!faqFormData.question || !faqFormData.procedure) return;
    setIsLoadingData(true);
    const stepsArray = faqFormData.steps.split('\n').filter(line => line.trim() !== '');
    const itemData = {
      question: faqFormData.question,
      category: faqFormData.category,
      procedure: faqFormData.procedure,
      service: faqFormData.service,
      location: faqFormData.location,
      timing: faqFormData.timing,
      steps: stepsArray,
      keywords: [],
      contact: faqFormData.contact
    };
    try {
      if (modalMode === 'ADD') {
        await addDoc(collection(db, "faqs"), itemData);
        showToast("Nouvelle FAQ ajoutée avec succès.", "success");
      } else {
        const faqRef = doc(db, "faqs", faqFormData.id);
        await updateDoc(faqRef, itemData);
        showToast("FAQ mise à jour avec succès.", "success");
      }
      await fetchFaqs();
      setIsModalOpen(false);
    } catch (e) {
      console.error("Erreur lors de la sauvegarde FAQ:", e);
      showToast("Erreur lors de l'enregistrement.", "error");
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleDeleteFaq = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet élément ?")) return;
    setIsLoadingData(true);
    try {
      await deleteDoc(doc(db, "faqs", id));
      await fetchFaqs();
      showToast("Élément supprimé avec succès.", "success");
    } catch (e) {
      console.error("Erreur suppression FAQ:", e);
      showToast("Impossible de supprimer l'élément.", "error");
    } finally {
      setIsLoadingData(false);
    }
  };

  const openFlowModal = (mode: 'ADD' | 'EDIT', item?: ProcessFlow) => {
     setModalMode(mode);
     if (mode === 'EDIT' && item) setFlowFormData(item);
     else setFlowFormData({ ...initialFlowFormState, id: '', steps: [] });
     setIsModalOpen(true);
  };

  const handleAddFlowStep = () => {
     const newStep: FlowStep = {
        id: `step_${Date.now()}`,
        label: '',
        description: '',
        service: '',
        icon: 'check-circle'
     };
     setFlowFormData({ ...flowFormData, steps: [...flowFormData.steps, newStep] });
  };

  const handleRemoveFlowStep = (index: number) => {
     const newSteps = [...flowFormData.steps];
     newSteps.splice(index, 1);
     setFlowFormData({ ...flowFormData, steps: newSteps });
  };

  const handleFlowStepChange = (index: number, field: keyof FlowStep, value: string) => {
     const newSteps = [...flowFormData.steps];
     newSteps[index] = { ...newSteps[index], [field]: value };
     setFlowFormData({ ...flowFormData, steps: newSteps });
  };

  const handleSaveFlow = async () => {
     if (!flowFormData.title) return;
     if (flowFormData.steps.length === 0) {
        showToast("Veuillez ajouter au moins une étape.", "error");
        return;
     }
     setIsLoadingData(true);
     const { id, ...dataToSave } = flowFormData;
     try {
        if (modalMode === 'ADD') {
           await addDoc(collection(db, "flows"), dataToSave);
           showToast("Parcours créé avec succès.", "success");
        } else {
           const flowRef = doc(db, "flows", flowFormData.id);
           await updateDoc(flowRef, dataToSave);
           showToast("Parcours mis à jour avec succès.", "success");
        }
        await fetchFlows();
        setIsModalOpen(false);
     } catch (e) {
        console.error("Erreur sauvegarde Flux:", e);
        showToast("Erreur lors de la sauvegarde du flux.", "error");
     } finally {
        setIsLoadingData(false);
     }
  };

  const handleDeleteFlow = async (id: string) => {
     if (!confirm("Supprimer ce parcours ?")) return;
     setIsLoadingData(true);
     try {
        await deleteDoc(doc(db, "flows", id));
        await fetchFlows();
        showToast("Parcours supprimé définitivement.", "success");
     } catch (e) {
        console.error("Erreur suppression Flux:", e);
        showToast("Erreur lors de la suppression.", "error");
     } finally {
        setIsLoadingData(false);
     }
  };

  const openNoticeModal = (mode: 'ADD' | 'EDIT', item?: Notice) => {
    setModalMode(mode);
    if (mode === 'EDIT' && item) setNoticeFormData({ ...item });
    else setNoticeFormData({ ...initialNoticeFormState, id: '', date: new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }) });
    setIsModalOpen(true);
  };

  const handleSaveNotice = async () => {
    if (!noticeFormData.title || !noticeFormData.content) return;
    setIsLoadingData(true);
    const { id, ...dataToSave } = noticeFormData;
    const payload = { ...dataToSave, createdAt: modalMode === 'ADD' ? Timestamp.now() : noticeFormData.createdAt };
    try {
       if (modalMode === 'ADD') {
          await addDoc(collection(db, "notices"), payload);
          showToast("Note d'information publiée.", "success");
       } else {
          const noticeRef = doc(db, "notices", noticeFormData.id);
          await updateDoc(noticeRef, payload);
          showToast("Note d'information modifiée.", "success");
       }
       await fetchNotices();
       setIsModalOpen(false);
    } catch (e) {
       console.error("Erreur sauvegarde Notice:", e);
       showToast("Erreur lors de la publication.", "error");
    } finally {
       setIsLoadingData(false);
    }
  };

  const handleDeleteNotice = async (id: string) => {
    if (!confirm("Supprimer cette note d'affichage ?")) return;
    setIsLoadingData(true);
    try {
       await deleteDoc(doc(db, "notices", id));
       await fetchNotices();
       showToast("Note d'information retirée.", "success");
    } catch (e) {
       console.error("Erreur suppression Notice:", e);
       showToast("Erreur lors de la suppression.", "error");
    } finally {
       setIsLoadingData(false);
    }
  };


  // 1. LOADING STATE
  if (authLoading) {
     return (
        <div className="flex h-full items-center justify-center p-10">
           <RefreshCw className="animate-spin text-brand-600" size={32} />
        </div>
     );
  }

  // 2. LOGIN VIEW (If not authenticated)
  if (!currentUser) {
    return (
      <div className="-m-4 md:m-0 flex flex-col items-center justify-center min-h-[calc(100dvh-4rem)] md:h-full p-4 animate-in fade-in zoom-in-95 duration-500 bg-gray-50/50">
        <div className="w-full max-w-md bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-gray-200/50 border border-white ring-1 ring-gray-100 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-600 to-accent-500"></div>
          <div className="w-20 h-20 bg-brand-50 text-brand-700 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner">
            <Lock size={36} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Espace Direction</h2>
          <p className="text-gray-500 mb-8 leading-relaxed text-sm">Veuillez vous identifier pour accéder au panneau d'administration.</p>
          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">Email Administrateur</label>
              <div className="relative">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="block w-full pl-10 pr-4 py-3.5 border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all outline-none" placeholder="admin@iut-compass.ne" required />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><Mail size={18} /></div>
              </div>
            </div>
            <div className="relative">
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">Mot de passe</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className="block w-full pl-4 pr-10 py-3.5 border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all outline-none" placeholder="••••••••" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"><Eye size={20} /></button>
              </div>
            </div>
            {error && <div className="flex items-center text-red-600 text-xs bg-red-50 p-3 rounded-lg border border-red-100 font-medium"><AlertCircle size={14} className="mr-2 flex-shrink-0" />{error}</div>}
            <button type="submit" disabled={isLoggingIn} className="w-full bg-brand-800 text-white font-bold py-4 rounded-xl hover:bg-brand-900 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed">
              {isLoggingIn ? <RefreshCw className="animate-spin mr-2" size={20}/> : <LogIn size={20} className="mr-2" />}
              {isLoggingIn ? 'Connexion...' : 'Connexion sécurisée'}
            </button>
          </form>
          <p className="mt-8 text-[10px] text-gray-400 leading-tight">Accès réservé au personnel autorisé de l'IUT.<br/>En cas de problème, contactez le support DSI.</p>
        </div>
        {toast && <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-bottom-5 fade-in duration-300 pointer-events-none"><div className={`flex items-center gap-3 px-6 py-3 rounded-full shadow-2xl border backdrop-blur-md ${toast.type === 'success' ? 'bg-gray-900/95 text-white border-gray-800' : toast.type === 'error' ? 'bg-red-600/95 text-white border-red-700' : 'bg-blue-600/95 text-white border-blue-700'}`}>{toast.type === 'success' && <CheckCircle2 size={18} className="text-green-400" />}{toast.type === 'error' && <AlertCircle size={18} className="text-white" />}{toast.type === 'info' && <Info size={18} className="text-white" />}<span className="font-medium text-sm">{toast.message}</span></div></div>}
      </div>
    );
  }

  const totalStudents = DASHBOARD_STATS.departments.reduce((acc, curr) => acc + curr.students, 0);
  const avgSuccess = Math.round(DASHBOARD_STATS.departments.reduce((acc, curr) => acc + curr.successRate, 0) / DASHBOARD_STATS.departments.length);

  return (
    <div className="-m-4 md:m-0 min-h-[calc(100dvh-4rem)] md:min-h-0 relative flex flex-col md:block bg-gray-50 md:bg-transparent">
      
      {/* Top Bar */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 md:bg-transparent md:border-none md:static px-4 py-4 md:px-0 md:py-2 flex flex-row justify-between items-center md:items-end md:pb-6 gap-4">
        <div>
          <h2 className="text-xl md:text-3xl font-bold text-gray-900 tracking-tight">Tableau de Bord</h2>
          <p className="text-xs md:text-sm text-gray-500 mt-1 flex items-center">
            <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
            Bonjour, <span className="font-bold ml-1 text-gray-700 truncate max-w-[150px] md:max-w-none">{currentUser.email?.split('@')[0]}</span>
          </p>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <div className="flex bg-gray-100 p-1 rounded-xl">
            <button onClick={() => setActiveTab('STATS')} className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'STATS' ? 'bg-white text-brand-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>Statistiques</button>
            <button onClick={() => setActiveTab('ADMIN')} className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'ADMIN' ? 'bg-white text-brand-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>Administration</button>
          </div>
          <button onClick={handleLogout} className="p-3 text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors border border-red-100" title="Se déconnecter"><LogOut size={20} /></button>
        </div>
         <button onClick={handleLogout} className="md:hidden p-2 text-red-600 bg-red-50 rounded-lg"><LogOut size={18} /></button>
      </div>

      <div className="p-4 md:p-0 pb-24 md:pb-24"> 

      {/* STATS VIEW */}
      {activeTab === 'STATS' && (
        <div className="space-y-6 animate-in slide-in-from-left-4 duration-300">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
             <div className="flex items-center justify-between w-full md:w-auto">
                <div className="flex items-center text-gray-500 mr-2">
                    <Filter size={18} className="mr-2" />
                    <span className="text-sm font-semibold">Filtres :</span>
                </div>
             </div>
             <div className="flex items-center w-full md:w-auto gap-2">
                <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="bg-gray-50 border-0 ring-1 ring-gray-200 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-brand-500 block w-full md:w-auto p-2.5 font-medium">
                <option value="2025-2026">2025-2026</option>
                <option value="2024-2025">2024-2025</option>
                <option value="2023-2024">2023-2024</option>
                </select>
                <button className="flex-1 md:flex-none flex items-center justify-center px-4 py-2.5 bg-brand-50 text-brand-700 text-sm font-bold rounded-xl hover:bg-brand-100 transition-colors border border-brand-100 whitespace-nowrap"><Download size={18} className="mr-2" /><span className="hidden sm:inline">Exporter</span> Report</button>
             </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><Users size={64} className="text-brand-600" /></div>
              <div className="relative z-10">
                <p className="text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-2">Effectif Total</p>
                <div className="flex items-end flex-wrap">
                   <p className="text-2xl md:text-3xl font-bold text-gray-900">{totalStudents}</p>
                   <span className="mb-1 ml-1 md:ml-2 text-[10px] md:text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center"><TrendingUp size={10} className="mr-1"/> +5%</span>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><GraduationCap size={64} className="text-accent-500" /></div>
              <div className="relative z-10">
                <p className="text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-2">Taux Réussite</p>
                <div className="flex items-end">
                   <p className="text-2xl md:text-3xl font-bold text-gray-900">{avgSuccess}%</p>
                   <span className="mb-1 ml-2 text-[10px] md:text-xs font-bold text-gray-400">Moyenne</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-200 col-span-2 flex items-start">
              <div className="bg-red-100 p-2 md:p-3 rounded-xl mr-3 md:mr-4 text-red-600 flex-shrink-0"><AlertCircle size={20} className="md:w-6 md:h-6" /></div>
              <div>
                <p className="text-gray-900 font-bold mb-1 text-sm md:text-base">Point d'attention</p>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">Le taux d'abandon en <strong>L1 Informatique</strong> montre une hausse de 2%. Intervention suggérée.</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-base md:text-lg font-bold text-gray-900 mb-6">Évolution des Inscriptions</h3>
              <div className="h-64 md:h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={DASHBOARD_STATS.enrollmentHistory} margin={{top: 10, right: 10, left: -20, bottom: 0}}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                    <ReTooltip cursor={{fill: '#f9fafb'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'}} />
                    <Bar dataKey="count" fill="#0ea5e9" radius={[6, 6, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-base md:text-lg font-bold text-gray-900 mb-6">Réussite par Filière</h3>
              <div className="h-64 md:h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart layout="vertical" data={DASHBOARD_STATS.departments} margin={{top: 0, right: 30, left: 10, bottom: 0}}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f3f4f6" />
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" width={90} tick={{fontSize: 11, fill: '#4b5563', fontWeight: 500}} axisLine={false} tickLine={false} />
                    <ReTooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'}} />
                    <Bar dataKey="successRate" fill="#eab308" radius={[0, 6, 6, 0]} barSize={24} background={{ fill: '#f9fafb' }} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADMIN VIEW */}
      {activeTab === 'ADMIN' && (
        <div className="animate-in slide-in-from-right-4 duration-300 relative">
           
           <div className="flex space-x-2 mb-4 bg-gray-100 p-1 rounded-xl w-full overflow-x-auto no-scrollbar pb-1">
              {['FAQ', 'FLOWS', 'NOTICES', 'SUCCESS', 'TEACHERS', 'PARTNERS', 'TESTIMONIALS'].map((sec) => (
                  <button 
                    key={sec}
                    onClick={() => setActiveAdminSection(sec as any)}
                    className={`flex-shrink-0 px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center ${activeAdminSection === sec ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    {sec === 'SUCCESS' && <PieChart size={14} className="mr-1.5"/>}
                    {sec === 'TEACHERS' && <User size={14} className="mr-1.5"/>}
                    {sec === 'PARTNERS' && <Handshake size={14} className="mr-1.5"/>}
                    {sec === 'TESTIMONIALS' && <MessageSquareQuote size={14} className="mr-1.5"/>}
                    {sec === 'FAQ' ? 'Gestion FAQ' : sec === 'FLOWS' ? 'Gestion Flux' : sec === 'NOTICES' ? 'Gestion Affichage' : sec === 'SUCCESS' ? 'Réussite' : sec === 'TEACHERS' ? 'Enseignants' : sec === 'PARTNERS' ? 'Partenaires' : 'Témoignages'}
                  </button>
              ))}
           </div>

           {/* SECTION TEACHERS */}
           {activeAdminSection === 'TEACHERS' && (
             <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-4 md:p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                   <div>
                      <div className="flex items-center gap-2">
                         <h3 className="text-base md:text-lg font-bold text-gray-900">Enseignants</h3>
                         {isLoadingData && <RefreshCw size={16} className="text-brand-500 animate-spin" />}
                      </div>
                      <p className="text-xs text-gray-500">Gérez le corps professoral.</p>
                   </div>
                   <button onClick={() => openTeacherModal('ADD')} className="px-4 py-2 bg-brand-800 text-white text-xs md:text-sm font-bold rounded-xl hover:bg-brand-900 shadow transition-all flex items-center"><Plus size={16} className="mr-1" /> Ajouter</button>
                </div>
                <div className="divide-y divide-gray-100">
                   {localTeachers.map(teacher => (
                      <div key={teacher.id} className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center hover:bg-gray-50 gap-4">
                         <div>
                            <h4 className="font-bold text-gray-900">{teacher.name}</h4>
                            <p className="text-xs text-gray-500">{teacher.role}</p>
                            <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-100">{teacher.departmentId}</span>
                         </div>
                         <div className="flex gap-2">
                             <button onClick={() => openTeacherModal('EDIT', teacher)} className="p-2 text-gray-400 hover:text-brand-600 bg-gray-50 rounded-lg"><Edit2 size={16}/></button>
                             <button onClick={() => handleGenericDelete('teachers', teacher.id, fetchTeachers)} className="p-2 text-gray-400 hover:text-red-600 bg-gray-50 rounded-lg"><Trash2 size={16}/></button>
                         </div>
                      </div>
                   ))}
                </div>
             </div>
           )}

           {/* SECTION PARTNERS */}
           {activeAdminSection === 'PARTNERS' && (
             <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-4 md:p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                   <div>
                      <div className="flex items-center gap-2">
                         <h3 className="text-base md:text-lg font-bold text-gray-900">Partenaires</h3>
                         {isLoadingData && <RefreshCw size={16} className="text-brand-500 animate-spin" />}
                      </div>
                   </div>
                   <button onClick={() => openPartnerModal('ADD')} className="px-4 py-2 bg-brand-800 text-white text-xs md:text-sm font-bold rounded-xl hover:bg-brand-900 shadow transition-all flex items-center"><Plus size={16} className="mr-1" /> Ajouter</button>
                </div>
                <div className="divide-y divide-gray-100">
                   {localPartners.map(partner => (
                      <div key={partner.id} className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center hover:bg-gray-50 gap-4">
                         <div>
                            <h4 className="font-bold text-gray-900">{partner.name}</h4>
                            <span className="text-[10px] bg-purple-50 text-purple-700 px-2 py-0.5 rounded border border-purple-100">{partner.type}</span>
                         </div>
                         <div className="flex gap-2">
                             <button onClick={() => openPartnerModal('EDIT', partner)} className="p-2 text-gray-400 hover:text-brand-600 bg-gray-50 rounded-lg"><Edit2 size={16}/></button>
                             <button onClick={() => handleGenericDelete('partners', partner.id, fetchPartners)} className="p-2 text-gray-400 hover:text-red-600 bg-gray-50 rounded-lg"><Trash2 size={16}/></button>
                         </div>
                      </div>
                   ))}
                </div>
             </div>
           )}

           {/* SECTION TESTIMONIALS */}
           {activeAdminSection === 'TESTIMONIALS' && (
             <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-4 md:p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                   <div>
                      <div className="flex items-center gap-2">
                         <h3 className="text-base md:text-lg font-bold text-gray-900">Témoignages</h3>
                         {isLoadingData && <RefreshCw size={16} className="text-brand-500 animate-spin" />}
                      </div>
                   </div>
                   <button onClick={() => openTestimonialModal('ADD')} className="px-4 py-2 bg-brand-800 text-white text-xs md:text-sm font-bold rounded-xl hover:bg-brand-900 shadow transition-all flex items-center"><Plus size={16} className="mr-1" /> Ajouter</button>
                </div>
                <div className="divide-y divide-gray-100">
                   {localTestimonials.map(t => (
                      <div key={t.id} className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center hover:bg-gray-50 gap-4">
                         <div>
                            <h4 className="font-bold text-gray-900">{t.name}</h4>
                            <p className="text-xs text-gray-500">{t.role} - {t.promo}</p>
                         </div>
                         <div className="flex gap-2">
                             <button onClick={() => openTestimonialModal('EDIT', t)} className="p-2 text-gray-400 hover:text-brand-600 bg-gray-50 rounded-lg"><Edit2 size={16}/></button>
                             <button onClick={() => handleGenericDelete('testimonials', t.id, fetchTestimonials)} className="p-2 text-gray-400 hover:text-red-600 bg-gray-50 rounded-lg"><Trash2 size={16}/></button>
                         </div>
                      </div>
                   ))}
                </div>
             </div>
           )}

           {/* SECTION SUCCESS, FAQ, FLOWS, NOTICES (Existing) */}
           {activeAdminSection === 'SUCCESS' && (
             <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-4 md:p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center bg-gray-50/50 gap-4">
                  <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base md:text-lg font-bold text-gray-900">Données de Réussite</h3>
                        {isLoadingData && <RefreshCw size={16} className="text-brand-500 animate-spin" />}
                      </div>
                      <p className="text-xs md:text-sm text-gray-500">Mettez à jour les chiffres clés et statistiques.</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                     <select value={successDataType} onChange={(e) => setSuccessDataType(e.target.value as any)} className="bg-white border border-gray-200 text-gray-700 text-sm rounded-xl focus:ring-brand-500 focus:border-brand-500 block px-3 py-2 font-bold w-full md:w-auto">
                       <option value="GLOBAL">KPIs Globaux</option>
                       <option value="EVOLUTION">Graphique Évolution</option>
                       <option value="DUT">Tableau DUT</option>
                       <option value="LP">Tableau Licence Pro</option>
                     </select>
                     <button onClick={() => openSuccessModal('ADD', successDataType)} className="px-4 py-2 bg-brand-800 text-white text-sm font-bold rounded-xl hover:bg-brand-900 shadow transition-all flex items-center justify-center w-full md:w-auto"><Plus size={16} className="mr-1" /> Ajouter</button>
                  </div>
                </div>
                <div className="p-0">
                   {successDataType === 'GLOBAL' && (
                      <div className="divide-y divide-gray-100">
                        {localStatsGlobal.map(item => (
                           <div key={item.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                              <div className="flex items-center gap-3">
                                 <div className={`p-2 rounded-lg ${item.bgClass} ${item.colorClass}`}><TrendingUp size={20} /></div>
                                 <div><p className="font-bold text-gray-900 text-sm md:text-base">{item.value}</p><p className="text-xs text-gray-500">{item.label}</p></div>
                              </div>
                              <div className="flex gap-2">
                                 <button onClick={() => openSuccessModal('EDIT', 'GLOBAL', item)} className="p-2 text-gray-400 hover:text-brand-600 bg-gray-50 rounded-lg"><Edit2 size={16}/></button>
                                 <button onClick={() => handleDeleteSuccessStat(item.id, 'GLOBAL')} className="p-2 text-gray-400 hover:text-red-600 bg-gray-50 rounded-lg"><Trash2 size={16}/></button>
                              </div>
                           </div>
                        ))}
                      </div>
                   )}
                   {successDataType === 'EVOLUTION' && (
                      <div className="divide-y divide-gray-100">
                         {localStatsEvo.map(item => (
                           <div key={item.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                              <div><p className="font-bold text-gray-900 text-sm md:text-base">Année {item.year}</p><div className="flex items-center mt-1"><div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden mr-2"><div className="h-full bg-brand-500" style={{width: `${item.rate}%`}}></div></div><span className="text-xs text-gray-500 font-bold">{item.rate}%</span></div></div>
                              <div className="flex gap-2">
                                 <button onClick={() => openSuccessModal('EDIT', 'EVOLUTION', item)} className="p-2 text-gray-400 hover:text-brand-600 bg-gray-50 rounded-lg"><Edit2 size={16}/></button>
                                 <button onClick={() => handleDeleteSuccessStat(item.id, 'EVOLUTION')} className="p-2 text-gray-400 hover:text-red-600 bg-gray-50 rounded-lg"><Trash2 size={16}/></button>
                              </div>
                           </div>
                         ))}
                      </div>
                   )}
                   {(successDataType === 'DUT' || successDataType === 'LP') && (
                      <div className="divide-y divide-gray-100">
                         {((successDataType === 'DUT' ? localStatsDut : localStatsLp) || []).map(item => (
                           <div key={item.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                              <div><p className="font-bold text-gray-900 text-sm md:text-base">{item.year}</p><p className="text-xs text-gray-500">Inscrits: {item.inscrits}</p></div>
                              <div className="flex items-center gap-4">
                                 <span className="text-sm font-bold bg-green-50 text-green-700 px-2 py-1 rounded-md">{item.taux}%</span>
                                 <div className="flex gap-2">
                                    <button onClick={() => openSuccessModal('EDIT', successDataType, item)} className="p-2 text-gray-400 hover:text-brand-600 bg-gray-50 rounded-lg"><Edit2 size={16}/></button>
                                    <button onClick={() => handleDeleteSuccessStat(item.id, successDataType)} className="p-2 text-gray-400 hover:text-red-600 bg-gray-50 rounded-lg"><Trash2 size={16}/></button>
                                 </div>
                              </div>
                           </div>
                         ))}
                      </div>
                   )}
                </div>
             </div>
           )}

           {activeAdminSection === 'FAQ' && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
               <div className="p-4 md:p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                  <div><div className="flex items-center gap-2"><h3 className="text-base md:text-lg font-bold text-gray-900">FAQ</h3>{isLoadingData && <RefreshCw size={16} className="text-brand-500 animate-spin" />}</div><p className="text-xs md:text-sm text-gray-500 hidden md:block">Gérez les questions et les réponses.</p></div>
                  <button onClick={() => openFaqModal('ADD')} disabled={isLoadingData} className="px-4 py-2 bg-brand-800 text-white text-xs md:text-sm font-bold rounded-xl hover:bg-brand-900 shadow-lg shadow-brand-900/20 transition-all flex items-center disabled:opacity-50"><Plus size={16} className="mr-1" /> Ajouter</button>
               </div>
               <div className="divide-y divide-gray-100">
                  {localFaqData.map((item) => (
                     <div key={item.id} className="p-4 md:p-6 hover:bg-gray-50 transition-colors flex flex-col md:flex-row justify-between items-start md:items-center group gap-4">
                        <div className="flex-1">
                           <div className="flex items-center gap-2 mb-2"><span className="text-[10px] font-bold text-brand-600 uppercase tracking-wider bg-brand-50 px-2 py-1 rounded-md border border-brand-100">{item.category}</span></div>
                           <p className="font-bold text-gray-900 text-sm md:text-lg">{item.question}</p><p className="text-xs md:text-sm text-gray-500 mt-1 line-clamp-1">{item.procedure}</p>
                        </div>
                        <div className="flex gap-2 self-end md:self-auto"><button onClick={() => openFaqModal('EDIT', item)} className="p-2 md:p-3 text-gray-400 hover:text-brand-600 hover:bg-white border border-transparent hover:border-brand-200 hover:shadow-sm rounded-xl transition-all"><Edit2 size={16} className="md:w-5 md:h-5" /></button><button onClick={() => handleDeleteFaq(item.id)} className="p-2 md:p-3 text-gray-400 hover:text-red-600 hover:bg-white border border-transparent hover:border-red-200 hover:shadow-sm rounded-xl transition-all"><Trash2 size={16} className="md:w-5 md:h-5" /></button></div>
                     </div>
                  ))}
               </div>
            </div>
           )}

           {activeAdminSection === 'FLOWS' && (
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                 <div className="p-4 md:p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div><div className="flex items-center gap-2"><h3 className="text-base md:text-lg font-bold text-gray-900">Flux</h3>{isLoadingData && <RefreshCw size={16} className="text-brand-500 animate-spin" />}</div></div>
                    <button onClick={() => openFlowModal('ADD')} disabled={isLoadingData} className="px-4 py-2 bg-brand-800 text-white text-xs md:text-sm font-bold rounded-xl hover:bg-brand-900 shadow-lg shadow-brand-900/20 transition-all flex items-center disabled:opacity-50"><Plus size={16} className="mr-1" /> Créer</button>
                 </div>
                 <div className="divide-y divide-gray-100">
                       {localFlowsData.map((flow) => (
                          <div key={flow.id} className="p-4 md:p-6 hover:bg-gray-50 transition-colors flex flex-col md:flex-row justify-between items-start md:items-center group gap-4">
                             <div className="flex-1">
                                <h4 className="font-bold text-gray-900 text-sm md:text-lg flex items-center"><GitMerge size={20} className="mr-2 text-brand-500" />{flow.title}</h4>
                                <div className="mt-2 flex items-center flex-wrap gap-2">{flow.steps.map((step, idx) => (<div key={step.id} className="flex items-center text-[10px] md:text-xs text-gray-500 bg-white border border-gray-200 px-2 py-1 rounded-md"><span className="font-bold mr-1">{idx + 1}.</span> {step.label}</div>))}</div>
                             </div>
                             <div className="flex gap-2 self-end md:self-auto"><button onClick={() => openFlowModal('EDIT', flow)} className="p-2 md:p-3 text-gray-400 hover:text-brand-600 hover:bg-white border border-transparent hover:border-brand-200 hover:shadow-sm rounded-xl transition-all"><Edit2 size={16} className="md:w-5 md:h-5" /></button><button onClick={() => handleDeleteFlow(flow.id)} className="p-2 md:p-3 text-gray-400 hover:text-red-600 hover:bg-white border border-transparent hover:border-red-200 hover:shadow-sm rounded-xl transition-all"><Trash2 size={16} className="md:w-5 md:h-5" /></button></div>
                          </div>
                       ))}
                 </div>
              </div>
           )}

           {activeAdminSection === 'NOTICES' && (
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                 <div className="p-4 md:p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div><div className="flex items-center gap-2"><h3 className="text-base md:text-lg font-bold text-gray-900">Affichage</h3>{isLoadingData && <RefreshCw size={16} className="text-brand-500 animate-spin" />}</div></div>
                    <button onClick={() => openNoticeModal('ADD')} disabled={isLoadingData} className="px-4 py-2 bg-brand-800 text-white text-xs md:text-sm font-bold rounded-xl hover:bg-brand-900 shadow-lg shadow-brand-900/20 transition-all flex items-center disabled:opacity-50"><Plus size={16} className="mr-1" /> Note</button>
                 </div>
                 <div className="divide-y divide-gray-100">
                       {localNoticesData.map((notice) => (
                          <div key={notice.id} className="p-4 md:p-6 hover:bg-gray-50 transition-colors flex flex-col md:flex-row justify-between items-start md:items-center group gap-4 relative">
                             {notice.isNew && (<div className="absolute top-2 right-2 md:top-4 md:right-4 md:static md:ml-2"><span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-red-100 text-red-800">NOUVEAU</span></div>)}
                             <div className="flex-1 w-full">
                                <div className="flex items-center gap-2 mb-2"><span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md border ${notice.category === 'URGENT' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>{notice.category}</span><span className="text-xs text-gray-400 flex items-center"><Calendar size={12} className="mr-1" /> {notice.date}</span></div>
                                <h4 className="font-bold text-gray-900 text-sm md:text-lg">{notice.title}</h4>
                                <p className="text-xs md:text-sm text-gray-500 mt-1 line-clamp-2">{notice.content}</p>
                             </div>
                             <div className="flex gap-2 self-end md:self-auto"><button onClick={() => openNoticeModal('EDIT', notice)} className="p-2 md:p-3 text-gray-400 hover:text-brand-600 hover:bg-white border border-transparent hover:border-brand-200 hover:shadow-sm rounded-xl transition-all"><Edit2 size={16} className="md:w-5 md:h-5" /></button><button onClick={() => handleDeleteNotice(notice.id)} className="p-2 md:p-3 text-gray-400 hover:text-red-600 hover:bg-white border border-transparent hover:border-red-200 hover:shadow-sm rounded-xl transition-all"><Trash2 size={16} className="md:w-5 md:h-5" /></button></div>
                          </div>
                       ))}
                 </div>
              </div>
           )}

           {/* MODALS */}
           {/* TEACHER MODAL */}
           {isModalOpen && activeAdminSection === 'TEACHERS' && (
              <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-200">
                 <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200 flex flex-col">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 sticky top-0 z-10"><h3 className="text-lg font-bold text-gray-900">{modalMode === 'ADD' ? 'Ajouter Enseignant' : 'Modifier Enseignant'}</h3><button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-200 rounded-full transition-colors"><X size={24} /></button></div>
                    <div className="p-6 space-y-5">
                       <div><label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nom Complet</label><input type="text" value={teacherForm.name} onChange={e => setTeacherForm({...teacherForm, name: e.target.value})} className="w-full p-3 border rounded-xl text-sm" placeholder="Ex: Dr. Moussa" /></div>
                       <div><label className="block text-xs font-bold text-gray-500 uppercase mb-1">Rôle</label><input type="text" value={teacherForm.role} onChange={e => setTeacherForm({...teacherForm, role: e.target.value})} className="w-full p-3 border rounded-xl text-sm" placeholder="Ex: Chef de Département" /></div>
                       <div><label className="block text-xs font-bold text-gray-500 uppercase mb-1">Matières Enseingées</label><input type="text" value={teacherForm.courses} onChange={e => setTeacherForm({...teacherForm, courses: e.target.value})} className="w-full p-3 border rounded-xl text-sm" placeholder="Ex: Algorithmique, Java" /></div>
                       <div className="grid grid-cols-2 gap-4">
                          <div>
                             <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Département</label>
                             <select value={teacherForm.departmentId} onChange={e => setTeacherForm({...teacherForm, departmentId: e.target.value})} className="w-full p-3 border rounded-xl text-sm">
                                <option value="INFO">Informatique (INFO)</option>
                                <option value="GEA">GEA</option>
                                <option value="TC">Tech de Co (TC)</option>
                                <option value="GHT">GHT</option>
                             </select>
                          </div>
                          <div className="flex items-center pt-6">
                             <input type="checkbox" id="isDirector" checked={teacherForm.isDirector} onChange={e => setTeacherForm({...teacherForm, isDirector: e.target.checked})} className="mr-2 h-4 w-4" />
                             <label htmlFor="isDirector" className="text-sm font-bold">Est Directeur ?</label>
                          </div>
                       </div>
                    </div>
                    <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 sticky bottom-0 z-10"><button onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-gray-600 font-bold hover:bg-gray-200 rounded-xl transition">Annuler</button><button onClick={() => handleGenericSave('teachers', teacherForm, teacherForm.id, fetchTeachers)} disabled={isLoadingData} className="px-5 py-2.5 bg-brand-600 text-white font-bold rounded-xl hover:bg-brand-700 shadow-lg transition flex items-center">{isLoadingData ? <RefreshCw size={18} className="animate-spin mr-2"/> : <Check size={18} className="mr-2" />} Enregistrer</button></div>
                 </div>
              </div>
           )}

           {/* PARTNER MODAL */}
           {isModalOpen && activeAdminSection === 'PARTNERS' && (
              <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-200">
                 <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200 flex flex-col">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 sticky top-0 z-10"><h3 className="text-lg font-bold text-gray-900">{modalMode === 'ADD' ? 'Ajouter Partenaire' : 'Modifier Partenaire'}</h3><button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-200 rounded-full transition-colors"><X size={24} /></button></div>
                    <div className="p-6 space-y-5">
                       <div><label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nom Partenaire</label><input type="text" value={partnerForm.name} onChange={e => setPartnerForm({...partnerForm, name: e.target.value})} className="w-full p-3 border rounded-xl text-sm" placeholder="Ex: UNICEF" /></div>
                       <div>
                             <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Type</label>
                             <select value={partnerForm.type} onChange={e => setPartnerForm({...partnerForm, type: e.target.value as any})} className="w-full p-3 border rounded-xl text-sm">
                                <option value="ENTREPRISE">Entreprise</option>
                                <option value="ONG">ONG / ONS</option>
                                <option value="INSTITUTION">Institution d'État</option>
                                <option value="UNIVERSITE">Université</option>
                             </select>
                       </div>
                       <div><label className="block text-xs font-bold text-gray-500 uppercase mb-1">Description</label><textarea rows={3} value={partnerForm.description} onChange={e => setPartnerForm({...partnerForm, description: e.target.value})} className="w-full p-3 border rounded-xl text-sm" placeholder="Description du partenariat..." /></div>
                       <div><label className="block text-xs font-bold text-gray-500 uppercase mb-1">Site Web (Optionnel)</label><input type="text" value={partnerForm.website} onChange={e => setPartnerForm({...partnerForm, website: e.target.value})} className="w-full p-3 border rounded-xl text-sm" placeholder="https://..." /></div>
                    </div>
                    <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 sticky bottom-0 z-10"><button onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-gray-600 font-bold hover:bg-gray-200 rounded-xl transition">Annuler</button><button onClick={() => handleGenericSave('partners', partnerForm, partnerForm.id, fetchPartners)} disabled={isLoadingData} className="px-5 py-2.5 bg-brand-600 text-white font-bold rounded-xl hover:bg-brand-700 shadow-lg transition flex items-center">{isLoadingData ? <RefreshCw size={18} className="animate-spin mr-2"/> : <Check size={18} className="mr-2" />} Enregistrer</button></div>
                 </div>
              </div>
           )}

           {/* TESTIMONIAL MODAL */}
           {isModalOpen && activeAdminSection === 'TESTIMONIALS' && (
              <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-200">
                 <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200 flex flex-col">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 sticky top-0 z-10"><h3 className="text-lg font-bold text-gray-900">{modalMode === 'ADD' ? 'Ajouter Témoignage' : 'Modifier Témoignage'}</h3><button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-200 rounded-full transition-colors"><X size={24} /></button></div>
                    <div className="p-6 space-y-5">
                       <div><label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nom Complet</label><input type="text" value={testimonialForm.name} onChange={e => setTestimonialForm({...testimonialForm, name: e.target.value})} className="w-full p-3 border rounded-xl text-sm" /></div>
                       <div className="grid grid-cols-2 gap-4">
                          <div><label className="block text-xs font-bold text-gray-500 uppercase mb-1">Promotion</label><input type="text" value={testimonialForm.promo} onChange={e => setTestimonialForm({...testimonialForm, promo: e.target.value})} className="w-full p-3 border rounded-xl text-sm" placeholder="Promo 2020" /></div>
                          <div><label className="block text-xs font-bold text-gray-500 uppercase mb-1">Poste Actuel</label><input type="text" value={testimonialForm.role} onChange={e => setTestimonialForm({...testimonialForm, role: e.target.value})} className="w-full p-3 border rounded-xl text-sm" /></div>
                       </div>
                       <div><label className="block text-xs font-bold text-gray-500 uppercase mb-1">Témoignage</label><textarea rows={4} value={testimonialForm.text} onChange={e => setTestimonialForm({...testimonialForm, text: e.target.value})} className="w-full p-3 border rounded-xl text-sm" placeholder="Message..." /></div>
                    </div>
                    <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 sticky bottom-0 z-10"><button onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-gray-600 font-bold hover:bg-gray-200 rounded-xl transition">Annuler</button><button onClick={() => handleGenericSave('testimonials', testimonialForm, testimonialForm.id, fetchTestimonials)} disabled={isLoadingData} className="px-5 py-2.5 bg-brand-600 text-white font-bold rounded-xl hover:bg-brand-700 shadow-lg transition flex items-center">{isLoadingData ? <RefreshCw size={18} className="animate-spin mr-2"/> : <Check size={18} className="mr-2" />} Enregistrer</button></div>
                 </div>
              </div>
           )}

           {/* OTHER MODALS (SUCCESS, FAQ, FLOW, NOTICE) - Keep existing structure */}
           {/* SUCCESS DATA MODAL */}
           {isModalOpen && activeAdminSection === 'SUCCESS' && (
              <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-200">
                 <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200 flex flex-col">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 sticky top-0 z-10">
                       <h3 className="text-lg font-bold text-gray-900">
                          {modalMode === 'ADD' ? 'Ajouter' : 'Modifier'} ({successDataType})
                       </h3>
                       <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-200 rounded-full transition-colors">
                          <X size={24} />
                       </button>
                    </div>

                    <div className="p-6 space-y-5">
                       {/* FORM FOR GLOBAL STATS */}
                       {successDataType === 'GLOBAL' && (
                          <>
                             <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Label</label>
                                <input type="text" value={statGlobalForm.label} onChange={e => setStatGlobalForm({...statGlobalForm, label: e.target.value})} className="w-full p-3 border rounded-xl text-sm" placeholder="Ex: Étudiants Inscrits" />
                             </div>
                             <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Valeur</label>
                                <input type="text" value={statGlobalForm.value} onChange={e => setStatGlobalForm({...statGlobalForm, value: e.target.value})} className="w-full p-3 border rounded-xl text-sm font-bold" placeholder="Ex: 1,240" />
                             </div>
                             <div className="grid grid-cols-2 gap-4">
                                <div>
                                   <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Icône</label>
                                   <select value={statGlobalForm.iconName} onChange={e => setStatGlobalForm({...statGlobalForm, iconName: e.target.value})} className="w-full p-3 border rounded-xl text-sm">
                                      <option value="TrendingUp">TrendingUp</option>
                                      <option value="Users">Users</option>
                                      <option value="Award">Award</option>
                                      <option value="PieChart">PieChart</option>
                                   </select>
                                </div>
                                <div>
                                   <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Ordre</label>
                                   <input type="number" value={statGlobalForm.order} onChange={e => setStatGlobalForm({...statGlobalForm, order: Number(e.target.value)})} className="w-full p-3 border rounded-xl text-sm" />
                                </div>
                             </div>
                          </>
                       )}

                       {/* FORM FOR EVOLUTION */}
                       {successDataType === 'EVOLUTION' && (
                          <>
                             <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Année</label>
                                <input type="text" value={statEvoForm.year} onChange={e => setStatEvoForm({...statEvoForm, year: e.target.value})} className="w-full p-3 border rounded-xl text-sm" placeholder="Ex: 2024" />
                             </div>
                             <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Taux (%)</label>
                                <input type="number" step="0.1" value={statEvoForm.rate} onChange={e => setStatEvoForm({...statEvoForm, rate: Number(e.target.value)})} className="w-full p-3 border rounded-xl text-sm" />
                             </div>
                          </>
                       )}

                       {/* FORM FOR DUT / LP */}
                       {(successDataType === 'DUT' || successDataType === 'LP') && (
                          <>
                             <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Année Académique</label>
                                <input type="text" value={statCycleForm.year} onChange={e => setStatCycleForm({...statCycleForm, year: e.target.value})} className="w-full p-3 border rounded-xl text-sm" placeholder="Ex: 2023-2024" />
                             </div>
                             <div className="grid grid-cols-2 gap-4">
                                <div>
                                   <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Inscrits</label>
                                   <input type="number" value={statCycleForm.inscrits} onChange={e => setStatCycleForm({...statCycleForm, inscrits: Number(e.target.value)})} className="w-full p-3 border rounded-xl text-sm" />
                                </div>
                                <div>
                                   <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Taux de réussite (%)</label>
                                   <input type="number" step="0.1" max="100" value={statCycleForm.taux} onChange={e => setStatCycleForm({...statCycleForm, taux: Number(e.target.value)})} className="w-full p-3 border rounded-xl text-sm" />
                                </div>
                             </div>
                          </>
                       )}
                    </div>

                    <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 sticky bottom-0 z-10">
                       <button onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-gray-600 font-bold hover:bg-gray-200 rounded-xl transition">Annuler</button>
                       <button onClick={handleSaveSuccessStat} disabled={isLoadingData} className="px-5 py-2.5 bg-brand-600 text-white font-bold rounded-xl hover:bg-brand-700 shadow-lg transition flex items-center">
                          {isLoadingData ? <RefreshCw size={18} className="animate-spin mr-2"/> : <Check size={18} className="mr-2" />} Enregistrer
                       </button>
                    </div>
                 </div>
              </div>
           )}

           {/* FAQ MODAL */}
           {isModalOpen && activeAdminSection === 'FAQ' && (
             <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-200">
               <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200 flex flex-col">
                 <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 sticky top-0 z-10">
                   <h3 className="text-lg font-bold text-gray-900">
                     {modalMode === 'ADD' ? 'Ajouter FAQ' : 'Modifier FAQ'}
                   </h3>
                   <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-200 rounded-full transition-colors">
                     <X size={24} />
                   </button>
                 </div>
                 
                 <div className="p-6 space-y-5">
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      <div className="md:col-span-1">
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Catégorie</label>
                        <select 
                          value={faqFormData.category}
                          onChange={(e) => setFaqFormData({...faqFormData, category: e.target.value as Category})}
                          className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 outline-none bg-white font-medium"
                        >
                          {Object.values(Category).map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                      <div className="md:col-span-2">
                         <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Question</label>
                         <input 
                           type="text" 
                           value={faqFormData.question}
                           onChange={(e) => setFaqFormData({...faqFormData, question: e.target.value})}
                           className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 outline-none font-bold text-gray-900" 
                         />
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                         <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Procédure</label>
                         <input 
                           type="text" 
                           value={faqFormData.procedure}
                           onChange={(e) => setFaqFormData({...faqFormData, procedure: e.target.value})}
                           className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 outline-none" 
                         />
                      </div>
                      <div>
                         <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Service</label>
                         <input 
                           type="text" 
                           value={faqFormData.service}
                           onChange={(e) => setFaqFormData({...faqFormData, service: e.target.value})}
                           className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 outline-none" 
                         />
                      </div>
                   </div>
                   
                   <div>
                     <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Étapes (Une par ligne)</label>
                     <textarea 
                       value={faqFormData.steps}
                       onChange={(e) => setFaqFormData({...faqFormData, steps: e.target.value})}
                       rows={5} 
                       className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 outline-none" 
                     />
                   </div>
                 </div>

                 <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 sticky bottom-0 z-10">
                   <button onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-gray-600 font-bold hover:bg-gray-200 rounded-xl transition">Annuler</button>
                   <button onClick={handleSaveFaq} disabled={isLoadingData} className="px-5 py-2.5 bg-brand-600 text-white font-bold rounded-xl hover:bg-brand-700 shadow-lg transition flex items-center">
                     {isLoadingData ? <RefreshCw size={18} className="animate-spin mr-2"/> : <Check size={18} className="mr-2" />} Enregistrer
                   </button>
                 </div>
               </div>
             </div>
           )}

           {/* FLOW MODAL */}
           {isModalOpen && activeAdminSection === 'FLOWS' && (
              <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-200">
                 <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200 flex flex-col">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 sticky top-0 z-10">
                       <h3 className="text-lg font-bold text-gray-900">
                          {modalMode === 'ADD' ? 'Créer Parcours' : 'Éditer Parcours'}
                       </h3>
                       <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-200 rounded-full transition-colors">
                          <X size={24} />
                       </button>
                    </div>

                    <div className="p-6 space-y-6">
                       <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Titre du Flux</label>
                          <input 
                             type="text" 
                             value={flowFormData.title}
                             onChange={(e) => setFlowFormData({...flowFormData, title: e.target.value})}
                             className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 outline-none font-bold text-gray-900" 
                          />
                       </div>

                       <div>
                          <div className="flex justify-between items-end mb-2">
                             <label className="block text-xs font-bold text-gray-500 uppercase">Étapes</label>
                             <button 
                                onClick={handleAddFlowStep}
                                className="text-xs bg-brand-50 text-brand-700 px-3 py-1.5 rounded-lg font-bold hover:bg-brand-100 transition-colors flex items-center"
                             >
                                <Plus size={14} className="mr-1" /> Ajouter étape
                             </button>
                          </div>

                          <div className="space-y-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                             {flowFormData.steps.length === 0 && (
                                <p className="text-center text-sm text-gray-400 py-4 italic">Aucune étape définie.</p>
                             )}
                             
                             {flowFormData.steps.map((step, idx) => (
                                <div key={step.id || idx} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm relative group">
                                   <div className="absolute top-2 right-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                                      <button onClick={() => handleRemoveFlowStep(idx)} className="text-gray-300 hover:text-red-500 p-1"><X size={16} /></button>
                                   </div>
                                   
                                   <div className="flex items-center gap-2 mb-3">
                                      <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">
                                         {idx + 1}
                                      </span>
                                      <input 
                                         type="text" 
                                         placeholder="Titre"
                                         value={step.label}
                                         onChange={(e) => handleFlowStepChange(idx, 'label', e.target.value)}
                                         className="flex-1 p-2 border-b border-gray-200 focus:border-brand-500 outline-none text-sm font-bold"
                                      />
                                   </div>

                                   <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-2">
                                      <input 
                                         type="text" 
                                         placeholder="Service"
                                         value={step.service}
                                         onChange={(e) => handleFlowStepChange(idx, 'service', e.target.value)}
                                         className="w-full p-2 bg-gray-50 rounded-lg text-xs outline-none focus:ring-1 focus:ring-brand-200"
                                      />
                                      <select 
                                         value={step.icon || 'check-circle'}
                                         onChange={(e) => handleFlowStepChange(idx, 'icon', e.target.value)}
                                         className="w-full p-2 bg-gray-50 rounded-lg text-xs outline-none focus:ring-1 focus:ring-brand-200"
                                      >
                                         {AVAILABLE_ICONS.map(icon => (
                                            <option key={icon.value} value={icon.value}>{icon.label}</option>
                                         ))}
                                      </select>
                                   </div>
                                </div>
                             ))}
                          </div>
                       </div>
                    </div>

                    <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 sticky bottom-0 z-10">
                       <button onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-gray-600 font-bold hover:bg-gray-200 rounded-xl transition">Annuler</button>
                       <button onClick={handleSaveFlow} disabled={isLoadingData} className="px-5 py-2.5 bg-brand-600 text-white font-bold rounded-xl hover:bg-brand-700 shadow-lg transition flex items-center">
                          {isLoadingData ? <RefreshCw size={18} className="animate-spin mr-2"/> : <Check size={18} className="mr-2" />} Enregistrer
                       </button>
                    </div>
                 </div>
              </div>
           )}

            {/* NOTICE MODAL */}
           {isModalOpen && activeAdminSection === 'NOTICES' && (
             <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-200">
               <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200 flex flex-col">
                 <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 sticky top-0 z-10">
                   <h3 className="text-lg font-bold text-gray-900">
                     {modalMode === 'ADD' ? 'Publier Note' : 'Modifier Note'}
                   </h3>
                   <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-200 rounded-full transition-colors">
                     <X size={24} />
                   </button>
                 </div>
                 
                 <div className="p-6 space-y-5">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Catégorie</label>
                        <select 
                          value={noticeFormData.category}
                          onChange={(e) => setNoticeFormData({...noticeFormData, category: e.target.value as NoticeCategory})}
                          className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 outline-none bg-white font-medium"
                        >
                           <option value="ADMINISTRATION">ADMINISTRATION</option>
                           <option value="PEDAGOGIE">PEDAGOGIE</option>
                           <option value="URGENT">URGENT</option>
                           <option value="BOURSES">BOURSES</option>
                           <option value="STAGES">STAGES</option>
                        </select>
                      </div>
                      <div>
                         <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Date</label>
                         <input 
                           type="text" 
                           value={noticeFormData.date}
                           onChange={(e) => setNoticeFormData({...noticeFormData, date: e.target.value})}
                           className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 outline-none" 
                           placeholder="Ex: 12 Oct 2025"
                         />
                      </div>
                   </div>

                   <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Titre</label>
                      <input 
                        type="text" 
                        value={noticeFormData.title}
                        onChange={(e) => setNoticeFormData({...noticeFormData, title: e.target.value})}
                        className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 outline-none font-bold text-gray-900" 
                      />
                   </div>

                   <div>
                     <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Contenu</label>
                     <textarea 
                       value={noticeFormData.content}
                       onChange={(e) => setNoticeFormData({...noticeFormData, content: e.target.value})}
                       rows={6} 
                       className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 outline-none" 
                     />
                   </div>

                   <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <div className="flex-1">
                         <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Fichier (Facultatif)</label>
                         <input 
                           type="text" 
                           value={noticeFormData.fileSize || ''}
                           onChange={(e) => setNoticeFormData({...noticeFormData, fileSize: e.target.value})}
                           className="w-full p-2 border border-gray-200 rounded-lg text-sm bg-white" 
                           placeholder="Ex: 1.2 MB"
                         />
                      </div>
                      <div className="flex items-center pt-4">
                         <input 
                            type="checkbox" 
                            id="isNew"
                            checked={noticeFormData.isNew}
                            onChange={(e) => setNoticeFormData({...noticeFormData, isNew: e.target.checked})}
                            className="w-5 h-5 text-brand-600 rounded focus:ring-brand-500 border-gray-300 mr-2"
                         />
                         <label htmlFor="isNew" className="text-sm font-bold text-gray-700 cursor-pointer select-none">Nouveau</label>
                      </div>
                   </div>
                 </div>

                 <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 sticky bottom-0 z-10">
                   <button onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-gray-600 font-bold hover:bg-gray-200 rounded-xl transition">Annuler</button>
                   <button onClick={handleSaveNotice} disabled={isLoadingData} className="px-5 py-2.5 bg-brand-600 text-white font-bold rounded-xl hover:bg-brand-700 shadow-lg transition flex items-center">
                     {isLoadingData ? <RefreshCw size={18} className="animate-spin mr-2"/> : <Check size={18} className="mr-2" />} Publier
                   </button>
                 </div>
               </div>
             </div>
           )}

        </div>
      )}
      </div>

      {/* MOBILE BOTTOM NAVIGATION */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50 flex justify-around items-center h-16 pb-safe-4">
        <button
           onClick={() => setActiveTab('STATS')}
           className={`flex flex-col items-center justify-center w-full h-full ${activeTab === 'STATS' ? 'text-brand-600' : 'text-gray-400'}`}
        >
           <LayoutDashboard size={24} className={activeTab === 'STATS' ? 'fill-brand-100' : ''} />
           <span className="text-[10px] font-bold mt-1">Stats</span>
        </button>
        <button
           onClick={() => setActiveTab('ADMIN')}
           className={`flex flex-col items-center justify-center w-full h-full ${activeTab === 'ADMIN' ? 'text-brand-600' : 'text-gray-400'}`}
        >
           <Shield size={24} className={activeTab === 'ADMIN' ? 'fill-brand-100' : ''} />
           <span className="text-[10px] font-bold mt-1">Admin</span>
        </button>
      </div>
      
      {/* TOAST NOTIFICATION (Dashboard Page) */}
      {toast && (
          <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-bottom-5 fade-in duration-300 pointer-events-none w-max max-w-[90%]">
            <div className={`flex items-center gap-3 px-6 py-3 rounded-full shadow-2xl border backdrop-blur-md ${
                toast.type === 'success' ? 'bg-gray-900/95 text-white border-gray-800' :
                toast.type === 'error' ? 'bg-red-600/95 text-white border-red-700' :
                'bg-blue-600/95 text-white border-blue-700'
            }`}>
                {toast.type === 'success' && <CheckCircle2 size={18} className="text-green-400 flex-shrink-0" />}
                {toast.type === 'error' && <AlertCircle size={18} className="text-white flex-shrink-0" />}
                {toast.type === 'info' && <Info size={18} className="text-white flex-shrink-0" />}
                <span className="font-medium text-sm truncate">{toast.message}</span>
            </div>
          </div>
      )}

    </div>
  );
};

export default Dashboard;
