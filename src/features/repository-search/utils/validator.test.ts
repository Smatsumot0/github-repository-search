import { describe, expect, it } from "vitest"

import { parsePage } from "./validator"

describe("parsePage()", () => {
  it("有効なページ番号を返す", () => {
    expect(parsePage("1")).toBe(1)
    expect(parsePage("10")).toBe(10)
    expect(parsePage("100")).toBe(100)
  })

  it("無効な値の場合は1を返す", () => {
    expect(parsePage("0")).toBe(1)
    expect(parsePage("-1")).toBe(1)
    expect(parsePage("abc")).toBe(1)
    expect(parsePage("")).toBe(1)
    expect(parsePage(undefined)).toBe(1)
  })

  it("前後の空白を含む文字列を正しく処理する", () => {
    expect(parsePage("  5  ")).toBe(5)
    expect(parsePage(" 1 ")).toBe(1)
  })

  it("小数は整数として扱う", () => {
    expect(parsePage("1.5")).toBe(1)
    expect(parsePage("10.9")).toBe(10)
  })
})

