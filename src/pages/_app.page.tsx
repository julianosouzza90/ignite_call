import '../lib/dayjs'
import { globalStyles } from '@/src/styles/global'
import { QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { queryClient } from '../lib/react-query'
import { DefaultSeo } from 'next-seo'
globalStyles()

export default function App({
  Component,
  pageProps: { session, ...pagesProps },
}: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <DefaultSeo
          openGraph={{
            type: 'Website',
            locale: 'pt-BR',
            url: 'url.com',
            siteName: 'ignite call',
          }}
        />
        <Component {...pagesProps} />
      </SessionProvider>
    </QueryClientProvider>
  )
}
