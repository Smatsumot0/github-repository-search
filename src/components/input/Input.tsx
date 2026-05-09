import { ComponentPropsWithoutRef } from "react"
import clsx from "clsx"
import styles from "./Input.module.css"

type InputProps = ComponentPropsWithoutRef<"input">

export function Input({ className, ...props }: InputProps) {
  return <input className={clsx(styles.input, className)} {...props} />
}
