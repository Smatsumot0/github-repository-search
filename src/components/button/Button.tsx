import clsx from "clsx"
import { ComponentPropsWithoutRef } from "react"

import styles from "./Button.module.css"

type ButtonProps = ComponentPropsWithoutRef<"button">

export function Button({
  children,
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button className={clsx(styles.button, className)} type={type} {...props}>
      {children}
    </button>
  )
}

