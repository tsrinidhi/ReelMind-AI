from pydantic import BaseModel
from typing import List, Optional
from enum import Enum

class IntentType(str, Enum):
    Entertainment = "Entertainment"
    Lifestyle = "Lifestyle"
    Learning = "Learning"
    Career = "Career"
    Curiosity = "Curiosity"
    Hype = "Hype"

class Level(str, Enum):
    Low = "Low"
    Medium = "Medium"
    High = "High"
    VeryHigh = "Very High"

class Difficulty(str, Enum):
    Beginner = "Beginner"
    Intermediate = "Intermediate"
    Advanced = "Advanced"

class ReelAnalysis(BaseModel):
    reel_id: str
    title: str
    description: str
    topic: str
    type: str
    intent: IntentType
    tech_relevance: Level
    educational_value: Level
    hype_risk: Level
    visual_summary: Optional[str] = None
    
    # Behavior
    watch_percentage: Optional[int] = None
    liked: Optional[bool] = None
    saved: Optional[bool] = None
    shared: Optional[bool] = None

class InteractionEvent(BaseModel):
    user_id: str
    reel_id: str
    timestamp: str
    watch_percentage: int
    watch_duration: int
    liked: bool
    saved: bool
    shared: bool
    replayed: bool
    skipped: bool
    clicked: bool

class Interest(BaseModel):
    topic: str
    parent_topic: Optional[str] = None
    evidence: List[str]
    strength: float # 0.0 - 1.0
    confidence: Level

class CandidateReel(BaseModel):
    candidate_id: str
    title: str
    category: str
    difficulty: Difficulty
    educational_value: float
    hype_score: float
    credibility: float
    description: str

class RecommendationScore(BaseModel):
    relevance: float
    educational_value: float
    novelty: float
    diversity: float
    credibility: float
    hype_penalty: float
    final_score: float

class Recommendation(BaseModel):
    current_reel: str
    interest_detected: str
    evidence: List[str]
    recommended_reel: str
    category: str
    connection: str
    difficulty: Difficulty
    confidence: Level
    scores: RecommendationScore
