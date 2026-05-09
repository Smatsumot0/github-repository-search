"use client"

import { ChangeEvent, useMemo, useState } from "react"
import { Input } from "@/components"
import { debounce } from "@/lib/utils/debounce"

type PageInputProps = {
  currentPage: number
  totalPages: number
  onChangePage: (page: number) => void
}

const DEBOUNCE_DELAY = 500

export function PageInput({
  currentPage,
  totalPages,
  onChangePage,
}: PageInputProps) {
  const [value, setValue] = useState(String(currentPage))

  const debouncedChangePage = useMemo(
    () =>
      debounce((inputValue: string) => {
        if (inputValue === "") return

        const page = Number(inputValue)

        if (!Number.isInteger(page)) return

        const nextPage = Math.min(Math.max(page, 1), totalPages)

        setValue(String(nextPage))
        onChangePage(nextPage)
      }, DEBOUNCE_DELAY),
    [totalPages, onChangePage],
  )

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value

    setValue(nextValue)
    debouncedChangePage(nextValue)
  }

  return (
    <Input
      key={currentPage}
      type="number"
      min={1}
      max={totalPages}
      value={value}
      onChange={handleChange}
    />
  )
}

