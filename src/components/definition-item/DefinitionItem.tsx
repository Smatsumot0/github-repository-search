import clsx from "clsx"

import styles from "./DefinitionItem.module.css"

type Layout = "horizontal" | "vertical"
type SpacingSize = "sm" | "md" | "lg"

type DefinitionItemProps = {
  term: string
  children: React.ReactNode
  className?: string
  termHidden?: boolean
  layout?: Layout
  spacingSize?: SpacingSize
  emphasized?: boolean
  htmlFor?: string
}

export function DefinitionItem({
  term,
  children,
  className,
  termHidden = false,
  layout = "vertical",
  spacingSize = "sm",
  emphasized = false,
  htmlFor,
}: DefinitionItemProps) {
  return (
    <div
      className={clsx(
        styles.root,
        styles[layout],
        styles[`spacing-${spacingSize}`],
        className,
      )}>
      <dt className={clsx(styles.term, termHidden && "visually-hidden")}>
        {htmlFor ? <label htmlFor={htmlFor}>{term}</label> : term}
      </dt>

      <dd className={clsx(styles.description, emphasized && styles.emphasized)}>
        {children}
      </dd>
    </div>
  )
}
