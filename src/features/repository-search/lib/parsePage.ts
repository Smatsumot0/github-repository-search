export function parsePage(page: string | string[] | undefined) {
  const value = Array.isArray(page) ? page[0] : page
  const parsed = Math.floor(Number(value))

  if (!Number.isFinite(parsed) || parsed < 1) {
    return 1
  }

  return parsed
}

