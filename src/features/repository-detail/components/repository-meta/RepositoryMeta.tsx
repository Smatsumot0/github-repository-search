import { DefinitionItem } from "@/components/definition-item/DefinitionItem"

import styles from "./RepositoryMeta.module.css"

type RepositoryMetaProps = {
  defaultBranch: string
  createdAt: string
  updatedAt: string
  pushedAt: string | null
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("ja-JP")
}

export function RepositoryMeta({
  defaultBranch,
  createdAt,
  updatedAt,
  pushedAt,
}: RepositoryMetaProps) {
  const metaItems = [
    {
      term: "Default branch",
      content: defaultBranch,
    },
    {
      term: "Created",
      content: <time dateTime={createdAt}>{formatDate(createdAt)}</time>,
    },
    {
      term: "Updated",
      content: <time dateTime={updatedAt}>{formatDate(updatedAt)}</time>,
    },
    ...(pushedAt
      ? [
          {
            term: "Last push",
            content: <time dateTime={pushedAt}>{formatDate(pushedAt)}</time>,
          },
        ]
      : []),
  ]

  return (
    <dl className={styles.meta}>
      {metaItems.map((item) => (
        <DefinitionItem key={item.term} term={item.term} emphasized>
          {item.content}
        </DefinitionItem>
      ))}
    </dl>
  )
}

