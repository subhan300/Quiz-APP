import React, { useEffect, useRef, useState } from "react";
import stylesheet from "../styles/audioTrack.module.css";
import PauseCircleOutlineOutlinedIcon from "@mui/icons-material/PauseCircleOutlineOutlined";
import PlayCircleOutlineOutlinedIcon from "@mui/icons-material/PlayCircleOutlineOutlined";
import { State } from "@/context/context";

const options = ["Option 1", "Option 2", "Option 3", "Option 4"];

function AudioTrackComponent({ questionUrl }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration,setDuration]=useState()
  const [playCount, setPlayCount] = useState(0);
  const audioRef = useRef(null);
  const quizState = State();
  const { quizInfo } = quizState;
  useEffect(() => {
    const audioElement = audioRef.current;

    if (audioElement && questionUrl()) {
      audioElement.currentTime = 0;
      audioElement?.load();
      setIsPlaying(false);
    }
  }, [questionUrl()]);

  useEffect(() => {
    const playButton = document.getElementById("playButton");
    const currentTime = document.getElementById("currentTime");

    playButton?.addEventListener("click", () => {
      const audioElement = audioRef.current;

      if (audioElement) {
        if (!isPlaying) {
          audioElement.play();
          setPlayCount((prevCount) => prevCount + 1);

          // Disable the play button after playing it two times
          if (playCount >= 1) {
            playButton.disabled = true;
          }
        } else {
          audioElement.pause();
        }

        setIsPlaying(!isPlaying);
      }
    });
    audioRef?.current?.addEventListener("loadedmetadata", () => {
      const audioElement = audioRef.current;
      setIsPlaying(false);
      const duration = Math.floor(audioElement.duration);
      setDuration(duration)
    });
    audioRef?.current?.addEventListener("timeupdate", (event) => {
     
      const audioElement = audioRef.current;
      if (audioElement) {
        let currentTimeValue = Math.floor(audioElement.currentTime);
        const timeString = `${formatTime(currentTimeValue)} `;

        currentTime.textContent = timeString;
      }
      audioElement.addEventListener("ended", () => {
        setIsPlaying(false)
        audioElement.currentTime = 0;
        audioElement?.load();
      });
    
        
      
    });
    return ()=>{
      audioRef?.current?.removeEventListener("addtimeupdated",()=>{
        setIsPlaying(false)
      })
    }
  }, [isPlaying]);

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  }
  const [scrollY, setScrollY] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setScrollY(true);
      } else {
        setScrollY(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
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
          Choose the best option for what comes next in the conversation. You
          can play the recording <span>TWO</span> times.
        </p>

        <div className={`${scrollY?stylesheet.fixedAudio:''} ${stylesheet.btn_bx}`}>
          <div>
            <button id="playButton">
              {!isPlaying ? (
                <PlayCircleOutlineOutlinedIcon
                  className={stylesheet.playIcon}
                  style={{ fontSize: "30px", color: "white" }}
                />
              ) : (
                <PauseCircleOutlineOutlinedIcon
                  className={stylesheet.playIcon}
                  style={{ fontSize: "30px", color: "white" }}
                />
              )}
            </button>
          </div>
          <div>
            <p id="playCount">Play's left: 2</p>
           <div style={{display:"flex"}}>
           <p id="currentTime">00:00</p>
            <span>
              /
              {formatTime(duration)}
             </span>
          </div>
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
