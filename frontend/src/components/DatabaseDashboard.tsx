import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { ReelAnalysis } from '../data/demoReels';
import { Database, RefreshCw, Layers } from 'lucide-react';
import { ReelCard } from './ReelCard';

export function DatabaseDashboard() {
  const [reels, setReels] = useState<ReelAnalysis[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReels = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('reels').select('*').order('reel_id');
    if (data) {
      setReels(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReels();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-card p-6 rounded-2xl border border-border shadow-sm">
        <div className="flex items-center gap-4">
          <div className="bg-primary/20 p-3 rounded-xl text-primary">
            <Database size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Supabase Data</h2>
            <p className="text-muted-foreground text-sm">Live data fetching directly from the PostgreSQL backend.</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden md:block">
            <p className="text-sm font-semibold">{reels.length} Records</p>
            <p className="text-xs text-muted-foreground">in `reels` table</p>
          </div>
          <button 
            onClick={fetchReels} 
            className="p-3 bg-secondary hover:bg-secondary/80 rounded-xl transition-colors"
            disabled={loading}
          >
            <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading ? (
          <div className="col-span-full py-12 flex justify-center">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : reels.length === 0 ? (
          <div className="col-span-full py-12 flex flex-col items-center justify-center text-muted-foreground bg-card/50 rounded-2xl border border-dashed border-border">
            <Layers size={48} className="mb-4 opacity-50" />
            <p>No reels found in the database.</p>
          </div>
        ) : (
          reels.map(reel => (
            <div key={reel.reel_id} className="animate-fade-in">
              <ReelCard reel={reel} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
