import Image from "next/image"

import { Repository } from "@/lib/github/types"

import styles from "./RepositoryHeader.module.css"

type RepositoryHeaderProps = {
  owner: Repository["owner"]
  name: Repository["name"]
  fullName: Repository["fullName"]
}

export function RepositoryHeader({
  owner,
  name,
  fullName,
}: RepositoryHeaderProps) {
  return (
    <header className={styles.header}>
      <Image
        src={owner.avatarUrl}
        alt={`${owner.login} avatar`}
        width={80}
        height={80}
        className={styles.avatar}
      />

      <div>
        <p className={styles.owner}>{owner.login}</p>
        <h1 className={styles.title}>{name}</h1>
        <p className={styles.fullName}>{fullName}</p>
      </div>
    </header>
  )
}

