import { parsePushedPeriod } from "@/features/repository-search/utils/validator"
import {
  PUSHED_PERIOD_FILTER_OPTIONS,
  PushedPeriod,
} from "@/lib/constants/search"

import { FilterSelect } from "../filter-select/FilterSelect"

type PushedFilterProps = {
  value?: PushedPeriod
  disabled?: boolean
  onChange: (value: PushedPeriod | undefined) => void
}

export function PushedFilter({
  value,
  disabled = false,
  onChange,
}: PushedFilterProps) {
  const selectedValue = value === undefined ? "" : String(value)

  return (
    <FilterSelect
      value={selectedValue}
      options={PUSHED_PERIOD_FILTER_OPTIONS}
      disabled={disabled}
      onChange={(nextValue) => onChange(parsePushedPeriod(nextValue))}
    />
  )
}

