import { notFound } from "next/navigation"

import { RepositoryDetail } from "@/features/repository-detail"
import { fetchRepository } from "@/lib/github/fetchRepository"

type RepositoryDetailPageProps = {
  params: Promise<{
    owner: string
    repo: string
  }>
}

export default async function RepositoryDetailPage({
  params,
}: RepositoryDetailPageProps) {
  const { owner, repo } = await params

  const repository = await fetchRepository({ owner, repo })

  if (repository === null) {
    notFound()
  }

  return <RepositoryDetail repository={repository} />
}
