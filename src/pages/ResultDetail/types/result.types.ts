export interface Question {
  id: number;
  questionNumber: number;
  question: string;
  options: string[];
  correctAnswer: string;
  userAnswer: string;
  isCorrect: boolean;
  explanation?: string;
}

export interface QuizResult {
  id: string;
  userId: string;
  userName?: string;
  topicId: string;
  topicName: string;
  score: number;
  totalCorrect: number;
  totalQuestions: number;
  totalTime: string;
  completedAt: string;
  questions: Question[];
}

export interface User {
  id: string;
  fullName: string | null;
  email: string;
}
