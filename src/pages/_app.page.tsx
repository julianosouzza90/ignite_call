import { globalStyles } from '@/src/styles/global'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
globalStyles()

export default function App({
  Component,
  pageProps: { session, ...pagesProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pagesProps} />
    </SessionProvider>
  )
}
