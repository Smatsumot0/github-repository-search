import { ComponentPropsWithRef } from "react"
import clsx from "clsx"
import styles from "./Anchor.module.css"

type AnchorProps = {
  href?: string
  children?: React.ReactNode
  className?: string
  appearance?: "text" | "outlined" | "filled"
} & Omit<ComponentPropsWithRef<"a">, "href" | "children" | "className">

export function Anchor({
  href,
  children,
  className,
  appearance = "text",
  ...props
}: AnchorProps) {
  return (
    <a
      href={href}
      className={clsx(styles.anchor, styles[appearance], className)}
      {...props}>
      {children}
    </a>
  )
}

