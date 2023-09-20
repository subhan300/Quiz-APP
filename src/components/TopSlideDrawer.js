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
        <Button
          className={`${navStyles.click__menu}`}
          style={{ display: !showText ? "none" : "block" }}
          onClick={() => {
            setOpen(!open);
          }}
        >
          Open Text
        </Button>

        <div
          className={`${navStyles.nav__content} `}
          style={{ display: "flex", top: open ? "0" : "-120%" }}
        >
          {children}

          <div
            className={navStyles.close__menu}
            onClick={() => setOpen(false)}
            style={{ color: "white", display: !open ? "none" : "" }}
          >
            <h1>Close</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default TopSliderDrawer;
