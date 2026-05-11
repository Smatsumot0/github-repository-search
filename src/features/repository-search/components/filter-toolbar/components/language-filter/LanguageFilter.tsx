import { parseLanguage } from "@/features/repository-search/utils/validator"
import {
  LANGUAGE_FILTER_OPTIONS,
  LanguageFilterValue,
} from "@/lib/constants/language"

import { FilterSelect } from "../filter-select/FilterSelect"

type LanguageFilterProps = {
  value: LanguageFilterValue
  disabled?: boolean
  onChange: (value: LanguageFilterValue) => void
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
      onChange={(value) => onChange(parseLanguage(value))}
    />
  )
}

