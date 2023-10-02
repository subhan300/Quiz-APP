import {
   
    StyleSheet,
  } from "@react-pdf/renderer"
export const styles = StyleSheet.create({
    page: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      // backgroundColor: "#E4E4E4",
      // border: "1px solid red",
      width: "100%",
      // height:"100vh"
    },
    headerLine: {
      // width: "70%", textAlign: "center",
      textAlign: "center",
  
      // border: "1px solid green",
    },
    logo: {
      padding: 8,
      fontSize: "28px",
      fontWeight: "bold",
    },
    section: {
      display: "flex",
      margin: 10,
      padding: 10,
      flexGrow: 1,
      // border: "1px solid red",
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
      alignSelf: "center",
      padding: "2rem 3rem",
    },
    text: {
      fontWeight: "500",
      fontSize: "15",
    },
    bolderText: {
      fontWeight: "bolder",
      fontSize: "22",
    },
    diamond: {},
    award: {
      marginTop: "32",
    },
    score: {
      display: "flex",
      justifyContent: "space-around",
      flexDirection: "row",
      alignItems: "center",
      gap: "30",
      marginTop: "16",
      width: "100%",
      backgroundColor: "#F3F3F3",
      padding: "4 4",
      // clipPath: polygon("66% 27%, 100% 0, 100% 100%, 0 100%, 0 0, 31% 26%");
    },
    score_inner_div: {
      // border: "1px solid yellow",
      display: "flex",
      gap: "16",
      padding: "16",
    },
    score_section: {
      border: "1px solid yellow",
      display: "flex",
      flexDirection: "column",
      padding:"10"
    },
    innerText: {
      width: "70%",
      fontWeight:"400",
      fontSize:14,

    },
    score_title_content:{
      display:"flex",
      flexDirection:"row",
      justifyContent:"flex-start",
      gap:"3"
    }
  });