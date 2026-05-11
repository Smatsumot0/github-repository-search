"use client"

import { useRouter, useSearchParams } from "next/navigation"
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

export function SearchInput({ startTransition }: SearchInputProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const initialQuery = searchParams.get("q") ?? ""
  const [value, setValue] = useState(initialQuery)

  const updateQuery = useMemo(
    () =>
      debounce((query: string) => {
        if (query.length < MIN_SEARCH_QUERY_LENGTH) {
          startTransition?.(() => {
            router.replace("/")
          })
          return
        }

        const params = new URLSearchParams()
        if (query.trim()) {
          params.set("q", query)
        }

        startTransition(() => {
          router.replace(`?${params.toString()}`, { scroll: false })
        })
      }, SEARCH_DEBOUNCE_DELAY_MS),
    [router, startTransition],
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

