# SvelteKit Monolith Template

Bun × Svelte 5 で動くフルスタックモノリスの雛形。

## 採用技術

- ランタイム: Bun ≥1.2
- フロントエンド / バックエンド: Svelte 5 + SvelteKit
- UI: TailwindCSS + DaisyUI
- データベース: Drizzle ORM + SQLite
- 認証: better-auth

## ディレクトリ

```
src/        アプリ本体
| lib/      アプリ全体で使うライブラリコード
| routes/   ルート定義
| services/ 切り出し可能なアプリの部分を記述
| ui/       UI コンポネント

target/     本番ビルド出力
```

## はじめかた

```bash
bun install --frozen-lockfile  # 依存取得
bun dev                        # 開発サーバー :3000
```

## デプロイ

`adapter-bun` 採用のため、Railway/Fly.io など Bun が動く環境で

```bash
bun run build
cd target; bun start # $PORT を自動バインド
```

## ライセンス

MIT © 2025
