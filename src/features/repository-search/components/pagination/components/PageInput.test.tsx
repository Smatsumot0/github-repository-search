import { fireEvent, render, screen } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { PageInput } from "./PageInput"

describe("PageInput()", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("現在のページ番号を表示する", () => {
    render(<PageInput currentPage={3} totalPages={10} onChangePage={vi.fn()} />)

    expect(screen.getByRole("spinbutton")).toHaveValue(3)
  })

  it("入力中の値を表示する", () => {
    render(<PageInput currentPage={3} totalPages={10} onChangePage={vi.fn()} />)

    const input = screen.getByRole("spinbutton")

    fireEvent.change(input, {
      target: { value: "5" },
    })

    expect(input).toHaveValue(5)
  })

  it("入力後、debounce 後にページ変更を実行する", () => {
    const onChangePage = vi.fn()

    render(
      <PageInput currentPage={3} totalPages={10} onChangePage={onChangePage} />,
    )

    const input = screen.getByRole("spinbutton")

    fireEvent.change(input, {
      target: { value: "5" },
    })

    expect(onChangePage).not.toHaveBeenCalled()

    vi.advanceTimersByTime(500)

    expect(onChangePage).toHaveBeenCalledWith(5)
  })

  it("1未満の場合は1ページ目に補正する", () => {
    const onChangePage = vi.fn()

    render(
      <PageInput currentPage={3} totalPages={10} onChangePage={onChangePage} />,
    )

    fireEvent.change(screen.getByRole("spinbutton"), {
      target: { value: "0" },
    })

    vi.advanceTimersByTime(500)

    expect(onChangePage).toHaveBeenCalledWith(1)
  })

  it("総ページ数を超える場合は最終ページに補正する", () => {
    const onChangePage = vi.fn()

    render(
      <PageInput currentPage={3} totalPages={10} onChangePage={onChangePage} />,
    )

    fireEvent.change(screen.getByRole("spinbutton"), {
      target: { value: "100" },
    })

    vi.advanceTimersByTime(500)

    expect(onChangePage).toHaveBeenCalledWith(10)
  })

  it("現在のページと同じ場合はページ変更を実行しない", () => {
    const onChangePage = vi.fn()

    render(
      <PageInput currentPage={3} totalPages={10} onChangePage={onChangePage} />,
    )

    fireEvent.change(screen.getByRole("spinbutton"), {
      target: { value: "3" },
    })

    vi.advanceTimersByTime(500)

    expect(onChangePage).not.toHaveBeenCalled()
  })

  it("disabledがtrueの場合は入力できない", () => {
    render(
      <PageInput
        currentPage={3}
        totalPages={10}
        onChangePage={vi.fn()}
        disabled
      />,
    )

    expect(screen.getByRole("spinbutton")).toBeDisabled()
  })
})

