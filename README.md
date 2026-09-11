# Porting jQuery-driven HTML into JSX using minista --- how to adapt jQuery-dependent entry scripts to ES Modules

ES Module非対応のjQuery v3.6.0を使っている古き良きHTMLサイトをTypeScript言語でJSXで書き直したいと思った。
LayoutとページテンプレートをTypeScript言語でJSX構文で書いて、
スタティックサイトジェネレータ [minista](https://minista.qranoko.jp/) を使って静的HTML+CSS+JSから成る
サイトを生成したいと思った。

途中さまざまのエラーに遭遇した。
ministaを使ってスタティックサイトジェネレーションをするためにはjQueryとそれに依存する `<script>` 要素を
ES Module対応に移行しなければならなかった。エラーにいくつも遭遇した。
エラーをひとつひとつ解決して最終的には元のHTMLサイトと同等の静的サイトをministaで生成することに生成した。

ES Module非対応のjQueryに依存する古き良きHTMLサイトをJSXに移行したいと考える人がわたし以外にもしもいたら、
同じ道を迷うことになるだろう。
彼らの参考になればと思い、わたしが遭遇したエラーとその解消方法を記録して公開する。

- [docs](https://kazurayam.github.io/poring-HTML-with-jQuery-into-JSX-using-minista/)

A non-ES Module JavaScript library typically uses the older CommonJS or global variable patterns instead of the modern ES Modules syntax. These libraries can still be used in browsers or Node.js by loading them via a <script> tag (for globals) or converting them with tools like esm.sh or esbuild.
