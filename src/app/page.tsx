import { RepositorySearch } from "@/features/repository-search"
import { parsePage } from "@/features/repository-search/lib/parsePage"
import {
  DEFAULT_SEARCH_PER_PAGE,
  SEARCH_PER_PAGE_OPTIONS,
} from "@/lib/constants/search"

type HomeProps = {
  searchParams: Promise<{
    q?: string
    page?: string
    perPage?: string
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

  return (
    <RepositorySearch
      query={params.q ?? ""}
      page={pageNumber}
      perPage={perPage}
    />
  )
}

