import React, { useEffect, useRef, useState } from "react";
import stylesheet from "../styles/audioTrack.module.css";
import PauseCircleOutlineOutlinedIcon from "@mui/icons-material/PauseCircleOutlineOutlined";
import PlayCircleOutlineOutlinedIcon from "@mui/icons-material/PlayCircleOutlineOutlined";
import { State } from "@/context/context";

const options = ["Option 1", "Option 2", "Option 3", "Option 4"];

function AudioTrackComponent({ questionUrl }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const quizState = State();
  const { quizInfo } = quizState;
  useEffect(() => {
    const audioElement = audioRef.current;

    if (audioElement && questionUrl()) {
      audioElement.currentTime = 0;
      audioElement?.load(); 
      setIsPlaying(false)
    }
  }, [questionUrl()]);

  useEffect(() => {
    const playButton = document.getElementById("playButton");
    const playCount = document.getElementById("playCount");
    const currentTime = document.getElementById("currentTime");

    playButton?.addEventListener("click", () => {
      const audioElement = audioRef.current;

      if (audioElement) {
        if (!isPlaying) {
          audioElement.play();
        } else {
          audioElement.pause();
        }

        setIsPlaying(!isPlaying);
      }
    });

    audioRef?.current?.addEventListener("timeupdate", (event) => {
      const audioElement = audioRef.current;

      if (audioElement) {
        let duration = audioElement.duration;
        let currentTimeValue = Math.floor(audioElement.currentTime);
        let durationValue = Math.floor(duration);
        if(typeof duration=='number'){
          duration=0
          durationValue = 0
        }
        const timeString = `${formatTime(currentTimeValue)}` 
        // / ${formatTime(
        //   durationValue
        // )}`;

        currentTime.textContent = timeString;
      }
    });
  }, [isPlaying]);

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  }

  return (
    <div className={stylesheet.audio_track}>
      <div className={stylesheet.custom_audio_player}>
        {quizInfo.activeStep === 0 && (
          <>
            <p className={stylesheet.audio_trackp1}>
              You will hear 10 speakers.
            </p>
            </>
        )}
            <p className={stylesheet.audio_trackp2}>
              Choose the best option for what comes next in the conversation.
              You can play the recording <span>TWO</span> times.
            </p>
        
        <div className={stylesheet.btn_bx}>
         <div>
         <button id="playButton">
            {!isPlaying ? (
              <PlayCircleOutlineOutlinedIcon style={{fontSize:"30px",color:"white"}} />
            ) : (
              <PauseCircleOutlineOutlinedIcon style={{fontSize:"30px",color:"white"}} />
            )}
          </button>
         </div>
          <div>
            <p id="playCount">Play's left: 2</p>
            <p id="currentTime">00:00 / 00:00</p>
          </div>
        </div>
      </div>

      <audio ref={audioRef}>
        <source src={questionUrl()} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

export default AudioTrackComponent;
