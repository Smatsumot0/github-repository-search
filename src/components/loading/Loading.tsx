import styles from "./Loading.module.css"

type LoadingProps = {
  isLoading: boolean
}

export function Loading({ isLoading }: LoadingProps) {
  if (!isLoading) return null

  return (
    <div className={styles.overlay} aria-hidden="true">
      <div className={styles.content}>
        <span className={styles.spinner} />
        <span>読み込み中...</span>
      </div>
    </div>
  )
}

