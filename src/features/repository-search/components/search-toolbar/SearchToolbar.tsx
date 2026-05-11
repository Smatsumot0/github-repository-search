import { DefinitionItem } from "@/components"
import { SearchOrder, SearchSort } from "@/lib/constants/search"

import { OrderToggle } from "./components/order-toggle/OrderToggle"
import { PerPageSelect } from "./components/per-page-select/PerPageSelect"
import { SortSelect } from "./components/sort-select/SortSelect"
import styles from "./SearchToolbar.module.css"

type SearchToolbarProps = {
  perPage: number
  sort: SearchSort
  order: SearchOrder
  disabled?: boolean
  onChange: (param: string, nextValue: string) => void
}

export function SearchToolbar({
  perPage,
  sort,
  order,
  disabled,
  onChange,
}: SearchToolbarProps) {
  return (
    <>
      <dl className={styles.toolbar}>
        <DefinitionItem term="表示件数" layout="horizontal">
          <PerPageSelect
            value={perPage}
            onChange={(nextPerPage) => onChange("perPage", String(nextPerPage))}
            disabled={disabled}
          />
        </DefinitionItem>

        <div>
          <DefinitionItem term="ソート" layout="horizontal">
            <SortSelect
              value={sort}
              onChange={(nextSort) => onChange("sort", nextSort)}
              disabled={disabled}
            />
          </DefinitionItem>

          <DefinitionItem term="表示順" layout="horizontal" termHidden={true}>
            <OrderToggle
              value={order}
              onChange={(nextOrder) => onChange("order", nextOrder)}
              disabled={disabled}
            />
          </DefinitionItem>
        </div>
      </dl>
    </>
  )
}

