import { RepositorySearch } from "@/features/repository-search"
import { parsePage } from "@/features/repository-search/lib/parsePage"
import {
  DEFAULT_SEARCH_PER_PAGE,
  DEFAULT_SEARCH_SORT,
  SEARCH_ORDER,
  SEARCH_PER_PAGE_OPTIONS,
  SEARCH_SORT_OPTIONS,
} from "@/lib/constants/search"

type HomeProps = {
  searchParams: Promise<{
    q?: string
    page?: string
    perPage?: string
    sort?: string
    order?: string
    language?: string
  }>
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams

  const pageNumber = parsePage(params.page)

  // Search Options
  const requestedPerPage = Number(params.perPage)
  const perPage = SEARCH_PER_PAGE_OPTIONS.includes(
    requestedPerPage as (typeof SEARCH_PER_PAGE_OPTIONS)[number],
  )
    ? requestedPerPage
    : DEFAULT_SEARCH_PER_PAGE

  const order =
    params.order === SEARCH_ORDER.ASC ? SEARCH_ORDER.ASC : SEARCH_ORDER.DESC

  const sort = SEARCH_SORT_OPTIONS.includes(
    params.sort as (typeof SEARCH_SORT_OPTIONS)[number],
  )
    ? (params.sort as (typeof SEARCH_SORT_OPTIONS)[number])
    : DEFAULT_SEARCH_SORT

  // Filters
  const language = params.language

  return (
    <RepositorySearch
      query={params.q ?? ""}
      page={pageNumber}
      perPage={perPage}
      sort={sort}
      order={order}
      language={language ?? ""}
    />
  )
}

