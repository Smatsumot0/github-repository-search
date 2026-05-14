import { buildRepositorySearchQuery } from "@/features/repository-search/utils/buildRepositorySearchQuery"
import {
  DEFAULT_SEARCH_PER_PAGE,
  DEFAULT_SEARCH_SORT,
  MIN_SEARCH_QUERY_LENGTH,
  PushedPeriod,
  REPOSITORY_SEARCH_ERROR_MESSAGES,
  SEARCH_ORDER,
  SearchOrder,
  SearchSort,
} from "@/lib/constants/search"
import { GITHUB_API_BASE_URL } from "@/lib/github/constants"
import { mapRepository } from "@/lib/github/mapper"

import { Repository, SearchRepositoriesResponse } from "./types"

type FetchRepositoriesParams = {
  query: string
  page: number
  perPage?: number
  sort?: SearchSort
  order?: SearchOrder
  language?: string
  minStars?: number
  excludeForks?: boolean
  pushed?: PushedPeriod
}

type SearchRepositoriesResult = {
  items: Repository[]
  totalCount: number
}

type FetchRepositoriesResult =
  | {
      success: true
      data: SearchRepositoriesResult
    }
  | {
      success: false
      message: string
    }

export async function fetchRepositories({
  query,
  page,
  perPage,
  sort,
  order,
  language,
  minStars,
  excludeForks,
  pushed,
}: FetchRepositoriesParams): Promise<FetchRepositoriesResult> {
  const searchQuery = query.trim()

  if (searchQuery.length < MIN_SEARCH_QUERY_LENGTH) {
    return {
      success: true,
      data: {
        items: [],
        totalCount: 0,
      },
    }
  }

  const repositorySearchQuery = buildRepositorySearchQuery({
    query: searchQuery,
    language,
    minStars,
    excludeForks,
    pushed,
  })

  const params = new URLSearchParams({
    q: repositorySearchQuery,
    per_page: String(perPage ?? DEFAULT_SEARCH_PER_PAGE),
    page: String(page),
  })
  const requestedSort = sort ?? DEFAULT_SEARCH_SORT

  if (requestedSort !== "best-match") {
    params.set("sort", requestedSort)
    params.set("order", order ?? SEARCH_ORDER.DESC)
  }

  const response = await fetch(
    `${GITHUB_API_BASE_URL}/search/repositories?${params.toString()}`,
    {
      headers: {
        Accept: "application/vnd.github+json",
      },
      cache: "no-store",
    },
  )

  if (response.status === 403) {
    return {
      success: false,
      message: REPOSITORY_SEARCH_ERROR_MESSAGES.RATE_LIMIT,
    }
  }

  if (!response.ok) {
    console.log(response)

    return {
      success: false,
      message: REPOSITORY_SEARCH_ERROR_MESSAGES.FETCH_FAILED,
    }
  }

  const data = (await response.json()) as SearchRepositoriesResponse

  return {
    success: true,
    data: {
      items: data.items.map(mapRepository),
      totalCount: data.total_count,
    },
  }
}
