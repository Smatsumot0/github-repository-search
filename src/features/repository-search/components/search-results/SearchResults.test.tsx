import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { SearchResults } from "./SearchResults"
import { MIN_SEARCH_QUERY_LENGTH } from "@/lib/constants/search"
import { Repository } from "@/lib/github/types"
import { createRepositoryMock } from "@/test/mocks/repository"

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
  it("queryが未指定の場合、検索前メッセージを表示する", () => {
    render(<SearchResults repositories={[]} />)

    expect(
      screen.getByText("2文字以上入力してリポジトリを検索してください"),
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
      screen.getByText("2文字以上入力してリポジトリを検索してください"),
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
      screen.getByText("該当するリポジトリが見つかりませんでした"),
    ).toBeInTheDocument()
  })

  it("検索結果がある場合、検索結果リストを表示する", () => {
    render(<SearchResults repositories={repositories} query={"react"} />)

    expect(screen.getByRole("list", { name: "検索結果" })).toBeInTheDocument()
    expect(screen.getAllByRole("listitem")).toHaveLength(2)
    expect(screen.getByText("owner/test-repo")).toBeInTheDocument()
    expect(screen.getByText("vercel/next.js")).toBeInTheDocument()
  })

  it("検索結果がある場合、メッセージは表示しない", () => {
    render(<SearchResults repositories={repositories} query={"react"} />)

    expect(
      screen.queryByText("2文字以上入力してリポジトリを検索してください"),
    ).not.toBeInTheDocument()

    expect(
      screen.queryByText("該当するリポジトリが見つかりませんでした"),
    ).not.toBeInTheDocument()
  })
})

