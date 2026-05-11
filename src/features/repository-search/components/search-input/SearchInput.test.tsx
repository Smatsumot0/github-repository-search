import { fireEvent, render, screen } from "@testing-library/react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { SearchInput } from "./SearchInput"

const startTransitionMock = vi.fn((callback: () => void) => callback())
vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
  usePathname: vi.fn(),
  useSearchParams: vi.fn(),
}))

const replaceMock = vi.fn()

describe("SearchInput()", () => {
  beforeEach(() => {
    vi.useFakeTimers()
    replaceMock.mockClear()
    startTransitionMock.mockClear()

    vi.mocked(useRouter).mockReturnValue({
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
      push: vi.fn(),
      replace: replaceMock,
      prefetch: vi.fn(),
    })

    vi.mocked(usePathname).mockReturnValue("/")

    const searchParams = new URLSearchParams()
    vi.mocked(useSearchParams).mockReturnValue({
      get: searchParams.get.bind(searchParams),
      getAll: searchParams.getAll.bind(searchParams),
      has: searchParams.has.bind(searchParams),
      keys: searchParams.keys.bind(searchParams),
      values: searchParams.values.bind(searchParams),
      entries: searchParams.entries.bind(searchParams),
      forEach: searchParams.forEach.bind(searchParams),
      toString: searchParams.toString.bind(searchParams),
      [Symbol.iterator]: searchParams[Symbol.iterator].bind(searchParams),
    } as ReturnType<typeof useSearchParams>)
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
    expect(replaceMock).toHaveBeenCalledWith("/?q=react&page=1", {
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

    expect(replaceMock).toHaveBeenCalledWith("/?page=1", { scroll: false })
  })
})

