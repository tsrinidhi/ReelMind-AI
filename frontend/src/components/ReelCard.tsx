import React, { useState } from 'react';
import type { ReelAnalysis } from '../data/demoReels';
import { Play, Heart, Bookmark, Share2 } from 'lucide-react';

// Map reel IDs to specific, highly reliable YouTube video IDs to guarantee playback!
const YOUTUBE_ID_MAP: Record<string, string> = {
  "REEL-001": "l9AzO1FMgM8", // Java in 100 Seconds (Fireship)
  "REEL-002": "hUf0iR0mJuk", // Day in the Life Software Engineer
  "REEL-003": "N_2kZ1hQ12g", // Coding Interview
  "REEL-004": "P243LqL6_xM", // RTX Laptop Review
  "REEL-005": "tB0wM_wS3wU", // Epic Gaming Setup
  "REEL-006": "5p248yoa3oE", // AI Tools
  "REEL-007": "aircAruvnKk", // How Neural Networks Learn
  "REEL-008": "BYUy1yvjHxE", // Resume Tips
};

// Map reel IDs to high-quality Unsplash tech images for the poster thumbnails
const POSTER_MAP: Record<string, string> = {
  "REEL-001": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
  "REEL-002": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
  "REEL-003": "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80",
  "REEL-004": "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=800&q=80",
  "REEL-005": "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
  "REEL-006": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
  "REEL-007": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
  "REEL-008": "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80",
};

export function ReelCard({ reel }: { reel: ReelAnalysis }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const posterUrl = POSTER_MAP[reel.reel_id] || POSTER_MAP["REEL-001"];
  const videoId = YOUTUBE_ID_MAP[reel.reel_id] || "l9AzO1FMgM8";

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm flex flex-col group transition-all hover:shadow-md hover:border-primary/50">
      <div 
        className="h-64 bg-black relative flex items-center justify-center overflow-hidden cursor-pointer"
        onClick={() => setIsPlaying(true)}
      >
        {isPlaying ? (
          <iframe 
            className="absolute inset-0 w-full h-full object-cover"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            <img 
              src={posterUrl} 
              alt={reel.title}
              className="absolute inset-0 w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[2px]">
              <Play className="w-14 h-14 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all drop-shadow-lg" fill="currentColor" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-3 text-white text-xs font-medium px-2 py-1 bg-primary/80 rounded-md backdrop-blur-sm z-10">
              {reel.type}
            </div>
          </>
        )}
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <h4 className="font-semibold text-base mb-1 line-clamp-1" title={reel.title}>{reel.title}</h4>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3 flex-1">
          {reel.description}
        </p>
        
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <Badge label={reel.topic} variant="default" />
          <Badge label={reel.intent} variant="outline" />
        </div>
        
        <div className="flex items-center justify-between text-muted-foreground pt-3 border-t border-border">
          <div className="flex gap-3">
            <IconStat icon={<Heart size={16} className={reel.liked ? "fill-red-500 text-red-500" : ""} />} active={reel.liked} />
            <IconStat icon={<Bookmark size={16} className={reel.saved ? "fill-primary text-primary" : ""} />} active={reel.saved} />
            <IconStat icon={<Share2 size={16} />} active={reel.shared} />
          </div>
          <div className="text-xs font-mono bg-muted px-2 py-1 rounded">
            {reel.watch_percentage}% watch
          </div>
        </div>
      </div>
    </div>
  );
}

function Badge({ label, variant }: { label: string, variant: 'default' | 'outline' }) {
  return (
    <span className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded-full font-bold ${
      variant === 'default' 
        ? 'bg-primary/10 text-primary border border-primary/20' 
        : 'bg-muted text-muted-foreground border border-border'
    }`}>
      {label}
    </span>
  );
}

function IconStat({ icon, active }: { icon: React.ReactNode, active?: boolean }) {
  return (
    <div className={`transition-colors ${active ? 'text-foreground' : 'hover:text-foreground'}`}>
      {icon}
    </div>
  );
}
