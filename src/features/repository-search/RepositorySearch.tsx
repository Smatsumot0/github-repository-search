import { SearchOrder, SearchSort } from "@/lib/constants/search"
import { fetchRepositories } from "@/lib/github/fetchRepositories"

import { RepositorySearchClient } from "./RepositorySearchClient"

type RepositorySearchProps = {
  query: string
  page: number
  perPage: number
  order: SearchOrder
  sort: SearchSort
  language: string
}

export async function RepositorySearch({
  query,
  page,
  perPage,
  sort,
  order,
  language,
}: RepositorySearchProps) {
  const result = await fetchRepositories({
    query,
    page,
    perPage,
    sort,
    order,
    language,
  })

  if (!result.success) {
    return (
      <RepositorySearchClient
        query={query}
        page={page}
        perPage={perPage}
        totalPages={0}
        sort={sort}
        order={order}
        language={language}
        repositories={[]}
        errorMessage={result.message}
      />
    )
  }

  const cappedTotal = Math.min(result.data.totalCount, 1000)
  const totalPages = Math.ceil(cappedTotal / perPage)

  return (
    <RepositorySearchClient
      query={query}
      page={page}
      perPage={perPage}
      totalPages={totalPages}
      sort={sort}
      order={order}
      language={language}
      repositories={result.data.items}
    />
  )
}

