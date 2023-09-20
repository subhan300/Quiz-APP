import React, { useEffect, useState, useRef } from "react";
import navStyles from "../styles/TopSliderDrawer.module.css";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@mui/material";

function TopSliderDrawer({ children }) {
  const targetRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showText, setShowText] = useState(false);

  const [open, setOpen] = useState(false);
  useEffect(() => {
    setScrollPosition(window.scrollY);
  }, []);
  useEffect(() => {
    function handleScroll() {
      const scrollPosition = window.scrollY;
      const targetPosition = 1680;
      // Adjust the offset value as needed
      const offset = 100; // Change this value to your desired offset
      if (scrollPosition >= targetPosition - offset) {
        // console.log("=====result", scrollPosition, targetPosition);
        setShowText(true);
      } else {
        setShowText(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
