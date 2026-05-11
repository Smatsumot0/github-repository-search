import { fetchRepositories } from "@/lib/github/fetchRepositories"

import { RepositorySearchClient } from "./RepositorySearchClient"

type RepositorySearchProps = {
  query: string
  page: number
  perPage: number
}

export async function RepositorySearch({
  query,
  page,
  perPage,
}: RepositorySearchProps) {
  const result = await fetchRepositories({ query, page, perPage })
  const cappedTotal = Math.min(result.totalCount, 1000)
  const totalPages = Math.ceil(cappedTotal / perPage)

  return (
    <RepositorySearchClient
      query={query}
      page={page}
      perPage={perPage}
      totalPages={totalPages}
      repositories={result.items}
    />
  )
}

