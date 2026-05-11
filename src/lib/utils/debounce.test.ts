import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { debounce } from "./debounce"

describe("debounce()", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("指定した遅延時間後に関数を実行する", () => {
    const mockFn = vi.fn()
    const debouncedFn = debounce(mockFn, 100)

    debouncedFn()

    expect(mockFn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(100)

    expect(mockFn).toHaveBeenCalledTimes(1)
  })

  it("delay未満では関数を実行しない", () => {
    const mockFn = vi.fn()
    const debouncedFn = debounce(mockFn, 100)

    debouncedFn()

    vi.advanceTimersByTime(99)

    expect(mockFn).not.toHaveBeenCalled()
  })

  it("連続で呼び出された場合は最後の呼び出しのみ実行する", () => {
    const mockFn = vi.fn()
    const debouncedFn = debounce(mockFn, 100)

    debouncedFn()
    debouncedFn()
    debouncedFn()

    vi.advanceTimersByTime(100)

    expect(mockFn).toHaveBeenCalledTimes(1)
  })

  it("連続で呼び出された場合は最後の引数で実行する", () => {
    const mockFn = vi.fn()
    const debouncedFn = debounce(mockFn, 100)

    debouncedFn("first")
    debouncedFn("second")
    debouncedFn("last")

    vi.advanceTimersByTime(100)

    expect(mockFn).toHaveBeenCalledTimes(1)
    expect(mockFn).toHaveBeenCalledWith("last")
  })

  it("引数を正しく渡す", () => {
    const mockFn = vi.fn()
    const debouncedFn = debounce(mockFn, 100)

    debouncedFn("arg1", "arg2")

    vi.advanceTimersByTime(100)

    expect(mockFn).toHaveBeenCalledWith("arg1", "arg2")
  })

  it("delayが0でも非同期で実行する", () => {
    const mockFn = vi.fn()
    const debouncedFn = debounce(mockFn, 0)

    debouncedFn()

    expect(mockFn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(0)

    expect(mockFn).toHaveBeenCalledTimes(1)
  })
})
