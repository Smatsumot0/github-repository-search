/* eslint-disable @next/next/no-img-element */
import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import { createRepositoryMock } from "@/test/mocks/repository"

import { RepositoryCard } from "./RepositoryCard"

vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    className,
    width,
    height,
  }: {
    src: string
    alt: string
    className?: string
    width?: number
    height?: number
  }) => (
    <img
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
    />
  ),
}))

vi.mock("@/components", () => ({
  LanguageBadge: ({ language }: { language: string }) => (
    <span>{language}</span>
  ),
}))

describe("RepositoryCard", () => {
  it("リポジトリの基本情報を表示する", () => {
    const repository = createRepositoryMock({
      fullName: "facebook/react",
      owner: {
        login: "facebook",
        avatarUrl: "https://github.com/facebook.png",
        htmlUrl: "https://github.com/facebook",
      },
      description: "The library for web and native user interfaces.",
      language: "TypeScript",
      stargazersCount: 100,
      updatedAt: "2026-05-10T00:00:00Z",
    })

    render(<RepositoryCard repository={repository} />)

    expect(
      screen.getByRole("heading", { name: "facebook/react" }),
    ).toBeInTheDocument()
    expect(screen.getByText("facebook")).toBeInTheDocument()
    expect(
      screen.getByText("The library for web and native user interfaces."),
    ).toBeInTheDocument()
    expect(screen.getByText("★ 100")).toBeInTheDocument()
    expect(screen.getByText("TypeScript")).toBeInTheDocument()
  })

  it("詳細ページへのリンクを表示する", () => {
    const repository = createRepositoryMock({
      name: "next.js",
      fullName: "vercel/next.js",
      owner: {
        login: "vercel",
        avatarUrl: "https://github.com/vercel.png",
        htmlUrl: "https://github.com/vercel",
      },
    })

    render(<RepositoryCard repository={repository} />)

    expect(
      screen.getByRole("link", { name: "vercel/next.js" }),
    ).toHaveAttribute("href", "/repositories/vercel/next.js")
  })

  it("ownerのアイコンを表示する", () => {
    const repository = createRepositoryMock({
      owner: {
        login: "facebook",
        avatarUrl: "https://github.com/facebook.png",
        htmlUrl: "https://github.com/facebook",
      },
    })

    render(<RepositoryCard repository={repository} />)

    expect(
      screen.getByRole("img", { name: "facebookのアイコン" }),
    ).toHaveAttribute("src", "https://github.com/facebook.png")
  })

  it("descriptionがない場合、説明文を表示しない", () => {
    const repository = createRepositoryMock({
      description: null,
    })

    render(<RepositoryCard repository={repository} />)

    expect(screen.queryByText("A test repository")).not.toBeInTheDocument()
  })

  it("languageがない場合、言語を表示しない", () => {
    const repository = createRepositoryMock({
      language: null,
    })

    render(<RepositoryCard repository={repository} />)

    expect(screen.queryByText("TypeScript")).not.toBeInTheDocument()
  })

  it("更新日をtime要素で表示する", () => {
    const repository = createRepositoryMock({
      updatedAt: "2026-05-10T00:00:00Z",
    })

    render(<RepositoryCard repository={repository} />)

    expect(screen.getByText("2026/5/10")).toHaveAttribute(
      "dateTime",
      "2026-05-10T00:00:00Z",
    )
  })
})

