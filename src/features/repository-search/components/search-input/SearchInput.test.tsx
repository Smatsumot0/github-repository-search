import { fireEvent, render, screen } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { SearchInput } from "./SearchInput"

const replaceMock = vi.fn()
const startTransitionMock = vi.fn((callback: () => void) => callback())

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: replaceMock,
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}))

describe("SearchInput()", () => {
  beforeEach(() => {
    vi.useFakeTimers()
    replaceMock.mockClear()
    startTransitionMock.mockClear()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("入力値を表示する", () => {
    render(<SearchInput startTransition={startTransitionMock} />)

    const input = screen.getByRole("searchbox")

    fireEvent.change(input, {
      target: { value: "react" },
    })

    expect(input).toHaveValue("react")
  })

  it("入力後、debounce後に検索クエリをURLに反映する", () => {
    render(<SearchInput startTransition={startTransitionMock} />)

    const input = screen.getByRole("searchbox")

    fireEvent.change(input, {
      target: { value: "react" },
    })

    vi.advanceTimersByTime(500)

    expect(startTransitionMock).toHaveBeenCalled()
    expect(replaceMock).toHaveBeenCalledWith("?q=react", {
      scroll: false,
    })
  })

  it("2文字未満の場合は検索クエリを削除する", () => {
    render(<SearchInput startTransition={startTransitionMock} />)

    const input = screen.getByRole("searchbox")

    fireEvent.change(input, {
      target: { value: "r" },
    })

    vi.advanceTimersByTime(500)

    expect(replaceMock).toHaveBeenCalledWith("/")
  })
})

