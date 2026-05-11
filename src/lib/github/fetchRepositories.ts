import { SearchOrder } from "@/features/repository-search/types"
import { MIN_SEARCH_QUERY_LENGTH } from "@/lib/constants/search"
import { GITHUB_API_BASE_URL } from "@/lib/github/constants"
import { mapRepository } from "@/lib/github/mapper"

import { Repository, SearchRepositoriesResponse } from "./types"

type FetchRepositoriesParams = {
  query: string
  page: number
  perPage?: number
  order?: SearchOrder
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
  order,
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

  const params = new URLSearchParams({
    q: searchQuery,
    per_page: String(perPage),
    page: String(page),
    order: order ?? "asc",
    sort: "stars",
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

  if (response.status === 403) {
    return {
      success: false,
      message:
        "GitHub APIの利用上限に達しました。しばらく時間をおいて再度お試しください。",
    }
  }

  if (!response.ok) {
    return {
      success: false,
      message: "リポジトリの取得に失敗しました。",
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

