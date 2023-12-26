import './globals.css'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'

import { ThemeProvider } from '@/components/theme-provider'
import Providers from './Providers'
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
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {/* <Navbar /> */}
            <div className=" h-full min-h-screen  p-6 lg:px-20 lg:py-8 ">
              <div className="flex items-center justify-between space-y-2">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">Kdrama List</h2>
                  <p className="text-sm md:text-muted-foreground">
                    Here&apos;s a list of your tasks for this month!
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <UserNav />
                </div>
              </div>
              {children}
            </div>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}
