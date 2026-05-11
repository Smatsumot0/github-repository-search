import clsx from "clsx"
import { ComponentPropsWithoutRef } from "react"

import styles from "./Main.module.css"

type MainProps = ComponentPropsWithoutRef<"main">

export function Main({ children, className, ...props }: MainProps) {
  return (
    <main className={clsx(styles.main, "content-width", className)} {...props}>
      {children}
    </main>
  )
}

