import { Anchor } from "@/components"
import styles from "./RepositoryLinks.module.css"

type RepositoryLinksProps = {
  htmlUrl: string
  homepage: string | null
}

export function RepositoryLinks({ htmlUrl, homepage }: RepositoryLinksProps) {
  return (
    <div className={styles.links}>
      <Anchor
        href={htmlUrl}
        appearance="outlined"
        target="_blank"
        rel="noreferrer">
        GitHubで見る
      </Anchor>

      {homepage && (
        <Anchor
          href={homepage}
          appearance="outlined"
          target="_blank"
          rel="noreferrer">
          Homepage
        </Anchor>
      )}
    </div>
  )
}

