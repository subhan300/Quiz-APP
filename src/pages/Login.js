import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import styled from "styled-components";
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useRouter } from "next/router";
function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({ email: "", password: "" });
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const router=useRouter()
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleLogin = (data) => {
    signInWithEmailAndPassword(auth, user.email, user.password)
    .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        router.push("/dashboard")
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
    });
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "3rem",
      }}
    >
      <h1 style={{ fontSize: "32px", color: "skyblue" }}>Admin Login </h1>
      <FormControl sx={{ m: 4, width: "300px" }} variant="outlined">
        {/* <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel> */}
        <CustomTextField
          id="outlined-adornment-email"
          type={"text"}
          label="Email"
          onChange={(e) => {
            setUser((prev) => ({ ...prev, email: e.target.value }));
          }}
        />
      </FormControl>
      <FormControl sx={{ m: 1, width: "300px" }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <CustomOutlineInput
          onChange={(e) => {
            setUser((prev) => ({ ...prev, password: e.target.value }));
          }}
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
      <Button
        onClick={() => {
          handleLogin();
        }}
        sx={{marginTop:"1rem",width:'300px',padding:".5rem",fontWeight:"bold",background:"black"}}
        variant="contained"
      >
        Login
      </Button>
    </Box>
  );
}

const CustomTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#A0AAB4",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#B2BAC2",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#E0E3E7",
    },
    "&:hover fieldset": {
      borderColor: "#B2BAC2",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#6F7E8C",
    },
  },
});
const CustomOutlineInput = styled(OutlinedInput)({
  "& label.Mui-focused": {
    color: "#A0AAB4",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#B2BAC2",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#E0E3E7",
    },
    "&:hover fieldset": {
      borderColor: "#B2BAC2",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#6F7E8C",
    },
  },
});

export default Login;
