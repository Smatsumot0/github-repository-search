import { Metadata } from "next"
import { notFound } from "next/navigation"

import { RepositoryDetail } from "@/features/repository-detail"
import { getRepository } from "@/lib/github/getRepository"

type RepositoryDetailPageProps = {
  params: Promise<{
    owner: string
    repo: string
  }>
  searchParams: Promise<{
    returnTo?: string
  }>
}

function sanitizeReturnTo(returnTo: string | undefined): string | undefined {
  if (!returnTo) {
    return undefined
  }

  if (!returnTo.startsWith("/") || returnTo.startsWith("//")) {
    return undefined
  }

  return returnTo
}

export async function generateMetadata({
  params,
}: RepositoryDetailPageProps): Promise<Metadata> {
  const { owner, repo } = await params
  const repository = await getRepository({ owner, repo })

  if (repository === null) {
    return {
      title: "Repository Not Found",
    }
  }

  return {
    title: repository.fullName,
    description:
      repository.description ?? `${repository.fullName} repository details`,
  }
}

export default async function RepositoryDetailPage({
  params,
  searchParams,
}: RepositoryDetailPageProps) {
  const { owner, repo } = await params
  const repository = await getRepository({ owner, repo })
  const returnTo = sanitizeReturnTo((await searchParams).returnTo)

  if (repository === null) {
    notFound()
  }

  return <RepositoryDetail repository={repository} returnTo={returnTo} />
}
