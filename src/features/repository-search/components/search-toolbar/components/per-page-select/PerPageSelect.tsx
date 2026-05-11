import { Select } from "@/components"
import { SEARCH_PER_PAGE_OPTIONS } from "@/lib/constants/search"

type PerPageSelectProps = {
  value: number
  onChange: (value: number) => void
  disabled?: boolean
}

const OPTIONS = SEARCH_PER_PAGE_OPTIONS.map((option) => ({
  label: `${option}件`,
  value: String(option),
}))

export function PerPageSelect({
  value,
  onChange,
  disabled = false,
}: PerPageSelectProps) {
  return (
    <Select
      aria-label="1ページあたりの表示件数"
      value={String(value)}
      disabled={disabled}
      options={OPTIONS}
      onChange={(value) => onChange(Number(value))}
    />
  )
}

