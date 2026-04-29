import { Section } from "@/components"
import { SearchInput } from "./components/search-input/SearchInput"
import { SearchResults } from "./components/search-results/SearchResults"
import { searchRepositories } from "@/lib/github/api"

type RepositorySearchProps = {
  query: string
}

export async function RepositorySearch({ query }: RepositorySearchProps) {
  const repositories = await searchRepositories(query)

  return (
    <Section aria-label="GitHubリポジトリの検索">
      <SearchInput defaultValue={query} />
      <SearchResults repositories={repositories} query={query} />
    </Section>
  )
}

