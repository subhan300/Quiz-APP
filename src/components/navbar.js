import React, { useEffect, useState } from "react";
import navStyles from "../styles/navbar.module.css";
import Link from "next/link";
import { Close } from "@mui/icons-material";
import { Box, LinearProgress, Stack } from "@mui/material";
import CustomMenuItem from "./menu/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import useWindowWidth from "@/hooks/useCurrentWidth";
import ResponsiveMenu from "./responsiveMenu";
import dynamicData from "../../lib/dynamicData";
import { State } from "@/context/context";
function Navbar({ menuCollection }) {
  const [show, handleShow] = useState(false);
  const [open, setOpen] = useState(false);
  const { pageLoad } = State();
  let obj = { open: false };
  const [fixOnScroll, setFixOnScroll] = useState(false);
  const [scrollAnimation, setScrollAnimation] = useState(0);
  const currentWidth = useWindowWidth();
  useEffect(() => {
    setOpen(false);
  }, [currentWidth]);
  return (
    <>
      <nav
        style={{ background: "white" }}
        className={`${navStyles.navbar_wrapper}
      ${
        fixOnScroll && scrollAnimation != 0
          ? navStyles.scroll_fixed_wrapper
          : !fixOnScroll && scrollAnimation > 90
          ? navStyles.scroll_up_header_wrapper
          : ""
      }
      `}
      >
        <div
          className={`${navStyles.navbar}  ${
            show && navStyles.nav_padding_scroll
          } 
      ${
        fixOnScroll && scrollAnimation != 0
          ? navStyles.scroll_fixed
          : !fixOnScroll && scrollAnimation > 90
          ? navStyles.scroll_up_header
          : ""
      }`}
        >
          <div className={`${show && navStyles.nav__scroll} `}>
            <div
              className={`${navStyles.logo__container}  ${
                show && navStyles.nav__scroll_logo
              } `}
            >
              <Link
                href="/"
                className={`${navStyles.header_logo}  ${navStyles.header_logo_outside_display} `}
              >
                {/* <Image loading='eager' src={Logo} alt='AI Denovers Logo' /> */}
                <h1 className={navStyles.logo}>
                  <i>EF</i>
                  <span>SET</span>
                </h1>
              </Link>
            </div>
            <div
              className={`${navStyles.click__menu}  ${
                show && navStyles.nav__scroll_menu
              }`}
              onClick={() => {
                setOpen(!open);
              }}
              style={{ color: "black" }}
            >
              <MenuIcon />
            </div>

            <div
              className={`${navStyles.nav__content}  ${
                show && !open ? navStyles.nav__scroll_content : ""
              }`}
              style={{ display: "flex", left: open ? "0%" : "-120%" }}
            >
              <div
                className={`${navStyles.logo__container} ${navStyles.header_logo_inside_display}`}
              >
                <div className={`${navStyles.header_logo} `}>
                  <Link href="/">
                    {/* <Image
                    style={{ width: '100%', height: '100%' }}
                    src={Logo}
                    alt='AI Denovers Logo'
                    loading='lazy'
                  /> */}
                    <h1 className={navStyles.logo}>
                      <i>EF</i>
                      <span>SET</span>
                    </h1>
                  </Link>
                </div>
              </div>

              <ul  className={navStyles.nav__content_links}>
                {dynamicData.menuCollection(menuCollection).map((val) => {
                  return (
                    <li key={val.title} style={{width:"100%"}}>
                      {" "}
                      <Box sx={{width:"100%"}}>
                        {currentWidth < 1024 ? (
                          <ResponsiveMenu
                            title={val.title}
                            options={val.options}
                            setOpen={setOpen}
                          />
                        ) : (
                          <CustomMenuItem
                            title={val.title}
                            options={val.options}
                            setOpen={setOpen}
                          />
                        )}
                      </Box>
                    </li>
                  );
                })}
              </ul>

              <div
                className={navStyles.close__menu}
                onClick={() => setOpen(false)}
                style={{ display: "none", color: "white" }}
              >
                {/* <Image src={close} alt='close icon ' /> */}
                <Close style={{color:"black"}} />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
