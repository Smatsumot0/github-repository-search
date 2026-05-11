export const SEARCH_ORDERS = {
  ASC: "asc",
  DESC: "desc",
} as const

export type SearchOrder = (typeof SEARCH_ORDERS)[keyof typeof SEARCH_ORDERS]
