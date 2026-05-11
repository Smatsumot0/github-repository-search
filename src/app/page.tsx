import { RepositorySearch } from "@/features/repository-search"
import { parsePage } from "@/features/repository-search/lib/parsePage"
import {
  DEFAULT_SEARCH_PER_PAGE,
  DEFAULT_SEARCH_SORT,
  SEARCH_ORDERS,
  SEARCH_PER_PAGE_OPTIONS,
} from "@/lib/constants/search"

type HomeProps = {
  searchParams: Promise<{
    q?: string
    page?: string
    perPage?: string
    order?: string
  }>
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams
  const pageNumber = parsePage(params.page)
  const requestedPerPage = Number(params.perPage)
  const perPage = SEARCH_PER_PAGE_OPTIONS.includes(
    requestedPerPage as (typeof SEARCH_PER_PAGE_OPTIONS)[number],
  )
    ? requestedPerPage
    : DEFAULT_SEARCH_PER_PAGE
  const order =
    params.order === SEARCH_ORDERS.ASC ? SEARCH_ORDERS.ASC : SEARCH_ORDERS.DESC

  return (
    <RepositorySearch
      query={params.q ?? ""}
      page={pageNumber}
      perPage={perPage}
      order={order}
    />
  )
}

