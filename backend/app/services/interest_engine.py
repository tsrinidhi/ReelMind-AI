import json
from typing import List
from app.schemas.domain import ReelAnalysis, Interest, Level
from app.services.llm_provider import LLMProvider

class InterestInferenceEngine:
    def __init__(self, llm: LLMProvider):
        self.llm = llm

    async def infer_interest(self, history: List[ReelAnalysis]) -> Interest:
        # Create a summary of the history for the LLM
        history_summary = "\\n".join([
            f"- '{r.title}' (Topic: {r.topic}, Type: {r.type}, Intent: {r.intent}, Watch%: {r.watch_percentage})"
            for r in history
        ])
        
        prompt = f"""
        Analyze the following user reel interaction history:
        {history_summary}
        
        Do not infer interest from a single keyword. 
        Identify recurring concepts, relationships between concepts, and distinguish specific topics from broader interests.
        Return the result as a JSON object matching this schema:
        {{
            "topic": "Broader Interest Topic",
            "parent_topic": "Parent Category",
            "evidence": ["evidence 1", "evidence 2"],
            "strength": 0.95,
            "confidence": "High" | "Medium" | "Low"
        }}
        """
        
        system_prompt = "You are a senior data scientist AI that infers latent educational interests from social media behavior."
        
        response = await self.llm.generate_completion(prompt, system_prompt)
        
        try:
            # Clean up potential markdown formatting in response
            response_text = response.replace('```json', '').replace('```', '').strip()
            data = json.loads(response_text)
            return Interest(
                topic=data.get("topic", "Unknown"),
                parent_topic=data.get("parent_topic"),
                evidence=data.get("evidence", []),
                strength=data.get("strength", 0.0),
                confidence=Level(data.get("confidence", "Low"))
            )
        except Exception as e:
            # Fallback
            return Interest(
                topic="General Technology",
                parent_topic="Technology",
                evidence=["Failed to parse response"],
                strength=0.1,
                confidence=Level.Low
            )
