import Head from "next/head";
import stylesheet from "../styles/nextQuestionCard.module.css";
import Header from "@/components/header";
import { Button, Card, CardContent, Modal } from "@mui/material";
import React from "react";

export default function NextQuestionCard({ handleModal ,open,scoreHandler,scoreHandlerPayload}) {
  return (
    <>
      <Modal
        open={open}
        // onClose={handleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={stylesheet.cardBx}>
          <Card className={stylesheet.card}>
            <CardContent>
              <h1>Go to next task?</h1>
              <p>
                Some questions have not been answered. Click Go back to complete
                the questions or Next to proceed.
              </p>
              <div className={stylesheet.btn__bx}>
                <button
                  className={stylesheet.trans__Btn}
                  onClick={() => {
                    handleModal(false,[],'close');
                  }}
                >
                  Go Back
                </button>
                <button
                  className={stylesheet.take__quizBtn}
                  onClick={() => {
                    // handleModal(false,[],'skip');
                    scoreHandler(...scoreHandlerPayload,true)
                  }}
                >
                  Next
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Modal>
    </>
  );
}
