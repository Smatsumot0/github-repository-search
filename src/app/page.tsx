import { Footer, Header, Main } from "@/components"
import { RepositorySearch } from "@/features/repository-search"

type HomeProps = {
  searchParams: Promise<{
    q?: string
  }>
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams
  return (
    <div>
      <Header />
      <Main>
        <RepositorySearch query={params.q ?? ""} />
      </Main>
      <Footer />
    </div>
  )
}

