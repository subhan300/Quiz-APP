import Head from 'next/head'
import stylesheet from '../styles/listening.module.css'
import Header from '@/components/header'
import ReadingQuestion from '@/components/readingQuestion'
import { useState } from 'react';

const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

export default function Listening() {
  const [quizStart,setStartQuiz]=useState(false)
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={stylesheet.page_body}>
        <div className={stylesheet.grid}>
          <div className={stylesheet.audio_track}>
            <p className={stylesheet.audio_trackp1}>You will hear 10 speakers.</p>
            <p className={stylesheet.audio_trackp2}>Choose the best option for what comes next in the conversation. You can play the recording <span>TWO</span> times.</p>
            <div className={stylesheet.btn_bx}>
              <button>
                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 16">
                  <path d="M0 .984v14.032a1 1 0 0 0 1.506.845l12.006-7.016a.974.974 0 0 0 0-1.69L1.506.139A1 1 0 0 0 0 .984Z" />
                </svg>
              </button>
              <div>
                <p>Play's left: 2</p>
                <p>00:00 / 00:09</p>
              </div>
            </div>
          </div>
          <div className={stylesheet.question}>
            <ReadingQuestion question='Select any two option?' options={options} />
          </div>
        </div>
      </div>
    </>
  )
}
