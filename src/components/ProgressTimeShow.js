import React, { useState } from "react";
import HeadphonesOutlinedIcon from "@mui/icons-material/HeadphonesOutlined";
import styles from "../styles/progressTimeShow.module.css";
import { Box, LinearProgress } from "@mui/material";
import DonutLargeOutlinedIcon from "@mui/icons-material/DonutLargeOutlined";
import CountdownTimer from "./CountDownTimer";
import ImportContactsOutlinedIcon from "@mui/icons-material/ImportContactsOutlined";
import { State } from "@/context/context";
function ProgressTimeShow({ category,time }) {
  const [progress, setProgress] = useState(0);
  const quizState=State();

  // React.useEffect(() => {
  //   const timer = setInterval(() => {
  //     setProgress((oldProgress) => {
  //       if (oldProgress === 100) {
  //         return 0;
  //       }
  //       const diff = Math.random() * 10;
  //       return Math.min(oldProgress + diff, 100);
  //     });
  //   }, 500);

  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);
  return (
    <div className={styles.progress}>
      <div className={styles.progress_sider}>
        {category === "listening" ? (
          <HeadphonesOutlinedIcon
            style={{ color: "skyblue", fontSize: "28px" }}
          />
        ) : (
          <ImportContactsOutlinedIcon />
        )}
        <span style={{ color: "skyblue" }}>{category}</span>
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
