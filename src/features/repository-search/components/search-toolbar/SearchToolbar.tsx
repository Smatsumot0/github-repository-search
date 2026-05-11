"use client"

import clsx from "clsx"
import { useOptimistic } from "react"

import { DefinitionItem } from "@/components"
import { SearchOrder, SearchSort } from "@/lib/constants/search"

import { OrderToggle } from "./components/order-toggle/OrderToggle"
import { PerPageSelect } from "./components/per-page-select/PerPageSelect"
import { SortSelect } from "./components/sort-select/SortSelect"
import styles from "./SearchToolbar.module.css"

export type SearchOptions = {
  perPage: number
  sort: SearchSort
  order: SearchOrder
}

type SearchToolbarProps = {
  searchOptions: SearchOptions
  disabled?: boolean
  onChange: (param: string, nextValue: string) => void
  startTransition: (callback: () => void) => void
}

export function SearchToolbar({
  searchOptions,
  disabled,
  onChange,
  startTransition,
}: SearchToolbarProps) {
  const [optimisticOptions, setOptimisticOptions] = useOptimistic(
    searchOptions,
    (currentState, nextOptions: Partial<SearchOptions>) => ({
      ...currentState,
      ...nextOptions,
    }),
  )

  const handleChange = (
    param: string,
    nextValue: string,
    nextOptions: Partial<SearchOptions>,
  ) => {
    startTransition(() => {
      setOptimisticOptions(nextOptions)
      onChange(param, nextValue)
    })
  }

  return (
    <dl className={clsx("toolbar", styles.toolbar)}>
      <DefinitionItem
        term="表示件数"
        layout="horizontal"
        className={clsx("toolbar-group", styles.group)}>
        <PerPageSelect
          value={optimisticOptions.perPage}
          onChange={(nextPerPage) =>
            handleChange("perPage", String(nextPerPage), {
              perPage: nextPerPage,
            })
          }
          disabled={disabled}
        />
      </DefinitionItem>

      <DefinitionItem
        term="ソート"
        layout="horizontal"
        className={clsx("toolbar-group", styles.group)}>
        <SortSelect
          value={optimisticOptions.sort}
          onChange={(nextSort) =>
            handleChange("sort", nextSort, {
              sort: nextSort,
            })
          }
          disabled={disabled}
        />
      </DefinitionItem>

      <DefinitionItem
        term="表示順"
        layout="horizontal"
        termHidden
        className={clsx("toolbar-group", styles.group)}>
        <OrderToggle
          value={optimisticOptions.order}
          onChange={(nextOrder) =>
            handleChange("order", nextOrder, {
              order: nextOrder,
            })
          }
          disabled={disabled}
        />
      </DefinitionItem>
    </dl>
  )
}
