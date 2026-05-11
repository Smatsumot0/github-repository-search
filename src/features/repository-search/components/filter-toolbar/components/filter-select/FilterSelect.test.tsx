import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { FilterSelect } from "./FilterSelect"

const options = [
  { label: "指定なし", value: "" },
  { label: "JavaScript", value: "javascript" },
  { label: "TypeScript", value: "typescript" },
] as const

describe("FilterSelect", () => {
  it("渡された選択肢を表示する", () => {
    render(
      <FilterSelect
        aria-label="言語"
        value=""
        options={options}
        onChange={vi.fn()}
      />,
    )

    expect(screen.getByRole("combobox", { name: "言語" })).toBeInTheDocument()
    expect(screen.getByRole("option", { name: "指定なし" })).toHaveValue("")
    expect(screen.getByRole("option", { name: "JavaScript" })).toHaveValue(
      "javascript",
    )
    expect(screen.getByRole("option", { name: "TypeScript" })).toHaveValue(
      "typescript",
    )
  })

  it("valueに一致する選択肢を選択状態にする", () => {
    render(
      <FilterSelect
        aria-label="言語"
        value="typescript"
        options={options}
        onChange={vi.fn()}
      />,
    )

    expect(screen.getByRole("combobox", { name: "言語" })).toHaveValue(
      "typescript",
    )
  })

  it("選択を変更したとき、変更後の値でonChangeを呼ぶ", async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(
      <FilterSelect
        aria-label="言語"
        value=""
        options={options}
        onChange={onChange}
      />,
    )

    await user.selectOptions(
      screen.getByRole("combobox", { name: "言語" }),
      "javascript",
    )

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith("javascript")
  })

  it("disabledがtrueの場合、選択できない", () => {
    render(
      <FilterSelect
        aria-label="言語"
        value=""
        options={options}
        onChange={vi.fn()}
        disabled
      />,
    )

    expect(screen.getByRole("combobox", { name: "言語" })).toBeDisabled()
  })

  it("select要素の追加propsを渡せる", () => {
    render(
      <FilterSelect
        aria-label="言語"
        value=""
        options={options}
        onChange={vi.fn()}
        name="language"
      />,
    )

    expect(screen.getByRole("combobox", { name: "言語" })).toHaveAttribute(
      "name",
      "language",
    )
  })
})
