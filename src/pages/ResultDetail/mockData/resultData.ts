import type { QuizResult, User } from "../types/result.types";

export const mockUser: User = {
  id: "user-123",
  fullName: "Hồ Việt Hà",
  email: "ha.ho@example.com",
};

export const mockResultData: QuizResult = {
  id: "result-123",
  userId: "user-123",
  topicId: "react-hooks",
  topicName: "React Hooks",
  score: 80,
  totalCorrect: 8,
  totalQuestions: 10,
  totalTime: "5m 30s",
  completedAt: "2024-01-15T10:30:00Z",
  questions: [
    {
      id: 1,
      questionNumber: 1,
      question:
        "Which hook is used to handle side effects in functional components?",
      options: ["useState", "useEffect", "useContext", "useReducer"],
      correctAnswer: "useEffect",
      userAnswer: "useEffect",
      isCorrect: true,
    },
    {
      id: 2,
      questionNumber: 2,
      question:
        "What is the correct way to update a state variable named 'count' using 'setCount'?",
      options: [
        "count = count + 1",
        "setCount(count + 1)",
        "setCount = count + 1",
        "this.setState({ count: count + 1 })",
      ],
      correctAnswer: "setCount(count + 1)",
      userAnswer: "count = count + 1",
      isCorrect: false,
      explanation:
        "In React, state should never be modified directly. Always use the setter function provided by the hook to trigger a re-render.",
    },
    {
      id: 3,
      questionNumber: 3,
      question: "Which dependency array will cause useEffect to run only once?",
      options: [
        "No dependency array",
        "An empty array []",
        "An array with all variables [prop, state]",
        "A null value",
      ],
      correctAnswer: "An empty array []",
      userAnswer: "An empty array []",
      isCorrect: true,
    },
    {
      id: 4,
      questionNumber: 4,
      question: "What is the purpose of the dependency array in useEffect?",
      options: [
        "To specify when the effect should re-run",
        "To define the effect's return value",
        "To pass arguments to the effect",
        "To name the effect for debugging",
      ],
      correctAnswer: "To specify when the effect should re-run",
      userAnswer: "To specify when the effect should re-run",
      isCorrect: true,
    },
    {
      id: 5,
      questionNumber: 5,
      question:
        "Which hook would you use to create a mutable reference that persists across renders?",
      options: ["useRef", "useMemo", "useCallback", "useState"],
      correctAnswer: "useRef",
      userAnswer: "useState",
      isCorrect: false,
      explanation:
        "useRef creates a mutable reference that persists for the lifetime of the component without causing re-renders when changed.",
    },
  ],
};
