import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { SEARCH_ORDER } from "@/lib/constants/search"

import { OrderToggle } from "./OrderToggle"

describe("OrderToggle", () => {
  it("descの場合、クリックでascを返す", async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(<OrderToggle value={SEARCH_ORDER.DESC} onChange={onChange} />)

    await user.click(screen.getByRole("button"))

    expect(onChange).toHaveBeenCalledWith(SEARCH_ORDER.ASC)
  })

  it("ascの場合、クリックでdescを返す", async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(<OrderToggle value={SEARCH_ORDER.ASC} onChange={onChange} />)

    await user.click(screen.getByRole("button"))

    expect(onChange).toHaveBeenCalledWith(SEARCH_ORDER.DESC)
  })
})

