import { ComponentPropsWithoutRef } from "react"
import styles from "./Section.module.css"
import clsx from "clsx"

type SectionProps = ComponentPropsWithoutRef<"section">

export function Section({ children, className, ...props }: SectionProps) {
  return (
    <section className={clsx(styles.section, className)} {...props}>
      {children}
    </section>
  )
}

