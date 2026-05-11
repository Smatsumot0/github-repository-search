import { useOptimistic } from "react"

import { Checkbox, DefinitionItem } from "@/components"
import { LanguageFilterValue } from "@/lib/constants/language"
import { PushedPeriod } from "@/lib/constants/search"

import { LanguageFilter } from "./components/language-filter/LanguageFilter"
import { MinStarsFilter } from "./components/min-stars-filter/MinStarsFilter"
import styles from "./FilterToolbar.module.css"

export type FilterOptions = {
  language?: LanguageFilterValue
  minStars?: number
  excludeForks?: boolean
  pushed?: PushedPeriod
}

type FilterToolbarProps = {
  filterOptions: FilterOptions
  disabled?: boolean
  onChange: (param: string, nextValue: string) => void
  startTransition: (callback: () => void) => void
}

export function FilterToolbar({
  filterOptions,
  disabled,
  onChange,
  startTransition,
}: FilterToolbarProps) {
  const [optimisticOptions, setOptimisticOptions] = useOptimistic(
    filterOptions,
    (currentState, nextOptions: Partial<FilterOptions>) => ({
      ...currentState,
      ...nextOptions,
    }),
  )

  const handleChange = (
    param: string,
    nextValue: string,
    nextOptions: Partial<FilterOptions>,
  ) => {
    startTransition(() => {
      setOptimisticOptions(nextOptions)
      onChange(param, nextValue)
    })
  }

  return (
    <dl className={styles.toolbar}>
      <DefinitionItem term="言語" layout="horizontal">
        <LanguageFilter
          value={optimisticOptions.language ?? ""}
          disabled={disabled}
          onChange={(nextLanguage) =>
            handleChange("language", nextLanguage, {
              language: nextLanguage || undefined,
            })
          }
        />
      </DefinitionItem>

      <DefinitionItem term="Star" layout="horizontal">
        <MinStarsFilter
          value={optimisticOptions.minStars}
          disabled={disabled}
          onChange={(nextMinStars) =>
            handleChange("minStars", nextMinStars ? String(nextMinStars) : "", {
              minStars: nextMinStars,
            })
          }
        />
      </DefinitionItem>

      {/*
      <DefinitionItem term="更新日時" layout="horizontal">
        <PushedFilter
          value={pushed ?? ""}
          disabled={disabled}
          onChange={(value) => onChange("pushed", value)}
        />
      </DefinitionItem> 
      */}

      <DefinitionItem
        term="Fork除外"
        layout="horizontal"
        htmlFor="exclude-forks">
        <Checkbox
          id="exclude-forks"
          checked={optimisticOptions.excludeForks ?? false}
          disabled={disabled}
          onChange={(checked) =>
            handleChange("excludeForks", String(checked), {
              excludeForks: checked,
            })
          }
        />
      </DefinitionItem>
    </dl>
  )
}

