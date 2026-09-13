import type { LayoutProps } from "minista/types"
import { Head } from "minista/head"

import { MyHeader } from "./header"
import { MyNav } from "./nav"
import { MyFooter} from "./footer"

import "/src/assets/css/index.css"

export default function (props: LayoutProps) {
  return (
    <>
      <Head htmlAttributes={{ lang: "en" }}>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <title>my-minista-project</title>
      </Head>
      <MyHeader />
      <MyNav />
      <main className="myMain">
        {props.children}
      </main>
      <MyFooter />
      <script type="module" src="/src/assets/js/jquery-3.6.0.min.js"></script>
      <script type="module" src="/src/assets/js/windowResize.js"></script>
    </>
  )
}