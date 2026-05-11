/**
 * 言語フィルタのオプション
 */
export const LANGUAGE_FILTER_OPTIONS = [
  { label: "すべて", value: "" },
  { label: "TypeScript", value: "TypeScript" },
  { label: "JavaScript", value: "JavaScript" },
  { label: "Python", value: "Python" },
  { label: "Java", value: "Java" },
  { label: "C#", value: "C#" },
  { label: "C++", value: "C++" },
  { label: "C", value: "C" },
  { label: "Go", value: "Go" },
  { label: "Rust", value: "Rust" },
  { label: "Ruby", value: "Ruby" },
  { label: "PHP", value: "PHP" },
  { label: "Swift", value: "Swift" },
  { label: "Kotlin", value: "Kotlin" },
  { label: "Dart", value: "Dart" },
  { label: "Scala", value: "Scala" },
  { label: "R", value: "R" },
  { label: "Shell", value: "Shell" },
  { label: "HTML", value: "HTML" },
  { label: "CSS", value: "CSS" },
  { label: "SCSS", value: "SCSS" },
  { label: "Vue", value: "Vue" },
  { label: "Svelte", value: "Svelte" },
  { label: "Astro", value: "Astro" },
  { label: "JSON", value: "JSON" },
  { label: "YAML", value: "YAML" },
  { label: "Markdown", value: "Markdown" },
  { label: "Dockerfile", value: "Dockerfile" },
  { label: "SQL", value: "SQL" },
  { label: "GraphQL", value: "GraphQL" },
  { label: "Other", value: "Other" },
] as const

export type LanguageFilterValue =
  (typeof LANGUAGE_FILTER_OPTIONS)[number]["value"]

