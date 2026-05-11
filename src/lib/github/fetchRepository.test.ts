import { http, HttpResponse } from "msw"
import { setupServer } from "msw/node"
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest"

import { createGitHubRepositoryMock } from "@/test/mocks/github"

import { GITHUB_API_BASE_URL } from "./constants"
import { fetchRepository } from "./fetchRepository"

const server = setupServer()

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe("fetchRepository()", () => {
  it("正常なレスポンスの場合、Repositoryを返す", async () => {
    const repository = createGitHubRepositoryMock()

    server.use(
      http.get(`${GITHUB_API_BASE_URL}/repos/owner/test-repo`, () => {
        return HttpResponse.json(repository)
      }),
    )

    const result = await fetchRepository({ owner: "owner", repo: "test-repo" })

    expect(result).toEqual({
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

  it("404の場合、nullを返す", async () => {
    server.use(
      http.get(`${GITHUB_API_BASE_URL}/repos/owner/nonexistent-repo`, () => {
        return new HttpResponse(null, { status: 404 })
      }),
    )

    const result = await fetchRepository({
      owner: "owner",
      repo: "nonexistent-repo",
    })

    expect(result).toBeNull()
  })

  it("404以外のエラーの場合、例外を投げる", async () => {
    server.use(
      http.get(`${GITHUB_API_BASE_URL}/repos/owner/error-repo`, () => {
        return new HttpResponse(null, { status: 500 })
      }),
    )

    await expect(
      fetchRepository({ owner: "owner", repo: "error-repo" }),
    ).rejects.toThrow("リポジトリ詳細の取得に失敗しました")
  })
})

