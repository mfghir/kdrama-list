import './globals.css'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'

import { ThemeProvider } from '@/components/theme-provider'
import SessionProviderComp from './SessionProviderComp'
import Provider from '@/lib/provider'

import Navbar from '@/components/Navbar'
import { UserNav } from '@/components/user-nav'



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
      <body className={`${montserrat.className}   `}>
        <Provider>
          <SessionProviderComp>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <div className="w-full h-full min-h-screen p-6 lg:px-20 lg:py-8">
                <Navbar />
                <main className="grid place-items-center h-screen">
                {children}
                </main>
              </div>
            </ThemeProvider>
          </SessionProviderComp>
        </Provider>
      </body>
    </html>
  )
}
