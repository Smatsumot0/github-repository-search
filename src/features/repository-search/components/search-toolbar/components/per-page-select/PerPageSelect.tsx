import { SEARCH_PER_PAGE_OPTIONS } from "@/lib/constants/search"

import { SearchSelect } from "../search-select/SearchSelect"

type PerPageSelectProps = {
  value: number
  onChange: (value: number) => void
  disabled?: boolean
}

const OPTIONS = SEARCH_PER_PAGE_OPTIONS.map((option) => ({
  label: `${option}件`,
  value: option,
}))

export function PerPageSelect({
  value,
  onChange,
  disabled = false,
}: PerPageSelectProps) {
  return (
    <SearchSelect
      aria-label="1ページあたりの表示件数"
      value={value}
      options={OPTIONS}
      onChange={onChange}
      disabled={disabled}
    />
  )
}
