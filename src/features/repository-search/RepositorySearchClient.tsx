"use client"

import { useTransition } from "react"

import { Loading, Section } from "@/components"
import { Repository } from "@/lib/github/types"

import { Pagination } from "./components/pagination/Pagination"
import { SearchInput } from "./components/search-input/SearchInput"
import { SearchResults } from "./components/search-results/SearchResults"
import { SearchToolbar } from "./components/search-toolbar/SearchToolbar"
import styles from "./RepositorySearch.module.css"

type RepositorySearchClientProps = {
  query: string
  page: number
  perPage: number
  totalPages: number
  repositories: Repository[]
}

export function RepositorySearchClient({
  query,
  page,
  perPage,
  totalPages,
  repositories,
}: RepositorySearchClientProps) {
  const [isPending, startTransition] = useTransition()

  return (
    <Section aria-label="GitHubリポジトリの検索">
      <div className={styles.controls}>
        <SearchInput defaultValue={query} startTransition={startTransition} />

        <div className={styles.searchActions}>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            disabled={isPending}
            startTransition={startTransition}
          />
          <SearchToolbar perPage={perPage} disabled={isPending} />
        </div>
      </div>

      <div className={styles.resultsArea} aria-busy={isPending}>
        <Loading isLoading={isPending} />

        <SearchResults repositories={repositories} query={query} />
      </div>
    </Section>
  )
}

