"use client"

import { debounce } from "@/lib/utils/debounce"
import { useRouter } from "next/navigation"
import { ChangeEvent, useMemo, useState } from "react"
import styles from "./SearchInput.module.css"
import {
  MIN_SEARCH_QUERY_LENGTH,
  SEARCH_DEBOUNCE_DELAY_MS,
} from "@/lib/constants/search"

type SearchInputProps = {
  defaultValue?: string
  disabled?: boolean
  startTransition: (callback: () => void) => void
}

export function SearchInput({
  defaultValue = "",
  disabled,
  startTransition,
}: SearchInputProps) {
  const router = useRouter()
  const [keyword, setKeyword] = useState(defaultValue)

  const debouncedSearch = useMemo(
    () =>
      debounce((query: string) => {
        if (query.length < MIN_SEARCH_QUERY_LENGTH) {
          startTransition?.(() => {
            router.replace("/")
          })
          return
        }

        startTransition?.(() => {
          router.replace(`/?q=${encodeURIComponent(query)}`)
        })
      }, SEARCH_DEBOUNCE_DELAY_MS),
    [router, startTransition],
  )

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.trim()

    setKeyword(event.target.value)
    debouncedSearch(query)
  }

  return (
    <input
      className={styles.input}
      type="search"
      name="q"
      value={keyword}
      onChange={handleChange}
      placeholder="リポジトリを検索"
      aria-label="GitHubリポジトリを検索"
      autoComplete="off"
      spellCheck={false}
      disabled={disabled}
    />
  )
}

