import clsx from "clsx"
import { ComponentPropsWithoutRef } from "react"

import styles from "./Select.module.css"

type SelectOption<T extends string | number> = {
  label: string
  value: T
}

type SelectProps<T extends string | number> = {
  options: readonly SelectOption<T>[]
  value?: T
  onChange: (value: T) => void
  placeholder?: string
} & Omit<ComponentPropsWithoutRef<"select">, "value" | "onChange">

export function Select<T extends string | number>({
  options,
  value,
  onChange,
  placeholder,
  className,
  ...props
}: SelectProps<T>) {
  return (
    <select
      value={value?.toString() ?? ""}
      className={clsx(styles.select, className)}
      onChange={(event) => {
        const selected = options.find(
          (option) => option.value.toString() === event.target.value,
        )

        if (selected) {
          onChange(selected.value)
        }
      }}
      {...props}>
      {placeholder && <option value="">{placeholder}</option>}

      {options.map((option) => (
        <option key={option.value.toString()} value={option.value.toString()}>
          {option.label}
        </option>
      ))}
    </select>
  )
}

