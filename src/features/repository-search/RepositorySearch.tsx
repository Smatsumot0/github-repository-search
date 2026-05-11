import {
  DEFAULT_SEARCH_PER_PAGE,
  DEFAULT_SEARCH_SORT,
  SEARCH_ORDER,
  SEARCH_PER_PAGE_OPTIONS,
  SEARCH_SORT_OPTIONS,
} from "@/lib/constants/search"
import { fetchRepositories } from "@/lib/github/fetchRepositories"

import { RepositorySearchClient } from "./RepositorySearchClient"
import {
  parseExcludeForks,
  parseLanguage,
  parseMinStars,
  parsePage,
  parsePushedPeriod,
} from "./utils/validator"

type RepositorySearchParams = {
  q?: string
  page?: string
  perPage?: string
  sort?: string
  order?: string
  language?: string
  minStars?: string
  excludeForks?: string
  pushed?: string
}

type RepositorySearchProps = {
  searchParams: RepositorySearchParams
}

export async function RepositorySearch({
  searchParams,
}: RepositorySearchProps) {
  const query = searchParams.q ?? ""
  const page = parsePage(searchParams.page)

  const requestedPerPage = Number(searchParams.perPage)
  const perPage = SEARCH_PER_PAGE_OPTIONS.includes(
    requestedPerPage as (typeof SEARCH_PER_PAGE_OPTIONS)[number],
  )
    ? requestedPerPage
    : DEFAULT_SEARCH_PER_PAGE

  const order =
    searchParams.order === SEARCH_ORDER.ASC
      ? SEARCH_ORDER.ASC
      : SEARCH_ORDER.DESC

  const sort = SEARCH_SORT_OPTIONS.includes(
    searchParams.sort as (typeof SEARCH_SORT_OPTIONS)[number],
  )
    ? (searchParams.sort as (typeof SEARCH_SORT_OPTIONS)[number])
    : DEFAULT_SEARCH_SORT

  const language = parseLanguage(searchParams.language)
  const minStars = parseMinStars(searchParams.minStars)
  const excludeForks = parseExcludeForks(searchParams.excludeForks)
  const pushed = parsePushedPeriod(searchParams.pushed)

  const result = await fetchRepositories({
    query,
    page,
    perPage,
    sort,
    order,
    language,
    minStars,
    excludeForks,
    pushed,
  })

  const repositories = result.success ? result.data.items : []
  const totalCount = result.success ? result.data.totalCount : 0
  const cappedTotal = Math.min(totalCount, 1000)
  const totalPages = Math.ceil(cappedTotal / perPage)

  return (
    <RepositorySearchClient
      query={query}
      page={page}
      totalPages={totalPages}
      searchOptions={{ perPage, sort, order }}
      filterOptions={{
        language,
        minStars,
        excludeForks,
        pushed,
      }}
      repositories={repositories}
      errorMessage={result.success ? undefined : result.message}
    />
  )
}

