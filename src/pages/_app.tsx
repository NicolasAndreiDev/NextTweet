import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>NextTweet</title>
        <link rel="icon" type="image/x-icon" href="/images/favicon.ico"></link>
      </Head>
      <Component {...pageProps} />
    </>
  )
}