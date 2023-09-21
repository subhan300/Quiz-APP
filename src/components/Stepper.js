import * as React from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { Actions, State } from "@/context/context";
import styles from "../styles/fixedSideLayout.module.css"
export default function TextMobileStepper({
  handleNext,
  handleNextPayload,
  quiz,
  questionCategory,
  children,
  bg,
}) {
  const quizState = State();
  const actions = Actions();
  const userQuizCollection = [];
 

  return (
    <Box
      className={styles.simpleContainer}
      sx={{
        
    
        flexGrow: 1,

        "@media (min-width:600px)": {
          minWidth: 500, // Width for desktop
        },
      }}
    >
      {children}
    </Box>
  );
}
