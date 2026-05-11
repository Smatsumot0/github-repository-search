import { Repository } from "@/lib/github/types"

import { RepositoryHeader } from "./components/repository-header/RepositoryHeader"
import { RepositoryLinks } from "./components/repository-links/RepositoryLinks"
import { RepositoryMeta } from "./components/repository-meta/RepositoryMeta"
import { RepositoryStats } from "./components/repository-stats/RepositoryStats"
import { RepositorySummary } from "./components/repository-summary/RepositorySummary"
import styles from "./RepositoryDetail.module.css"

type RepositoryDetailProps = {
  repository: Repository
}

export function RepositoryDetail({ repository }: RepositoryDetailProps) {
  return (
    <article className={styles.detail}>
      <RepositoryHeader
        owner={repository.owner}
        name={repository.name}
        fullName={repository.fullName}
      />

      <div className={styles.main}>
        <RepositorySummary
          language={repository.language}
          description={repository.description}
        />

        <RepositoryLinks
          htmlUrl={repository.htmlUrl}
          homepage={repository.homepage}
        />

        <RepositoryStats
          stargazersCount={repository.stargazersCount}
          watchersCount={repository.watchersCount}
          forksCount={repository.forksCount}
          openIssuesCount={repository.openIssuesCount}
        />

        <RepositoryMeta
          defaultBranch={repository.defaultBranch}
          createdAt={repository.createdAt}
          updatedAt={repository.updatedAt}
          pushedAt={repository.pushedAt}
        />
      </div>
    </article>
  )
}

