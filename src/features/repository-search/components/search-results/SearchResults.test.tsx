import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import {
  MIN_SEARCH_QUERY_LENGTH,
  REPOSITORY_SEARCH_MESSAGES,
} from "@/lib/constants/search"
import { Repository } from "@/lib/github/types"
import { createRepositoryMock } from "@/test/mocks/repository"

import { SearchResults } from "./SearchResults"

vi.mock("../repository-card/RepositoryCard", () => ({
  RepositoryCard: ({ repository }: { repository: Repository }) => (
    <div>{repository.fullName}</div>
  ),
}))

const repositories = [
  createRepositoryMock(),
  createRepositoryMock({
    id: 2,
    name: "next.js",
    fullName: "vercel/next.js",
  }),
]

describe("SearchResults", () => {
  it("errorMessageがある場合、エラーメッセージを表示する", () => {
    render(
      <SearchResults
        repositories={repositories}
        query="react"
        errorMessage="エラーが発生しました"
        totalCount={12345}
      />,
    )

    expect(screen.getByText("エラーが発生しました")).toBeInTheDocument()
    expect(
      screen.queryByRole("list", { name: "検索結果" }),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByText(REPOSITORY_SEARCH_MESSAGES.TOTAL_COUNT(12345)),
    ).not.toBeInTheDocument()
  })

  it("queryが未指定の場合、検索前メッセージを表示する", () => {
    render(<SearchResults repositories={[]} />)

    expect(
      screen.getByText(REPOSITORY_SEARCH_MESSAGES.SEARCH_PROMPT),
    ).toBeInTheDocument()
  })

  it("queryが最小文字数未満の場合、検索前メッセージを表示する", () => {
    render(
      <SearchResults
        repositories={[]}
        query={"a".repeat(MIN_SEARCH_QUERY_LENGTH - 1)}
      />,
    )

    expect(
      screen.getByText(REPOSITORY_SEARCH_MESSAGES.SEARCH_PROMPT),
    ).toBeInTheDocument()
  })

  it("検索結果が0件の場合、該当なしメッセージを表示する", () => {
    render(
      <SearchResults
        repositories={[]}
        query={"a".repeat(MIN_SEARCH_QUERY_LENGTH)}
      />,
    )

    expect(
      screen.getByText(REPOSITORY_SEARCH_MESSAGES.NO_RESULTS),
    ).toBeInTheDocument()
  })

  it("検索結果がある場合、検索結果リストを表示する", () => {
    render(<SearchResults repositories={repositories} query="react" />)

    expect(screen.getByRole("list", { name: "検索結果" })).toBeInTheDocument()
    expect(screen.getAllByRole("listitem")).toHaveLength(2)
    expect(screen.getByText("owner/test-repo")).toBeInTheDocument()
    expect(screen.getByText("vercel/next.js")).toBeInTheDocument()
  })

  it("検索結果がある場合、総件数を表示する", () => {
    render(
      <SearchResults
        repositories={repositories}
        query="react"
        totalCount={12345}
      />,
    )

    expect(
      screen.getByText(REPOSITORY_SEARCH_MESSAGES.TOTAL_COUNT(12345)),
    ).toBeInTheDocument()
  })

  it("検索結果がある場合、メッセージは表示しない", () => {
    render(<SearchResults repositories={repositories} query="react" />)

    expect(
      screen.queryByText(REPOSITORY_SEARCH_MESSAGES.SEARCH_PROMPT),
    ).not.toBeInTheDocument()

    expect(
      screen.queryByText(REPOSITORY_SEARCH_MESSAGES.NO_RESULTS),
    ).not.toBeInTheDocument()
  })
})
