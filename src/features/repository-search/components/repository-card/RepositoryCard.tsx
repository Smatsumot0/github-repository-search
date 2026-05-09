import { Repository } from "@/lib/github/types"
import Link from "next/link"
import styles from "./RepositoryCard.module.css"
import { LanguageBadge } from "../language-badge/LanguageBadge"

type RepositoryCardProps = {
  repository: Repository
}

export function RepositoryCard({ repository }: RepositoryCardProps) {
  return (
    <article className={styles.card}>
      <h3 className={styles.title}>
        <Link
          href={repository.htmlUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}>
          {repository.fullName}
        </Link>
      </h3>

      {repository.description && (
        <p className={styles.description}>{repository.description}</p>
      )}

      <dl className={styles.meta}>
        <div className={styles.metaItem}>
          <dt className="visually-hidden">Stars</dt>
          <dd>★ {repository.stargazersCount}</dd>
        </div>

        {repository.language && (
          <div className={styles.metaItem}>
            <dt className="visually-hidden">Language</dt>
            <dd>
              <LanguageBadge language={repository.language} />
            </dd>
          </div>
        )}

        <div className={styles.metaItem}>
          <dt>Last updated</dt>
          <dd>
            <time dateTime={repository.updatedAt}>
              {new Date(repository.updatedAt).toLocaleDateString()}
            </time>
          </dd>
        </div>
      </dl>
    </article>
  )
}

