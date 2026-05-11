import "@/styles/globals.css"

import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import { Footer, Header, Main } from "@/components"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "GitHub Repository Search",
    template: "%s | GitHub Repository Search",
  },
  description: "Search GitHub repositories with filters and sorting.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <Header />
        <Main>{children}</Main>
        <Footer />
      </body>
    </html>
  )
}

