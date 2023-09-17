import { Box, Button, Card, TextField } from "@mui/material";
import React from "react";

function RetrieveCertificate() {
  return (
    <Box
      sx={{
        padding: "3rem",
        display: "flex",
        justifyContent: "center",
        alignItem: "center",
        background: "skyblue",
        // height:"89.4vh"
      }}
    >
      <Card style={{ padding: "1rem", width: "" }}>
        <h1 style={{ textAlign: "center" }}>Find your certificate</h1>
        <p
          style={{
            marginTop: "2rem",
            fontSize: "14px",
            width: "70%",
            margin: "2rem auto",
          }}
        >
          Enter the email you used when taking the test and we’ll send you a
          link to your certificate.
        </p>
        <div
          style={{
            margin: "auto auto",
            display: "flex",
            justifyContent: "center",
            alignItem: "center",
            width: "70%",
          }}
        >
          <TextField style={{ width: "100%" }} />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItem: "center",
          }}
        >
          <Button
            variant="contained"
            style={{
              marginTop: "2rem",

              marginTop: "2rem",
              backgroundColor: " #45D9D5",
              color: " white",
              padding: "1rem 1.5rem",
              borderRadius: " 9999px",
              fontsize: ".8rem",
              fontWeight: " 600",
              border: "none",
              outline: "none",
            }}
          >
            Submit
          </Button>
        </div>
      </Card>
    </Box>
  );
}

export default RetrieveCertificate;
