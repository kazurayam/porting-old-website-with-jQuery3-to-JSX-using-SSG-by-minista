# Porting jQuery-driven HTML into JSX using minista --- how to adapt jQuery-dependent entry scripts to ES Modules

モジュール非対応のjQuery v3.6.0を使っている古き良きHTMLサイトをTypeScript言語でJSXで書き直すことを試みた。

LayoutとページテンプレートをTypeScript言語でJSX構文を活用して書いた。
スタティックサイトジェネレータ [minista](https://minista.qranoko.jp/) を使って静的HTML±CSS±JSなサイトを生成した。

途中さまざまのエラーに遭遇した。
ministaを使ってスタティックサイトジェネレーションをするためにはjQueryとそれに
依存する `<script>"` 要素のをES Module対応に移行しなければならなかった。
それをきっかけにたくさんの小さなエラーに遭遇した。
エラーをひとつひとつ解消しながら最終的には元のHTMLサイトと同等の静的サイトをministaで生成することに生成した。

モジュール非対応のjQueryに依存する古き良きHTMLサイトをJSXに移行したいと考える人はわたしだけじゃないだろうと思う。
彼らの参考になればと思い、わたしが遭遇したエラーとその解消方法を記録して公開する。

- [docs](https://kazurayam.github.io/poring-HTML-with-jQuery-into-JSX-using-minista/)

A non-ES Module JavaScript library typically uses the older CommonJS or global variable patterns instead of the modern ES Modules syntax. These libraries can still be used in browsers or Node.js by loading them via a <script> tag (for globals) or converting them with tools like esm.sh or esbuild.
