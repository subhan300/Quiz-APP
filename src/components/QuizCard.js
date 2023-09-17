import { Card, CardContent, Grid } from "@mui/material";
import React from "react";
import stylesheet from "../styles/Home.module.css";
import Link from "next/link";
function QuizCard({ cardData }) {
  return (
    <Card style={{ border: "1px solid lightgray" }}>
      <CardContent className={stylesheet.card__content}>
        <h1 className={stylesheet.card__title}>
          {cardData.min}
          <span className={stylesheet.card__titleBx}>
            <sup className={stylesheet.card__titleSup}>MIN</sup>
            <h1 className={stylesheet.card__titleTest}>{cardData.testType}</h1>
          </span>
        </h1>
        <p className={stylesheet.card__subHeading}>{cardData.subHeading}</p>
        <ul className={stylesheet.card__items}>
          {cardData.items.map((item, itemIndex) => (
            <li className={stylesheet.card__itemsText} key={itemIndex}>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className={stylesheet.quiz_btns}>
          <button className={stylesheet.take__quizBtn}>
            <Link
              style={{ color: "white", textDecoration: "none" }}
              href={`/quick-test/take-test?contentType=${cardData.contentType}&&slug=${cardData?.fields?.slug}`}
            >
              Take the quiz
            </Link>
          </button>
          <button className={stylesheet.quizDetails__btn}>
            {cardData.navText}
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

export default QuizCard;
