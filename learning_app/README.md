# learning_app  

・URL（AWS (EC2, Route53...)＋Nginx（webサーバ）＋ Gunicorn（appサーバ））  
https://e-problems.net/

・サービスの説明動画  
https://youtu.be/rdK-0RdWkJg


テストアカウント  
メールアドレス：test@gmail.com  
パスワード：test0000

・パッケージのバージョン  
Django==2.2.24  
django-environ==0.8.0  
nginx==1.18.0  
gunicorn==20.1.0  
mysqlclient==2.0.3  
pytz==2021.1  
sqlparse==0.4.1  

・サービス内容  
ユーザ同士で問題を作り解くことを目指したWebサービス  

・基本機能  
問題の作成・編集（選択肢を選ぶ問題）  
問題を解く  
テストの自動採点  
問題の評価（いいねボタン）  
問題を解いた後に正解・不正解の可視化  
Twitterで問題を共有するためのボタン

・工夫した点  
選択肢の数を変更できる（動的フォームの作成）  
いいねボタンをAjaxを用いて実装  
問題の分野によって問題のタイトルが動的に変化する（Ajaxを利用）  
テスト自動作成機能

・今後の課題  
分からない問題の質問を行う機能の追加  
問題の解説をつける  
Vue.jsとWebAPI(Djagno REST Framework)を用いたSPA化  
インフラのコード化  
デプロイの自動化  
テストコードを書く


