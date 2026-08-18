import React from 'react';
import { Sparkles, BrainCircuit, AlertTriangle, CheckCircle2, GraduationCap } from 'lucide-react';

export function RecommendationCard({ recommendation }: { recommendation: any }) {
  if (!recommendation) return null;

  return (
    <div className="bg-gradient-to-br from-card to-card/50 border border-primary/30 rounded-2xl p-6 shadow-lg shadow-primary/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
        <Sparkles size={120} />
      </div>

      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="bg-primary/20 p-2.5 rounded-xl text-primary">
          <BrainCircuit size={24} />
        </div>
        <div>
          <h3 className="text-sm font-semibold tracking-wider text-primary uppercase">Smart AI Recommendation</h3>
          <p className="text-xs text-muted-foreground">Based on your latent interests</p>
        </div>
      </div>

      <div className="space-y-6 relative z-10">
        <div>
          <h4 className="text-2xl font-bold leading-tight mb-2">{recommendation.recommended_reel}</h4>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="bg-secondary text-secondary-foreground px-2.5 py-1 rounded-md text-xs font-semibold">
              Category: {recommendation.category}
            </span>
            <span className="bg-blue-500/10 text-blue-500 px-2.5 py-1 rounded-md text-xs font-semibold">
              Difficulty: {recommendation.difficulty}
            </span>
            <span className="bg-green-500/10 text-green-500 px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1">
              <CheckCircle2 size={12} /> Confidence: {recommendation.confidence}
            </span>
          </div>
        </div>

        <div className="bg-background/80 backdrop-blur rounded-xl p-4 border border-border">
          <h5 className="text-sm font-semibold mb-2 flex items-center gap-2">
            <GraduationCap size={16} className="text-primary" />
            Why was this recommended?
          </h5>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {recommendation.connection}
          </p>
        </div>

        {recommendation.scores && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <ScoreBar label="Relevance" score={recommendation.scores.relevance} />
            <ScoreBar label="Educational" score={recommendation.scores.educational_value} />
            <ScoreBar label="Novelty" score={recommendation.scores.novelty} />
            <ScoreBar label="Hype Risk" score={recommendation.scores.hype_penalty} invertColor />
          </div>
        )}
      </div>
    </div>
  );
}

function ScoreBar({ label, score, invertColor = false }: { label: string, score: number, invertColor?: boolean }) {
  const percentage = Math.round(score * 100);
  
  let colorClass = "bg-primary";
  if (invertColor) {
    if (percentage > 50) colorClass = "bg-destructive";
    else if (percentage > 20) colorClass = "bg-yellow-500";
    else colorClass = "bg-green-500";
  } else {
    if (percentage > 75) colorClass = "bg-green-500";
    else if (percentage > 40) colorClass = "bg-primary";
    else colorClass = "bg-yellow-500";
  }

  return (
    <div className="bg-card border border-border p-3 rounded-lg">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">{label}</span>
        <span className="text-xs font-bold">{percentage}%</span>
      </div>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <div className={`h-full ${colorClass} transition-all duration-1000`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}
