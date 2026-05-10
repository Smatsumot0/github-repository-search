import { Repository } from "@/lib/github/types"
import styles from "./RepositoryDetail.module.css"
import { RepositoryHeader } from "@/features/repository-detail/components/repository-header/RepositoryHeader"
import { RepositorySummary } from "@/features/repository-detail/components/repository-summary/RepositorySummary"
import { RepositoryStats } from "@/features/repository-detail/components/repository-stats/RepositoryStats"
import { RepositoryLinks } from "@/features/repository-detail/components/repository-links/RepositoryLinks"
import { RepositoryMeta } from "@/features/repository-detail/components/repository-meta/RepositoryMeta"

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

