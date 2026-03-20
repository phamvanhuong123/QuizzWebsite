export interface Topic {
  id: string;
  name: string;
  abridger: string;
  description: string;
  questionCount: number;
}

export interface Submission {
  id: string;
  userId: string;
  topicId: string;
  totalCorrect: number;
  totalQuestions: number;
  scorePercentage: number;
  submittedAt: string;
  answers: Array<{ questionId: string; selectedAnswer: number }>;
}

export interface HistoryItem extends Submission {
  topicName: string;
  abridger: string;
}
