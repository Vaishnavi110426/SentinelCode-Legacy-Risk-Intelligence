
import React, { useState, useEffect } from 'react';
import { MOCK_PROJECT_DATA } from './constants';
import { CodeModule, RiskLevel } from './types';
import RiskBadge from './components/RiskBadge';
import MetricCard from './components/MetricCard';
import ImpactGraph from './components/ImpactGraph';
import { explainRisk } from './geminiService';
import { 
  AlertTriangle, 
  Search, 
  GitBranch, 
  Code2, 
  Database, 
  ShieldAlert, 
  Zap, 
  History,
  LayoutGrid,
  FileText
} from 'lucide-react';

const App: React.FC = () => {
  const [modules] = useState<CodeModule[]>(MOCK_PROJECT_DATA);
  const [selectedId, setSelectedId] = useState<string>(MOCK_PROJECT_DATA[0].id);
  const [aiData, setAiData] = useState<{ explanation: string, refactoring: string[] } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const selectedModule = modules.find(m => m.id === selectedId) || modules[0];

  useEffect(() => {
    const triggerAnalysis = async () => {
      setIsAnalyzing(true);
      const data = await explainRisk(selectedModule);
      setAiData(data);
      setIsAnalyzing(false);
    };
    triggerAnalysis();
  }, [selectedId]);

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 flex flex-col font-sans">
      {/* Header */}
      <header className="border-b border-slate-800 bg-[#1e293b]/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg shadow-lg shadow-indigo-500/20">
              <ShieldAlert size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">SentinelCode</h1>
              <p className="text-[10px] uppercase tracking-[0.2em] text-indigo-400 font-bold">Legacy Risk Intelligence</p>
            </div>
          </div>
          
          <div className="flex-1 max-w-xl mx-8 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="Search files, modules, or risk profiles..." 
              className="w-full bg-slate-900 border border-slate-700 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
            />
          </div>

          <div className="flex items-center gap-4 text-sm font-medium">
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-800 transition-colors">
              <GitBranch size={16} className="text-slate-400" />
              <span>main-monolith</span>
            </button>
            <div className="h-4 w-px bg-slate-700"></div>
            <span className="text-slate-400">v4.2.1-stable</span>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-[1600px] mx-auto w-full p-6 grid grid-cols-12 gap-6 overflow-hidden">
        
        {/* Left Sidebar: File Tree / Modules */}
        <div className="col-span-3 flex flex-col gap-4">
          <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-4 flex flex-col h-full overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Risk Inventory</h2>
              <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-500">{modules.length} modules</span>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
              {modules.map(module => (
                <button
                  key={module.id}
                  onClick={() => setSelectedId(module.id)}
                  className={`w-full text-left p-3 rounded-xl border transition-all duration-200 group ${
                    selectedId === module.id 
                    ? 'bg-indigo-600/10 border-indigo-500/50' 
                    : 'bg-slate-800/20 border-transparent hover:border-slate-700 hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className={`text-sm font-semibold ${selectedId === module.id ? 'text-indigo-400' : 'text-slate-200'}`}>
                      {module.name}
                    </span>
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                      module.riskScore > 80 ? 'text-red-400 bg-red-400/10' : 'text-slate-500 bg-slate-800'
                    }`}>
                      {module.riskScore}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                    <Code2 size={12} />
                    <span className="text-[10px] font-mono truncate max-w-[150px]">{module.path}</span>
                  </div>
                  {module.riskScore > 90 && (
                    <div className="mt-2 flex items-center gap-1.5 text-[10px] text-red-500 font-bold uppercase">
                      <AlertTriangle size={10} /> Danger Zone
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Center: Detail View */}
        <div className="col-span-6 space-y-6 overflow-y-auto pr-2 custom-scrollbar">
          {/* Main Module Header */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
              <Code2 size={160} />
            </div>
            
            <div className="flex items-start justify-between mb-8">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold">{selectedModule.name}</h2>
                  <RiskBadge level={selectedModule.level} score={selectedModule.riskScore} />
                </div>
                <p className="text-slate-400 text-sm font-mono flex items-center gap-2">
                  <LayoutGrid size={14} /> {selectedModule.path}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Health Score</p>
                <p className="text-3xl font-mono font-bold text-indigo-400">
                  {100 - selectedModule.riskScore}%
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="p-4 bg-slate-800/40 rounded-xl border border-slate-700">
                <div className="flex items-center gap-2 text-slate-400 mb-1">
                  <History size={14} />
                  <span className="text-[10px] font-bold uppercase">Last Change</span>
                </div>
                <p className="text-sm font-semibold">{selectedModule.lastCommitDate}</p>
              </div>
              <div className="p-4 bg-slate-800/40 rounded-xl border border-slate-700">
                <div className="flex items-center gap-2 text-slate-400 mb-1">
                  <FileText size={14} />
                  <span className="text-[10px] font-bold uppercase">Lines of Code</span>
                </div>
                <p className="text-sm font-semibold">{selectedModule.linesOfCode.toLocaleString()}</p>
              </div>
              <div className="p-4 bg-slate-800/40 rounded-xl border border-slate-700">
                <div className="flex items-center gap-2 text-slate-400 mb-1">
                  <Database size={14} />
                  <span className="text-[10px] font-bold uppercase">Language</span>
                </div>
                <p className="text-sm font-semibold capitalize">{selectedModule.language}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Zap size={14} className="text-yellow-500" />
                AI Risk Analysis
              </h3>
              
              {isAnalyzing ? (
                <div className="animate-pulse space-y-3">
                  <div className="h-4 bg-slate-800 rounded w-full"></div>
                  <div className="h-4 bg-slate-800 rounded w-5/6"></div>
                  <div className="h-4 bg-slate-800 rounded w-4/6"></div>
                </div>
              ) : (
                <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-xl p-4">
                  <p className="text-sm leading-relaxed text-slate-300 italic mb-4">
                    "{aiData?.explanation}"
                  </p>
                  
                  <div className="space-y-3">
                    <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Refactoring Path</p>
                    {aiData?.refactoring.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-3 group">
                        <span className="bg-slate-800 text-slate-500 text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                          {idx + 1}
                        </span>
                        <p className="text-sm text-slate-400 group-hover:text-slate-200 transition-colors">
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="h-80">
            <ImpactGraph module={selectedModule} />
          </div>
        </div>

        {/* Right Sidebar: Metrics & Stats */}
        <div className="col-span-3 space-y-6">
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-5">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Risk Breakdown</h3>
            <div className="space-y-4">
              <MetricCard label="Cyclomatic Complexity" value={selectedModule.metrics.complexity} />
              <MetricCard label="Code Churn (Activity)" value={selectedModule.metrics.churn} />
              <MetricCard label="Coupling Factor" value={selectedModule.metrics.coupling} />
              <MetricCard label="Test Coverage" value={selectedModule.metrics.coverage} inverse />
              <MetricCard label="Knowledge Concentration" value={selectedModule.metrics.ownership} />
            </div>
            
            <div className="mt-8 pt-6 border-t border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-slate-400 font-bold uppercase">Risk Distribution</span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Stability Index</span>
                  <span className="text-green-400">Stable</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-[75%]" />
                </div>
                <div className="flex justify-between text-xs mt-2">
                  <span className="text-slate-500">Refactoring Urgency</span>
                  <span className="text-red-400 font-bold">Critical</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-900/20 to-slate-900 rounded-xl border border-indigo-500/20 p-5">
            <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <GitBranch size={14} />
              Deployment Safety
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Based on the risk profile of <strong>{selectedModule.name}</strong>, direct production pushes are 
              <span className="text-red-400 font-bold mx-1 uppercase">Not Recommended</span> 
              without additional integration tests.
            </p>
            <button className="w-full mt-4 py-2 rounded-lg bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-500 transition-colors">
              Schedule Deep Scan
            </button>
          </div>
        </div>
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #334155;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #475569;
        }
      `}</style>
    </div>
  );
};

export default App;
