"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { DefinitionItem } from "@/components/definition-item/DefinitionItem"
import { SearchOrder, SearchSort } from "@/lib/constants/search"

import { OrderToggle } from "./components/order-toggle/OrderToggle"
import { PerPageSelect } from "./components/per-page-select/PerPageSelect"
import styles from "./SearchToolbar.module.css"

type SearchToolbarProps = {
  perPage: number
  order: SearchOrder
  disabled?: boolean
  startTransition: (callback: () => void) => void
}

export function SearchToolbar({
  perPage,
  order,
  disabled,
  startTransition,
}: SearchToolbarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleChange = (param: string, nextValue: string) => {
    const params = new URLSearchParams(searchParams)

    params.set(param, nextValue)
    params.set("page", "1")

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`)
    })
  }

  return (
    <dl className={styles.toolbar}>
      <DefinitionItem term="表示件数" layout="horizontal">
        <PerPageSelect
          value={perPage}
          onChange={(nextPerPage) =>
            handleChange("perPage", String(nextPerPage))
          }
          disabled={disabled}
        />
      </DefinitionItem>

      <DefinitionItem term="ソート" layout="horizontal" termHidden={true}>
        <OrderToggle
          value={order}
          onChange={(nextOrder) => handleChange("order", nextOrder)}
          disabled={disabled}
        />
      </DefinitionItem>
    </dl>
  )
}

