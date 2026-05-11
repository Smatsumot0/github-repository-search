import { DefinitionItem } from "@/features/repository-detail/components/definition-item/DefinitionItem"

import styles from "./RepositoryMeta.module.css"

type RepositoryMetaProps = {
  defaultBranch: string
  createdAt: string
  updatedAt: string
  pushedAt: string | null
}

export function RepositoryMeta({
  defaultBranch,
  createdAt,
  updatedAt,
  pushedAt,
}: RepositoryMetaProps) {
  return (
    <dl className={styles.meta}>
      <DefinitionItem term="Default branch">{defaultBranch}</DefinitionItem>
      <DefinitionItem term="Created">
        <time dateTime={createdAt}>
          {new Date(createdAt).toLocaleDateString("ja-JP")}
        </time>
      </DefinitionItem>
      <DefinitionItem term="Updated">
        <time dateTime={updatedAt}>
          {new Date(updatedAt).toLocaleDateString("ja-JP")}
        </time>
      </DefinitionItem>
      {pushedAt && (
        <DefinitionItem term="Last push">
          <time dateTime={pushedAt}>
            {new Date(pushedAt).toLocaleDateString("ja-JP")}
          </time>
        </DefinitionItem>
      )}
    </dl>
  )
}

