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

