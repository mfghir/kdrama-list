import './globals.css'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'

import { ThemeProvider } from '@/components/theme-provider'
import SessionProviderComp from './SessionProviderComp'
import Provider from '@/lib/provider'

import Navbar from '@/components/Navbar'
import { cookies } from "next/headers";


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
  const cookieStore = cookies();
  const currentTheme = cookieStore.get("currentTheme")?.value || "default";

  return (
    <html lang="en" className={currentTheme}>
      <body className={`${montserrat.className}   `}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
        <Provider>
          <SessionProviderComp>
              <div className="w-full h-full min-h-screen p-6 lg:px-20 lg:py-8">
                <Navbar />
                <main className="grid place-items-center min-h-screen my-8">
                {children}
                </main>
              </div>
          </SessionProviderComp>
        </Provider>
            </ThemeProvider>
      </body>
    </html>
  )
}
