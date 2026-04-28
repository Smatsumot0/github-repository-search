import { Footer, Header, Main, SearchInput } from "@/components"

export default function Home() {
  return (
    <div>
      <Header />
      <Main>
        <section>
          <SearchInput />
        </section>
      </Main>
      <Footer />
    </div>
  )
}

