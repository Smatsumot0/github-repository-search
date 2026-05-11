import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import {
  PUSHED_PERIOD,
  PUSHED_PERIOD_FILTER_OPTIONS,
} from "@/lib/constants/search"

import { PushedFilter } from "./PushedFilter"

describe("PushedFilter", () => {
  it("更新日時フィルターの選択肢を表示する", () => {
    render(<PushedFilter onChange={vi.fn()} />)

    expect(screen.getByRole("combobox")).toBeInTheDocument()

    for (const option of PUSHED_PERIOD_FILTER_OPTIONS) {
      expect(screen.getByRole("option", { name: option.label })).toHaveValue(
        option.value,
      )
    }
  })

  it("valueに一致する更新日時を選択状態にする", () => {
    render(<PushedFilter value={PUSHED_PERIOD.WEEK} onChange={vi.fn()} />)

    expect(screen.getByRole("combobox")).toHaveValue(String(PUSHED_PERIOD.WEEK))
  })

  it("valueがundefinedの場合、未指定を選択状態にする", () => {
    render(<PushedFilter value={undefined} onChange={vi.fn()} />)

    expect(screen.getByRole("combobox")).toHaveValue("")
  })

  it("選択を変更したとき、PushedPeriodに変換してonChangeを呼ぶ", async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(<PushedFilter onChange={onChange} />)

    await user.selectOptions(
      screen.getByRole("combobox"),
      String(PUSHED_PERIOD.WEEK),
    )

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(PUSHED_PERIOD.WEEK)
  })

  it("未指定を選択したとき、undefinedでonChangeを呼ぶ", async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(<PushedFilter value={PUSHED_PERIOD.WEEK} onChange={onChange} />)

    await user.selectOptions(screen.getByRole("combobox"), "")

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(undefined)
  })

  it("disabledがtrueの場合、選択できない", () => {
    render(<PushedFilter onChange={vi.fn()} disabled />)

    expect(screen.getByRole("combobox")).toBeDisabled()
  })
})
