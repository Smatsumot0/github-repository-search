import { Select } from "@/components"

type SearchSelectOption<T extends string | number> = {
  label: string
  value: T
}

type SearchSelectProps<T extends string | number> = {
  "aria-label": string
  value: T
  options: SearchSelectOption<T>[]
  onChange: (value: T) => void
  disabled?: boolean
}

export function SearchSelect<T extends string | number>({
  "aria-label": ariaLabel,
  value,
  options,
  onChange,
  disabled = false,
}: SearchSelectProps<T>) {
  return (
    <Select
      aria-label={ariaLabel}
      value={String(value)}
      disabled={disabled}
      options={options.map((option) => ({
        label: option.label,
        value: String(option.value),
      }))}
      onChange={(nextValue) => {
        const selectedOption = options.find(
          (option) => String(option.value) === nextValue,
        )

        if (selectedOption === undefined) return

        onChange(selectedOption.value)
      }}
    />
  )
}
