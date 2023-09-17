import { Actions } from "@/context/context";
import React, { useEffect, useState } from "react";

function CountdownTimer({ startTimeInSeconds, category }) {
  const [time, setTime] = useState(startTimeInSeconds);
  const actions = Actions();

  useEffect(() => {
    let interval;

    if (time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      let payload = "";
      if (category === "reading") {
        payload = "isQuizQuestionDone";
      } else if(category==="listening") {
        payload="isQuizListeningDone"
      }
      actions.QuizCloseOnTimeout({ [payload]: true });
    }

    return () => {
      clearInterval(interval);
    };
  }, [time]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div>
      {time > 0 ? <span>{formatTime(time)}</span> : <span>Time's up!</span>}
    </div>
  );
}

export default CountdownTimer;
