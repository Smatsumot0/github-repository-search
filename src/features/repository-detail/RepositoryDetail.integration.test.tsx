import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { createRepositoryMock } from "@/test/mocks/repository"

import { RepositoryDetail } from "./RepositoryDetail"

describe("RepositoryDetail integration", () => {
  it("リポジトリの基本情報を表示する", () => {
    render(<RepositoryDetail repository={createRepositoryMock()} />)

    expect(
      screen.getByRole("heading", { name: "test-repo" }),
    ).toBeInTheDocument()

    expect(screen.getByText("owner/test-repo")).toBeInTheDocument()
    expect(screen.getByText("A test repository")).toBeInTheDocument()
    expect(screen.getByText("TypeScript")).toBeInTheDocument()
  })

  it("リポジトリの統計情報を表示する", () => {
    render(<RepositoryDetail repository={createRepositoryMock()} />)

    expect(screen.getByText(/Stars/i)).toBeInTheDocument()
    expect(screen.getByText(/Forks/i)).toBeInTheDocument()
    expect(screen.getByText(/Issues/i)).toBeInTheDocument()
  })

  it("GitHubリンクとホームページリンクを表示する", () => {
    render(<RepositoryDetail repository={createRepositoryMock()} />)

    expect(screen.getByRole("link", { name: /GitHub/ })).toHaveAttribute(
      "href",
      "https://github.com/owner/test-repo",
    )

    expect(screen.getByRole("link", { name: "Homepage" })).toHaveAttribute(
      "href",
      "https://example.com",
    )
  })

  it("homepageがnullの場合、ホームページリンクを表示しない", () => {
    render(
      <RepositoryDetail
        repository={{
          ...createRepositoryMock({
            homepage: null,
          }),
        }}
      />,
    )

    expect(
      screen.queryByRole("link", { name: "Website" }),
    ).not.toBeInTheDocument()
  })

  it("descriptionがnullの場合、説明を表示しない", () => {
    render(
      <RepositoryDetail
        repository={{
          ...createRepositoryMock({
            description: null,
          }),
        }}
      />,
    )

    expect(
      screen.queryByText("The library for web and native user interfaces."),
    ).not.toBeInTheDocument()
  })
})

