import styles from "./Footer.module.css"

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="content-width">
        <p className={styles.text}>GitHub Repository Search</p>
      </div>
    </footer>
  )
}

