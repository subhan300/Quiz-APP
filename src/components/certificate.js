import { Grid, Typography, Container, Hidden } from "@mui/material";
import stylesheet from "../styles/certificate.module.css";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import React from "react";
import GlobalFunctions from "../../lib/GlobalFunctions";

export default function Certificate() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <div
      style={{
        background:
          "linear-gradient(-135deg, #fe1c80, #0310ea 100%)",
      }}
    >
      <Container maxWidth={"lg"}>
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "80px",
          }}
          className={stylesheet.container}
        >
          <Grid item xs={12} md={5}>
            <h2>
              EF SET Certificate
            </h2>
            <div style={{ paddingTop: "30px", paddingBottom: "24px" }}>
              <p>
                Receive a free personalized online English certificate when you
                take the 50-minute English test. You can easily add it to your
                CV or LinkedIn profile.
              </p>
            </div>
            <div style={{ paddingBottom: "50px" }} className={stylesheet.certificate__buttonBx}>
              <button className={stylesheet.certificate__button}>
                Certify your English level
              </button>
            </div>
          </Grid>
          <Grid item xs={12} md={7}>
            <img
              className={stylesheet.grid__image}
              src="https://a.storyblok.com/f/79503/468x467/2531d03856/certificate-image-desktop.svg"
            ></img>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
