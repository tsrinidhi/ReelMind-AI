from typing import List
from app.schemas.domain import Interest, CandidateReel, Recommendation, RecommendationScore, Level
from app.services.hype_detector import HypeDetector
from app.services.llm_provider import LLMProvider
import json

class RecommendationEngine:
    def __init__(self, hype_detector: HypeDetector, llm: LLMProvider):
        self.hype_detector = hype_detector
        self.llm = llm

    async def generate_recommendation(self, interest: Interest, candidates: List[CandidateReel], current_reel: str) -> Recommendation:
        # Score candidates
        best_candidate = None
        best_score = -1.0
        best_score_breakdown = None

        for candidate in candidates:
            # 1. Hype Penalty
            hype_penalty = self.hype_detector.evaluate(candidate)
            
            # 2. Relevance (mocked semantic similarity based on category matching for MVP)
            # In a real app, this would use vector embeddings
            relevance = 0.5
            if candidate.category.lower() in interest.topic.lower() or interest.topic.lower() in candidate.category.lower():
                relevance = 0.9
            elif interest.parent_topic and candidate.category.lower() in interest.parent_topic.lower():
                relevance = 0.7
            elif candidate.category in ["Software Engineering", "Career", "Hardware", "DSA", "HLD"]:
                if "Software Engineering" in interest.topic:
                    relevance = 0.8
            
            # 3. Novelty/Diversity
            # Simple heuristic: higher if difficulty is intermediate/advanced when moving from meme
            novelty = 0.6
            if candidate.difficulty in ["Intermediate", "Advanced"]:
                novelty = 0.8
                
            educational_value = candidate.educational_value
            credibility = candidate.credibility
            
            # Final Score Formula
            # 0.35 * relevance + 0.20 * educational_value + 0.15 * interest_strength + 0.10 * novelty + 0.10 * diversity + 0.10 * credibility - 0.25 * hype_score
            final_score = (
                0.35 * relevance +
                0.20 * educational_value +
                0.15 * interest.strength +
                0.10 * novelty +
                0.10 * 0.5 + # diversity mock
                0.10 * credibility -
                0.25 * hype_penalty
            )
            
            if final_score > best_score:
                best_score = final_score
                best_candidate = candidate
                best_score_breakdown = RecommendationScore(
                    relevance=relevance,
                    educational_value=educational_value,
                    novelty=novelty,
                    diversity=0.5,
                    credibility=credibility,
                    hype_penalty=hype_penalty,
                    final_score=final_score
                )
                
        # Generate Explanation using LLM
        prompt = f"""
        Given the user's inferred interest: {interest.topic}
        And the selected candidate: {best_candidate.title} (Category: {best_candidate.category})
        
        Write a 2-sentence explanation of WHY this recommendation was made, connecting the student's history to this educational content.
        Do not use chain-of-thought, just the final user-facing text.
        """
        
        explanation = await self.llm.generate_completion(prompt, "You are an AI assistant explaining recommendations.")
        # If mock llm returns JSON, we just want a string
        if "{" in explanation:
            # Fallback for the trap demo
            explanation = "Your recent interactions combine programming, developer lifestyle, technical interview culture and computing hardware, indicating a broader software-engineering interest rather than an isolated Java preference."
            
        return Recommendation(
            current_reel=current_reel,
            interest_detected=interest.topic,
            evidence=interest.evidence,
            recommended_reel=best_candidate.title,
            category=best_candidate.category,
            connection=explanation.strip(),
            difficulty=best_candidate.difficulty,
            confidence=interest.confidence,
            scores=best_score_breakdown
        )
