import { fireEvent, render, screen } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { Pagination } from "./Pagination"

const pushMock = vi.fn()
const startTransitionMock = vi.fn((callback: () => void) => callback())

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams("q=react"),
}))

describe("Pagination()", () => {
  beforeEach(() => {
    pushMock.mockClear()
    startTransitionMock.mockClear()
  })

  it("現在のページと総ページ数を表示する", () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={10}
        startTransition={startTransitionMock}
      />,
    )

    expect(screen.getByRole("spinbutton")).toHaveValue(2)
    expect(screen.getByText("10")).toBeInTheDocument()
  })

  it("前へボタンを押すと前のページへ遷移する", () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={10}
        startTransition={startTransitionMock}
      />,
    )

    fireEvent.click(screen.getByRole("button", { name: "‹" }))

    expect(startTransitionMock).toHaveBeenCalled()
    expect(pushMock).toHaveBeenCalledWith("/?q=react&page=1")
  })

  it("次へボタンを押すと次のページへ遷移する", () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={10}
        startTransition={startTransitionMock}
      />,
    )

    fireEvent.click(screen.getByRole("button", { name: "›" }))

    expect(pushMock).toHaveBeenCalledWith("/?q=react&page=3")
  })

  it("最初へボタンを押すと1ページ目へ遷移する", () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={10}
        startTransition={startTransitionMock}
      />,
    )

    fireEvent.click(screen.getByRole("button", { name: "«" }))

    expect(pushMock).toHaveBeenCalledWith("/?q=react&page=1")
  })

  it("最後へボタンを押すと最終ページへ遷移する", () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={10}
        startTransition={startTransitionMock}
      />,
    )

    fireEvent.click(screen.getByRole("button", { name: "»" }))

    expect(pushMock).toHaveBeenCalledWith("/?q=react&page=10")
  })

  it("1ページ目では最初へ・前へボタンが無効になる", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={10}
        startTransition={startTransitionMock}
      />,
    )

    expect(screen.getByRole("button", { name: "«" })).toBeDisabled()
    expect(screen.getByRole("button", { name: "‹" })).toBeDisabled()
  })

  it("最終ページでは次へ・最後へボタンが無効になる", () => {
    render(
      <Pagination
        currentPage={10}
        totalPages={10}
        startTransition={startTransitionMock}
      />,
    )

    expect(screen.getByRole("button", { name: "›" })).toBeDisabled()
    expect(screen.getByRole("button", { name: "»" })).toBeDisabled()
  })

  it("disabledがtrueの場合、すべての操作ボタンが無効になる", () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={10}
        disabled
        startTransition={startTransitionMock}
      />,
    )

    expect(screen.getByRole("button", { name: "«" })).toBeDisabled()
    expect(screen.getByRole("button", { name: "‹" })).toBeDisabled()
    expect(screen.getByRole("button", { name: "›" })).toBeDisabled()
    expect(screen.getByRole("button", { name: "»" })).toBeDisabled()
    expect(screen.getByRole("spinbutton")).toBeDisabled()
  })
})

