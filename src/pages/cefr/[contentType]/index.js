import QuizCard from "@/components/QuizCard";
import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import contentfulApiFunctions from "../../../../lib/contentful";
import { useRouter } from "next/router";
function DynamicTests() {
  const router = useRouter();
  const [quizes, setQuizes] = useState([]);
  const { contentType } = router.query;
  const getQuiz = async () => {
    const quiz = await contentfulApiFunctions.getEntryByContentType(
      contentType
    );
    setQuizes(quiz);
  };
  useEffect(() => {
    if (contentType) {
    getQuiz();
    }
  }, [contentType]);
 
  return (
    <div style={{ marginTop: "2rem" }}>
      <Grid justifyContent="center" container spacing={2}>
        {quizes.map((val) => (
          <Grid key={val.fields.slug} xs={11} md={4} item>
            <QuizCard
              cardData={{
                min:val.fields.isQuiz?50:12,
                testType: val.fields.isQuiz?"Quiz":'Quick Check',
                subHeading: val.fields.title,
                items: ["Quiz", "Skills"],
                index: 2,
                navText: "Hi welcome to Quiz",
                fields: {
                  slug: val.fields.slug,
                },
                contentType,
              }}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default DynamicTests;
