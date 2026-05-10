import styles from "./LanguageBadge.module.css"

type LanguageBadgeProps = {
  language: string
}

export function LanguageBadge({ language }: LanguageBadgeProps) {
  return (
    <span className={styles.language} data-language={language}>
      {language}
    </span>
  )
}

