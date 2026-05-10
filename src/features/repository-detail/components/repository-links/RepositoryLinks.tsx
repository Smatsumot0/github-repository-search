import styles from "./RepositoryLinks.module.css"

type RepositoryLinksProps = {
  htmlUrl: string
  homepage: string | null
}

export function RepositoryLinks({ htmlUrl, homepage }: RepositoryLinksProps) {
  return (
    <div className={styles.links}>
      <a href={htmlUrl} target="_blank" rel="noreferrer">
        GitHubで見る
      </a>

      {homepage && (
        <a href={homepage} target="_blank" rel="noreferrer">
          Homepage
        </a>
      )}
    </div>
  )
}

