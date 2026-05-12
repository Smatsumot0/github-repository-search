import {
  MIN_SEARCH_QUERY_LENGTH,
  REPOSITORY_SEARCH_MESSAGES,
} from "@/lib/constants/search"
import { Repository } from "@/lib/github/types"

import { RepositoryCard } from "../repository-card/RepositoryCard"
import styles from "./SearchResults.module.css"

type SearchResultsProps = {
  repositories: Repository[]
  totalCount?: number
  query?: string
  errorMessage?: string
  returnTo: string
}

export function SearchResults({
  repositories,
  totalCount,
  query,
  errorMessage,
  returnTo,
}: SearchResultsProps) {
  // エラーメッセージがある場合
  if (errorMessage) {
    return <p className={styles.message}>{errorMessage}</p>
  }

  // 未検索
  if (!query || query.length < MIN_SEARCH_QUERY_LENGTH) {
    return (
      <p className={styles.message}>
        {REPOSITORY_SEARCH_MESSAGES.SEARCH_PROMPT}
      </p>
    )
  }

  // 検索結果なし
  if (repositories.length === 0) {
    return (
      <p className={styles.message}>{REPOSITORY_SEARCH_MESSAGES.NO_RESULTS}</p>
    )
  }

  // 検索結果あり
  return (
    <div className={styles.root}>
      <p className={styles.totalCount}>
        {REPOSITORY_SEARCH_MESSAGES.TOTAL_COUNT(totalCount ?? 0)}
      </p>

      <ul className={styles.list} aria-label="検索結果">
        {repositories.map((repository) => (
          <li key={repository.id} className={styles.item}>
            <RepositoryCard repository={repository} returnTo={returnTo} />
          </li>
        ))}
      </ul>
    </div>
  )
}

