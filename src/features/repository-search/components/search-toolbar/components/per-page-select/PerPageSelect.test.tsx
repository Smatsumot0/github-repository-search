import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { PerPageSelect } from "./PerPageSelect"

describe("PerPageSelect", () => {
  it("現在の表示件数を表示する", () => {
    render(<PerPageSelect value={20} onChange={vi.fn()} />)

    expect(
      screen.getByRole("combobox", {
        name: "1ページあたりの表示件数",
      }),
    ).toHaveValue("20")
  })

  it("表示件数を変更するとonChangeが呼ばれる", async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(<PerPageSelect value={20} onChange={onChange} />)

    await user.selectOptions(
      screen.getByRole("combobox", {
        name: "1ページあたりの表示件数",
      }),
      "50",
    )

    expect(onChange).toHaveBeenCalledWith(50)
  })

  it("disabledがtrueの場合は変更できない", () => {
    render(<PerPageSelect value={20} onChange={vi.fn()} disabled />)

    expect(
      screen.getByRole("combobox", {
        name: "1ページあたりの表示件数",
      }),
    ).toBeDisabled()
  })
})
