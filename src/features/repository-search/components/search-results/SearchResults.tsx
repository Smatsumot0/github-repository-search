import { Repository } from "@/lib/github/types"
import styles from "./SearchResults.module.css"
import Link from "next/link"
import { MIN_SEARCH_QUERY_LENGTH } from "@/lib/constants/search"

type SearchResultsProps = {
  repositories: Repository[]
  query?: string
}

export function SearchResults({ repositories, query }: SearchResultsProps) {
  // 未検索
  if (!query || query.length < MIN_SEARCH_QUERY_LENGTH) {
    return (
      <p className={styles.message}>
        2文字以上入力してリポジトリを検索してください
      </p>
    )
  }

  // 検索結果なし
  if (repositories.length === 0) {
    return (
      <p className={styles.message}>該当するリポジトリが見つかりませんでした</p>
    )
  }

  // 検索結果あり
  return (
    <ul className={styles.list} aria-label="検索結果">
      {repositories.map((repository) => (
        <li key={repository.id} className={styles.item}>
          <Link
            className={styles.link}
            href={`/repositories/${repository.owner.login}/${repository.name}`}>
            <span className={styles.name}>{repository.fullName}</span>
            {repository.description && (
              <span className={styles.description}>
                {repository.description}
              </span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  )
}

