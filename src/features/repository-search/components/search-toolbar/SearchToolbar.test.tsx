import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeEach, describe, expect, it, vi } from "vitest"

import {
  DEFAULT_SEARCH_PER_PAGE,
  DEFAULT_SEARCH_SORT,
  SEARCH_ORDER,
} from "@/lib/constants/search"

import { SearchToolbar } from "./SearchToolbar"

const onChange = vi.fn()

describe("SearchToolbar", () => {
  const startTransition = vi.fn((callback: () => void) => callback())

  beforeEach(() => {
    startTransition.mockClear()
    onChange.mockClear()
  })

  it("表示件数を変更するとperPageの変更を通知する", async () => {
    const user = userEvent.setup()

    render(
      <SearchToolbar
        searchOptions={{
          perPage: DEFAULT_SEARCH_PER_PAGE,
          sort: DEFAULT_SEARCH_SORT,
          order: SEARCH_ORDER.DESC,
        }}
        onChange={onChange}
        startTransition={startTransition}
      />,
    )

    await user.selectOptions(
      screen.getByRole("combobox", {
        name: "1ページあたりの表示件数",
      }),
      "50",
    )

    expect(startTransition).toHaveBeenCalled()
    expect(onChange).toHaveBeenCalledWith("perPage", "50")
  })

  it("ソート項目を変更するとsortの変更を通知する", async () => {
    const user = userEvent.setup()

    render(
      <SearchToolbar
        searchOptions={{
          perPage: DEFAULT_SEARCH_PER_PAGE,
          sort: DEFAULT_SEARCH_SORT,
          order: SEARCH_ORDER.DESC,
        }}
        onChange={onChange}
        startTransition={startTransition}
      />,
    )

    await user.selectOptions(
      screen.getByRole("combobox", {
        name: "ソート項目",
      }),
      "updated",
    )

    expect(startTransition).toHaveBeenCalled()
    expect(onChange).toHaveBeenCalledWith("sort", "updated")
  })

  it("並び順を変更するとorderを更新する", async () => {
    const user = userEvent.setup()

    render(
      <SearchToolbar
        searchOptions={{
          perPage: DEFAULT_SEARCH_PER_PAGE,
          sort: DEFAULT_SEARCH_SORT,
          order: SEARCH_ORDER.ASC,
        }}
        onChange={onChange}
        startTransition={startTransition}
      />,
    )

    await user.click(
      screen.getByRole("button", {
        name: "降順に変更する",
      }),
    )

    expect(startTransition).toHaveBeenCalled()
    expect(onChange).toHaveBeenCalledWith("order", SEARCH_ORDER.DESC)
  })

  it("disabledがtrueの場合、操作できない", () => {
    render(
      <SearchToolbar
        searchOptions={{
          perPage: DEFAULT_SEARCH_PER_PAGE,
          sort: DEFAULT_SEARCH_SORT,
          order: SEARCH_ORDER.DESC,
        }}
        disabled
        onChange={onChange}
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

