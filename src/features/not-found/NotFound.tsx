import { Anchor, Section } from "@/components"

import styles from "./NotFound.module.css"

export function NotFound() {
  return (
    <Section aria-label="リポジトリが見つかりません" className={styles.root}>
      <div className={styles.content}>
        <h1>リポジトリが見つかりませんでした</h1>
        <p>指定したオーナーまたはリポジトリ名が正しくない可能性があります。</p>
      </div>
      <Anchor href="/" appearance="outlined">
        検索ページに戻る
      </Anchor>
    </Section>
  )
}

