from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any
from app.schemas.domain import ReelAnalysis, Recommendation
from app.services.llm_provider import get_llm_provider
from app.services.interest_engine import InterestInferenceEngine
from app.services.recommendation_engine import RecommendationEngine
from app.services.hype_detector import HypeDetector
from app.schemas.domain import CandidateReel
import json
import os

router = APIRouter()

# Initialize Services
llm_provider = get_llm_provider(demo_mode=True)
interest_engine = InterestInferenceEngine(llm_provider)
hype_detector = HypeDetector()
recommendation_engine = RecommendationEngine(hype_detector, llm_provider)

# Load Candidates (mock DB)
CANDIDATES = [
    CandidateReel(
        candidate_id="CAND-001", title="DSA Patterns Every Software Engineer Should Know", category="DSA", 
        difficulty="Intermediate", educational_value=0.9, hype_score=0.1, credibility=0.95, description=""
    ),
    CandidateReel(
        candidate_id="CAND-002", title="How CPU, RAM and GPU Affect Software Development", category="Hardware", 
        difficulty="Beginner", educational_value=0.85, hype_score=0.1, credibility=0.9, description=""
    ),
    CandidateReel(
        candidate_id="CAND-003", title="System Design: Introduction to High Level Design (HLD)", category="HLD", 
        difficulty="Intermediate", educational_value=0.95, hype_score=0.05, credibility=0.9, description=""
    ),
    CandidateReel(
        candidate_id="CAND-005", title="5 Prompts That Guarantee a Job at FAANG", category="AI", 
        difficulty="Beginner", educational_value=0.2, hype_score=0.95, credibility=0.2, description=""
    )
]

@router.post("/analyze", response_model=Recommendation)
async def analyze_reels(history: List[ReelAnalysis]):
    if not history:
        raise HTTPException(status_code=400, detail="Empty history")
        
    current_reel = history[-1].title
    
    # 1. Infer Interest
    interest = await interest_engine.infer_interest(history)
    
    # 2. Generate Recommendation
    recommendation = await recommendation_engine.generate_recommendation(
        interest=interest,
        candidates=CANDIDATES,
        current_reel=current_reel
    )
    
    return recommendation
