import '../lib/dayjs'
import { globalStyles } from '@/src/styles/global'
import { QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { queryClient } from '../lib/react-query'
globalStyles()

export default function App({
  Component,
  pageProps: { session, ...pagesProps },
}: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <Component {...pagesProps} />
      </SessionProvider>
    </QueryClientProvider>
  )
}
