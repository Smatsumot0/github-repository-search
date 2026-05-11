"use client"

import { useTransition } from "react"
import { SearchInput } from "./components/search-input/SearchInput"
import { Pagination } from "./components/pagination/Pagination"
import { SearchResults } from "./components/search-results/SearchResults"
import styles from "./RepositorySearch.module.css"
import { Repository } from "@/lib/github/types"
import { Section, Loading } from "@/components"

type RepositorySearchClientProps = {
  query: string
  page: number
  totalPages: number
  repositories: Repository[]
}

export function RepositorySearchClient({
  query,
  page,
  totalPages,
  repositories,
}: RepositorySearchClientProps) {
  const [isPending, startTransition] = useTransition()

  return (
    <Section aria-label="GitHubリポジトリの検索">
      <div className={styles.controls}>
        <SearchInput defaultValue={query} startTransition={startTransition} />

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          disabled={isPending}
          startTransition={startTransition}
        />
      </div>

      <div className={styles.resultsArea} aria-busy={isPending}>
        <Loading isLoading={isPending} />

        <SearchResults repositories={repositories} query={query} />
      </div>
    </Section>
  )
}

