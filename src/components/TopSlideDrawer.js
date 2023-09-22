import React, { useEffect, useState, useRef } from "react";
import navStyles from "../styles/TopSliderDrawer.module.css";
import { Button } from "@mui/material";

function TopSliderDrawer({ children ,inView}) {
  const [showText, setShowText] = useState(false);
  const [open, setOpen] = useState(false);
 
  useEffect(() => {
    function handleScroll() {
      if (inView) {
        setShowText(true);
      } else {
        setShowText(false);
      }
    }
    handleScroll()
  
  }, [inView]);

  return (
    <>
      <div
        className={`
        ${navStyles.navbar}`}
      >
        <button
          className={`${navStyles.click__menu} ${navStyles.responsive_btn}`}
          style={{ display: !showText ? "none" : "block" }}
          onClick={() => {
            setOpen(!open);
          }}
        >Open Text</button>

        <div
          className={`${navStyles.nav__content} `}
          style={{ display: "flex", top: open ? "0" : "-120%" }}
        >
          <button
            className={navStyles.click__menu}
            onClick={() => setOpen(false)}
            style={{ color: "white", display: !open ? "none" : "" }}
          >Hide Text
          </button>
          {children}

        </div>
      </div>
    </>
  );
}

export default TopSliderDrawer;
