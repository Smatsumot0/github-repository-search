import { ComponentPropsWithoutRef } from "react"
import styles from "./Button.module.css"
import clsx from "clsx"

type ButtonProps = ComponentPropsWithoutRef<"button">

export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button className={clsx(styles.button, className)} {...props}>
      {children}
    </button>
  )
}

