# Mailing

## 基礎知識

メールを送信するのに必要なステップは、

1. メール送信サービスの登録
2. 送り元のドメインにセキュリティ関連の登録
3. APIを叩く

## 1. メール送信サービスを選ぶ

おすすめのメール送信サービス:

- Gmail API (無料: 500メール/日)
  - Gmail アドレスからしか送信できない
- Brevo (無料: 300メール/日)
  - Organization を登録してから、有効にしてもらう必要がある。
  - ut.code(); の organization を @aster-void が持ってるので、使いたかったら連絡して

## 2. 送り元のドメインにセキュリティ関連の登録

DKIM とか DMARK とか言われるけど、よくわからない。
Brevo は cloudflare の auth を渡したら自動で設定してくれた。
注意: Brevo で登録した後、 cloudflare Dashboard から Email を有効にする必要がある。
[Account] -> [domain] -> Email だった気がする (うろ覚え)

## 3. APIを叩く

Brevo の場合、そこら辺の Youtube を探して出てきたやつを参考にしたらできる。
