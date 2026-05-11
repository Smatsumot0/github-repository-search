import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { MIN_STARS_FILTER_OPTIONS } from "@/lib/constants/search"

import { MinStarsFilter } from "./MinStarsFilter"

describe("MinStarsFilter", () => {
  it("スター数フィルターの選択肢を表示する", () => {
    render(<MinStarsFilter onChange={vi.fn()} />)

    expect(screen.getByRole("combobox")).toBeInTheDocument()

    for (const option of MIN_STARS_FILTER_OPTIONS) {
      expect(screen.getByRole("option", { name: option.label })).toHaveValue(
        option.value,
      )
    }
  })

  it("valueに一致するスター数を選択状態にする", () => {
    render(<MinStarsFilter value={100} onChange={vi.fn()} />)

    expect(screen.getByRole("combobox")).toHaveValue("100")
  })

  it("valueがundefinedの場合、未指定を選択状態にする", () => {
    render(<MinStarsFilter value={undefined} onChange={vi.fn()} />)

    expect(screen.getByRole("combobox")).toHaveValue("")
  })

  it("選択を変更したとき、数値に変換してonChangeを呼ぶ", async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(<MinStarsFilter onChange={onChange} />)

    await user.selectOptions(screen.getByRole("combobox"), "100")

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(100)
  })

  it("未指定を選択したとき、undefinedでonChangeを呼ぶ", async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(<MinStarsFilter value={100} onChange={onChange} />)

    await user.selectOptions(screen.getByRole("combobox"), "")

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(undefined)
  })

  it("disabledがtrueの場合、選択できない", () => {
    render(<MinStarsFilter onChange={vi.fn()} disabled />)

    expect(screen.getByRole("combobox")).toBeDisabled()
  })
})
