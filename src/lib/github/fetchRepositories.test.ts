import { http, HttpResponse } from "msw"
import { setupServer } from "msw/node"
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest"

import { createGitHubRepositoryMock } from "@/test/mocks/github"

import { GITHUB_API_BASE_URL } from "./constants"
import { fetchRepositories } from "./fetchRepositories"

const server = setupServer()

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe("fetchRepositories()", () => {
  it("正常なレスポンスの場合、リポジトリ一覧を返す", async () => {
    server.use(
      http.get(`${GITHUB_API_BASE_URL}/search/repositories`, () => {
        return HttpResponse.json({
          total_count: 1,
          incomplete_results: false,
          items: [createGitHubRepositoryMock()],
        })
      }),
    )

    const result = await fetchRepositories({ query: "test", page: 1 })

    expect(result).toEqual({
      totalCount: 1,
      items: [
        {
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
        },
      ],
    })
  })

  it("検索クエリをリクエストURLに含める", async () => {
    let requestUrl: URL | undefined

    server.use(
      http.get(`${GITHUB_API_BASE_URL}/search/repositories`, ({ request }) => {
        requestUrl = new URL(request.url)

        return HttpResponse.json({
          total_count: 0,
          incomplete_results: false,
          items: [],
        })
      }),
    )

    await fetchRepositories({ query: "react", page: 1 })

    expect(requestUrl?.searchParams.get("q")).toBe("react")
  })

  it("指定したperPageをper_pageクエリとして送信する", async () => {
    let requestUrl: URL | undefined

    server.use(
      http.get(`${GITHUB_API_BASE_URL}/search/repositories`, ({ request }) => {
        requestUrl = new URL(request.url)

        return HttpResponse.json({
          total_count: 0,
          incomplete_results: false,
          items: [],
        })
      }),
    )

    await fetchRepositories({ query: "test", page: 1, perPage: 10 })

    expect(requestUrl).toBeDefined()
    expect(requestUrl?.searchParams.get("per_page")).toBe("10")
  })

  // it("sort を指定した場合、リクエストURLに含める", async () => {
  //   let requestUrl: URL | undefined

  //   server.use(
  //     http.get(`${GITHUB_API_BASE_URL}/search/repositories`, ({ request }) => {
  //       requestUrl = new URL(request.url)

  //       return HttpResponse.json({
  //         total_count: 0,
  //         incomplete_results: false,
  //         items: [],
  //       })
  //     }),
  //   )

  //   await fetchRepositories({ query: "test", page: 1 })

  //   expect(requestUrl?.searchParams.get("sort")).toBe("stars")
  // })

  // it("order を指定した場合、リクエストURLに含める", async () => {
  //   let requestUrl: URL | undefined

  //   server.use(
  //     http.get(`${GITHUB_API_BASE_URL}/search/repositories`, ({ request }) => {
  //       requestUrl = new URL(request.url)

  //       return HttpResponse.json({
  //         total_count: 0,
  //         incomplete_results: false,
  //         items: [],
  //       })
  //     }),
  //   )

  //   await fetchRepositories({
  //     query: "test",
  //     page: 1,
  //   })

  //   expect(requestUrl?.searchParams.get("order")).toBe("desc")
  // })

  it("APIエラーの場合、例外を投げる", async () => {
    server.use(
      http.get(`${GITHUB_API_BASE_URL}/search/repositories`, () => {
        return new HttpResponse(null, { status: 422 })
      }),
    )

    await expect(fetchRepositories({ query: "test", page: 1 })).rejects.toThrow(
      "Failed to fetch repositories",
    )
  })
})

