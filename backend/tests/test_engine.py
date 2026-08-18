import pytest
from app.schemas.domain import CandidateReel
from app.services.hype_detector import HypeDetector
from app.services.llm_provider import MockLLMProvider
from app.services.interest_engine import InterestInferenceEngine

def test_hype_detector():
    detector = HypeDetector()
    candidate_hype = CandidateReel(
        candidate_id="TEST-1",
        title="10 AI tools that will get you a job immediately",
        category="AI",
        difficulty="Beginner",
        educational_value=0.2,
        hype_score=0.6,
        credibility=0.1,
        description=""
    )
    score = detector.evaluate(candidate_hype)
    assert score > 0.7 # Due to "immediately" keyword, it bumps up
    
    candidate_good = CandidateReel(
        candidate_id="TEST-2",
        title="How Neural Networks Actually Learn",
        category="AI",
        difficulty="Advanced",
        educational_value=0.9,
        hype_score=0.1,
        credibility=0.9,
        description=""
    )
    score_good = detector.evaluate(candidate_good)
    assert score_good == 0.1

@pytest.mark.asyncio
async def test_critical_trap():
    llm = MockLLMProvider()
    engine = InterestInferenceEngine(llm)
    
    # Mocking the interaction history
    from app.schemas.domain import ReelAnalysis
    history = [
        ReelAnalysis(reel_id="1", title="Java Developer Problems 😂", description="", topic="Java", type="Meme", intent="Entertainment", tech_relevance="High", educational_value="Low", hype_risk="Low"),
        ReelAnalysis(reel_id="2", title="Day in the Life of a Software Engineer", description="", topic="Lifestyle", type="Lifestyle", intent="Curiosity", tech_relevance="High", educational_value="Low", hype_risk="Low")
    ]
    
    interest = await engine.infer_interest(history)
    
    # The Mock LLM returns "Software Engineering" for this combination
    assert "Software Engineering" in interest.topic
    assert interest.strength > 0.8
