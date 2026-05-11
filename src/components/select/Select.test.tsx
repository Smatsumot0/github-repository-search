import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { Select } from "./Select"

describe("Select", () => {
  it("選択肢を表示する", () => {
    render(
      <Select
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

  it("placeholderを表示する", () => {
    render(
      <Select
        aria-label="言語"
        value=""
        placeholder="選択してください"
        options={[{ label: "TypeScript", value: "typescript" }]}
        onChange={vi.fn()}
      />,
    )

    expect(
      screen.getByRole("option", { name: "選択してください" }),
    ).toHaveValue("")
  })

  it("number型の選択肢を選んだとき、number型でonChangeを呼ぶ", async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(
      <Select
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

  it("string型の選択肢を選んだとき、string型でonChangeを呼ぶ", async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(
      <Select
        aria-label="言語"
        value=""
        options={[{ label: "TypeScript", value: "typescript" }]}
        onChange={onChange}
      />,
    )

    await user.selectOptions(
      screen.getByRole("combobox", { name: "言語" }),
      "typescript",
    )

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith("typescript")
  })

  it("disabledがtrueの場合、選択できない", () => {
    render(
      <Select
        aria-label="言語"
        value=""
        options={[{ label: "TypeScript", value: "typescript" }]}
        onChange={vi.fn()}
        disabled
      />,
    )

    expect(screen.getByRole("combobox", { name: "言語" })).toBeDisabled()
  })
})
