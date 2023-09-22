import React from "react";
import styles from "../styles/DotBar.module.css";
import { State } from "@/context/context";
function DotBar({ dotQuestionInfo }) {
  const { quizUserAnswerSelection } = State();
  function filterUserAnswersWithInfo(question) {
    return quizUserAnswerSelection.some((selection) => {
      return selection.id === question;
    });
  }

  return (
    <div className={styles.dot_bar}>
      {dotQuestionInfo.map((val, i) => (
        <div
          key={`${val.question},${i}`}
          className={`${styles.dot} ${
            filterUserAnswersWithInfo(val.question) ? styles.dot_active : ""
          }`}
        ></div>
      ))}
    </div>
  );
}

export default DotBar;
