from abc import ABC, abstractmethod
from typing import List, Dict, Any

class LLMProvider(ABC):
    @abstractmethod
    async def generate_completion(self, prompt: str, system_prompt: str = "") -> str:
        pass

class MockLLMProvider(LLMProvider):
    async def generate_completion(self, prompt: str, system_prompt: str = "") -> str:
        # We will use hardcoded responses for specific trap demo scenarios
        if "Java Developer Problems" in prompt and "Software Engineer" in prompt:
            return """
            {
                "topic": "Software Engineering",
                "parent_topic": "Technology",
                "evidence": [
                    "User engaged with Java programming concepts",
                    "User showed high interest in developer lifestyle",
                    "User consumed coding interview content",
                    "User compared productivity and hardware"
                ],
                "strength": 0.91,
                "confidence": "High"
            }
            """
        return """
        {
            "topic": "General Technology",
            "parent_topic": "Technology",
            "evidence": ["General engagement"],
            "strength": 0.5,
            "confidence": "Low"
        }
        """

class RealLLMProvider(LLMProvider):
    def __init__(self, api_key: str):
        self.api_key = api_key
        # Initialize real client here (e.g. OpenAI)

    async def generate_completion(self, prompt: str, system_prompt: str = "") -> str:
        # Real implementation
        raise NotImplementedError("Real LLM provider not fully implemented for MVP yet")

def get_llm_provider(demo_mode: bool = True, api_key: str = "") -> LLMProvider:
    if demo_mode or not api_key:
        return MockLLMProvider()
    return RealLLMProvider(api_key)
