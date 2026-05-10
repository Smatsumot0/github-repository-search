import { DefinitionItem } from "@/features/repository-detail/components/definition-item/DefinitionItem"
import styles from "./RepositoryStats.module.css"

type RepositoryStatsProps = {
  stargazersCount: number
  watchersCount: number
  forksCount: number
  openIssuesCount: number
}

export function RepositoryStats({
  stargazersCount,
  watchersCount,
  forksCount,
  openIssuesCount,
}: RepositoryStatsProps) {
  return (
    <dl className={styles.stats}>
      <DefinitionItem term="Stars" className={styles.definitionItem}>
        {stargazersCount.toLocaleString()}
      </DefinitionItem>
      <DefinitionItem term="Watchers" className={styles.definitionItem}>
        {watchersCount.toLocaleString()}
      </DefinitionItem>
      <DefinitionItem term="Forks" className={styles.definitionItem}>
        {forksCount.toLocaleString()}
      </DefinitionItem>
      <DefinitionItem term="Issues" className={styles.definitionItem}>
        {openIssuesCount.toLocaleString()}
      </DefinitionItem>
    </dl>
  )
}

