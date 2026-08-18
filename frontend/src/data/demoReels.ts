export interface ReelAnalysis {
  reel_id: string;
  title: string;
  description: string;
  topic: string;
  type: string;
  intent: 'Entertainment' | 'Lifestyle' | 'Learning' | 'Career' | 'Curiosity' | 'Hype';
  tech_relevance: 'Low' | 'Medium' | 'High' | 'Very High';
  educational_value: 'Low' | 'Medium' | 'High' | 'Very High';
  hype_risk: 'Low' | 'Medium' | 'High' | 'Very High';
  visual_summary?: string;
  
  // Simulated interaction data
  watch_percentage?: number;
  liked?: boolean;
  saved?: boolean;
  shared?: boolean;
}

export const demoReels: ReelAnalysis[] = [
  {
    reel_id: "REEL-001",
    title: "Java Developer Problems 😂",
    description: "Developer dealing with NullPointerException.",
    topic: "Java",
    type: "Programming Meme",
    intent: "Entertainment",
    tech_relevance: "High",
    educational_value: "Low",
    hype_risk: "Low",
    visual_summary: "A stressed developer looking at a computer screen showing a stack trace.",
    watch_percentage: 95,
    liked: false,
    saved: false,
    shared: false,
  },
  {
    reel_id: "REEL-002",
    title: "A Day in the Life of a Software Engineer",
    description: "Coding, debugging, meetings, GitHub, laptop.",
    topic: "Software Engineering",
    type: "Developer Lifestyle",
    intent: "Curiosity",
    tech_relevance: "High",
    educational_value: "Medium",
    hype_risk: "Low",
    visual_summary: "A developer in a modern office using a Macbook and attending a standup meeting.",
    watch_percentage: 92,
    liked: true,
    saved: false,
    shared: false,
  },
  {
    reel_id: "REEL-003",
    title: "When the Interviewer Says Easy DSA Question",
    description: "Candidate struggling with algorithm problem.",
    topic: "Coding Interviews",
    type: "Programming Meme",
    intent: "Career",
    tech_relevance: "High",
    educational_value: "Low",
    hype_risk: "Low",
    visual_summary: "A sweating job candidate staring at a whiteboard with an inverted binary tree.",
    watch_percentage: 100,
    liked: true,
    saved: true,
    shared: true,
  },
  {
    reel_id: "REEL-004",
    title: "RTX Laptop vs Productivity Laptop",
    description: "CPU, RAM, GPU, battery, performance comparison.",
    topic: "Hardware",
    type: "Laptop Comparison",
    intent: "Curiosity",
    tech_relevance: "High",
    educational_value: "Medium",
    hype_risk: "Low",
    visual_summary: "Two laptops side by side with performance benchmark graphs overlaid.",
    watch_percentage: 100,
    liked: false,
    saved: true,
    shared: false,
  },
  {
    reel_id: "REEL-005",
    title: "Epic Gaming Headshot",
    description: "Valorant/CSGO gameplay clip.",
    topic: "Gaming",
    type: "Entertainment",
    intent: "Entertainment",
    tech_relevance: "Medium",
    educational_value: "Low",
    hype_risk: "Low",
    visual_summary: "Fast-paced first-person shooter gameplay.",
    watch_percentage: 60,
    liked: true,
    saved: false,
    shared: false,
  },
  {
    reel_id: "REEL-006",
    title: "10 AI Tools That Will Get You a Job",
    description: "Learn coding and earn $10k immediately.",
    topic: "AI/Career",
    type: "Hype/Clickbait",
    intent: "Career",
    tech_relevance: "High",
    educational_value: "Low",
    hype_risk: "Very High",
    visual_summary: "A content creator pointing aggressively at floating app icons.",
    watch_percentage: 30,
    liked: false,
    saved: false,
    shared: false,
  },
  {
    reel_id: "REEL-007",
    title: "How Neural Networks Actually Learn",
    description: "Visualizing backpropagation and gradient descent.",
    topic: "Artificial Intelligence",
    type: "Educational",
    intent: "Learning",
    tech_relevance: "Very High",
    educational_value: "Very High",
    hype_risk: "Low",
    visual_summary: "Animated graphs showing nodes and weights adjusting during training.",
    watch_percentage: 100,
    liked: true,
    saved: true,
    shared: false,
  },
  {
    reel_id: "REEL-008",
    title: "How to Build a Strong Software Engineering Resume",
    description: "Tips for formatting, projects, and impact statements.",
    topic: "Career",
    type: "Educational",
    intent: "Career",
    tech_relevance: "High",
    educational_value: "High",
    hype_risk: "Low",
    visual_summary: "A document being highlighted with key sections emphasized.",
    watch_percentage: 85,
    liked: true,
    saved: true,
    shared: false,
  }
];
