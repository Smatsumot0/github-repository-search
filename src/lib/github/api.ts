import { MIN_SEARCH_QUERY_LENGTH } from "@/lib/constants/search"
import {
  GitHubRepository,
  Repository,
  SearchRepositoriesResponse,
} from "./types"
import { GITHUB_API_BASE_URL, SEARCH_PER_PAGE } from "@/lib/github/constants"

type SearchRepositoriesParams = {
  query: string
  page: number
}

export async function searchRepositories({
  query,
  page,
}: SearchRepositoriesParams): Promise<{
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
    per_page: String(SEARCH_PER_PAGE),
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

function mapRepository(repository: GitHubRepository): Repository {
  return {
    id: repository.id,
    name: repository.name,
    fullName: repository.full_name,
    description: repository.description,
    htmlUrl: repository.html_url,
    language: repository.language,
    stargazersCount: repository.stargazers_count,
    watchersCount: repository.watchers_count,
    forksCount: repository.forks_count,
    openIssuesCount: repository.open_issues_count,
    createdAt: repository.created_at,
    updatedAt: repository.updated_at,
    pushedAt: repository.pushed_at,
    owner: {
      login: repository.owner.login,
      avatarUrl: repository.owner.avatar_url,
      htmlUrl: repository.owner.html_url,
    },
  }
}

