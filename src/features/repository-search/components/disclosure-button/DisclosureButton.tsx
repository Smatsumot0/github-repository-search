import clsx from "clsx"

import { Button } from "@/components"

import styles from "./DisclosureButton.module.css"

type DisclosureButtonProps = {
  children: React.ReactNode
  expanded: boolean
  onClick: () => void
  disabled?: boolean
  className?: string
}

export function DisclosureButton({
  children,
  expanded,
  onClick,
  disabled = false,
  className,
}: DisclosureButtonProps) {
  return (
    <Button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={clsx(styles.root, className)}
      aria-expanded={expanded}
      data-expanded={expanded}>
      <span>{children}</span>
    </Button>
  )
}

