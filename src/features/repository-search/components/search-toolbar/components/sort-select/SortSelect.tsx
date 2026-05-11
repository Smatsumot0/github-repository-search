import {
  SEARCH_SORT_LABELS,
  SEARCH_SORT_OPTIONS,
  SearchSort,
} from "@/lib/constants/search"

import { SearchSelect } from "../search-select/SearchSelect"

type SortSelectProps = {
  value: SearchSort
  onChange: (value: SearchSort) => void
  disabled?: boolean
}

const OPTIONS = SEARCH_SORT_OPTIONS.map((option) => ({
  label: SEARCH_SORT_LABELS[option],
  value: option,
}))

export function SortSelect({
  value,
  onChange,
  disabled = false,
}: SortSelectProps) {
  return (
    <SearchSelect
      aria-label="ソート項目"
      value={value}
      options={OPTIONS}
      onChange={onChange}
      disabled={disabled}
    />
  )
}

