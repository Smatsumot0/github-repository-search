"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useMemo, useState } from "react"

import { Input } from "@/components"
import {
  MIN_SEARCH_QUERY_LENGTH,
  SEARCH_DEBOUNCE_DELAY_MS,
} from "@/lib/constants/search"
import { debounce } from "@/lib/utils/debounce"

import styles from "./SearchInput.module.css"

type SearchInputProps = {
  defaultValue?: string
  startTransition: (callback: () => void) => void
}

export function SearchInput({
  defaultValue = "",
  startTransition,
}: SearchInputProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [value, setValue] = useState(defaultValue)

  const updateQuery = useMemo(
    () =>
      debounce((query: string) => {
        const trimmedQuery = query.trim()
        const params = new URLSearchParams(searchParams)

        if (trimmedQuery.length < MIN_SEARCH_QUERY_LENGTH) {
          params.delete("q")
          params.set("page", "1")

          startTransition(() => {
            router.replace(`${pathname}?${params.toString()}`, {
              scroll: false,
            })
          })

          return
        }

        params.set("q", trimmedQuery)
        params.set("page", "1")

        startTransition(() => {
          router.replace(`${pathname}?${params.toString()}`, { scroll: false })
        })
      }, SEARCH_DEBOUNCE_DELAY_MS),
    [pathname, router, searchParams, startTransition],
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = e.target.value
    setValue(nextValue)
    updateQuery(nextValue)
  }

  return (
    <Input
      className={styles.input}
      type="search"
      name="q"
      value={value}
      onChange={handleChange}
      placeholder="リポジトリを検索"
      aria-label="GitHubリポジトリを検索"
      autoComplete="off"
      spellCheck={false}
    />
  )
}
