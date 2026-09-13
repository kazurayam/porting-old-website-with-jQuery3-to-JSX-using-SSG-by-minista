# Porting old website with jQuery3 to JSX using Static Site Generation by minista

ES Module非対応のjQuery v3.6.0を使っている古き良きHTMLサイトをTypeScript言語でJSXで書き直したいと思った。LayoutとページテンプレートをTypeScript言語でJSX構文で書いて、[minista](https://minista.qranoko.jp/) を使って静的サイトを生成したいと思った。

やってみたら様々のエラーに遭遇した。ministaを使ってスタティックサイトジェネレーションをするためには、jQueryとそれに依存するカスタムな `<script>` をES Module対応に移行しなければならないということが原因だった。エラーをひとつひとつ解決して最終的に元のHTMLサイトと同等の静的サイトをministaで生成することに生成した。

古き良きHTMLサイトをJSXで書き直したいと考える人がもしいたら、わたしと同じように四苦八苦するだろう。彼らのために
わたしが遭遇したエラーとその解消方法を記録して公開する。

- [docs](https://kazurayam.github.io/porting-old-website-with-jQuery3-to-JSX-using-SSG-by-minista/)
