import { RemoveRedEye } from '@mui/icons-material';
import React, { useState } from 'react';
import styles from "../styles/drawerResultCard.module.css"
function QuickView({link}) {
  const [pdfVisible, setPdfVisible] = useState(false);

  const togglePdfViewer = () => {
    setPdfVisible(!pdfVisible);
  };

  return (
    <div>
      <RemoveRedEye className={styles.icon} onClick={togglePdfViewer} />
      {/* {pdfVisible && (
        <iframe
          src={link}
          width="100%"
          height="500px"
          title="PDF Viewer"
          style={{}}
        />
      )} */}
    </div>
  );
}

export default QuickView;
