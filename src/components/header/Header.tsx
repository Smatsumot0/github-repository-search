import Link from "next/link"

import styles from "./Header.module.css"

export function Header() {
  return (
    <header className={styles.header}>
      <div className="content-width">
        <Link href="/" className={styles.title}>
          GitHub Repository Search
        </Link>
      </div>
    </header>
  )
}

