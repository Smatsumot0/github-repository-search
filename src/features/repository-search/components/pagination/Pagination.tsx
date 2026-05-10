"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import styles from "./Pagination.module.css"
import { Button } from "@/components"
import clsx from "clsx"
import { PageInput } from "./components/PageInput"

type PaginationProps = {
  currentPage: number
  totalPages: number
  disabled?: boolean
  startTransition?: (callback: () => void) => void
}

export function Pagination({
  currentPage,
  totalPages,
  disabled,
  startTransition,
}: PaginationProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handlePageChange = (nextPage: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", String(nextPage))

    startTransition?.(() => {
      router.push(`${pathname}?${params.toString()}`)
    })
  }

  return (
    <nav className={styles.pagination} aria-label="ページネーション">
      <div className={styles.left}>
        {/* 最初へ */}
        <Button
          className={clsx(styles.button, styles.edgeButton)}
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1 || disabled}>
          «
        </Button>
        {/* 前へ */}
        <Button
          className={styles.button}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1 || disabled}>
          ‹
        </Button>
      </div>

      <div className={styles.center}>
        <label className={styles.pageLabel}>
          <span className="visually-hidden">ページを選択</span>
          <PageInput
            currentPage={currentPage}
            totalPages={totalPages}
            onChangePage={handlePageChange}
            disabled={disabled}
          />
          <span className={styles.totalPages}>{totalPages}</span>
        </label>
      </div>

      <div className={styles.right}>
        <Button
          className={styles.button}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages || disabled}>
          ›
        </Button>

        <Button
          className={clsx(styles.button, styles.edgeButton)}
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage >= totalPages || disabled}>
          »
        </Button>
      </div>
    </nav>
  )
}

