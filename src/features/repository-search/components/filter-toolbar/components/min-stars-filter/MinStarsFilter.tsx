import { MIN_STARS_FILTER_OPTIONS } from "@/lib/constants/search"

import { FilterSelect } from "../filter-select/FilterSelect"

type MinStarsFilterProps = {
  value?: number
  disabled?: boolean
  onChange: (value: number | undefined) => void
}

export function MinStarsFilter({
  value,
  disabled = false,
  onChange,
}: MinStarsFilterProps) {
  const selectedValue = value === undefined ? "" : String(value)

  return (
    <FilterSelect
      value={selectedValue}
      options={MIN_STARS_FILTER_OPTIONS}
      disabled={disabled}
      onChange={(nextValue) =>
        onChange(nextValue ? Number(nextValue) : undefined)
      }
    />
  )
}
