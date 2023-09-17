import { CircularProgress, Stack } from "@mui/material";
import React from "react";

function Loader() {
  return (
    <Stack
      sx={{ color: "grey.500" }}
      style={{ marginTop: "9rem" }}
      justifyContent={"center"}
      align={"center"}
      spacing={2}
      direction="row"
    >
      <CircularProgress color="primary" />
    </Stack>
  );
}

export default Loader;
