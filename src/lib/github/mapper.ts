import { GitHubRepository, Repository } from "@/lib/github/types"

export function mapRepository(repository: GitHubRepository): Repository {
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
    homepage: repository.homepage,
    defaultBranch: repository.default_branch,
  }
}

