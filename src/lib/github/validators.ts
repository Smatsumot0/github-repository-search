import {
  LANGUAGE_FILTER_OPTIONS,
  LanguageFilterValue,
} from "@/lib/constants/language"

export function isLanguageFilterValue(
  value: string,
): value is LanguageFilterValue {
  return LANGUAGE_FILTER_OPTIONS.some((option) => option.value === value)
}
