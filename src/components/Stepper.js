import * as React from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import ReadingQuestion from "./readingQuestion";
import { Actions, State } from "@/context/context";

const steps = [
  {
    label: "Choose the correct Phrase",
    description: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,
  },
  {
    label: "Create an ad group",
    description:
      "An ad group contains one or more ads which target a shared set of keywords.",
  },
  {
    label: "Create an ad",
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
  },
];

export default function TextMobileStepper({
  handleNext,
  handleNextPayload,
  quiz,
  questionCategory,
  children
}) {
  const theme = useTheme();
  const quizState = State();
  const { quizInfo } = quizState;
  const actions = Actions();
  const userQuizCollection = [];
  const userQuizHandler = (data) => {
    const getIndex = userQuizCollection.findIndex((val) => val.id === data.id);
    if (getIndex > -1) {
      userQuizCollection.splice(getIndex, 1);
    }
    userQuizCollection.push(data);
    
  };
  const scoreHandler = () => {
    debugger
    let questionLeft =
      quiz[quizState.quizInfo.activeStep].length - userQuizCollection.length;
    questionLeft = quizState.userScore.questionLeft[questionCategory] +=
      questionLeft;
    actions.handleUserScore({
      allQuizUserDetail: userQuizCollection,
      questionLeft: { [questionCategory]: questionLeft },
    });
    handleNext(...handleNextPayload);
  };

  return (
    <Box
      sx={{
        width: 300,
        flexGrow: 1,
        marginTop:"2rem",
        paddingTop:"4rem",
        "@media (min-width:600px)": {
          minWidth: 360, // Width for desktop
        },
      }}
    >
     {children}
      
    </Box>
  );
}
