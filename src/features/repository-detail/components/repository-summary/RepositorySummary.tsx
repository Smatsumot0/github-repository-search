import { LanguageBadge } from "@/components"
import { DefinitionItem } from "@/features/repository-detail/components/definition-item/DefinitionItem"

type RepositorySummaryProps = {
  language: string | null
  description: string | null
}

export function RepositorySummary({
  language,
  description,
}: RepositorySummaryProps) {
  return (
    <dl>
      <DefinitionItem term="Language" termHidden={true}>
        <LanguageBadge language={language ?? "未設定"} />
      </DefinitionItem>

      {description && (
        <DefinitionItem term="Description" termHidden={true}>
          {description}
        </DefinitionItem>
      )}
    </dl>
  )
}

