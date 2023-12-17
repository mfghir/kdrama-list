import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import Providers from './Providers'
import Navbar from '@/components/Navbar'
import { ThemeProvider } from '@/components/theme-provider'



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
      <body className={`${montserrat.className}  min-h-screen  p-6 lg:px-20 lg:py-8 `}>
        <Providers>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          <Navbar />
          {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}
