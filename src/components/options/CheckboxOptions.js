import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
} from "@mui/material";
import React from "react";
import stylesheet from "../../styles/readingQuestion.module.css";
function CheckboxOptions({ options, handleOptionChange, selectedOption }) {
  return (
    <Grid
      container
      // sx={{}}
      // spacing={{xs:3,sm:1}}
      spacing={{ xs: 6, sm: 2 }}
      sx={{ width: "100%", marginTop: "1rem" }}
      rowSpacing={2}
    >
      {options.map((val) => {
        return (
          <Grid item xs={6} sm={4} sx={{ padding: "0rem" }} key={val}>
            <Paper
              sx={{
                width: "104px",
                cursor: "pointer",
                padding: "16px",
                background: "#fff",
                boxShadow: " 0 2px 8px 0 rgba(25, 25, 25, 0.2)",
                borderRadius: "4px",
                wordBreak: "break-word",
                backgroundColor: selectedOption === val ? "#79B3F8" : "",
                color: selectedOption === val ? "white" : "",
              }}
              onClick={() => {
                handleOptionChange({ target: { value: val } });
              }}
            >
              Passage A
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default CheckboxOptions;
