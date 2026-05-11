import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { SEARCH_SORT_LABELS, SEARCH_SORT_OPTIONS } from "@/lib/constants/search"

import { SortSelect } from "./SortSelect"

describe("SortSelect", () => {
  it("ソート項目の選択肢を表示する", () => {
    render(<SortSelect value="stars" onChange={vi.fn()} />)

    expect(
      screen.getByRole("combobox", { name: "ソート項目" }),
    ).toBeInTheDocument()

    for (const option of SEARCH_SORT_OPTIONS) {
      expect(
        screen.getByRole("option", { name: SEARCH_SORT_LABELS[option] }),
      ).toHaveValue(option)
    }
  })

  it("valueに一致するソート項目を選択状態にする", () => {
    render(<SortSelect value="updated" onChange={vi.fn()} />)

    expect(screen.getByRole("combobox", { name: "ソート項目" })).toHaveValue(
      "updated",
    )
  })

  it("選択を変更したとき、変更後のソート項目でonChangeを呼ぶ", async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(<SortSelect value="stars" onChange={onChange} />)

    await user.selectOptions(
      screen.getByRole("combobox", { name: "ソート項目" }),
      "updated",
    )

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith("updated")
  })

  it("disabledがtrueの場合、選択できない", () => {
    render(<SortSelect value="stars" onChange={vi.fn()} disabled />)

    expect(screen.getByRole("combobox", { name: "ソート項目" })).toBeDisabled()
  })
})
