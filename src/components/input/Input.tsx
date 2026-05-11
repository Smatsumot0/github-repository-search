import clsx from "clsx"
import { ComponentPropsWithoutRef } from "react"

import styles from "./Input.module.css"

type InputType =
  | "text"
  | "search"
  | "email"
  | "password"
  | "url"
  | "tel"
  | "number"

type InputProps = Omit<ComponentPropsWithoutRef<"input">, "type"> & {
  type?: InputType
}

export function Input({ className, type = "text", ...props }: InputProps) {
  return (
    <input type={type} className={clsx(styles.input, className)} {...props} />
  )
}
