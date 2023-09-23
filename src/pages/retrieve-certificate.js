import queries from "@/firebase/firestore/queries";
import {
  Alert,
  Backdrop,
  Box,
  Button,
  Card,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import GlobalFunctions from "../../lib/GlobalFunctions";
import Layout from "@/components/Layout";
import CustomizedSnackbars from "@/components/toasters/Alert";
function RetrieveCertificate() {
  const [email, setEmail] = useState("");
  const [open, setOpen] = React.useState(false);
  const [loader, setLoader] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    message: "",
    alertType: "error",
  });

  const handleAlert = (message, alertType) => {
    setOpen(true);
    setAlertInfo({ message, alertType });
    setEmail(" ");
  };
  const handleEmailSend = async () => {
    setLoader(true)
    const userExist = await queries.findDataExist(email);
    if (userExist) {
      let name = userExist[0]?.firstName + userExist[0]?.lastName;
      const certificateGenerate = await queries.createPdf(name);
      GlobalFunctions.sendEmail(
        userExist[0].email,
        GlobalFunctions.emailTemplate(name, certificateGenerate.link)
      );
      setLoader(false)
      handleAlert("We have emailed Your Certificate", "success");
    } else {
      handleAlert("Email does not Exist", "error");
    }
    setLoader(false)
  };
  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <CustomizedSnackbars
        open={open}
        setOpen={setOpen}
        message={alertInfo.message}
        alertType={alertInfo.alertType}
      />
      <Box
        sx={{
          // padding: "8.5rem 3rem",
          // paddingBottom: "5rem",
          display: "flex",
          justifyContent: "center",
          alignItem: "center",
          background: "skyblue",
          padding: { xs: "3rem .5rem", sm: "8rem 5rem" },

          // height:"89.4vh"
        }}
      >
        <Card sx={{ padding: { xs: "1rem .6rem", sm: "1rem" } }}>
          <Typography
            sx={{ fontSize: { xs: "1rem", sm: "2rem" } }}
            style={{
              textAlign: "center",
              fontsize: "18px",
              fontWeight: "bold",
            }}
          >
            Find your certificate
          </Typography>
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
            <TextField
              sx={{}}
              required={true}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              style={{ width: "100%" }}
            />
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
                padding: "1.3vw 3vw",
                borderRadius: "9999px",
                fontsize: "1vw",
                fontWeight: " 600",
                border: "none",
                outline: "none",
              }}
              onClick={() => {
                handleEmailSend();
              }}
            >
              Submit
            </Button>
          </div>
        </Card>
      </Box>
    </>
  );
}
RetrieveCertificate.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
export default RetrieveCertificate;
