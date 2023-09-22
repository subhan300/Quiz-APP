import React, { useEffect, useState } from "react";
import HeadphonesOutlinedIcon from "@mui/icons-material/HeadphonesOutlined";
import styles from "../styles/progressTimeShow.module.css";
import { AppBar, Box, LinearProgress, Toolbar } from "@mui/material";
import DonutLargeOutlinedIcon from "@mui/icons-material/DonutLargeOutlined";
import CountdownTimer from "./CountDownTimer";
import ImportContactsOutlinedIcon from "@mui/icons-material/ImportContactsOutlined";
import { State } from "@/context/context";
function ProgressTimeShow({ category, time, fixedProgressBar }) {
  const quizState = State();
  const [scrollY, setScrollY] = useState(0);
  const [windowWidth, setWindowWidth] = useState(null);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrollY(true);
      } else {
        setScrollY(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setWindowWidth(true);
      } else {
        setWindowWidth(false);
      }
    };
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("resize", handleScroll);
    };
  }, []);
  return (
    <AppBar
      position="fixed"
      className={styles.progress}
      // style={{ top:scrollY?0:70,position:'fixed',width:!fixedProgressBar?"100%":"98.8%" }}
    >
      <Toolbar      className={styles.progress_toolbar}>
        <div className={styles.progress_sider}>
          {/* sx={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            border: "1px solid blue",
          }} */}
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
          <LinearProgress className={styles.progressBar} variant="determinate" value={quizState.progress} />
        </Box>
        <div className={styles.progress_sider}>
          <span style={{ color: "skyblue" }}>
            <CountdownTimer
              category={category}
              startTimeInSeconds={time * 60}
            />
          </span>
          <DonutLargeOutlinedIcon
            style={{ color: "skyblue", fontSize: "28px" }}
          />
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default ProgressTimeShow;
