# Merge Google Japanese IME Dictionaries

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## 概要

この Web アプリケーションは、2 つの Google 日本語入力の辞書ファイル（テキスト形式）をマージ（統合）するためのツールです。HTML, CSS, JavaScript のみで構築されており、ブラウザ上で動作します。サーバーへのアップロードは不要で、ローカルで完結します。

## 特徴

*   **簡単操作:** 2 つの辞書ファイルを選択し、「辞書を統合」ボタンをクリックするだけの簡単操作。
*   **差分表示:** 統合前に、2 つの辞書の内容を比較し、差分を視覚的に表示（追加・削除・変更箇所を色分け）。
*   **コメントの扱いを選択可能:** 重複する単語があった場合のコメントの処理方法を選択可能（結合、ファイル1優先、ファイル2優先）。
*   **単語数表示:** 統合前後の単語数（エントリ数）を表示。
*   **編集機能:** 統合結果をテキストエリアで編集し、編集後の内容をダウンロード可能。
*   **オフライン動作:** すべての処理がブラウザ内で完結するため、インターネット接続は不要。
*   **Google 日本語入力対応:** ダウンロードしたファイルは、Google 日本語入力の辞書ツールからインポート可能。

## 使い方

1.  [リリースページ](https://github.com/imagawatatsuya/merge-google-japanese-ime-dic/releases) から最新の `index.html` と `script.js` をダウンロードします。 または、リポジトリをクローンします。
    ```bash
    git clone https://github.com/imagawatatsuya/merge-google-japanese-ime-dic.git
    ```
2.  `index.html` をブラウザで開きます。
3.  「辞書ファイル1」「辞書ファイル2」で、それぞれ統合したい Google 日本語入力の辞書ファイル（`.txt`）を選択します。
4.  「コメントの扱い」を選択します（重複エントリがあった場合のコメントの処理方法）。
5.  「辞書を統合」ボタンをクリックします。
6.  統合前の辞書の内容が差分表示されます。
7.  統合された辞書データがテキストエリアに表示されます。
8. 必要に応じて、テキストエリアの内容を編集します
9.  「ダウンロード」ボタンをクリックして、新しい辞書ファイル（`merged_dictionary.txt`）として保存します。
10. Google 日本語入力の辞書ツールから、`merged_dictionary.txt` をインポートします。

## 辞書ファイルの形式

Google 日本語入力の辞書ファイルは、タブ区切りのテキストファイルで、以下の形式である必要があります。

*   **単語:** 登録する単語。
*   **よみ:** 単語の読み。
*   **品詞:** 品詞（名詞、動詞など）。
*   **コメント:** (省略可) コメント。

## 注意点

*   非常に大きな辞書ファイルの場合、ブラウザがフリーズする可能性があります。大きな辞書の場合は、分割してから統合することを検討してください。
*   辞書ファイルは UTF-8 で保存されている必要があります。
*  テキストエリアの内容を編集した後、「辞書を統合」ボタンを再度クリックしても、編集内容は反映されません。
*   ユーザーがテキストエリアに不正な形式のデータを入力する可能性があります。ダウンロード前にバリデーションは行っていません

## 動作環境

モダンブラウザ (Chrome, ~~Firefox, Edge, Safari など~~) で動作確認済みです。

## ライセンス

[MIT License](https://opensource.org/licenses/MIT)

## 貢献

バグ報告、機能提案、プルリクエストなど、歓迎しません！ なぜなら、私はプログラミング知識が皆無であり、コード本体もReadMeテキストの約99％はチャットAIが作成したものだからです。対応致しかねます。

## 作者
[焚書刊行会 技術部](https://x.com/konatarochan)
