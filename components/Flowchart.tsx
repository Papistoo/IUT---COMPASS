import React, { useState, useEffect } from 'react';
import { 
  Briefcase, FileText, PenTool, CheckCircle, ShieldCheck, Play, 
  Book, Search, Award, FilePlus, Landmark, CreditCard, Library, GraduationCap, RefreshCw
} from 'lucide-react';
import { PROCESS_FLOWS } from '../constants';
import { ProcessFlow, FlowStep } from '../types';

// Firebase Imports
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

interface FlowchartProps {
  initialFlowId?: string | null;
}

const iconMap: Record<string, React.ReactNode> = {
  briefcase: <Briefcase size={20} />,
  "file-text": <FileText size={20} />,
  "pen-tool": <PenTool size={20} />,
  "check-circle": <CheckCircle size={20} />,
  "shield-check": <ShieldCheck size={20} />,
  play: <Play size={20} />,
  book: <Book size={20} />,
  search: <Search size={20} />,
  award: <Award size={20} />,
  "file-plus": <FilePlus size={20} />,
  landmark: <Landmark size={20} />,
  "credit-card": <CreditCard size={20} />,
  library: <Library size={20} />,
  "graduation-cap": <GraduationCap size={20} />,
};

const Flowchart: React.FC<FlowchartProps> = ({ initialFlowId }) => {
  const [flows, setFlows] = useState<ProcessFlow[]>([]);
  const [activeFlowId, setActiveFlowId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch flows from Firestore
  useEffect(() => {
    const fetchFlows = async () => {
      try {
         const querySnapshot = await getDocs(collection(db, "flows"));
         if (querySnapshot.empty) {
            console.log("No flows in DB, using static data");
            setFlows(PROCESS_FLOWS);
         } else {
            const data = querySnapshot.docs.map(doc => ({
               id: doc.id,
               ...doc.data()
            } as ProcessFlow));
            setFlows(data);
         }
      } catch (error) {
         console.warn("Error loading flows:", error);
         setFlows(PROCESS_FLOWS);
      } finally {
         setIsLoading(false);
      }
    };
    fetchFlows();
  }, []);

  // Update active flow when data is loaded or prop changes
  useEffect(() => {
    if (!isLoading && flows.length > 0) {
       if (initialFlowId) {
          // Check if requested ID exists in current data
          const exists = flows.some(f => f.id === initialFlowId);
          setActiveFlowId(exists ? initialFlowId : flows[0].id);
       } else if (!activeFlowId) {
          // Default to first
          setActiveFlowId(flows[0].id);
       }
    }
  }, [isLoading, flows, initialFlowId]);

  const activeFlow = flows.find(f => f.id === activeFlowId);

  if (isLoading) {
     return (
        <div className="flex flex-col items-center justify-center py-20 animate-in fade-in">
           <RefreshCw size={32} className="text-brand-500 animate-spin mb-4" />
           <p className="text-gray-500">Chargement des parcours...</p>
        </div>
     );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
      <div className="text-center py-4">
        <h2 className="text-2xl font-bold text-gray-900">Flux & Services</h2>
        <p className="text-gray-500 text-sm mt-1">Visualisez les processus administratifs et les rôles de chaque service.</p>
      </div>

      {/* Flow Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {flows.map((flow) => (
          <button
            key={flow.id}
            onClick={() => setActiveFlowId(flow.id)}
            className={`p-4 rounded-xl border text-left transition-all ${
              activeFlowId === flow.id
                ? 'bg-brand-50 border-brand-500 ring-1 ring-brand-500 shadow-sm'
                : 'bg-white border-gray-200 hover:border-gray-300'
            }`}
          >
            <span className={`block font-semibold ${activeFlowId === flow.id ? 'text-brand-700' : 'text-gray-700'}`}>
              {flow.title}
            </span>
            <span className="text-xs text-gray-500 mt-1 block">
              {flow.steps.length} étapes
            </span>
          </button>
        ))}
      </div>

      {/* Visualization Area */}
      {activeFlow && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-400 to-accent-500"></div>
           
           <h3 className="text-lg font-bold text-gray-900 mb-8 text-center">{activeFlow.title}</h3>

           <div className="relative">
             {/* Vertical Line for Mobile / Desktop */}
             <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-gray-200"></div>

             <div className="space-y-8">
               {activeFlow.steps.map((step: FlowStep, index) => (
                 <div key={step.id || index} className="relative flex items-start group">
                   {/* Step Circle */}
                   <div className={`
                     z-10 flex items-center justify-center w-12 h-12 rounded-full border-4 border-white shadow-sm flex-shrink-0
                     ${index === activeFlow.steps.length - 1 ? 'bg-accent-500 text-white' : 'bg-brand-600 text-white'}
                   `}>
                     {step.icon && iconMap[step.icon] ? iconMap[step.icon] : <span>{index + 1}</span>}
                   </div>

                   {/* Step Content */}
                   <div className="ml-6 flex-1 bg-gray-50 p-4 rounded-lg border border-gray-100 hover:border-brand-200 transition-colors">
                     <div className="flex justify-between items-start mb-1">
                       <h4 className="text-sm font-bold text-gray-900">{step.label}</h4>
                       <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600 bg-brand-100 px-2 py-0.5 rounded-full">
                         {step.service}
                       </span>
                     </div>
                     <p className="text-sm text-gray-600">{step.description}</p>
                   </div>
                 </div>
               ))}
             </div>

             {/* Finish Indicator */}
             <div className="relative flex items-center mt-8">
               <div className="z-10 w-4 h-4 bg-gray-300 rounded-full ml-4 border-2 border-white"></div>
               <span className="ml-10 text-xs font-medium text-gray-400 uppercase tracking-widest">Fin du parcours</span>
             </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Flowchart;