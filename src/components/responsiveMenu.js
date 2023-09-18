"use client"
import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { makeStyles } from "@mui/styles";
import Link from "next/link";
const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
  label: {
    textTransform: "capitalize",
  },
});

// accordion: {
//     minHeight: 150, //ugly but works
//     height: "100%"
// },
// details: {
//   alignItems: "center",
//   border: "1px solid rgba(0,0,0,0.1)",
//   borderRadius: 4
// }}
export default function ResponsiveMenu({ title, options, setOpen }) {
  const classes = useStyles();
  return (
    <Accordion
      sx={{
        border: "1px solid #131d25 !important",
        width: "100%",
        background: "#131d25",
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{ background: "#131d25" }}
      >
        <Typography sx={{ color: "white" }}>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
      <ul>
      {options.length
          ? options.map((val,i) => {
            return(
              (
                <Link
                  onClick={() => {
                    setOpen(prev=>!prev);
                  }}
                  style={{ color: "white" }}
                  key={val.title}
                  href={`${val.slug}`}
                  to={`${val.slug}`}
                >
                  <li style={{marginTop:".7rem",color:"skyblue",listStyle:"none"}}>{val.title}</li>
                </Link>
              )
            )
          })
          : ""}
      </ul>
      </AccordionDetails>
    </Accordion>
  );
}
