"use client"

import { useMemo, useState } from "react"

import { Input } from "@/components"
import { debounce } from "@/lib/utils/debounce"

type PageInputProps = {
  currentPage: number
  totalPages: number
  onChangePage: (page: number) => void
  disabled?: boolean
}

export function PageInput({
  currentPage,
  totalPages,
  onChangePage,
  disabled,
}: PageInputProps) {
  const [draft, setDraft] = useState(String(currentPage))

  const debouncedPageChange = useMemo(
    () =>
      debounce((value: string) => {
        if (value.trim() === "") {
          return
        }

        const page = Number(value)

        if (!Number.isFinite(page)) {
          return
        }

        const clamped = Math.min(Math.max(page, 1), totalPages)

        if (clamped !== currentPage) {
          onChangePage(clamped)
        }
      }, 500),
    [currentPage, totalPages, onChangePage],
  )

  const handleChange = (value: string) => {
    setDraft(value)
    debouncedPageChange(value)
  }

  return (
    <Input
      type="number"
      aria-label="ページ番号を入力"
      min={1}
      max={totalPages}
      value={draft}
      onChange={(event) => handleChange(event.target.value)}
      disabled={disabled}
    />
  )
}
