# GitHub Repository Search

GitHub のリポジトリを検索し、詳細情報を確認できる Web アプリケーションです。

## 概要

GitHub Search API を利用してリポジトリ検索を行い、検索結果一覧と詳細情報を表示します。

### 主な機能

- リポジトリ検索（2文字以上で検索）
- 検索キーワード変更時の自動検索（debounce）
- ページネーション
- リポジトリ詳細表示
- GitHub / Homepage への外部リンク
- レスポンシブ対応
- ダークモード対応

---

## 技術スタック

### Frontend

- Next.js 16 (App Router)
- React 19
- TypeScript

### Styling

- CSS Modules
- CSS Variables

### Testing

- Vitest
- React Testing Library
- MSW

### API

- GitHub REST API

---

## セットアップ

### 必要環境

- Node.js
- pnpm
- Volta（推奨）

### インストール

```bash
pnpm install
```

### 開発サーバー起動

```bash
pnpm dev
```

---

## テスト

### 全テスト実行

```bash
pnpm test
```

### UI付き実行

```bash
pnpm test:ui
```

### カバレッジ

```bash
pnpm test:coverage
```

---

## テスト方針

以下の観点でテストを実装しています。

### Unit Test

コンポーネント単体の表示・分岐・イベントを検証

対象例：

- RepositoryCard
- SearchResults
- PageInput
- Pagination

### Integration Test

画面単位で主要なユーザー操作を検証

対象例：

- RepositorySearch
- RepositoryDetail

### API Test

GitHub API との通信処理を検証

対象例：

- fetchRepositories
- fetchRepository

---

## ディレクトリ構成

```txt
src
├── app
├── components
├── features
│   ├── repository-search
│   └── repository-detail
├── lib
│   └── github
└── test
```

---

## 工夫した点

### App Router / Server Components を活用

データ取得は Server Component 側で行い、クライアント側の不要な `useEffect` を避けました。

### アクセシビリティを意識

- semantic HTML
- `time` 要素
- `dl / dt / dd`
- aria-label

を適切に使用しています。

### 保守性

- 共通モックを factory 化
- Magic Number の排除
- 定数管理
- コンポーネント責務の分離

---

## 今後の改善案

- ソート機能
- フィルター機能
- GitHub API Rate Limit 対応
- Suspense を活用したローディング改善
- E2E テスト追加

---

## 備考

GitHub API の仕様上、未認証アクセスでは Rate Limit に制限があります。
