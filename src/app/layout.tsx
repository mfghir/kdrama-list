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
            <SessionProviderComp>
          <Provider>
              <main className="min-h-screen overflow-hidden">
                {/* <main className="grid place-items-center min-h-screen my-8 overflow-hidden"> */}

                {/* <div className="w-full h-full min-h-screen p-6 lg:px-20 lg:py-8"> */}
                <Navbar />
                {children}
                {/* </div> */}
              </main>
          </Provider>
            </SessionProviderComp>
        </ThemeProvider>
      </body>
    </html>
  )
}
