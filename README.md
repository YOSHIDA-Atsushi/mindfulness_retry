# mindfulness app

react-native-track-player 導入後に build できなくなり、過去の branch に戻しても build できず、再構築。  
以下の機能を実装。

- アプリを開いたら、音声一覧画面が表示されている。
- 音声をタップしたら、以下の物が表示されている画面に遷移して、音声(MP3 ファイル形式)を再生する
- 音声に紐付いている画像
- 停止ボタン
- シークバー
- 再生時間
- 前の画面に戻るボタン
- 停止ボタンを押したら音声を停止して、停止ボタンを再生ボタンに変える。
- 前の画面に戻るボタンを押したら一覧画面にもどる

## 問題点

- 既知の問題：一時停止中に slider を操作しても、progress が更新されない。  
  https://github.com/react-native-kit/react-native-track-player/issues/851  
  → 仕方なく、useState をもう一つ用意して、一時停止中はそちらの変数を使用。ただし再生再開時に表示が１秒乱れる。

## 解決済の問題点

- iOS のみ back button を押しても track player library が再生し続け、他の track を選んでも前の曲が再生し続ける  
  → player画面ではheaderは非表示にして自作 back buttonを置き、back buttonがタップされた際に player を stop()させる処理を追加。これで android とiOSで同じ挙動となった。
- stateがplayingからpausedに変わる際に、
