"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { PerPageSelect } from "./components/per-page-select/PerPageSelect"
import styles from "./SearchToolbar.module.css"

type SearchToolbarProps = {
  perPage: number
  disabled?: boolean
}

export function SearchToolbar({ perPage, disabled }: SearchToolbarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handlePerPageChange = (nextPerPage: number) => {
    const params = new URLSearchParams(searchParams)

    params.set("perPage", String(nextPerPage))
    params.set("page", "1")

    router.replace(`${pathname}?${params.toString()}`)
  }

  return (
    <dl className={styles.toolbar}>
      <div>
        <dt>表示件数</dt>
        <dd>
          <PerPageSelect
            value={perPage}
            onChange={handlePerPageChange}
            disabled={disabled}
          />
        </dd>
      </div>
    </dl>
  )
}

