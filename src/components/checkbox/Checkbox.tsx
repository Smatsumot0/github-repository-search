import clsx from "clsx"
import { ComponentPropsWithoutRef } from "react"

import styles from "./Checkbox.module.css"

type CheckboxProps = Omit<
  ComponentPropsWithoutRef<"input">,
  "type" | "onChange"
> & {
  onChange?: (checked: boolean) => void
}

export function Checkbox({ className, onChange, ...props }: CheckboxProps) {
  return (
    <input
      type="checkbox"
      className={clsx(styles.checkbox, className)}
      onChange={(event) => onChange?.(event.target.checked)}
      {...props}
    />
  )
}
