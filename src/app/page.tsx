import { RepositorySearch } from "@/features/repository-search"

type HomeProps = {
  searchParams: Promise<{
    q?: string
    page?: string
    perPage?: string
    sort?: string
    order?: string
    language?: string
    minStars?: string
    excludeForks?: string
    pushed?: string
  }>
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams

  return <RepositorySearch searchParams={params} />
}
