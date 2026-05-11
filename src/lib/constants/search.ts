/**
 * 検索を実行する最小文字数
 * API負荷軽減とUX向上のため
 */
export const MIN_SEARCH_QUERY_LENGTH = 2

/**
 * 検索入力のデバウンス時間（ミリ秒）
 */
export const SEARCH_DEBOUNCE_DELAY_MS = 400

/**
 * 検索結果の1ページあたりの表示件数オプション
 */
export const SEARCH_PER_PAGE_OPTIONS = [10, 20, 30, 50, 100] as const

/**
 * 検索結果の1ページあたりの表示件数デフォルト値
 */
export const DEFAULT_SEARCH_PER_PAGE = 20

/**
 * 検索結果のソート順オプション
 */
export const SEARCH_ORDER = {
  ASC: "asc",
  DESC: "desc",
} as const
export type SearchOrder = (typeof SEARCH_ORDER)[keyof typeof SEARCH_ORDER]

/**
 * 検索結果のソート項目オプション
 */
export const SEARCH_SORT_OPTIONS = [
  "best-match",
  "stars",
  "forks",
  "updated",
] as const
export type SearchSort = (typeof SEARCH_SORT_OPTIONS)[number]

export const DEFAULT_SEARCH_SORT: SearchSort = "stars"

/**
 * 検索結果のソート項目の表示ラベル
 */
export const SEARCH_SORT_LABELS: Record<SearchSort, string> = {
  "best-match": "関連度",
  stars: "スター数",
  forks: "フォーク数",
  updated: "更新日",
}

