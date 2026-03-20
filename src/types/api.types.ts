export interface ApiSubmission {
  id: string;
  userId: string;
  topicId: string;
  totalCorrect: number;
  totalQuestions: number;
  scorePercentage: number;
  submittedAt: string;
  answers: Array<{ questionId: string; selectedAnswer: number }>;
}

export interface ApiTopic {
  id: string;
  name: string;
  abridger: string;
  description: string;
  questionCount: number;
  durationHours: number;
  durationMinutes: number;
}

export interface ApiQuestion {
  id: string;
  topicId: string;
  correctAnswer: number;
  question: string;
  answers: string[];
}
