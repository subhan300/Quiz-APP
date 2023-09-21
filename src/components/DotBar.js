import React from 'react'
import styles from "../styles/DotBar.module.css"
function DotBar() {
  return (
    <div className={styles.dot_bar}>
       {[1,2,3,4,5,6,7].map(val=><div className={styles.dot} ></div>)}
    </div>
  )
}

export default DotBar
