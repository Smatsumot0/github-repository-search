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

/**
 * Stars フィルタ項目オプション
 */
export const MIN_STARS_FILTER_OPTIONS = [
  { label: "指定なし", value: "" },
  { label: "10以上", value: "10" },
  { label: "50以上", value: "50" },
  { label: "100以上", value: "100" },
  { label: "500以上", value: "500" },
  { label: "1000以上", value: "1000" },
] as const

/**
 * 最終更新日 フィルタ項目
 */
export const PUSHED_PERIOD = {
  WEEK: "week",
  MONTH: "month",
  THREE_MONTHS: "three_months",
  YEAR: "year",
} as const

export type PushedPeriod = (typeof PUSHED_PERIOD)[keyof typeof PUSHED_PERIOD]

/**
 * 最終更新日 フィルタ項目オプション
 */
export const PUSHED_PERIOD_FILTER_OPTIONS = [
  { label: "指定なし", value: "" },
  { label: "1週間以内", value: PUSHED_PERIOD.WEEK },
  { label: "1ヶ月以内", value: PUSHED_PERIOD.MONTH },
  { label: "3ヶ月以内", value: PUSHED_PERIOD.THREE_MONTHS },
  { label: "1年以内", value: PUSHED_PERIOD.YEAR },
] as const

/**
 * 検索画面用メッセージ
 */
export const REPOSITORY_SEARCH_MESSAGES = {
  SEARCH_PROMPT: "2文字以上入力してリポジトリを検索してください",
  NO_RESULTS: "該当するリポジトリが見つかりませんでした",
  TOTAL_COUNT: (count: number) => `検索結果 ${count.toLocaleString()} 件`,
} as const

/**
 * 検索エラーのメッセージ
 */
export const REPOSITORY_SEARCH_ERROR_MESSAGES = {
  RATE_LIMIT:
    "GitHub APIの利用上限に達しました。しばらく時間をおいて再度お試しください。",
  FETCH_FAILED: "リポジトリの取得に失敗しました。",
} as const

