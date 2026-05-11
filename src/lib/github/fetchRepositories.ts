import { MIN_SEARCH_QUERY_LENGTH } from "@/lib/constants/search"
import { GITHUB_API_BASE_URL } from "@/lib/github/constants"
import { mapRepository } from "@/lib/github/mapper"

import { Repository, SearchRepositoriesResponse } from "./types"

type FetchRepositoriesParams = {
  query: string
  page: number
  perPage?: number
}

export async function fetchRepositories({
  query,
  page,
  perPage,
}: FetchRepositoriesParams): Promise<{
  items: Repository[]
  totalCount: number
}> {
  const searchQuery = query.trim()

  if (searchQuery.length < MIN_SEARCH_QUERY_LENGTH) {
    return {
      items: [],
      totalCount: 0,
    }
  }

  const params = new URLSearchParams({
    q: searchQuery,
    per_page: String(perPage),
    page: String(page),
  })

  const response = await fetch(
    `${GITHUB_API_BASE_URL}/search/repositories?${params.toString()}`,
    {
      headers: {
        Accept: "application/vnd.github+json",
      },
      cache: "no-store",
    },
  )

  if (!response.ok) {
    throw new Error("Failed to fetch repositories")
  }

  const data = (await response.json()) as SearchRepositoriesResponse

  return {
    items: data.items.map(mapRepository),
    totalCount: data.total_count,
  }
}

