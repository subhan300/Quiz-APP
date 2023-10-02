import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import ReactPDF from "@react-pdf/renderer";
import { styles } from "./styleSheet";
import listening from "../../assets/listening.svg";
// Create styles

function CertificateCreate() {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.logo}>EFSET</Text>
        <View style={styles.section}>
          <Text style={styles.text}>This is to certify that</Text>
          <Text style={styles.bolderText}>Web Opera</Text>
          <View style={{ width: "65%" }}>
            <Text style={{ ...styles.text, ...styles.headerLine }}>
              has successfully completed the EF SET Certificate and has earned
              the English level:
            </Text>
          </View>
        </View>
        <View style={{ ...styles.section, ...styles.diamond }}>
          <Text style={styles.bolderText}>EF SET</Text>
          <Text style={styles.bolderText}>25/100</Text>
          <Text style={styles.bolderText}>AI Beginner</Text>
        </View>
        <View style={{ ...styles.section, ...styles.award }}>
          <Text style={styles.text}>Awarded on</Text>
          <Text style={styles.text}>24 Aug 2023</Text>
        </View>
        <View style={{ ...styles.section, ...styles.award }}>
          <Text style={{ ...styles.text, textAlign: "center" }}>
            Your level of English is 25/100 on the EF SET score scale and A1
            Beginner according to the Common European Framework of Reference
            (CEFR). This score is calculated as an average of your reading and
            listening scores
          </Text>
        </View>
        <View style={styles.score}>
          <View style={{ ...styles.score_section }}>
            <Text style={{ ...styles.bolderText, fontSize: "32" }}>
              Reading Section
            </Text>

            <View style={styles.score_inner_div}>
              <View style={styles.score_title_content}>
                <Text
                  style={{
                    color: "orange",
                    fontSize: "25",
                    fontWeight: "400",
                  }}
                >
                  25/100
                </Text>{" "}
                <Text
                  style={{
                    fontWeight: "bolder",
                    paddingTop: "18px",
                    ...styles.text
                  }}
                >
                  A1
                </Text>
                <Text
                  style={{
                    ...styles.text,
                   
                    paddingTop: "18px",
                  }}
                >
                  Beginner
                </Text>
              </View>
            </View>
            <View style={{ ...styles.score_section }}>
              <View style={{ width: "100%" }}>
               <View style={{width:"70%"}}>
               <Text style={{ ...styles.innerText }}>
                  You are on your way to building your vocabulary and your
                  comprehension of sentences in English.
                </Text>
               </View>
                <ul style={{ paddingLeft: "1.5rem", marginTop: "10px" }}>
                  <li style={{ width: "100%" }}>
                    {" "}
                    You are on your way to building your vocabulary and your
                    comprehension of sentences in English. Can interact in a
                    simple way provided the other person talks slowly and
                    clearly and is prepared to help.
                  </li>
                  <li style={{ width: "90%", marginTop: "10px" }}>
                    Can recognize familiar words and very basic phrases
                    concerning self, family and immediate concrete surroundings
                    when people speak slowly and clearly.
                  </li>
                </ul>
              </View>
            </View>
          </View>
          <View style={{ ...styles.score_section }}>
            <Text style={{ ...styles.bolderText, fontSize: "32" }}>
              Listening Section
            </Text>

            <View style={styles.score_inner_div}>
              <View style={styles.score_title_content}>
                <Text
                  style={{
                    color: "orange",
                    fontSize: "24",
                    fontWeight: "400",
                  }}
                >
                  25/100
                </Text>{" "}
                <Text
                  style={{
                    fontWeight: "bolder",
                    paddingTop: "18px",
                    fontSize:"15"
                  }}
                >
                  A1
                </Text>
                <Text
                  style={{
                    ...styles.text,
                   
                    paddingTop: "18px",

                  }}
                >
                  Beginner
                </Text>
              </View>
            </View>
            <View style={{ ...styles.score_section }}>
              <View style={{ width: "100%" }}>
              <View style={{width:"70%"}}>
               <Text style={{ ...styles.innerText }}>
                  You are on your way to building your vocabulary and your
                  comprehension of sentences in English.
                </Text>
               </View>
                <ul style={{ paddingLeft: "1.5rem", marginTop: "10px" }}>
                  <li style={{ width: "100%" }}>
                    {" "}
                    You are on your way to building your vocabulary and your
                    comprehension of sentences in English. Can interact in a
                    simple way provided the other person talks slowly and
                    clearly and is prepared to help.
                  </li>
                  <li style={{ width: "90%", marginTop: "10px" }}>
                    Can recognize familiar words and very basic phrases
                    concerning self, family and immediate concrete surroundings
                    when people speak slowly and clearly.
                  </li>
                </ul>
              </View>
            </View>
          </View>
        
        </View>
        <View
          style={{
            ...styles.section,
            marginTop: "40",
            width: "100%",
          }}
        >
          <Text style={{ fontWeight: "bolder" }}>
            www.efset.org/cert/C5PKV7
          </Text>
        </View>
      </Page>
    </Document>
  );
}
// ReactPDF.renderToStream(<CertificateCreate />);
export default CertificateCreate;
