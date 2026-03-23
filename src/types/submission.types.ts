interface AnswerPayload {
  questionId: string;
  selectedAnswer: number;
}

export interface SubmissionPayload {
  userId: string;
  topicId: string;
  totalCorrect?: number;
  totalQuestions?: number;
  scorePercentage?: number;
  submittedAt: Date;
  answers: AnswerPayload[];
}
export interface SubmissionResponse {
  id : string;
  userId: string;
  topicId: string;
  totalCorrect: number;
  totalQuestions: number;
  scorePercentage: number;
  submittedAt: Date;
  answers: AnswerPayload[];
}
