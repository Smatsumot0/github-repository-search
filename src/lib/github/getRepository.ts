import { cache } from "react"

import { fetchRepository } from "./fetchRepository"

export const getRepository = cache(fetchRepository)
