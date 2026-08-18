export interface CandidateReel {
  candidate_id: string;
  title: string;
  category: 'AI' | 'DSA' | 'Java' | 'HLD' | 'Cybersecurity' | 'Cloud' | 'Hardware' | 'Career' | 'Python' | 'Software Engineering';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  educational_value: number; // 0.0 to 1.0
  hype_score: number; // 0.0 to 1.0
  credibility: number; // 0.0 to 1.0
  description: string;
}

export const candidates: CandidateReel[] = [
  {
    candidate_id: "CAND-001",
    title: "DSA Patterns Every Software Engineer Should Know",
    category: "DSA",
    difficulty: "Intermediate",
    educational_value: 0.9,
    hype_score: 0.1,
    credibility: 0.95,
    description: "Learn the sliding window, two pointers, and fast/slow pointer patterns to ace coding interviews."
  },
  {
    candidate_id: "CAND-002",
    title: "How CPU, RAM and GPU Affect Software Development",
    category: "Hardware",
    difficulty: "Beginner",
    educational_value: 0.85,
    hype_score: 0.1,
    credibility: 0.9,
    description: "Understanding the hardware constraints of the code you write."
  },
  {
    candidate_id: "CAND-003",
    title: "System Design: Introduction to High Level Design (HLD)",
    category: "HLD",
    difficulty: "Intermediate",
    educational_value: 0.95,
    hype_score: 0.05,
    credibility: 0.9,
    description: "Load balancers, caching, databases, and microservices explained."
  },
  {
    candidate_id: "CAND-004",
    title: "Advanced Java Multithreading",
    category: "Java",
    difficulty: "Advanced",
    educational_value: 0.8,
    hype_score: 0.0,
    credibility: 0.95,
    description: "Deep dive into ExecutorService, Locks, and concurrent collections."
  },
  {
    candidate_id: "CAND-005",
    title: "5 Prompts That Guarantee a Job at FAANG",
    category: "AI",
    difficulty: "Beginner",
    educational_value: 0.2,
    hype_score: 0.95,
    credibility: 0.2,
    description: "Just copy-paste these ChatGPT prompts and recruiters will beg to hire you."
  },
  {
    candidate_id: "CAND-006",
    title: "Understanding OAuth 2.0 and JWT",
    category: "Cybersecurity",
    difficulty: "Intermediate",
    educational_value: 0.9,
    hype_score: 0.1,
    credibility: 0.95,
    description: "How modern web authentication actually works under the hood."
  },
  {
    candidate_id: "CAND-007",
    title: "AWS Architecture: Scaling to 1 Million Users",
    category: "Cloud",
    difficulty: "Intermediate",
    educational_value: 0.85,
    hype_score: 0.2,
    credibility: 0.9,
    description: "A pragmatic guide to scaling applications using AWS services."
  },
  {
    candidate_id: "CAND-008",
    title: "Become an AI Engineer in 7 Days",
    category: "Career",
    difficulty: "Beginner",
    educational_value: 0.3,
    hype_score: 0.9,
    credibility: 0.3,
    description: "Skip the math and just use APIs to call yourself an AI Engineer!"
  },
  {
    candidate_id: "CAND-009",
    title: "Python Decorators Explained Visually",
    category: "Python",
    difficulty: "Intermediate",
    educational_value: 0.85,
    hype_score: 0.0,
    credibility: 0.9,
    description: "Visual animations explaining how functions wrap other functions in Python."
  },
  {
    candidate_id: "CAND-010",
    title: "How Coding Interviews Test Problem-Solving Skills",
    category: "Career",
    difficulty: "Beginner",
    educational_value: 0.8,
    hype_score: 0.1,
    credibility: 0.85,
    description: "Why Big Tech companies use algorithmic interviews and what they look for."
  }
];
