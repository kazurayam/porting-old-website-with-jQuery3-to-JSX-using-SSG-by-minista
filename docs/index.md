- Table of contents
{:toc}

# ES Module未対応のjQuery3を使っているwebサイトをJSXで書き直してministaで静的サイトを生成した話

## Step01: 素材としてのwebサイト

Releasesページ [starting point](https://github.com/kazurayam/porting-old-website-with-jQuery3-to-JSX-using-SSG-by-minista/releases/tag/startingpoint) のzipファイルをダウンロードして解凍してください。ここで作られたディレクトリを `$ROOT` という記号で表すことにします

ブラウザで [`$ROOT/base-project/index.html`](https://github.com/kazurayam/porting-old-website-with-jQuery3-to-JSX-using-SSG-by-minista/blob/article/base-project/index.html) を開いてみましょう。こんな画面が見えるはず。

![001 base project 800x875](https://kazurayam.github.io/https://github.com/kazurayam/porting-old-website-with-jQuery3-to-JSX-using-SSG-by-minista/images/001_base-project-800x875.png)

ブラウザのウインドウの縁をマウスで捕まえてウインドウを伸び縮みさせると、画面の中のヘッダ部に表示された数字（幅x高さ）が変化する。

-   555x875

![002 base project 555x875](https://kazurayam.github.io/https://github.com/kazurayam/porting-old-website-with-jQuery3-to-JSX-using-SSG-by-minista/images/002_base-project-555x875.png)

-   800x389

![003 base project 800x389](https://kazurayam.github.io/https://github.com/kazurayam/porting-old-website-with-jQuery3-to-JSX-using-SSG-by-minista/images/003_base-project-800x389.png)

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
