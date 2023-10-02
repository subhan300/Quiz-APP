import { Grid, Paper } from "@mui/material";
import React from "react";
import styles from "../styles/drawerResultCard.module.css";
import GlobalFunctions from "../../lib/GlobalFunctions";
import {
  Download,
  DownloadDoneOutlined,
  DownloadOutlined,
  RemoveRedEye,
  ViewAgendaOutlined,
} from "@mui/icons-material";
import Link from "next/link";
import QuickView from "./QuickView";
function DrawerResultCard({ data }) {

  const result = data?.result;
  return (
    <Paper sx={{ padding: "1.5rem", "&.MuiPaper-root": { boxShadow: "none" } }}>
      <Grid container spacing={1}>
        <Grid xs={12} sm={6} item>
          <span className={styles.keyText}>Name</span>
        </Grid>
        <Grid xs={12} sm={6} item>
          <span className={styles.valueText}>
            {data?.firstName} {data?.lastName}
          </span>
        </Grid>
      </Grid>
      {result?.map((val, i) => (
        <Paper
          key={`${Math.random()}-${i}`}
          sx={{ marginTop: "2rem", padding: "1rem 0 1rem 1rem" }}
        >
          <Grid container columnSpacing={1} rowSpacing={3}>
            <Grid xs={12} sm={6} item>
              <span className={styles.keyText}>Issue Date</span>
            </Grid>
            <Grid item sm={6}>
              <span className={styles.valueText}>
                {GlobalFunctions.formatTimestampToDateTime(val.date)}
              </span>
            </Grid>
            <Grid xs={12} sm={8} item>
              <span className={styles.keyText}>certificate-pdf</span>
            </Grid>
            <Grid item>
              <span className={styles.valueText}>
                <Link className={styles.valueText} href={val.certificateLink}>
                  <Download className={styles.icon} />
                </Link>
                {/* <RemoveRedEye className={styles.icon} /> */}
                <QuickView link={val.certificateLink} />
              </span>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </Paper>
  );
}

export default DrawerResultCard;
