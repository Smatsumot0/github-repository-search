import { fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { startTransition } from "react"
import { describe, expect, it, vi } from "vitest"

import { PUSHED_PERIOD, PushedPeriod } from "@/lib/constants/search"

import { FilterToolbar } from "./FilterToolbar"

vi.mock("@/components", () => ({
  DefinitionItem: ({
    term,
    children,
  }: {
    term: string
    children: React.ReactNode
  }) => (
    <div>
      <span>{term}</span>
      {children}
    </div>
  ),
  Checkbox: ({
    id,
    checked,
    disabled,
    onChange,
  }: {
    id: string
    checked: boolean
    disabled?: boolean
    onChange: (checked: boolean) => void
  }) => (
    <input
      id={id}
      aria-label="Fork除外"
      type="checkbox"
      checked={checked}
      disabled={disabled}
      onChange={(event) => onChange(event.currentTarget.checked)}
    />
  ),
}))

vi.mock("./components/language-filter/LanguageFilter", () => ({
  LanguageFilter: ({
    value,
    disabled,
    onChange,
  }: {
    value: string
    disabled?: boolean
    onChange: (value: string) => void
  }) => (
    <select
      aria-label="言語"
      value={value}
      disabled={disabled}
      onChange={(event) => onChange(event.currentTarget.value)}>
      <option value="">指定なし</option>
      <option value="TypeScript">TypeScript</option>
      <option value="JavaScript">JavaScript</option>
    </select>
  ),
}))

vi.mock("./components/min-stars-filter/MinStarsFilter", () => ({
  MinStarsFilter: ({
    value,
    disabled,
    onChange,
  }: {
    value?: number
    disabled?: boolean
    onChange: (value: number | undefined) => void
  }) => (
    <input
      aria-label="Star"
      type="number"
      value={value ?? ""}
      disabled={disabled}
      onChange={(event) =>
        onChange(
          event.currentTarget.value === ""
            ? undefined
            : Number(event.currentTarget.value),
        )
      }
    />
  ),
}))

vi.mock("./components/pushed-filter/PushedFilter", () => ({
  PushedFilter: ({
    value,
    disabled,
    onChange,
  }: {
    value?: PushedPeriod
    disabled?: boolean
    onChange: (value: PushedPeriod | undefined) => void
  }) => (
    <select
      aria-label="更新日時"
      value={value ?? ""}
      disabled={disabled}
      onChange={(event) =>
        onChange(
          event.currentTarget.value === ""
            ? undefined
            : (event.currentTarget.value as PushedPeriod),
        )
      }>
      <option value="">指定なし</option>
      <option value={PUSHED_PERIOD.WEEK}>1週間以内</option>
      <option value={PUSHED_PERIOD.MONTH}>1か月以内</option>
    </select>
  ),
}))

describe("FilterToolbar", () => {
  const setup = () => {
    const onChange = vi.fn()
    const startTransitionMock = vi.fn((callback: () => void) => {
      startTransition(callback)
    })

    render(
      <FilterToolbar
        filterOptions={{
          language: "TypeScript",
          minStars: 100,
          pushed: PUSHED_PERIOD.MONTH,
          excludeForks: true,
        }}
        onChange={onChange}
        startTransition={startTransitionMock}
      />,
    )

    return {
      user: userEvent.setup(),
      onChange,
      startTransitionMock,
    }
  }

  it("現在のフィルター条件を表示する", () => {
    setup()

    expect(screen.getByLabelText("言語")).toHaveValue("TypeScript")
    expect(screen.getByLabelText("Star")).toHaveValue(100)
    expect(screen.getByLabelText("更新日時")).toHaveValue(PUSHED_PERIOD.MONTH)
    expect(screen.getByLabelText("Fork除外")).toBeChecked()
  })

  it("言語を変更すると onChange が呼ばれる", async () => {
    const { user, onChange, startTransitionMock } = setup()

    await user.selectOptions(screen.getByLabelText("言語"), "JavaScript")

    expect(startTransitionMock).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith("language", "JavaScript")
  })

  it("言語を未指定に戻すと空文字で onChange が呼ばれる", async () => {
    const { user, onChange } = setup()

    await user.selectOptions(screen.getByLabelText("言語"), "")

    expect(onChange).toHaveBeenCalledWith("language", "")
  })

  it("Starを変更すると onChange が呼ばれる", () => {
    const { onChange } = setup()

    fireEvent.change(screen.getByLabelText("Star"), {
      target: { value: "500" },
    })

    expect(onChange).toHaveBeenLastCalledWith("minStars", "500")
  })

  it("Starを空にすると空文字で onChange が呼ばれる", () => {
    const { onChange } = setup()

    fireEvent.change(screen.getByLabelText("Star"), {
      target: { value: "" },
    })

    expect(onChange).toHaveBeenLastCalledWith("minStars", "")
  })

  it("更新日時を変更すると onChange が呼ばれる", async () => {
    const { user, onChange } = setup()

    await user.selectOptions(
      screen.getByLabelText("更新日時"),
      PUSHED_PERIOD.WEEK,
    )

    expect(onChange).toHaveBeenCalledWith("pushed", PUSHED_PERIOD.WEEK)
  })

  it("Fork除外を切り替えると onChange が呼ばれる", async () => {
    const { user, onChange } = setup()

    await user.click(screen.getByLabelText("Fork除外"))

    expect(onChange).toHaveBeenCalledWith("excludeForks", "")
  })

  it("disabled が true の場合、各フィルターを操作できない", () => {
    render(
      <FilterToolbar
        filterOptions={{
          language: "TypeScript",
          minStars: 100,
          pushed: PUSHED_PERIOD.MONTH,
          excludeForks: true,
        }}
        disabled
        onChange={vi.fn()}
        startTransition={vi.fn()}
      />,
    )

    expect(screen.getByLabelText("言語")).toBeDisabled()
    expect(screen.getByLabelText("Star")).toBeDisabled()
    expect(screen.getByLabelText("更新日時")).toBeDisabled()
    expect(screen.getByLabelText("Fork除外")).toBeDisabled()
  })
})

