"use client"

import clsx from "clsx"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState, useTransition } from "react"

import { Loading, Section } from "@/components"
import { Repository } from "@/lib/github/types"

import { DisclosureButton } from "./components/disclosure-button/DisclosureButton"
import {
  FilterOptions,
  FilterToolbar,
} from "./components/filter-toolbar/FilterToolbar"
import { Pagination } from "./components/pagination/Pagination"
import { SearchInput } from "./components/search-input/SearchInput"
import { SearchResults } from "./components/search-results/SearchResults"
import {
  SearchOptions,
  SearchToolbar,
} from "./components/search-toolbar/SearchToolbar"
import styles from "./RepositorySearch.module.css"

type RepositorySearchClientProps = {
  query: string
  page: number
  totalPages: number
  totalCount: number
  searchOptions: SearchOptions
  filterOptions: FilterOptions
  repositories: Repository[]
  errorMessage?: string
}

export function RepositorySearchClient({
  query,
  page,
  totalPages,
  totalCount,
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

  const currentQueryString = searchParams.toString()
  const returnTo = currentQueryString
    ? `${pathname}?${currentQueryString}`
    : pathname

  const updateSearchParam = (param: string, nextValue: string) => {
    const params = new URLSearchParams(searchParams)

    if (nextValue) {
      params.set(param, nextValue)
    } else {
      params.delete(param)
    }

    params.set("page", "1")

    router.replace(`${pathname}?${params.toString()}`)
  }

  const isOpenSearchPanel = openPanel === "search"
  const isOpenFilterPanel = openPanel === "filter"

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

          <div className={styles.mobileToggleButtons}>
            <DisclosureButton
              className={styles.toggleButton}
              onClick={() => togglePanel("search")}
              expanded={isOpenSearchPanel}
              aria-controls="search-toolbar-content">
              検索オプション
            </DisclosureButton>

            <DisclosureButton
              className={styles.toggleButton}
              onClick={() => togglePanel("filter")}
              expanded={isOpenFilterPanel}
              aria-controls="filter-toolbar-content">
              フィルターオプション
            </DisclosureButton>
          </div>

          <div
            id="search-toolbar-content"
            className={styles.actionsContent}
            data-open={isOpenSearchPanel}>
            <SearchToolbar
              searchOptions={searchOptions}
              disabled={isPending}
              onChange={updateSearchParam}
              startTransition={startTransition}
            />
          </div>

          <div
            id="filter-toolbar-content"
            className={clsx(styles.actionsContent, styles.filterToolbarContent)}
            data-open={isOpenFilterPanel}>
            <FilterToolbar
              filterOptions={filterOptions}
              disabled={isPending}
              onChange={updateSearchParam}
              startTransition={startTransition}
            />
          </div>
        </div>
      </div>

      <div className={styles.resultsArea} aria-busy={isPending}>
        <Loading isLoading={isPending} />

        <SearchResults
          repositories={repositories}
          totalCount={totalCount}
          query={query}
          errorMessage={errorMessage}
          returnTo={returnTo}
        />
      </div>
    </Section>
  )
}

