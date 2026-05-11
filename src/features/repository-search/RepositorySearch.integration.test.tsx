import { render, screen } from "@testing-library/react"
import { http, HttpResponse } from "msw"
import { afterEach, describe, expect, it, vi } from "vitest"

import {
  DEFAULT_SEARCH_PER_PAGE,
  DEFAULT_SEARCH_SORT,
  REPOSITORY_SEARCH_MESSAGES,
  SEARCH_ORDER,
} from "@/lib/constants/search"
import { GITHUB_API_BASE_URL } from "@/lib/github/constants"
import { server } from "@/test/server"

import { RepositorySearch } from "./RepositorySearch"

const mockGitHubSearchResponse = {
  total_count: 1,
  incomplete_results: false,
  items: [
    {
      id: 1,
      node_id: "node-1",
      name: "react",
      full_name: "facebook/react",
      private: false,
      owner: {
        login: "facebook",
        id: 2,
        node_id: "owner-node-1",
        avatar_url: "https://example.com/avatar.png",
        html_url: "https://github.com/facebook",
        type: "Organization",
      },
      html_url: "https://github.com/facebook/react",
      description: "The library for web and native user interfaces.",
      language: "JavaScript",
      stargazers_count: 230000,
      watchers_count: 230000,
      forks_count: 47000,
      open_issues_count: 1200,
      created_at: "2013-05-24T16:15:54Z",
      updated_at: "2026-05-10T00:00:00Z",
      pushed_at: "2026-05-10T00:00:00Z",
      homepage: "https://react.dev",
    },
  ],
}

const mocks = vi.hoisted(() => ({
  replace: vi.fn(),
}))

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: mocks.replace,
    push: vi.fn(),
    prefetch: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => "/",
}))

afterEach(() => {
  mocks.replace.mockClear()
})

const createSearchParams = (q: string) => ({
  q,
  page: "1",
  perPage: String(DEFAULT_SEARCH_PER_PAGE),
  sort: DEFAULT_SEARCH_SORT,
  order: SEARCH_ORDER.DESC,
})

describe("RepositorySearch integration", () => {
  it("検索キーワードが2文字未満の場合、検索結果を表示しない", async () => {
    const ui = await RepositorySearch({
      searchParams: createSearchParams("r"),
    })

    render(ui)

    expect(
      screen.getByText(/2文字以上入力してリポジトリを検索してください/),
    ).toBeInTheDocument()

    expect(screen.queryByText("facebook/react")).not.toBeInTheDocument()
  })

  it("検索結果を表示する", async () => {
    server.use(
      http.get(`${GITHUB_API_BASE_URL}/search/repositories`, () => {
        return HttpResponse.json(mockGitHubSearchResponse)
      }),
    )

    const ui = await RepositorySearch({
      searchParams: createSearchParams("react"),
    })

    render(ui)

    expect(await screen.findByText("facebook/react")).toBeInTheDocument()
    expect(
      screen.getByText("The library for web and native user interfaces."),
    ).toBeInTheDocument()
  })

  it("リポジトリカードの詳細ページリンクが正しい", async () => {
    server.use(
      http.get(`${GITHUB_API_BASE_URL}/search/repositories`, () => {
        return HttpResponse.json(mockGitHubSearchResponse)
      }),
    )

    const ui = await RepositorySearch({
      searchParams: createSearchParams("react"),
    })

    render(ui)

    const link = await screen.findByRole("link", {
      name: /facebook\/react/,
    })

    expect(link).toHaveAttribute("href", "/repositories/facebook/react")
  })

  it("検索結果がある場合、総件数を表示する", async () => {
    server.use(
      http.get(`${GITHUB_API_BASE_URL}/search/repositories`, () => {
        return HttpResponse.json({
          ...mockGitHubSearchResponse,
          total_count: 12345,
        })
      }),
    )

    const ui = await RepositorySearch({
      searchParams: createSearchParams("react"),
    })

    render(ui)

    expect(
      await screen.findByText(REPOSITORY_SEARCH_MESSAGES.TOTAL_COUNT(12345)),
    ).toBeInTheDocument()
  })

  it("検索結果が0件の場合、0件メッセージを表示し、総件数は表示しない", async () => {
    server.use(
      http.get(`${GITHUB_API_BASE_URL}/search/repositories`, () => {
        return HttpResponse.json({
          total_count: 0,
          incomplete_results: false,
          items: [],
        })
      }),
    )

    const ui = await RepositorySearch({
      searchParams: createSearchParams("zzzzzz-not-found"),
    })

    render(ui)

    expect(
      await screen.findByText(REPOSITORY_SEARCH_MESSAGES.NO_RESULTS),
    ).toBeInTheDocument()

    expect(screen.queryByText(/検索結果 .* 件/)).not.toBeInTheDocument()
  })

  it("検索結果が0件の場合、0件メッセージを表示する", async () => {
    server.use(
      http.get(`${GITHUB_API_BASE_URL}/search/repositories`, () => {
        return HttpResponse.json({
          total_count: 0,
          incomplete_results: false,
          items: [],
        })
      }),
    )

    const ui = await RepositorySearch({
      searchParams: createSearchParams("zzzzzz-not-found"),
    })

    render(ui)

    expect(
      await screen.findByText(/該当するリポジトリが見つかりませんでした/),
    ).toBeInTheDocument()
  })

  it("APIエラー時にエラーメッセージを表示する", async () => {
    server.use(
      http.get(`${GITHUB_API_BASE_URL}/search/repositories`, () => {
        return HttpResponse.json(
          { message: "GitHub API error" },
          { status: 500 },
        )
      }),
    )

    const ui = await RepositorySearch({
      searchParams: createSearchParams("react"),
    })

    render(ui)

    expect(
      screen.getByText("リポジトリの取得に失敗しました。"),
    ).toBeInTheDocument()
  })
})

