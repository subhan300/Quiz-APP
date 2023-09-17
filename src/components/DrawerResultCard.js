import { Grid, Paper } from "@mui/material";
import React from "react";
import styles from "../styles/drawerResultCard.module.css";
function DrawerResultCard({ data }) {
  const result = data[0]?.result;
  return (
    <Paper sx={{ padding: "1.5rem", "&.MuiPaper-root": { boxShadow: "none" } }}>
      <Grid container spacing={1}>
        <Grid xs={12} sm={6} md={6} item>
          <span className={styles.keyText}>Name</span>
        </Grid>
        <Grid xs={12} sm={6} md={6} item>
          <span className={styles.valueText}>{data[0]?.firstName}</span>
          <span style={{ marginLeft: "3px" }}>{data[0]?.lastName}</span>
        </Grid>
      </Grid>
      {result?.map((val) => (
        <>
          <Paper sx={{ marginTop: "2rem", padding: "1rem 0 1rem 1rem" }}>
            <Grid container columnSpacing={2} rowSpacing={3}>
              <Grid xs={12} sm={8}  item>
                <span className={styles.keyText}>Listening Score</span>
              </Grid>
              <Grid  item>
                <span className={styles.valueText}>{val.listening}</span>
              </Grid>
              <Grid xs={12}  sm={8} item>
                <span className={styles.keyText}>Reading Score</span>
              </Grid>
              <Grid item>
                <span className={styles.valueText}>{val.reading}</span>
              </Grid>
            </Grid>
          </Paper>
        </>
      ))}
    </Paper>
  );
}

export default DrawerResultCard;
