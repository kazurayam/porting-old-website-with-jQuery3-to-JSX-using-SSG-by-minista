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

    $ tree my-minista-project -I node_modules
    my-minista-project
    ├── bun.lock
    ├── package.json
    ├── public
    │   ├── favicon.svg
    │   └── icons.svg
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

    9 directories, 15 files

-   `vite.config.ts`

<!-- -->

    // my-minista-project/vite.config.ts
    import { defineConfig, pluginSsg, pluginBundle, pluginEntry, pluginBeautify } from "minista"

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
        pluginEntry(),
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
      },
      "dependencies": {
        "@types/jquery": "^4.0.1",
        "jquery": "^4.0.0"
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

## step04: 404 Not Found for JavaScripts

`my-minista-project` で静的サイト生成を実行した。

    $ cd $ROOT/my-minista-project
    $ bun run build
    $ minista build
    vite v8.2.2 building ssr environment for production...
    ✓ 9 modules transformed.
    computing gzip size...
    node_modules/.minista/ssr/__minista-ssg.mjs  3.95 kB │ gzip: 1.35 kB

    ✓ built in 1.05s
    vite v8.2.2 building client environment for production...
    ✓ 17 modules transformed.
    computing gzip size...
    dist/index.html                    1.83 kB │ gzip: 0.87 kB
    dist/assets/seagull-DMex-28w.jpg  30.04 kB
    dist/assets/bundle-DLJ25iAG.css    0.67 kB │ gzip: 0.30 kB

    ✓ built in 154ms

特にエラーメッセージは無い。次にviteのproductionサーバを立ち上げた。

    $ bun run preview
    $ minista preview
      ➜  Local:   http://localhost:4173/
      ➜  Network: use --host to expose
      ➜  press h + enter to show help

ブラウザで <http://localhost:4173> を開いてみた。

![041 404 Not Found for javascripts](https://kazurayam.github.io/porting-old-website-with-jQuery3-to-JSX-using-SSG-by-minista/images/041_404-Not-Found-for-javascripts.png)

画面のヘッダー部にウインドウのwidth x heightの数字が表示されず、代わりに "my-minista-project" という文字が表示された。これはHTMLが `<script>` タグを実行するのに失敗したことを意味している。

ブラウザのDevToolsのコンソールを調べるとエラーメッセージが表示されていた。

&gt;:4173/:44 GET <http://localhost:4173/src/assets/js/jquery-3.6.0.min.js> net::ERR\_ABORTED 404 (Not Found)
（インデックス）:45 GET <http://localhost:4173/src/assets/js/windowResize.js> net::ERR\_ABORTED 404 (Not Found)

productionサーバは <http://localhost:5173> へのリクエストに対して `my-minista-project/dist/index.html` ファイルを応答したはずだ。その中を調べた。こういうコードが書いてあった。

        </footer>
        <script src="/src/assets/js/jquery-3.6.0.min.js"></script>
        <script src="/src/assets/js/windowResize.js"></script>
      </body>
    </html>

ああ、これでは 404 Not Found になって当然だ。`my-minista-project/dist` ディレクトリの下に `/src/assets/js/jquery-3.6.0.min.js` というファイルは存在しないのだから。

### 対処方法

ministaの [pluginEntry](https://minista.qranoko.jp/docs/plugins/entry) を導入する必要があった。pluginEntryを導入すると ministaはwebページが `<script>` タグを介して結びついているスクリプトを検出し、ビルドプロセスに乗せる。pluginEntryがないと `<script>` タグはrolldownされることなくそのまま `dist` に出力されて、結果的に404(Not Found)のエラーを引き起こす。

### 説明

`my-minista-project/vite.config.ts` ファイルを修正した。

    - import { defineConfig, pluginSsg, pluginBundle, pluginBeautify } from "minista"
    + import { defineConfig, pluginSsg, pluginBundle, pluginEntry, pluginBeautify } from "minista"

          }),
    +     pluginEntry(),
          pluginBeautify()
        ],
      })

その後 `bun run build` を再度実行した。

    $ bun run build
    $ minista build
    vite v8.2.2 building ssr environment for production...
    ✓ 9 modules transformed.
    computing gzip size...
    node_modules/.minista/ssr/__minista-ssg.mjs  3.95 kB │ gzip: 1.35 kB

    ✓ built in 71ms
    vite v8.2.2 building client environment for production...
    ✓ 19 modules transformed.
    computing gzip size...
    dist/index.html                             1.84 kB │ gzip:  0.88 kB
    dist/assets/seagull-DMex-28w.jpg           30.04 kB
    dist/assets/bundle-DLJ25iAG.css             0.67 kB │ gzip:  0.30 kB
    dist/assets/windowResize-DW7TLUZC.js        0.19 kB │ gzip:  0.14 kB
    dist/assets/rolldown-runtime-BpQH8Ho1.js    0.33 kB │ gzip:  0.23 kB
    dist/assets/jquery-3.6.0.min-CvDmJdXJ.js  134.04 kB │ gzip: 36.39 kB

    ✓ built in 474ms

