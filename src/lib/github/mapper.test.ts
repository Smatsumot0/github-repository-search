import { describe, expect, it } from "vitest"

import { createGitHubRepositoryMock } from "@/test/mocks/github"

import { mapRepository } from "./mapper"

describe("mapRepository()", () => {
  it("GitHubRepositoryをRepositoryに正しくマッピングする", () => {
    const repository = createGitHubRepositoryMock()

    expect(mapRepository(repository)).toEqual({
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
    })
  })

  it("null値を正しくマッピングする", () => {
    const repository = createGitHubRepositoryMock({
      description: null,
      language: null,
      pushed_at: null,
      homepage: null,
    })

    const result = mapRepository(repository)

    expect(result.description).toBeNull()
    expect(result.language).toBeNull()
    expect(result.pushedAt).toBeNull()
    expect(result.homepage).toBeNull()
  })
})

