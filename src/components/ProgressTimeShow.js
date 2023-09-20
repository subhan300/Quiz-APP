import React, { useEffect, useState } from "react";
import HeadphonesOutlinedIcon from "@mui/icons-material/HeadphonesOutlined";
import styles from "../styles/progressTimeShow.module.css";
import { Box, LinearProgress } from "@mui/material";
import DonutLargeOutlinedIcon from "@mui/icons-material/DonutLargeOutlined";
import CountdownTimer from "./CountDownTimer";
import ImportContactsOutlinedIcon from "@mui/icons-material/ImportContactsOutlined";
import { State } from "@/context/context";
function ProgressTimeShow({ category, time }) {
  const quizState = State();
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      
      if(window.scrollY>20){
        setScrollY(true);
      }else{
        setScrollY(false);
      }
      console.log("scoll", scrollY,window.scrollY>70);
    };
    window.addEventListener("scroll", handleScroll);
    return ()=>{
      window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div className={styles.progress} style={{ top: scrollY? 0 : '0',position:scrollY?"fixed":"relative" }}>
      <div className={styles.progress_sider}>
        {category === "listening" ? (
          <HeadphonesOutlinedIcon
            style={{ color: "skyblue", fontSize: "28px" }}
          />
        ) : (
          <ImportContactsOutlinedIcon
            style={{ color: "skyblue", fontSize: "28px" }}
          />
        )}
        <span className={styles.category}>{category}</span>
      </div>
      <Box sx={{ width: "100%" }}>
        <LinearProgress variant="determinate" value={quizState.progress} />
      </Box>
      <div className={styles.progress_sider}>
        <span style={{ color: "skyblue" }}>
          <CountdownTimer category={category} startTimeInSeconds={time * 60} />
        </span>
        <DonutLargeOutlinedIcon
          style={{ color: "skyblue", fontSize: "28px" }}
        />
      </div>
    </div>
  );
}

export default ProgressTimeShow;
