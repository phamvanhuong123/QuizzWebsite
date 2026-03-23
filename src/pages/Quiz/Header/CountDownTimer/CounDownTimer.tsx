import { Button } from "@/components/ui/button";
import { timeUtils } from "@/utils/timeUtils";
import { Timer } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface CountdownTimerProps {
  initialTime: number;
  topicId: string | null;
  handleSubmit: () => void;
}

function CountDownTimer({
  initialTime,
  handleSubmit,
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // useEffect(() => {
  //   intervalRef.current = setInterval(() => {
  //     setTimeLeft((prevTime) => {
  //       if (prevTime <= 1) {
  //         if (intervalRef.current !== null) {
  //           clearInterval(intervalRef.current);
  //         }

  //         return 0;
  //       }
  //       handleSubmit();
  //       return prevTime - 1;
  //     });
  //   }, 1000);
  //   return () => {
  //     if (intervalRef.current !== null) {
  //       clearInterval(intervalRef.current);
  //     }
  //   };
  // }, []);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

   
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };

  }, []);
  useEffect(() => {
    if (timeLeft === 0) {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
      handleSubmit();
    }
  }, [timeLeft, handleSubmit]);

  // console.log(timeLeft);

  return (
    <Button variant="outline" className="flex items-center gap-2 h-9">
      <Timer className="h-4 w-4" />
      <span className="font-mono">
        {timeUtils.convertNumberToTime(timeLeft)}
      </span>
    </Button>
  );
}

export default CountDownTimer;
