import { LANGUAGE_FILTER_OPTIONS } from "@/lib/constants/language"

import { FilterSelect } from "../filter-select/FilterSelect"

type LanguageFilterProps = {
  value: string
  disabled?: boolean
  onChange: (value: string) => void
}

export function LanguageFilter({
  value,
  disabled = false,
  onChange,
}: LanguageFilterProps) {
  return (
    <FilterSelect
      value={value}
      options={LANGUAGE_FILTER_OPTIONS}
      disabled={disabled}
      onChange={onChange}
    />
  )
}