javascriptのファイルがbuild処理されてdistディレクトリの下に出力されたことがわかる。

`dist/index.html` の `<script>` タグはこう出力されていた。

        ...
        </footer>
        <script src="/assets/jquery-3.6.0.min-CvDmJdXJ.js"></script>
        <script src="/assets/windowResize-DW7TLUZC.js"></script>
      </body>
    </html>

src属性が書き換えられて dist/assets ディレクトリ下に出力されたjavascriptファイルを適切に指し示している。pluginEntryがちゃんと動いたように見える。

Gitタグ [step04-done](https://github.com/kazurayam/porting-old-website-with-jQuery3-to-JSX-using-SSG-by-minista/tree/step04-done) をcheckoutすれば ここまでの対処を完了したソースコードを取り出すことができます。

## step05: Cannot use import statement outside a module

step04の修正を施した後で `bun run build` して `bun run preview` を実行した。ブラウザで <http://localhost:4173> を開いてDevToolsのコンソールを見た。するとエラーメッセージが出力されていた。

![051 Cannot use import statement](https://kazurayam.github.io/porting-old-website-with-jQuery3-to-JSX-using-SSG-by-minista/images/051_Cannot-use-import-statement.png)

&gt;jquery-3.6.0.min-CvDmJdXJ.js:1 Uncaught SyntaxError: Cannot use import statement outside a module (at jquery-3.6.0.min-CvDmJdXJ.js:1:1)

このエラーを解消したい。

### 対処方法

"Cannot use import statement outside a module" をキーとして検索したら某AIがこんなレスを返した。

&gt;This error occurs when JavaScript encounters an import statement outside of a valid ES module context. To fix it, ensure that your script tag includes type="module"

このキーで検索すればたくさんのweb記事がヒットした。例えば [Mdn, JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules#applying_the_module_to_your_html) も読んだ。

### 説明

"Cannot use import statement outside a module" というエラーを解消するためには HTMLの中の `<script>` タグに `type="module"` 属性を追加せよ、ということだ。そこで `my-minista-project/src/layouts/index.ts` を修正した。

            <MyFooter />
    -       <script src="/src/assets/js/jquery-3.6.0.min.js"></script>
    +       <script type="module" src="/src/assets/js/jquery-3.6.0.min.js"></script>
    -       <script src="/src/assets/js/windowResize.js"></script>
    +       <script type="module" src="/src/assets/js/windowResize.js"></script>
        </>

`bun run build` を実行した。`dist/index.html` をエディタで開きその中の `<script>` タグに `type="module"` が書かれていることを確認した。そして `bun run preview` でproductionサーバを立ち上げた。ブラウザで `http://localhost:4173` を開き、コンソールタブをみた。

"Cannot use import statement outside a module" のメッセージが消えていた。効果があったと思われる。

Gitタグ [step05-done](https://github.com/kazurayam/porting-old-website-with-jQuery3-to-JSX-using-SSG-by-minista/tree/step05-done) をcheckoutすれば ここまでの対処を完了したソースコードを取り出すことができます。

## step06: $ is not defined

step05の修正を施した後で `bun run build` して `bun run preview` を実行した。ブラウザで <http://localhost:4173> を開いてDevToolsのコンソールを見た。するとエラーメッセージが出力されていた。

![061 $ is not defined](https://kazurayam.github.io/porting-old-website-with-jQuery3-to-JSX-using-SSG-by-minista/images/061_$-is-not-defined.png)

&gt;windowResize-DW7TLUZC.js:1 Uncaught ReferenceError: $ is not defined
&gt; at windowResize-DW7TLUZC.js:1:1

エラーを発したのは `dist/assets/windowResize-DW7TLUZC.js` ファイルの第1行第１文字だ。それはこんなコードだ。

    $(function() {
        ...

古き良きjQueryを知る人にとってはお馴染みのコードだ。`` windowResize-xxxxxxxx.js`はグローバル変数 `$ `` がjQueryによってdefineされていることを仮定して動いた。しかし実際にはグローバル変数 `$` が undefined だった。だから "Uncaught ReferenceError: $ is not defined" が発生した。

### 対処方法

step05で `dist/index.html` が

        <script type="module" src="/assets/jquery-3.6.0.min-CvDmJdXJ.js"></script>
        <script type="module" src="/assets/windowResize-DW7TLUZC.js"></script>

となるようにした。このコードはjquery-3.6.0が ES moduleに対応済みであることを仮定して、モジュールとしてjqueryをimportするやり方をします、と表明したことになる。ところがjquery-3.6.0は2021年3月にリリースされた古いバージョンだ。**実はjquery-3.6.0はES Moduleに未対応だ。** [jquery-4.0.0に関するブログ](https://blog.jquery.com/2026/01/17/jquery-4-0-0/) によれば "jQuery source migrated to ES modules" しているという。だから `my-minista-project` が使うjQueryのバージョンを4.0.0に取り替えなければならない。

もうひとつ問題がある。 `windowResize-xxxxxxxx.js` のコーディングが `$` がグローバル変数としてjqueryによってdefineされていることを暗黙的に前提している。このコーディングはダメだ。ES Module対応したjquery-4.0.0がグローバル変数として `$` をdefineするわけがない。jquery-4.0.0は `$` をexportする。それをimportして参照するように `windowResize` のコードを修正する必要がある。

### 説明

[npmのjqueryサイト](https://www.npmjs.com/package/jquery) を見ればjquery-4.0.0の入手方法がわかる。わたしは curlコマンドで <https://code.jquery.com/jquery-4.0.0.module.min.js> をダウンロードし `my-minista-project/src/assets/js/jquery-4.0.0.module.min.js` として保存した。

    $ cd $ROOT/my-minista-project
    $ tree src/assets/js
    src/assets/js
    ├── jquery-3.6.0.min.js
    ├── jquery-4.0.0.module.min.js
    └── windowResize.js

    1 directory, 3 files

次に `my-minista-project/src/layouts/index.tsx` を修正した。

            <MyFooter />
    -       <script type="module" src="/src/assets/js/jquery-3.6.0.min.js"></script>
    +       <script type="module" src="/src/assets/js/jquery-4.0.0.module.min.js"></script>
            <script type="module" src="/src/assets/js/windowResize.js"></script>
          </>

加えて `my-minista-project/src/assets/js/windowResize.js` を修正した。

      // js/windowResize.js
    + import { $ } from '/src/assets/js/jquery-4.0.0.module.min.js'
      $(function () {
          ...

`bun run build` を実行した。

    $ bun run build
    $ minista build
    vite v8.2.2 building ssr environment for production...
    ✓ 9 modules transformed.
    computing gzip size...
    node_modules/.minista/ssr/__minista-ssg.mjs  4.01 kB │ gzip: 1.36 kB

    ✓ built in 42ms
    vite v8.2.2 building client environment for production...
    ✓ 19 modules transformed.
    computing gzip size...
    dist/index.html                                    1.87 kB │ gzip:  0.89 kB
    dist/assets/seagull-DMex-28w.jpg                  30.04 kB
    dist/assets/bundle-DLJ25iAG.css                    0.67 kB │ gzip:  0.30 kB
    dist/assets/windowResize-0ft36a6R.js               0.26 kB │ gzip:  0.19 kB
    dist/assets/jquery-4.0.0.module.min-BuCeNwKQ.js  112.50 kB │ gzip: 31.91 kB

    ✓ built in 267ms

うまくいっているように見える。

`bun run preview` コマンドでproductionサーバを起動しブラウザで <http://localhost:4173> を開いた。

![062 worked without error](https://kazurayam.github.io/porting-old-website-with-jQuery3-to-JSX-using-SSG-by-minista/images/062_worked-without-error.png)

DevToolsのコンソールにエラーは無かった。
head部分に幅と高さの数字 "800x580" が表示された。
マウスでウインドウを捕まえてリサイズすると数字が動いた。
良い感じだ。

Gitタグ [step06-done](https://github.com/kazurayam/porting-old-website-with-jQuery3-to-JSX-using-SSG-by-minista/tree/step06-done) をcheckoutすれば ここまでの対処を完了したソースコードを取り出すことができます。

## step07: jquery4を外部依存パッケージとしてインストールするべき

step06の修正が完了した段階で `my-minista-project/package.json` はこうなっていた。

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

みての通り、jquery-4.0.0に対するdependencyは `package.json` で宣言されていない。

その一方で `my-minista-project/src/layouts/index.tsx` にはこう書いてある。

          <MyFooter />
          <script type="module" src="/src/assets/js/jquery-4.0.0.module.min.js"></script>
          <script type="module" src="/src/assets/js/windowResize.js"></script>
        </>
      )
    }

そして `my-minista-project/src/assets/js/windowResize.js` はこう書いている。

    // js/windowResize.js
    import { $ } from '/src/assets/js/jquery-4.0.0.module.min.js'
    $(function () {
        ...

これらを眺めると奇妙な感じがする。jqueryがES moduleのようでES moduleでないようで…​

### 対処方法

jqueryを首尾一貫してES moduleとして扱おう。`` bun add jquery`でプロジェクトにインストールする。 ``&lt;script src="jquery-xxxx"&gt;\` は削除しよう。

### 説明

`my-minista-project` に dependencies のひとつとして jqueryを追加しよう。

    $ cd $ROOT/my-minista-project
    $ bun add jquery@latest
    $ bun add jquery@latest
    bun add v1.4.0 (34cbb9a40)

    installed jquery@4.0.0

    1 package installed [1129.00ms]

TypeScriptでアプリを書くためには @types/jquery も追加する必要がある。

    $ bun add @types/jquery
    bun add v1.4.0 (34cbb9a40)

    installed @types/jquery@4.0.1

    1 package installed [1044.00ms]

以上によって `package.json` はこうなった。

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
      },
      "dependencies": {
        "@types/jquery": "^4.0.1",
        "jquery": "^4.0.0"
      }
    }

次に `my-minista-project/src/layouts/index.tsx` を修正した。

            <MyFooter />
    -       <script type="module" src="/src/assets/js/jquery-4.0.0.module.min.js"></script>
            <script type="module" src="/src/assets/js/windowResize.js"></script>
          </>

つまりjqueryのための `<script>` タグがもはや不要なので削除した。

次に `my-minista-project/src/assets/js/windowResize.js` を修正した。

      // js/windowResize.js
    - import { $ } from '/src/assets/js/jquery-4.0.0.module.min.js'
    + import { $ } from 'jquery'

      $(function () {
          ...

ここで画面を確認しよう。`bun run dev` とやって開発サーバを起動し、ブラウザで `http://localhost:5173` を目視確認した。OKだった。

`bun run build` をやった。

    $ bun run build
    $ minista build
    vite v8.2.2 building ssr environment for production...
    ✓ 9 modules transformed.
    computing gzip size...
    node_modules/.minista/ssr/__minista-ssg.mjs  3.90 kB │ gzip: 1.34 kB

    ✓ built in 93ms
    vite v8.2.2 building client environment for production...
    ✓ 19 modules transformed.
    computing gzip size...
    dist/index.html                         1.79 kB │ gzip:  0.86 kB
    dist/assets/seagull-DMex-28w.jpg       30.04 kB
    dist/assets/bundle-DLJ25iAG.css         0.67 kB │ gzip:  0.30 kB
    dist/assets/windowResize-B7kvWfTS.js  112.64 kB │ gzip: 31.96 kB

    ✓ built in 257ms

ministaのビルド処理が `dist/assets` ディレクトリにjqueryのjsファイルを出力しなくなった。
その代わり `node_modules/jquery` ディレクトリができていた。

    $ cd $ROOT/my-minista-project
    $ tree node_modules/jquery -L 1
    node_modules/jquery
    ├── AUTHORS.txt
    ├── LICENSE.txt
    ├── README.md
    ├── bower.json
    ├── changelog.md
    ├── dist
    ├── dist-module
    ├── package.json
    └── src

`bun run preview` コマンドでproductionサーバを起動し、ブラウザで `http://localhost:4173/` を開いた。OKだった。

最後に `my-minista-project/src/assets/js` ディレクトリから jquery のファイルを削除した。

    $ cd $ROOT/my-minista-project
    $ tree src/assets/js
    src/assets/js
    ├── jquery-3.6.0.min.js
    ├── jquery-4.0.0.module.min.js
    └── windowResize.js

    1 directory, 3 files

    $ rm src/assets/js/jquery*

    $ tree src/assets/js
    src/assets/js
    └── windowResize.js

    1 directory, 1 file

もう一度画面確認をしよう。`bun run build` して `bun run preview` して <http://localhost:4173> を目視しよう。OKだった。これで作業は完了した。

Gitタグ [step07-done](https://github.com/kazurayam/porting-old-website-with-jQuery3-to-JSX-using-SSG-by-minista/tree/step07-done) をcheckoutすれば ここまでの対処を完了したソースコードを取り出すことができます。

## 結び

ES Module非対応のjQuery v3.6.0を使っている古き良きHTMLサイトをTypeScript言語でJSXで書き直し、LayoutとページテンプレートをTypeScript言語でJSX構文で書いて、[minista](https://minista.qranoko.jp/) を使って静的サイトを生成することに成功した。途中、さまざまのエラーに遭遇したがすべて解消することができた。

古いwebサイトを最新のTypeScript+JSXに移行したいが、Apacheサーバのhtdocsディレクトリにファイルを置くだけの素朴なシステム構成を維持したいと念願している人の参考になればいいなと思う。

