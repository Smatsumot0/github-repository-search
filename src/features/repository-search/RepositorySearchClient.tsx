"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState, useTransition } from "react"

import { Button, Loading, Section } from "@/components"
import { LanguageFilterValue } from "@/lib/constants/language"
import { PushedPeriod, SearchOrder, SearchSort } from "@/lib/constants/search"
import { Repository } from "@/lib/github/types"

import { FilterToolbar } from "./components/filter-toolbar/FilterToolbar"
import { Pagination } from "./components/pagination/Pagination"
import { SearchInput } from "./components/search-input/SearchInput"
import { SearchResults } from "./components/search-results/SearchResults"
import { SearchToolbar } from "./components/search-toolbar/SearchToolbar"
import styles from "./RepositorySearch.module.css"

type SearchOptions = {
  perPage: number
  sort: SearchSort
  order: SearchOrder
}

type FilterOptions = {
  language?: LanguageFilterValue
  minStars?: number
  excludeForks?: boolean
  pushed?: PushedPeriod
}

type RepositorySearchClientProps = {
  query: string
  page: number
  totalPages: number
  searchOptions: SearchOptions
  filterOptions: FilterOptions
  repositories: Repository[]
  errorMessage?: string
}

export function RepositorySearchClient({
  query,
  page,
  totalPages,
  searchOptions,
  filterOptions,
  repositories,
  errorMessage,
}: RepositorySearchClientProps) {
  const [isPending, startTransition] = useTransition()
  const [openPanel, setOpenPanel] = useState<"search" | "filter" | null>(null)

  const togglePanel = (panel: "search" | "filter") => {
    setOpenPanel((prev) => (prev === panel ? null : panel))
  }

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const updateSearchParam = (param: string, nextValue: string) => {
    const params = new URLSearchParams(searchParams)

    if (nextValue) {
      params.set(param, nextValue)
    } else {
      params.delete(param)
    }

    params.set("page", "1")

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`)
    })
  }

  return (
    <Section aria-label="GitHubリポジトリの検索">
      <div className={styles.controls}>
        <SearchInput defaultValue={query} startTransition={startTransition} />

        <div className={styles.searchActions}>
          <div>
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              disabled={isPending}
              startTransition={startTransition}
            />
          </div>

          <div className={styles.mobileToggleButtons}>
            <Button
              className={styles.toggleButton}
              onClick={() => togglePanel("search")}
              aria-expanded={openPanel === "search"}
              aria-controls="search-toolbar-content">
              検索オプション
            </Button>

            <Button
              className={styles.toggleButton}
              onClick={() => togglePanel("filter")}
              aria-expanded={openPanel === "filter"}
              aria-controls="filter-toolbar-content">
              フィルターオプション
            </Button>
          </div>

          <div
            id="search-toolbar-content"
            className={styles.actionsContent}
            data-open={openPanel === "search"}>
            <SearchToolbar
              {...searchOptions}
              disabled={isPending}
              onChange={updateSearchParam}
            />
          </div>

          <div
            id="filter-toolbar-content"
            className={styles.actionsContent}
            data-open={openPanel === "filter"}>
            <FilterToolbar
              {...filterOptions}
              disabled={isPending}
              onChange={updateSearchParam}
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

