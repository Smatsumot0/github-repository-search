import type { Repository } from "@/lib/github/types"

export const createRepositoryMock = (
  override: Partial<Repository> = {},
): Repository => ({
  id: 123,
  name: "test-repo",
  fullName: "owner/test-repo",
  description: "A test repository",
  htmlUrl: "https://github.com/owner/test-repo",
  language: "TypeScript",
  stargazersCount: 50,
  watchersCount: 50,
  forksCount: 10,
  openIssuesCount: 5,
  createdAt: "2023-01-01T00:00:00Z",
  updatedAt: "2023-01-02T00:00:00Z",
  pushedAt: "2023-01-03T00:00:00Z",
  owner: {
    login: "owner",
    avatarUrl: "https://example.com/avatar.jpg",
    htmlUrl: "https://github.com/owner",
  },
  homepage: "https://example.com",
  defaultBranch: "main",
  ...override,
})
