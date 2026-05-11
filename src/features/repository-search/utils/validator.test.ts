import { describe, expect, it } from "vitest"

import { LANGUAGE_FILTER_OPTIONS } from "@/lib/constants/language"
import { PUSHED_PERIOD } from "@/lib/constants/search"

import {
  isLanguageFilterValue,
  parseExcludeForks,
  parseLanguage,
  parseMinStars,
  parsePage,
  parsePushedPeriod,
} from "./validator"

describe("parsePage", () => {
  it("有効な文字列の場合、数値に変換する", () => {
    expect(parsePage("2")).toBe(2)
  })

  it("小数の場合、小数点以下を切り捨てる", () => {
    expect(parsePage("2.9")).toBe(2)
  })

  it("配列の場合、先頭の値を使用する", () => {
    expect(parsePage(["3", "4"])).toBe(3)
  })

  it("配列の先頭が不正な値の場合、1を返す", () => {
    expect(parsePage(["abc", "2"])).toBe(1)
  })

  it("未指定の場合、1を返す", () => {
    expect(parsePage(undefined)).toBe(1)
  })

  it("不正な値の場合、1を返す", () => {
    expect(parsePage("abc")).toBe(1)
  })

  it("1未満の場合、1を返す", () => {
    expect(parsePage("0")).toBe(1)
    expect(parsePage("-1")).toBe(1)
  })

  it("前後に空白がある整数文字列の場合、数値に変換する", () => {
    expect(parseMinStars(" 100 ")).toBe(100)
  })

  it("空文字の場合、1を返す", () => {
    expect(parsePage("")).toBe(1)
  })

  it("空配列の場合、1を返す", () => {
    expect(parsePage([])).toBe(1)
  })

  it("Infinity の場合、1を返す", () => {
    expect(parsePage("Infinity")).toBe(1)
  })
})

describe("isLanguageFilterValue", () => {
  it("有効な言語フィルター値の場合、trueを返す", () => {
    const language = LANGUAGE_FILTER_OPTIONS[0].value

    expect(isLanguageFilterValue(language)).toBe(true)
  })

  it("不正な値の場合、falseを返す", () => {
    expect(isLanguageFilterValue("invalid-language")).toBe(false)
  })

  it("未指定の場合、falseを返す", () => {
    expect(isLanguageFilterValue(undefined)).toBe(false)
    expect(isLanguageFilterValue(null)).toBe(false)
  })
})

describe("parseLanguage", () => {
  it("有効な言語フィルター値の場合、その値を返す", () => {
    const language = LANGUAGE_FILTER_OPTIONS.find(
      (option) => option.value,
    )?.value

    expect(language).toBeDefined()
    expect(parseLanguage(language)).toBe(language)
  })

  it("不正な値の場合、空文字を返す", () => {
    expect(parseLanguage("invalid-language")).toBe("")
  })

  it("空白のみの場合、空文字を返す", () => {
    expect(parseLanguage("   ")).toBe("")
  })

  it("未指定の場合、空文字を返す", () => {
    expect(parseLanguage(undefined)).toBe("")
    expect(parseLanguage(null)).toBe("")
    expect(parseLanguage("")).toBe("")
  })
})

describe("parseMinStars", () => {
  it("有効な整数文字列の場合、数値に変換する", () => {
    expect(parseMinStars("100")).toBe(100)
  })

  it("0の場合、0を返す", () => {
    expect(parseMinStars("0")).toBe(0)
  })

  it("空白のみの場合、undefinedを返す", () => {
    expect(parseMinStars("   ")).toBeUndefined()
  })

  it("指数表記の場合、数値に変換する", () => {
    expect(parseMinStars("1e3")).toBe(1000)
  })

  it("未指定の場合、undefinedを返す", () => {
    expect(parseMinStars(undefined)).toBeUndefined()
    expect(parseMinStars(null)).toBeUndefined()
    expect(parseMinStars("")).toBeUndefined()
  })

  it("不正な値の場合、undefinedを返す", () => {
    expect(parseMinStars("abc")).toBeUndefined()
  })

  it("小数の場合、undefinedを返す", () => {
    expect(parseMinStars("1.5")).toBeUndefined()
  })

  it("負数の場合、undefinedを返す", () => {
    expect(parseMinStars("-1")).toBeUndefined()
  })
})

describe("parseExcludeForks", () => {
  it('"true" の場合、trueを返す', () => {
    expect(parseExcludeForks("true")).toBe(true)
  })

  it('"true" 以外の場合、falseを返す', () => {
    expect(parseExcludeForks("false")).toBe(false)
    expect(parseExcludeForks("1")).toBe(false)
    expect(parseExcludeForks("")).toBe(false)
  })

  it("未指定の場合、falseを返す", () => {
    expect(parseExcludeForks(undefined)).toBe(false)
    expect(parseExcludeForks(null)).toBe(false)
  })
})

describe("parsePushedPeriod", () => {
  it("有効な更新期間の場合、その値を返す", () => {
    expect(parsePushedPeriod(PUSHED_PERIOD.WEEK)).toBe(PUSHED_PERIOD.WEEK)
    expect(parsePushedPeriod(PUSHED_PERIOD.MONTH)).toBe(PUSHED_PERIOD.MONTH)
    expect(parsePushedPeriod(PUSHED_PERIOD.THREE_MONTHS)).toBe(
      PUSHED_PERIOD.THREE_MONTHS,
    )
    expect(parsePushedPeriod(PUSHED_PERIOD.YEAR)).toBe(PUSHED_PERIOD.YEAR)
  })

  it("不正な値の場合、undefinedを返す", () => {
    expect(parsePushedPeriod("invalid-period")).toBeUndefined()
  })

  it("空白のみの場合、undefinedを返す", () => {
    expect(parsePushedPeriod("   ")).toBeUndefined()
  })

  it("未指定の場合、undefinedを返す", () => {
    expect(parsePushedPeriod(undefined)).toBeUndefined()
    expect(parsePushedPeriod(null)).toBeUndefined()
    expect(parsePushedPeriod("")).toBeUndefined()
  })
})

