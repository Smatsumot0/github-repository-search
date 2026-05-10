import { RepositorySearch } from "@/features/repository-search"
import { parsePage } from "@/features/repository-search/lib/parsePage"

type HomeProps = {
  searchParams: Promise<{
    q?: string
    page?: string
  }>
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams
  const pageNumber = parsePage(params.page)

  return <RepositorySearch query={params.q ?? ""} page={pageNumber} />
}

