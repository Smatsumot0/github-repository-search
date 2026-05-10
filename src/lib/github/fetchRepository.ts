import { GITHUB_API_BASE_URL } from "@/lib/github/constants"
import { mapRepository } from "@/lib/github/mapper"
import { GitHubRepository, Repository } from "@/lib/github/types"

type FetchRepositoryParams = {
  owner: string
  repo: string
}

export async function fetchRepository({
  owner,
  repo,
}: FetchRepositoryParams): Promise<Repository | null> {
  const response = await fetch(
    `${GITHUB_API_BASE_URL}/repos/${owner}/${repo}`,
    {
      next: {
        revalidate: 3600,
      },
    },
  )

  if (response.status === 404) {
    return null
  }

  if (!response.ok) {
    throw new Error("リポジトリ詳細の取得に失敗しました")
  }

  const data: GitHubRepository = await response.json()

  return mapRepository(data)
}

