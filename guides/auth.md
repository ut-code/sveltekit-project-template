# Authentication

## 基礎知識

認証の実装には、主に 3 通りの方法がある

- User Management Platform を使う
- Auth library を使う
- 自力実装 (Roll your own auth)

## User Management Platform を使う

- Firebase Authentication
  - 無料: 50k monthly active users (MAUs)
- Clerk
  - 無料: 10,000 MAUs
    - 登録後 24 時間以内に戻ってきた人のみカウント
- Auth0 (Okta)
  - 無料: 25000 MAUs

## Auth Library を使う

- Auth.js <https://authjs.dev/> (旧 NextAuth.js)
- Better-auth <https://www.better-auth.com/>

(todo: それぞれ使ってみた人が感想を書いていく)

## 自力実装 (Roll your own auth)

learning resource: Lucia Auth <https://lucia-auth.com/>

PASETO / JWT とか bcrypt とか勉強することはたくさんあるので、がんばってくれ
