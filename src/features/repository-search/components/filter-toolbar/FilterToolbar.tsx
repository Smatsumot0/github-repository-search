import { DefinitionItem } from "@/components/definition-item/DefinitionItem"
import { LanguageFilter } from "@/features/repository-search/components/filter-toolbar/components/language-filter/LanguageFilter"

type FilterToolbarProps = {
  language: string
  disabled?: boolean
  onChange: (param: string, nextValue: string) => void
}

export function FilterToolbar({
  language,
  disabled,
  onChange,
}: FilterToolbarProps) {
  return (
    <div>
      <DefinitionItem term="言語" layout="horizontal">
        <LanguageFilter
          value={language ?? ""}
          disabled={disabled}
          onChange={(value) => onChange("language", value)}
        />
      </DefinitionItem>
    </div>
  )
}

