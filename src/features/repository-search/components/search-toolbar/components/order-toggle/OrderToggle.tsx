import { Button } from "@/components"
import { SEARCH_ORDER, SearchOrder } from "@/lib/constants/search"

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
  const nextValue =
    value === SEARCH_ORDER.DESC ? SEARCH_ORDER.ASC : SEARCH_ORDER.DESC
  const label = value === SEARCH_ORDER.DESC ? "降順" : "昇順"
  const nextLabel = nextValue === SEARCH_ORDER.DESC ? "降順" : "昇順"

  return (
    <Button
      className={styles.button}
      aria-label={`${nextLabel}に変更する`}
      aria-pressed={value === SEARCH_ORDER.DESC}
      disabled={disabled}
      onClick={() => onChange(nextValue)}>
      <span aria-hidden="true">{value === SEARCH_ORDER.DESC ? "↓" : "↑"}</span>
      <span className="visually-hidden">現在は{label}です</span>
    </Button>
  )
}

