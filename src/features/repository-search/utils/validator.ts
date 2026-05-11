import {
  LANGUAGE_FILTER_OPTIONS,
  LanguageFilterValue,
} from "@/lib/constants/language"
import { PUSHED_PERIOD, PushedPeriod } from "@/lib/constants/search"

/**
 * page パラメータを有効なページ番号へ変換する
 *
 * 配列の場合は先頭の値を使用する。
 * 不正な値、未指定、1未満の場合は 1 を返す。
 *
 * @param page URLパラメータの page
 * @returns 1以上のページ番号
 */
export function parsePage(page: string | string[] | undefined) {
  const value = Array.isArray(page) ? page[0] : page
  const parsed = Math.floor(Number(value))

  if (!Number.isFinite(parsed) || parsed < 1) {
    return 1
  }

  return parsed
}

/**
 * 値が有効な言語フィルターか判定する
 *
 * @param value 判定対象
 * @returns 有効な LanguageFilterValue なら true
 */
export function isLanguageFilterValue(
  value: string | null | undefined,
): value is LanguageFilterValue {
  return LANGUAGE_FILTER_OPTIONS.some((option) => option.value === value)
}

/**
 * language パラメータを安全な値へ変換する
 *
 * 不正値または未指定なら空文字を返す
 *
 * @param value URLパラメータ
 * @returns LanguageFilterValue または空文字
 */
export function parseLanguage(
  value: string | null | undefined,
): LanguageFilterValue | "" {
  if (!value?.trim()) {
    return ""
  }

  return isLanguageFilterValue(value) ? value : ""
}

/**
 * minStars パラメータを数値へ変換する
 *
 * 不正値、負数、未指定なら undefined を返す
 *
 * @param value URLパラメータ
 * @returns Star数 または undefined
 */
export function parseMinStars(
  value: string | null | undefined,
): number | undefined {
  if (!value?.trim()) return undefined

  const stars = Number(value)

  if (!Number.isInteger(stars)) return undefined
  if (stars < 0) return undefined

  return stars
}

/**
 * excludeForks パラメータを boolean へ変換する
 *
 * @param value URLパラメータ
 * @returns "true" の場合のみ true
 */
export function parseExcludeForks(value: string | null | undefined): boolean {
  return value === "true"
}

/**
 * pushed パラメータを有効な更新期間へ変換する
 *
 * 不正値または未指定なら undefined を返す
 *
 * @param value URLパラメータ
 * @returns PushedPeriod または undefined
 */
export function parsePushedPeriod(
  value: string | null | undefined,
): PushedPeriod | undefined {
  if (!value?.trim()) {
    return undefined
  }

  const periods = Object.values(PUSHED_PERIOD)

  if (!periods.includes(value as PushedPeriod)) {
    return undefined
  }

  return value as PushedPeriod
}

