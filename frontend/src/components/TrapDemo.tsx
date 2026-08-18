import React, { useState, useEffect } from 'react';
import { ReelCard } from './ReelCard';
import { RecommendationCard } from './RecommendationCard';
import { ArrowRight, Bot, Cpu, AlertTriangle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { ReelAnalysis } from '../data/demoReels';

export function TrapDemo() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<any>(null);
  const [trapReels, setTrapReels] = useState<ReelAnalysis[]>([]);

  // Fetch trap reels from Supabase on mount
  useEffect(() => {
    async function loadReels() {
      const { data, error } = await supabase
        .from('reels')
        .select('*')
        .in('reel_id', ['REEL-001', 'REEL-002', 'REEL-003', 'REEL-004'])
        .order('reel_id');
      
      if (data) {
        setTrapReels(data);
      }
      if (error) {
        console.error('Error fetching reels from Supabase:', error);
      }
    }
    loadReels();
  }, []);

  const handleAnalyze = async () => {
    setLoading(true);
    setStep(1); // Show analyzing state
    
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trapReels)
      });
      
      const data = await response.json();
      setRecommendation(data);
      setStep(2); // Show results
    } catch (err) {
      console.error(err);
      setStep(0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-3 py-1 rounded-full text-sm font-semibold">
          <AlertTriangle size={16} />
          The Keyword Trap
        </div>
        <h2 className="text-4xl font-bold tracking-tight">Watch how naive AI fails</h2>
        <p className="text-muted-foreground text-lg">
          A basic recommendation algorithm sees "Java" and recommends more "Java". 
          ReelMind AI looks at the <strong className="text-foreground">collection</strong> of interactions to infer the <strong className="text-foreground">latent interest</strong>.
        </p>
      </div>

      {/* Step 1: The Input */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm">1</span>
          Student watches these 4 Reels
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {trapReels.map(reel => (
            <div key={reel.reel_id} className={`transition-all duration-500 ${step > 0 ? 'opacity-50 scale-95' : ''}`}>
              <ReelCard reel={reel} />
            </div>
          ))}
        </div>
      </div>

      {/* Action Button */}
      {step === 0 && (
        <div className="flex justify-center pt-8">
          <button 
            onClick={handleAnalyze}
            className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary/90 hover:scale-105 transition-all shadow-lg shadow-primary/25 flex items-center gap-3"
          >
            <Cpu size={24} />
            Analyze Reel History
          </button>
        </div>
      )}

      {/* Loading State */}
      {step === 1 && (
        <div className="py-12 flex flex-col items-center justify-center space-y-6 animate-pulse">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <div className="text-xl font-medium">Extracting semantic features & inferring latent interests...</div>
        </div>
      )}

      {/* Step 2: The Comparison */}
      {step === 2 && recommendation && (
        <div className="space-y-8 animate-fade-in">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
            
            {/* VS Badge */}
            <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-background border border-border rounded-full items-center justify-center font-bold text-muted-foreground z-10">
              VS
            </div>

            {/* Keyword AI (Naive) */}
            <div className="bg-card border border-border rounded-2xl p-6 opacity-60">
              <div className="flex items-center gap-3 mb-6">
                <Bot size={24} className="text-muted-foreground" />
                <div>
                  <h3 className="font-bold">Basic Keyword AI</h3>
                  <p className="text-xs text-muted-foreground">Standard Recommendation</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Detected Interest:</div>
                  <div className="text-xl font-mono font-semibold">"Java"</div>
                </div>
                
                <div className="pt-4 border-t border-border">
                  <div className="text-sm text-muted-foreground mb-2">Recommendation:</div>
                  <div className="bg-muted p-4 rounded-xl border border-border">
                    <h4 className="font-semibold mb-1">5 More Java Memes</h4>
                    <p className="text-xs text-muted-foreground">Educational Value: 0%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Smart AI (ReelMind) */}
            <RecommendationCard recommendation={recommendation} />

          </div>
          
          <div className="flex justify-center pt-8">
             <button onClick={() => setStep(0)} className="text-muted-foreground hover:text-foreground underline underline-offset-4">
               Reset Demo
             </button>
          </div>
        </div>
      )}

    </div>
  );
}
