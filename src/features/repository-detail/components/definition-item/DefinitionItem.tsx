import clsx from "clsx"

import styles from "./DefinitionItem.module.css"

type DefinitionItemProps = {
  term: string
  children: React.ReactNode
  className?: string
  termHidden?: boolean
}

export function DefinitionItem({
  term,
  children,
  className,
  termHidden = false,
}: DefinitionItemProps) {
  return (
    <div className={clsx(styles.root, className)}>
      <dt className={clsx(styles.term, termHidden && "visually-hidden")}>
        {term}
      </dt>
      <dd className={styles.description}>{children}</dd>
    </div>
  )
}

