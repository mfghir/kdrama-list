import './globals.css'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'



import "@uploadthing/react/styles.css";

import { ThemeProvider } from '@/components/theme-provider'
import SessionProviderComp from './SessionProviderComp'
import Provider from '@/lib/provider'

import Navbar from '@/components/Navbar'
import { cookies } from "next/headers";
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import connectDB from '@/lib/connectDB'
import User from '@/models/user'


const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'My Kdrama List',
  description: 'list of kdrama series',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = cookies();
  const currentTheme = cookieStore.get("currentTheme")?.value || "default";

  const session = await getServerSession(authOptions);
  await connectDB()
  const user = await User.findOne({ email: session?.user?.email });

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
                <Navbar userInfo={user} />
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
