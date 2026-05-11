import { DefinitionItem } from "@/components/definition-item/DefinitionItem"

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
  const stats = [
    { term: "Stars", value: stargazersCount },
    { term: "Watchers", value: watchersCount },
    { term: "Forks", value: forksCount },
    { term: "Issues", value: openIssuesCount },
  ]

  return (
    <dl className={styles.stats}>
      {stats.map((stat) => (
        <DefinitionItem
          key={stat.term}
          term={stat.term}
          className={styles.definitionItem}
          emphasized>
          {stat.value.toLocaleString()}
        </DefinitionItem>
      ))}
    </dl>
  )
}

