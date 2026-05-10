import { fetchRepositories } from "@/lib/github/fetchRepositories"
import { SEARCH_PER_PAGE } from "@/lib/github/constants"
import { RepositorySearchClient } from "./RepositorySearchClient"

type RepositorySearchProps = {
  query: string
  page: number
}

export async function RepositorySearch({ query, page }: RepositorySearchProps) {
  const result = await fetchRepositories({ query, page })
  const cappedTotal = Math.min(result.totalCount, 1000)
  const totalPages = Math.ceil(cappedTotal / SEARCH_PER_PAGE)

  return (
    <RepositorySearchClient
      query={query}
      page={page}
      totalPages={totalPages}
      repositories={result.items}
    />
  )
}

