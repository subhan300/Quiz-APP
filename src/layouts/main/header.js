import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material/styles";

import { bgBlur } from "src/theme/css";
import navStyles from "../../styles/navbar.module.css";
import Label from "src/components/label";
import { useResponsive } from "src/hooks/use-responsive";
import { useOffSetTop } from "src/hooks/use-off-set-top";

import { HEADER } from "../config-layout";
import Searchbar from "../common/searchbar";
import HeaderShadow from "../common/header-shadow";
import SettingsButton from "../common/settings-button";

import NavMobile from "./nav/mobile";
import NavDesktop from "./nav/desktop";
import { navConfig } from "./config-navigation";
import contentful from "../../../lib/contentful";
import { useState } from "react";
import { useEffect } from "react";
import { Typography, getMenuUtilityClass } from "@mui/material";
import Image from "next/image";

// ----------------------------------------------------------------------

export default function Header({ headerOnDark }) {
  const theme = useTheme();
  const [menuCollection, setMenuCollection] = useState([]);

  const offset = useOffSetTop();

  const mdUp = useResponsive("up", "md");
  const getMenus = async () => {
    const menus = await contentful.getAllQuizes();
    const getMenus = navConfig(menus);
    setMenuCollection(getMenus);
  };
  useEffect(() => {
    getMenus();
  }, []);
  return (
    <AppBar>
      <Toolbar
        disableGutters
        sx={{
          height: {
            xs: HEADER.H_MOBILE,
            md: HEADER.H_DESKTOP,
          },
          transition: theme.transitions.create(["height", "background-color"], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
          ...{
            color: "common.white",
          },
          ...(offset && {
            ...bgBlur({ color: theme.palette.background.default }),
            color: "text.primary",
            height: {
              md: HEADER.H_DESKTOP - 16,
            },
          }),
        }}
      >
        <Container
          sx={{
            height: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ lineHeight: 0, position: "relative" }}>
            <Link href="/">
              <Typography  variant="h3" >
                <span  variant="h3" >EF</span>
                <span  variant="h3" >SET</span>
              </Typography>
            </Link>

            <Link href="/" target="_blank" rel="noopener">
              {/* <Label
                color="info"
                sx={{
                  ml: 0.5,
                  px: 0.5,
                  top: -14,
                  left: 60,
                  height: 20,
                  fontSize: 11,
                  cursor: 'pointer',
                  position: 'absolute',
                }}
              >
                v2.1.0
              </Label> */}
            </Link>
          </Box>

          {mdUp && <NavDesktop data={menuCollection} />}

          <Stack
            spacing={2}
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
          >
            <Stack spacing={1} direction="row" alignItems="center">
              <Searchbar />

              <SettingsButton />
            </Stack>

            {mdUp && (
              <Button
                variant="contained"
                color="inherit"
                href={"/Login"}
                target="_blank"
                rel="noopener"
              >
                Login
              </Button>
            )}
          </Stack>

          {!mdUp && <NavMobile data={menuCollection} />}
        </Container>
      </Toolbar>

      {offset && <HeaderShadow />}
    </AppBar>
  );
}

Header.propTypes = {
  headerOnDark: PropTypes.bool,
};
