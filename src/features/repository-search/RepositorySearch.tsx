import { SearchOrder, SearchSort } from "@/lib/constants/search"
import { fetchRepositories } from "@/lib/github/fetchRepositories"

import { RepositorySearchClient } from "./RepositorySearchClient"

type RepositorySearchProps = {
  query: string
  page: number
  perPage: number
  order: SearchOrder
  sort: SearchSort
}

export async function RepositorySearch({
  query,
  page,
  perPage,
  sort,
  order,
}: RepositorySearchProps) {
  const result = await fetchRepositories({ query, page, perPage, sort, order })

  if (!result.success) {
    return (
      <RepositorySearchClient
        query={query}
        page={page}
        perPage={perPage}
        totalPages={0}
        sort={sort}
        order={order}
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
      repositories={result.data.items}
    />
  )
}

