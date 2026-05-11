import { DefinitionItem, LanguageBadge } from "@/components"

import styles from "./RepositorySummary.module.css"

type RepositorySummaryProps = {
  language: string | null
  description: string | null
}

export function RepositorySummary({
  language,
  description,
}: RepositorySummaryProps) {
  return (
    <dl className={styles.repositorySummary}>
      <DefinitionItem term="Language" termHidden={true}>
        <LanguageBadge language={language ?? "未設定"} />
      </DefinitionItem>

      {description && (
        <DefinitionItem term="Description" termHidden={true}>
          {description}
        </DefinitionItem>
      )}
    </dl>
  )
}

