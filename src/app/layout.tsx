import './globals.css'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'

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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const currentTheme = cookieStore.get("currentTheme")?.value || "default";

  const session = await getServerSession(authOptions);
  await connectDB()

  const user = await User.findOne({ email: session?.user?.email });
  // const userTest = await User.findOne({ id: session?.user?.id });
  // console.log("layout user====", user);
  // console.log("layout userTest====", userTest);

  return (
    <html lang="en" className={currentTheme}>
      <body className={`${montserrat.className} `}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProviderComp>
            <Provider>
              {/* <main className="min-h-screen   "> */}
              {/* <main className="grid place-items-start w-fill min-h-screen my-8 overflow-hidden"> */}

              <Navbar userInfo={user} />
              {/* <div className="w-full h-full min-h-screen p-6 lg:px-20 lg:py-8"> */}
              {children}
              {/* </div> */}
              {/* </main> */}

            </Provider>
          </SessionProviderComp>
        </ThemeProvider>
      </body>
    </html>
  )
}
