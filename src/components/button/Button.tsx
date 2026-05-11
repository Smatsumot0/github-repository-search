import clsx from "clsx"
import { ComponentPropsWithoutRef } from "react"

import styles from "./Button.module.css"

type ButtonProps = ComponentPropsWithoutRef<"button">

export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button className={clsx(styles.button, className)} {...props}>
      {children}
    </button>
  )
}

