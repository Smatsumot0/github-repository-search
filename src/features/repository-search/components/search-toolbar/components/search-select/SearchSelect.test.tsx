import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { SearchSelect } from "./SearchSelect"

describe("SearchSelect", () => {
  it("選択肢を表示する", () => {
    render(
      <SearchSelect
        aria-label="表示件数"
        value={20}
        options={[
          { label: "20件", value: 20 },
          { label: "50件", value: 50 },
        ]}
        onChange={vi.fn()}
      />,
    )

    expect(screen.getByRole("combobox", { name: "表示件数" })).toHaveValue("20")
    expect(screen.getByRole("option", { name: "20件" })).toHaveValue("20")
    expect(screen.getByRole("option", { name: "50件" })).toHaveValue("50")
  })

  it("number型のvalueを選択したとき、number型でonChangeを呼ぶ", async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(
      <SearchSelect
        aria-label="表示件数"
        value={20}
        options={[
          { label: "20件", value: 20 },
          { label: "50件", value: 50 },
        ]}
        onChange={onChange}
      />,
    )

    await user.selectOptions(
      screen.getByRole("combobox", { name: "表示件数" }),
      "50",
    )

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(50)
  })

  it("string型のvalueを選択したとき、string型でonChangeを呼ぶ", async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(
      <SearchSelect
        aria-label="ソート項目"
        value="stars"
        options={[
          { label: "スター数", value: "stars" },
          { label: "更新日時", value: "updated" },
        ]}
        onChange={onChange}
      />,
    )

    await user.selectOptions(
      screen.getByRole("combobox", { name: "ソート項目" }),
      "updated",
    )

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith("updated")
  })

  it("disabledがtrueの場合、選択できない", () => {
    render(
      <SearchSelect
        aria-label="表示件数"
        value={20}
        options={[
          { label: "20件", value: 20 },
          { label: "50件", value: 50 },
        ]}
        onChange={vi.fn()}
        disabled
      />,
    )

    expect(screen.getByRole("combobox", { name: "表示件数" })).toBeDisabled()
  })
})
