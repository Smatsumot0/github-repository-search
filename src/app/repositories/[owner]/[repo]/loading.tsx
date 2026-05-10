import { Loading, Section } from "@/components"

export default function RepositoryLoading() {
  return (
    <Section aria-label="リポジトリ読み込み中">
      <Loading isLoading={true} />
    </Section>
  )
}

