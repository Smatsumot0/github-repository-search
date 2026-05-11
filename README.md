# GitHub Repository Search

Next.js App Router を使用して作成した GitHub リポジトリ検索アプリケーションです。  
GitHub REST API (`search/repositories`, `repos/{owner}/{repo}`) を利用しリポジトリの検索・絞り込み・ソート・詳細表示ができます。

## 使用技術

### Application

- Next.js 16.2.4 (App Router)
- React 19.2.4
- TypeScript 5
- CSS Modules
- clsx

### Testing

- Vitest 4.1.5
- React Testing Library
- Testing Library User Event
- MSW
- @vitest/coverage-v8

### Development

- ESLint 9
- eslint-config-next
- eslint-plugin-simple-import-sort
- React Compiler

---

## 主な機能

- GitHub リポジトリ検索
- 検索結果一覧表示
- ソート切り替え
- フィルター機能
  - 言語
  - 最小 Star 数
  - 更新日時
  - Fork 除外
- ページネーション
- リポジトリ詳細ページ
- ローディング表示
- エラー表示
- レスポンシブ対応
- ダークテーマ対応
- テスト実装

---

## デモ

[https://github-repository-search-ten.vercel.app/](https://github-repository-search-ten.vercel.app/)

## セットアップ

### 依存関係のインストール

```bash
pnpm install
```

### 開発サーバー起動

```bash
pnpm dev
```

ブラウザで以下を開いてください。

```bash
http://localhost:3000
```

---

## テスト実行

```bash
pnpm test
```

---

## 実装方針

### App Router を活かした設計

検索条件は URL クエリパラメータで管理しています。

- 検索キーワード
- ページ番号
- ソート条件
- 各種フィルター

この構成により以下を実現しています。

- ブラウザバック / リロード時の状態復元
- URL 共有による検索条件の再現
- 状態管理のシンプル化

検索結果の取得は Server Component 側で行い、App Router の特性を活かした構成にしました。

---

### 検索 UX

検索ボタンは設けず、入力内容に応じて検索結果が更新される UI にしています。

ただし入力のたびに API を呼ぶと不要なリクエストが増えるため、debounce を使って一定時間入力が止まってから URL を更新しています。

また、短すぎるキーワードではノイズの多い結果になりやすいため、最小文字数を設定しています。

---

### API データの取り扱い

GitHub API のレスポンスをそのまま UI に渡さず、アプリケーション内で扱いやすい型へ変換しています。

これにより:

- UI が外部 API のレスポンス形式に依存しにくい
- 表示ロジックをシンプルに保てる
- API 変更時の影響範囲を限定できる

ようにしています。

---

### バリデーション

URL クエリパラメータは不正な値が入りうるため、パース・検証処理を用意しています。

例:

- 不正なページ番号 → 1 に補正
- 不正な数値フィルター → 無視
- 未定義のソート値 → デフォルト値へ補正

URL 由来の値をそのまま信用しない構成にしています。

---

### コンポーネント設計

画面単位ではなく責務単位でコンポーネントを分割しています。

例:

- `SearchInput`
- `SearchToolbar`
- `FilterToolbar`
- `SearchResults`
- `RepositoryCard`
- `Pagination`
- `RepositoryDetail`

また、検索関連の UI は `features/repository-search` 配下に集約し、機能単位で整理しています。

---

### UI / UX

デザイン性よりも、使いやすさと情報の見やすさを重視しました。

対応内容:

- 検索前メッセージ
- 検索結果なしメッセージ
- エラーメッセージ
- ローディング表示
- レスポンシブ対応
- ダークテーマ対応
- semantic HTML の利用
- 画像の代替テキスト
- キーボード操作への配慮

---

## テスト方針

内部実装よりも、ユーザー視点での振る舞いを重視してテストしています。

主なテスト対象:

### UI

- 検索前の表示
- 検索結果なしの表示
- 検索結果一覧表示
- リポジトリカード表示
- ページネーション操作
- ソート変更
- フィルター変更
- ページ直接入力

### ロジック

- URL パラメータのバリデーション
- GitHub API レスポンス変換
- ページ番号補正
- フィルター値の変換

### API

API 通信を伴う処理は MSW でモック化し、外部 API の状態に依存しないテストにしています。

---

### ディレクトリ構成

```text
src/
├── app/                     # ルーティング
│   └── repositories/       # リポジトリ詳細ページ
├── components/              # 汎用 UI コンポーネント
├── features/
│   ├── repository-search   # リポジトリ検索機能
│   ├── repository-detail/  # リポジトリ詳細機能
│   └── not-found/          # 404 表示
├── lib/
│   ├── github/             # GitHub API 通信・データ変換
│   ├── constants/          # 定数
│   └── utils/              # 汎用ユーティリティ
├── styles/                  # グローバルスタイル / デザイントークン
└── test/                    # テスト設定 / モック
```

---

## AI 利用について

本課題では AI を以下の用途で利用しました。

- 実装方針の整理
- テスト観点の洗い出し
- README の文章整理
- コード改善案の検討

ただし、生成結果をそのまま採用せず、
課題要件・実装内容・設計意図に照らして内容を確認し、
必要な修正を行ったうえで利用しています。

