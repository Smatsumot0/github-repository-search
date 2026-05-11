import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { PUSHED_PERIOD } from "@/lib/constants/search"

import { buildRepositorySearchQuery } from "./buildRepositorySearchQuery"

describe("buildRepositorySearchQuery", () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date("2026-05-11T00:00:00.000Z"))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("query のみの場合、そのまま返す", () => {
    expect(
      buildRepositorySearchQuery({
        query: "react",
      }),
    ).toBe("react")
  })

  it("query の前後空白を除去する", () => {
    expect(
      buildRepositorySearchQuery({
        query: "  react  ",
      }),
    ).toBe("react")
  })

  it("language を含める", () => {
    expect(
      buildRepositorySearchQuery({
        query: "react",
        language: "typescript",
      }),
    ).toBe("react language:typescript")
  })

  it("minStars を含める", () => {
    expect(
      buildRepositorySearchQuery({
        query: "react",
        minStars: 100,
      }),
    ).toBe("react stars:>=100")
  })

  it("excludeForks が true の場合 fork:false を含める", () => {
    expect(
      buildRepositorySearchQuery({
        query: "react",
        excludeForks: true,
      }),
    ).toBe("react fork:false")
  })

  it("excludeForks が false の場合 fork:false を含めない", () => {
    expect(
      buildRepositorySearchQuery({
        query: "react",
        excludeForks: false,
      }),
    ).toBe("react")
  })

  it("pushed=week の場合 7日前の日付を含める", () => {
    expect(
      buildRepositorySearchQuery({
        query: "react",
        pushed: PUSHED_PERIOD.WEEK,
      }),
    ).toBe("react pushed:>2026-05-04")
  })

  it("pushed=month の場合 1ヶ月前の日付を含める", () => {
    expect(
      buildRepositorySearchQuery({
        query: "react",
        pushed: PUSHED_PERIOD.MONTH,
      }),
    ).toBe("react pushed:>2026-04-11")
  })

  it("pushed=three_months の場合 3ヶ月前の日付を含める", () => {
    expect(
      buildRepositorySearchQuery({
        query: "react",
        pushed: PUSHED_PERIOD.THREE_MONTHS,
      }),
    ).toBe("react pushed:>2026-02-11")
  })

  it("pushed=year の場合 1年前の日付を含める", () => {
    expect(
      buildRepositorySearchQuery({
        query: "react",
        pushed: PUSHED_PERIOD.YEAR,
      }),
    ).toBe("react pushed:>2025-05-11")
  })

  it("すべての条件を結合する", () => {
    expect(
      buildRepositorySearchQuery({
        query: "react",
        language: "typescript",
        minStars: 100,
        excludeForks: true,
        pushed: PUSHED_PERIOD.MONTH,
      }),
    ).toBe(
      "react language:typescript stars:>=100 fork:false pushed:>2026-04-11",
    )
  })
})
