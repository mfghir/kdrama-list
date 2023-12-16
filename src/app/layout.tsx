import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import Providers from './Providers'



const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'My Kdrama List',
  description: 'list of kdrama series',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.className}  flex min-h-screen flex-col items-center justify-between bg-gray-200 p-6 lg:p-20 `}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
