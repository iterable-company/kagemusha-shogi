# 概要
影武者将棋を作る。  
参考: https://www.youtube.com/watch?v=egPqOAqbu3s

## 動機
Reactのチュートリアルを一通り行った後に、自由課題としてやるべきものを考えた時に思いついたのがこの題材だった。  
変則将棋には他にも様々なバリエーションがあり、ゲーム性を考えた時に面白そうなものの構想もあるため、一旦影武者将棋を実装した後に、その他の変則将棋に取り掛かる。  
その際には、コードの再利用性を高めるための実装を調査して盛り込むことを理想としている。  

## 想定している過程
一旦はreact-appで先手番、後手番用の盤面を一つの画面で操作する形で実装する。  
トップレベルのコンポーネントは後々サーバサイドとして機能し、配下の各盤面はクライアントサイドとして機能することを想定している。  
  
react-appとして先後の盤面を同じ画面で実装し終わったら、各propsをサーバから受け取って、websocketでその値を順次更新していく実装に変更する。
まずはローカルホストとして立ち上げたものにブラウザの別タブで先後それぞれが別の画面で操作できることを目指す。  
以降は
- 通信対戦することを想定すると、インフラをどうするか？
- 対戦者はログイン制にするのか？

などの趣旨とは外れる課題が出てくるため、ここは後述する、人に使ってもらう観点でのモチベーションがどれだけ持てるかによって、頑張るかどうかを決める。
  
モチベーションとしては、動くものが出来上がる過程が取り組みやすいため、動くものを早く作ることからまず始める。  
次のモチベーションとしては、人に使ってもらうためにブラッシュアップすることがあり、巻き込める人を探して一緒に遊んでもらいながら気になるところを改善していく。  
  
何を優先して取り組むかは、状況とモチベーションをみながら決めていく。
