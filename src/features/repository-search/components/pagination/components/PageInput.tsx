"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components"
import { debounce } from "@/lib/utils/debounce"

type PageInputProps = {
  currentPage: number
  totalPages: number
  onChangePage: (page: number) => void
}

export function PageInput({
  currentPage,
  totalPages,
  onChangePage,
}: PageInputProps) {
  const [draft, setDraft] = useState("")

  const debouncedPageChange = useMemo(
    () =>
      debounce((value: string) => {
        const page = Number(value)

        if (!Number.isFinite(page)) {
          return
        }

        const clamped = Math.min(Math.max(page, 1), totalPages)

        if (clamped !== currentPage) {
          onChangePage(clamped)
        }

        setDraft("")
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
      min={1}
      max={totalPages}
      value={draft === "" ? String(currentPage) : draft}
      onChange={(event) => handleChange(event.target.value)}
    />
  )
}

