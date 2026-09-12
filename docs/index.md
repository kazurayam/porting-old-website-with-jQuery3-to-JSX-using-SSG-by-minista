- Table of contents
{:toc}

# ES Module未対応のjQuery3を使っているwebサイトをJSXで書き直してministaで静的サイトを生成した話

## step01: 素材としてのwebサイト

Releasesページ [starting point](https://github.com/kazurayam/porting-old-website-with-jQuery3-to-JSX-using-SSG-by-minista/releases/tag/startingpoint) のzipファイルをダウンロードして解凍してください。ここで作られたディレクトリを `$ROOT` という記号で表すことにします

ブラウザで [`$ROOT/base-project/index.html`](https://github.com/kazurayam/porting-old-website-with-jQuery3-to-JSX-using-SSG-by-minista/blob/article/base-project/index.html) を開いてください。こんな画面が見えるはず。

![001 base project 800x875](https://kazurayam.github.io/porting-old-website-with-jQuery3-to-JSX-using-SSG-by-minista/images/001_base-project-800x875.png)

ブラウザのウインドウの縁をマウスで捕まえてウインドウを伸び縮みさせると、画面の中のヘッダ部に表示された数字（幅x高さ）が変化する。横幅を狭くするとこうなる。

-   555x875

![002 base project 555x875](https://kazurayam.github.io/porting-old-website-with-jQuery3-to-JSX-using-SSG-by-minista/images/002_base-project-555x875.png)

高さを縮めるとこうなる。

-   800x389

![003 base project 800x389](https://kazurayam.github.io/porting-old-website-with-jQuery3-to-JSX-using-SSG-by-minista/images/003_base-project-800x389.png)

HTMLのソースがこれ:

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="icon" type="image/svg+xml" href="/favicon.svg">
        <title>HTML with jQuery</title>
        <link rel="stylesheet" href="./style/index.css">
    </head>
    <body>
        <header class="myheader">
          <h1>base project</h1>
        </header>
        <nav class="mynav">
          <ul class="topnav">
            <li>
              <a href="/">Top</a>
            </li>
            <li>
              <a href="/about/">About</a>
            </li>
            <li>
              <a href="#">News</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </nav>
        <main class="myMain">
          <section>
            <h2>Hello!</h2>
            <p id="dimension"></p>
            <figure>
              <img src="./images/seagull.jpg" alt="seagull">
            </figure>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p>Nam viverra magna id ante euismod eleifend. Quisque non lacus magna. Ut ultricies cursus leo, sit amet rutrum dolor ultricies eget. Curabitur accumsan quis ante id porta. Sed sollicitudin vestibulum purus ut eleifend. </p>
            <div class="clear"></div>
          </section>
        </main>
        <footer class="myfooter">
          <p>Footer</p>
        </footer>
        <script src="./js/jquery-3.6.0.min.js"></script>
        <script src="./js/windowResize.js"></script>
    </body>
    </html>

## step02: JSXで書き換えた

`$ROOT/my-minista-project` を作った。別記事 [スタティックサイトジェネレーター minista を試してみた](https://zenn.dev/kazurayam/articles/ae376ca6bff235) で詳細を説明したサンプルを下敷きにした。HTMLを少し修正し、JavaScriptを追加した。 `my-minista-project/src/assets/js/windowResize.js` がstep01で説明した `800x875` とか `555x875` とか `800x389` とかの動的表示を実装している。

    my-minista-project
    ├── bun.lock
    ├── package.json
    ├── src
    │   ├── assets
    │   │   ├── css
    │   │   │   └── index.css
    │   │   ├── images
    │   │   │   └── seagull.jpg
    │   │   └── js
    │   │       ├── jquery-3.6.0.min.js
    │   │       └── windowResize.js
    │   ├── layouts
    │   │   ├── footer.tsx
    │   │   ├── header.tsx
    │   │   ├── index.tsx
    │   │   └── nav.tsx
    │   └── pages
    │       └── index.tsx
    ├── tsconfig.json
    └── vite.config.ts

-   `vite.config.ts`

<!-- -->

    // my-minista-project/vite.config.ts
    import { defineConfig, pluginSsg, pluginBundle, pluginBeautify } from "minista"

    export default defineConfig({
      plugins: [
        pluginSsg({
          layout: "/src/layouts/index.{tsx,jsx}",
          src: ["/src/pages/**/*.{tsx,jsx,mdx,md}"],
          srcBases: ["/src/pages"],
        }),
        pluginBundle({
          src: ["/src/layouts/index.{tsx,jsx}", "/src/pages/**/*.{tsx,jsx,mdx}"],
          outName: "bundle",
          useExportCss: true,
        }),
        pluginBeautify()
      ],
    })

-   `package.json`

<!-- -->

    {
      "name": "minista-project",
      "private": true,
      "type": "module",
      "scripts": {
        "dev": "minista",
        "build": "minista build",
        "preview": "minista preview"
      },
      "devDependencies": {
        "@types/node": "^26.2.0",
        "@types/react": "^19.2.18",
        "@types/react-dom": "^19.2.4",
        "minista": "^4.0.11",
        "react": "^19.2.8",
        "react-dom": "^19.2.8",
        "typescript": "^7.0.2",
        "vite": "^8.2.1"
      }
    }

-   `src/layouts/index.ts`

<!-- -->

    include::../my-minista-project/src/layouts/index.ts

このコードの中にわたしがJSXに挑みたかった理由が現れている。HTMLの `<header>` 要素と `<nav>` 要素と `<footer>` 要素をコンポーネントとしてのJSXコードに分離し、コンポーネント `MyHeader` と `MyNav` と `MyFooter` の組み合わせとしてページのレイアウトを構成する、ということをやりたかった。

-   `src/layouts/header.ts`

<!-- -->

    include::../my-minista-project/src/layouts/header.ts

-   `src/layouts/nav.ts`

<!-- -->

    include::../my-minista-project/src/layouts/nav.ts

-   `src/layouts/footer.ts`

<!-- -->

    include::../my-minista-project/src/layouts/footer.ts

## step03: <http://localhost:5173> はOKだった

`my-minista-project` が依存する外部パッケージをインストールしよう。そのために次のコマンドを実行しよう。

    $ cd $ROOT/my-minista-project
    $ bun install

この記事ではJavaScriptランタイムとして [bun](https://bun.sh/) を使った。もちろん [npm](https://www.npmjs.com/package/npm) でも良い。この記事の内容に関するかぎりbunとnpmで違いは見当たらなかった。

viteの開発サーバを起動してURL `http://localhost:5173` を目視確認してみよう。

    $ bun run dev
    $ minista

      VITE v8.2.2  ready in 5242 ms

      ➜  Local:   http://localhost:5173/
      ➜  Network: use --host to expose
      ➜  press h + enter to show help

![031 localhost5173 1066x639](https://kazurayam.github.io/porting-old-website-with-jQuery3-to-JSX-using-SSG-by-minista/images/031_localhost5173-1066x639.png)

開発サーバが応答したwebページは問題なく表示された。マウスでウインドウの幅を広げたり狭くしたりすれば、画面のheader部に "width x height" の数字が動くのが見えた。ブラウザのDevToolsのコンソールにエラーメッセージはひとつも出力されていなかった。わたしは `base-project` の `index.html` をJSXで書き直すことに成功した、と思った。ところがこの先でつまづいた。
