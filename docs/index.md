- Table of contents
{:toc}

# ES Module未対応のjQuery3を使っているwebサイトをJSXで書き直してministaで静的サイトを生成した話

## Step01 元のwebサイト

[`base-project/index.html`](https://github.com/kazurayam/porting-old-website-with-jQuery3-to-JSX-using-SSG-by-ministaw/blob/article/base-project/index.html) をブラウザで開け。

- ウインドウ幅800px,高さ874px

![001 base project 800x874](images/001-base-project-800x874.png)

マウスでウインドウを捕まえて幅と高さを変えるとヘッダ部に表示された数字が切り替わるのがわかる。

- 幅555px,高さ875px

![001 base project 555x874](images/001-base-project-555x874.png)

- 幅800px,高さ389px

![001 base project 800x389](images/001-base-project-800x389.png)

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
