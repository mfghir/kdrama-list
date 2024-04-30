import './globals.css'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'

import { ThemeProvider } from '@/components/theme-provider'
import SessionProviderComp from './SessionProviderComp'
import Provider from '@/lib/provider'

import Navbar from '@/components/Navbar'
import { cookies } from "next/headers";
import { getServerSession } from 'next-auth'

import connectDB from '@/lib/connectDB'
import User from '@/models/user'
import { authOptions } from '@/auth-options'

import SmoothScrolling from '@/utilities/SmoothScrolling'
import { Toaster } from '@/components/ui/toaster'



const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'My Kdrama List',
  description: 'list of kdrama series',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const currentTheme = cookieStore.get("currentTheme")?.value || "default";

  await connectDB()
  const session = await getServerSession(authOptions);
  const user = await User.findOne({ email: session?.user?.email });

  return (
    <html lang="en" className={currentTheme}>
      <body className={`${montserrat.className} `}>
        <Provider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SessionProviderComp>

              {/* @ts-ignore */}
              <Navbar 
              // userInfo={user}
              userInfo={JSON.parse(JSON.stringify(user))}
              />

              <SmoothScrolling>

                {children}

              </SmoothScrolling>
              <Toaster />
            </SessionProviderComp>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  )
}
