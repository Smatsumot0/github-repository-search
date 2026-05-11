import { Button } from "@/components"
import { SearchOrder } from "@/features/repository-search/types"

import styles from "./OrderToggle.module.css"

type OrderToggleProps = {
  value: SearchOrder
  onChange: (value: SearchOrder) => void
  disabled?: boolean
}

export function OrderToggle({
  value,
  onChange,
  disabled = false,
}: OrderToggleProps) {
  const nextValue = value === "desc" ? "asc" : "desc"
  const label = value === "desc" ? "降順" : "昇順"
  const nextLabel = nextValue === "desc" ? "降順" : "昇順"

  return (
    <Button
      className={styles.button}
      aria-label={`${nextLabel}に変更する`}
      aria-pressed={value === "desc"}
      disabled={disabled}
      onClick={() => onChange(nextValue)}>
      <span aria-hidden="true">{value === "desc" ? "↓" : "↑"}</span>
      <span className="visually-hidden">現在は{label}です</span>
    </Button>
  )
}

