"use client"

import { useState, useTransition } from "react"

import { Button, Loading, Section } from "@/components"
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
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Section aria-label="GitHubリポジトリの検索">
      <div className={styles.controls}>
        <SearchInput defaultValue={query} startTransition={startTransition} />

        <div className={styles.searchActions}>
          <div className={styles.actionsContent}>
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              disabled={isPending}
              startTransition={startTransition}
            />
          </div>

          <Button
            className={styles.toggleButton}
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            aria-controls="search-actions-content">
            検索オプション
          </Button>

          <div
            id="search-actions-content"
            className={styles.actionsContent}
            data-open={isOpen}>
            <SearchToolbar
              perPage={perPage}
              sort={sort}
              order={order}
              disabled={isPending}
              startTransition={startTransition}
            />
          </div>
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

