import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import styled from "styled-components";

function DropdownOptions({ options, handleOptionChange, selectedOption }) {
  const defaultProps = {
    options: options,
    getOptionLabel: (option) => option,
  };
  const [value,setValue]=useState("standard")
  const flatProps = {
    options: options.map((option) => option),
  };

  return (
    <Stack spacing={1} sx={{ width: "100%", marginTop: "1rem" }}>
      <Autocomplete
        {...defaultProps}
        id="disable-clearable"
        disableClearable
        onChange={(e, value) => {
          handleOptionChange({ target: { value } });
          setValue("filled")
        }}
    
        renderInput={(params) => {
           return (
                <TextField
                  {...params}
                  variant={value}
                />
              )
        }}
      />
    </Stack>
  );
}


export default DropdownOptions;
