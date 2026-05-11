import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { parseLanguage } from "@/features/repository-search/utils/validator"
import { LANGUAGE_FILTER_OPTIONS } from "@/lib/constants/language"

import { LanguageFilter } from "./LanguageFilter"

describe("LanguageFilter", () => {
  it("言語フィルターの選択肢を表示する", () => {
    render(<LanguageFilter value="" onChange={vi.fn()} />)

    const select = screen.getByRole("combobox")

    expect(select).toBeInTheDocument()

    for (const option of LANGUAGE_FILTER_OPTIONS) {
      expect(screen.getByRole("option", { name: option.label })).toHaveValue(
        option.value,
      )
    }
  })

  it("valueに一致する言語を選択状態にする", () => {
    render(<LanguageFilter value="TypeScript" onChange={vi.fn()} />)

    expect(screen.getByRole("combobox")).toHaveValue("TypeScript")
  })

  it("選択を変更したとき、変更後の言語でonChangeを呼ぶ", async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(<LanguageFilter value="" onChange={onChange} />)

    await user.selectOptions(screen.getByRole("combobox"), "JavaScript")

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith("JavaScript")
  })

  it("不正な値の場合、未指定を返す", () => {
    expect(parseLanguage("invalid")).toBe("")
  })

  it("disabledがtrueの場合、選択できない", () => {
    render(<LanguageFilter value="" onChange={vi.fn()} disabled />)

    expect(screen.getByRole("combobox")).toBeDisabled()
  })
})

