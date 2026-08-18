import React, { useState } from 'react';
import { Brain, LayoutDashboard, History, Settings, PlayCircle, Database } from 'lucide-react';

import { TrapDemo } from './components/TrapDemo';
import { DatabaseDashboard } from './components/DatabaseDashboard';

function App() {
  const [activeTab, setActiveTab] = useState('demo'); // Default to demo for hackathon

  return (
    <div className="flex h-screen w-full bg-background text-foreground font-sans overflow-hidden dark">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card flex flex-col transition-all duration-300">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-primary/20 p-2 rounded-xl text-primary">
            <Brain size={28} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">ReelMind AI</h1>
            <p className="text-xs text-muted-foreground">Turn your scroll into skill</p>
          </div>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          <NavItem 
            icon={<PlayCircle size={20} />} 
            label="Trap Demo" 
            active={activeTab === 'demo'} 
            onClick={() => setActiveTab('demo')} 
          />
          <NavItem 
            icon={<Database size={20} />} 
            label="Live Database" 
            active={activeTab === 'database'} 
            onClick={() => setActiveTab('database')} 
          />
          <NavItem 
            icon={<LayoutDashboard size={20} />} 
            label="Analytics" 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')} 
          />
          <NavItem 
            icon={<History size={20} />} 
            label="Reel History" 
            active={activeTab === 'history'} 
            onClick={() => setActiveTab('history')} 
          />
        </nav>

        <div className="p-4 border-t border-border">
          <NavItem 
            icon={<Settings size={20} />} 
            label="Settings" 
            active={activeTab === 'settings'} 
            onClick={() => setActiveTab('settings')} 
          />
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 bg-background/50 overflow-y-auto">
        <header className="h-16 border-b border-border flex items-center px-8 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <h2 className="text-lg font-semibold capitalize">{activeTab.replace('-', ' ')}</h2>
        </header>
        
        <div className="p-8 animate-fade-in">
          {activeTab === 'dashboard' && <DashboardView />}
          {activeTab === 'history' && <div className="text-muted-foreground">Reel history dashboard feature in development.</div>}
          {activeTab === 'demo' && <TrapDemo />}
          {activeTab === 'database' && <DatabaseDashboard />}
          {activeTab === 'settings' && <div className="text-muted-foreground">Settings configuration here.</div>}
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
        active 
          ? 'bg-primary/10 text-primary' 
          : 'text-muted-foreground hover:bg-secondary/80 hover:text-foreground'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function DashboardView() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Analyzed</h3>
          <p className="text-3xl font-bold">0</p>
        </div>
        <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Inferred Interests</h3>
          <p className="text-3xl font-bold">0</p>
        </div>
        <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Educational Value</h3>
          <p className="text-3xl font-bold">0%</p>
        </div>
      </div>
    </div>
  );
}

export default App;
