import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { beforeEach, describe, expect, it, vi } from "vitest"

import { DEFAULT_SEARCH_SORT, SEARCH_ORDER } from "@/lib/constants/search"

import { SearchToolbar } from "./SearchToolbar"

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
  usePathname: vi.fn(),
  useSearchParams: vi.fn(),
}))

const replace = vi.fn()
vi.mocked(useRouter).mockReturnValue({
  back: vi.fn(),
  forward: vi.fn(),
  refresh: vi.fn(),
  push: vi.fn(),
  replace,
  prefetch: vi.fn(),
})

describe("SearchToolbar", () => {
  const startTransition = vi.fn((callback: () => void) => callback())

  beforeEach(() => {
    replace.mockClear()
    startTransition.mockClear()

    vi.mocked(useRouter).mockReturnValue({
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
      push: vi.fn(),
      replace,
      prefetch: vi.fn(),
    })

    vi.mocked(usePathname).mockReturnValue("/")

    const searchParams = new URLSearchParams(
      "q=react&page=3&perPage=20&order=desc",
    )
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

  it("表示件数を変更するとperPageを更新してpageを1に戻す", async () => {
    const user = userEvent.setup()

    render(
      <SearchToolbar
        perPage={20}
        sort={DEFAULT_SEARCH_SORT}
        order={SEARCH_ORDER.DESC}
        startTransition={startTransition}
      />,
    )

    await user.selectOptions(
      screen.getByRole("combobox", {
        name: "1ページあたりの表示件数",
      }),
      "50",
    )

    expect(replace).toHaveBeenCalledWith(
      "/?q=react&page=1&perPage=50&order=desc",
    )
  })

  it("ソート項目を変更するとsortを更新してpageを1に戻す", async () => {
    const user = userEvent.setup()

    render(
      <SearchToolbar
        perPage={20}
        order={SEARCH_ORDER.DESC}
        sort={DEFAULT_SEARCH_SORT}
        startTransition={startTransition}
      />,
    )

    await user.selectOptions(
      screen.getByRole("combobox", {
        name: "ソート項目",
      }),
      "updated",
    )

    expect(replace).toHaveBeenCalledWith(
      "/?q=react&page=1&perPage=20&order=desc&sort=updated",
    )
  })

  it("並び順を変更するとorderを更新してpageを1に戻す", async () => {
    const user = userEvent.setup()

    render(
      <SearchToolbar
        perPage={20}
        order={SEARCH_ORDER.ASC}
        sort={DEFAULT_SEARCH_SORT}
        startTransition={startTransition}
      />,
    )

    await user.click(
      screen.getByRole("button", {
        name: "昇順に変更する",
      }),
    )

    expect(replace).toHaveBeenCalledWith(
      "/?q=react&page=1&perPage=20&order=asc",
    )
  })

  it("disabledがtrueの場合、操作できない", () => {
    render(
      <SearchToolbar
        perPage={20}
        order={SEARCH_ORDER.DESC}
        sort={DEFAULT_SEARCH_SORT}
        disabled
        startTransition={startTransition}
      />,
    )

    expect(
      screen.getByRole("combobox", {
        name: "1ページあたりの表示件数",
      }),
    ).toBeDisabled()

    expect(
      screen.getByRole("button", {
        name: "昇順に変更する",
      }),
    ).toBeDisabled()
  })
})

