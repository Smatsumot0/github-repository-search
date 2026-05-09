import { Section } from "@/components"
import { SearchInput } from "./components/search-input/SearchInput"
import { SearchResults } from "./components/search-results/SearchResults"
import { searchRepositories } from "@/lib/github/api"
import { Pagination } from "./components/pagination/Pagination"
import { SEARCH_PER_PAGE } from "@/lib/github/constants"

type RepositorySearchProps = {
  query: string
  page: number
}

export async function RepositorySearch({ query, page }: RepositorySearchProps) {
  const result = await searchRepositories({ query, page })
  const cappedTotal = Math.min(result.totalCount, 1000)
  const totalPages = Math.ceil(cappedTotal / SEARCH_PER_PAGE)

  return (
    <Section aria-label="GitHubリポジトリの検索">
      <SearchInput defaultValue={query} />
      <Pagination currentPage={page} totalPages={totalPages} />
      <SearchResults repositories={result.items} query={query} />
    </Section>
  )
}

