"use client"

import { useTransition } from "react"

import { Loading, Section } from "@/components"
import { SearchOrder, SearchSort } from "@/lib/constants/search"
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
  sort: SearchSort
  order: SearchOrder
  repositories: Repository[]
  errorMessage?: string
}

export function RepositorySearchClient({
  query,
  page,
  perPage,
  totalPages,
  sort,
  order,
  repositories,
  errorMessage,
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
          <SearchToolbar
            perPage={perPage}
            sort={sort}
            order={order}
            disabled={isPending}
            startTransition={startTransition}
          />
        </div>
      </div>

      <div className={styles.resultsArea} aria-busy={isPending}>
        <Loading isLoading={isPending} />

        <SearchResults
          repositories={repositories}
          query={query}
          errorMessage={errorMessage}
        />
      </div>
    </Section>
  )
}

