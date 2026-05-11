import { PUSHED_PERIOD, PushedPeriod } from "@/lib/constants/search"

type BuildRepositorySearchQueryParams = {
  query: string
  language?: string
  minStars?: number
  excludeForks?: boolean
  pushed?: PushedPeriod
}

function getPushedSinceDate(period: PushedPeriod): string {
  const date = new Date()

  switch (period) {
    case PUSHED_PERIOD.WEEK:
      date.setDate(date.getDate() - 7)
      break
    case PUSHED_PERIOD.MONTH:
      date.setMonth(date.getMonth() - 1)
      break
    case PUSHED_PERIOD.THREE_MONTHS:
      date.setMonth(date.getMonth() - 3)
      break
    case PUSHED_PERIOD.YEAR:
      date.setFullYear(date.getFullYear() - 1)
      break
  }

  return date.toISOString().slice(0, 10)
}

/**
 * GitHub Search API 用の検索クエリを組み立てる
 *
 * 指定された検索条件を GitHub の検索構文へ変換して結合する。
 *
 * 例:
 * react language:typescript stars:>=100 fork:false pushed:>2026-05-01
 *
 * @param params 検索条件
 * @returns GitHub Search API 用クエリ
 */
export function buildRepositorySearchQuery({
  query,
  language,
  minStars,
  excludeForks,
  pushed,
}: BuildRepositorySearchQueryParams) {
  const conditions = [query.trim()]

  if (language) {
    conditions.push(`language:${language}`)
  }

  if (minStars !== undefined) {
    conditions.push(`stars:>=${minStars}`)
  }

  if (excludeForks) {
    conditions.push("fork:false")
  }

  if (pushed) {
    conditions.push(`pushed:>${getPushedSinceDate(pushed)}`)
  }

  return conditions.join(" ")
}

