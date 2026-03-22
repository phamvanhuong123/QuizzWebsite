export interface Question {
  id: string;
  topicId: string;
  question: string;
  answers: string[];
  correctAnswer: number;
}

export interface UserAnser {
  idQuestion: string;
  selectAnswer: number;
}