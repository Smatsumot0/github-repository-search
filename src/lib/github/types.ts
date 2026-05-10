/**
 * API Response
 */
export type GitHubRepository = {
  id: number
  node_id: string
  name: string
  full_name: string
  private: boolean
  owner: {
    login: string
    id: number
    node_id: string
    avatar_url: string
    html_url: string
    type: string
  }
  html_url: string
  description: string | null
  fork: boolean
  url: string
  created_at: string
  updated_at: string
  pushed_at: string | null
  homepage: string | null
  size: number
  stargazers_count: number
  watchers_count: number
  language: string | null
  forks_count: number
  open_issues_count: number
  default_branch: string
  score?: number
}

/**
 * Application Data Model
 */
export type Repository = {
  id: number
  name: string
  fullName: string
  description: string | null
  htmlUrl: string
  language: string | null
  stargazersCount: number
  watchersCount: number
  forksCount: number
  openIssuesCount: number
  createdAt: string
  updatedAt: string
  pushedAt: string | null
  owner: {
    login: string
    avatarUrl: string
    htmlUrl: string
  }
  homepage: string | null
  defaultBranch: string
}

/**
 * API Response for Search Repositories Endpoint
 */
export type SearchRepositoriesResponse = {
  total_count: number
  incomplete_results: boolean
  items: GitHubRepository[]
}

