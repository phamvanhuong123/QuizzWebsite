import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { questionApi } from "@/apis/questionApi";
import Header from "./Header/Header";
import type { Question, UserAnser } from "@/types/quiz.types";
import Content from "./Content/Content";
import type { SubmissionPayload } from "@/types/submission.types";
import { submissionApi } from "@/apis/submissionApi";

const calculateResultsHelper = (
  questions: Question[],
  answers: UserAnser[],
) => {
  let correctCount = 0;
  answers.forEach((answer) => {
    const question = questions.find((q) => q.id === answer.idQuestion);

    if (question?.correctAnswer === answer.selectAnswer) correctCount += 1;
  });

  const percentage = (correctCount / questions.length) * 100;
  return {
    totalCorrect: correctCount,
    scorePercentage: Math.round(percentage)
  };
};

function Quiz() {
  const { topicId } = useParams();
  const { id } = JSON.parse(localStorage.getItem("user")!);
  const [dataQuestion, setDataQuestion] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<UserAnser[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate()
  const selectedCurrentAnswer =
    userAnswers.find(
      (answer) => answer.idQuestion === dataQuestion[currentIndex].id,
    )?.selectAnswer ?? null;

  const handleSelectAnswer = (index: number) => {
    const selectUserAnswer: UserAnser = {
      idQuestion: dataQuestion[currentIndex].id,
      selectAnswer: index,
    };
    setUserAnswers((prevUserAnswer) => {
      const fillterUserAnswer = prevUserAnswer.filter(
        (answer) => answer.idQuestion !== dataQuestion[currentIndex].id,
      );
      return [...fillterUserAnswer, selectUserAnswer];
    });
  };

  const handleClickNextQuestion = () => {
    if (currentIndex === dataQuestion.length - 1) return;
    const nexIndex = Math.min(currentIndex + 1, dataQuestion.length - 1);
    setCurrentIndex(nexIndex);
  };

  const handleClickPrevQuestion = () => {
    if (currentIndex === 0) return;
    const prevIndex = Math.max(currentIndex - 1, 0);
    setCurrentIndex(prevIndex);
  };

  const handleSubmit = async () => {
    const { scorePercentage, totalCorrect} = calculateResultsHelper(dataQuestion,userAnswers)
    const payload: SubmissionPayload = {
      userId: id,
      topicId: topicId!,
      totalCorrect: totalCorrect,
      scorePercentage: scorePercentage,
      totalQuestions: userAnswers.length,
      submittedAt: new Date(),
      answers: userAnswers.map((userAnswer) => {
        return {
          questionId: userAnswer.idQuestion,
          selectedAnswer: userAnswer.selectAnswer,
        };
      }),
    };
    const response = await submissionApi.create(payload);
    navigate(`/quiz/result/${response.id}`)
  };
  useEffect(() => {
    const fetchApi = async () => {
      const result = await questionApi.getByTopicId(topicId || "");
      setDataQuestion(result.data);
    };
    fetchApi();
  }, [topicId]);
  return (
    <div className="min-h-screen bg-[#f8f6f6] dark:bg-[#221610] font-sans text-slate-900 dark:text-slate-100 flex flex-col">
      {/* Top Navigation Bar */}
      <Header
        currentIndex={currentIndex}
        dataQuestion={dataQuestion}
        topicId={topicId || null}
        handleSubmit={handleSubmit}
      />
      {/* Main Content */}
      <Content
        dataQuestion={dataQuestion}
        currentIndex={currentIndex}
        selectedCurrentAnswer={selectedCurrentAnswer}
        handleClickNextQuestion={handleClickNextQuestion}
        handleClickPrevQuestion={handleClickPrevQuestion}
        handleSelectAnswer={handleSelectAnswer}
        handleSubmit={handleSubmit}
      />

      <footer className="py-8 text-center text-slate-400 dark:text-slate-600 text-xs">
        <p>© 2024 Learning Platform • React Mastery Course</p>
      </footer>
    </div>
  );
}

export default Quiz;
