import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import React from 'react'
import stylesheet from "../../styles/readingQuestion.module.css"
function RadioOptions({options,handleOptionChange,selectedOption}) {
  return (
    <FormControl component="fieldset" className={stylesheet.optionBx}>
  <RadioGroup value={selectedOption} onChange={handleOptionChange}>
    {options.map((option, index) => (
      <FormControlLabel
        key={index}
        value={option}
        control={
          <Radio
            className={
              selectedOption === option ? stylesheet.selected : ""
            }
          />
        }
        label={option}
        className={ // Remove the array brackets here
          `${stylesheet.option} ${
            selectedOption === option ? stylesheet.selected : ""
          }`
        }
      />
    ))}
  </RadioGroup>
</FormControl>
  )
}

export default RadioOptions
