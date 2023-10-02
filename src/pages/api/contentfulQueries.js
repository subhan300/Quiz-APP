import contentful from "../../../lib/contentful";

const scoreCalculate = (
  answerCollection,
  givenAnswerCollection,
  questionLeft
) => {
  let score = 0;

  for (const givenAnswer of givenAnswerCollection) {
    for (const answer of answerCollection) {
      if (answer.answer === givenAnswer.givenAnswer) {
        score += 10;
        break; // Once a match is found, no need to continue checking
      }
    }
  }
  score = score - questionLeft * 10;
  if (score < 0) {
    return 0;
  }

  return score;
};

export default async (req, res) => {
  try {
    const { userScore, isQuiz } = req.body;

    const queries = await contentful.getEntryByContentType("answersCollection");
    const readingCollection = userScore.allQuizUserDetail.filter(
      (val) => val.questionCategory === "reading"
    );
    const ListeningCollection = userScore.allQuizUserDetail.filter(
      (val) => val.questionCategory === "listening"
    );
    const collectionName = isQuiz
      ? "quizAnswersCollection"
      : "quickCheckAnswerCollection";
    const answersCollection = queries[0].fields[collectionName];
    const readingScore = scoreCalculate(
      answersCollection,
      readingCollection,
      userScore.questionLeft.reading
    );
    const listeningScore = scoreCalculate(
      answersCollection,
      ListeningCollection,
      userScore.questionLeft.listening
    );

    res.status(200).json({ listening: listeningScore, reading: readingScore });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ error: "Error" });
  }
};
