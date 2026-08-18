from app.schemas.domain import CandidateReel

class HypeDetector:
    def evaluate(self, candidate: CandidateReel) -> float:
        # In a real app, this would use NLP/LLM to analyze the transcript
        # For our MVP/Demo, we will use the pre-labeled hype_score or simple heuristics
        
        score = candidate.hype_score
        title = candidate.title.lower()
        
        hype_keywords = [
            "guarantee", "10x", "earn $", "secret", "trick", 
            "in 7 days", "in 24 hours", "they don't want you to know",
            "immediately"
        ]
        
        for keyword in hype_keywords:
            if keyword in title:
                score += 0.3
                
        return min(1.0, max(0.0, score))
