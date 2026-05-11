import { ComponentPropsWithoutRef } from "react"

import { Select } from "@/components"

type FilterOption = {
  label: string
  value: string
}

type FilterSelectProps = {
  value: string
  options: readonly FilterOption[]
  onChange: (value: string) => void
} & Omit<ComponentPropsWithoutRef<"select">, "value" | "onChange">

export function FilterSelect({
  value,
  options,
  onChange,
  disabled = false,
  ...props
}: FilterSelectProps) {
  return (
    <Select
      value={value}
      options={options}
      disabled={disabled}
      onChange={onChange}
      {...props}
    />
  )
}

