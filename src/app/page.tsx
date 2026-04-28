import { Footer, Header, Main, SearchInput, SearchResults } from "@/components"

export default function Home() {
  return (
    <div>
      <Header />
      <Main>
        <section>
          <SearchInput />
        </section>
        <section>
          <SearchResults repositories={[]} />
        </section>
      </Main>
      <Footer />
    </div>
  )
}

