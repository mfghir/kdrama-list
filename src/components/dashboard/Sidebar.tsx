"use client"

import { UserInfo, navItems } from '@/lib/data';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { useSession } from 'next-auth/react';
import DashboardNav from './DashboardNav';



const Sidebar = ({ setOpen, userInfo }: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userInfo: UserInfo
}) => {
  // const session = useSession()
  // console.log("session", session.data);

  // const path = usePathname();
  // console.log("userInfo", userInfo);


  return (
    <nav className='relative hidden h-auto border-r pt-16 lg:block w-72'>
      <div className="space-y-4 py-4">
        <div className="px-4 py-6">
          <div className="space-y-2">
            <h2 className="mb-2 px-4 text-xl font-semibold tracking-tight">
              Overview
            </h2>

            <DashboardNav setOpen={setOpen} userInfo={userInfo} />

            {/* <nav className="grid items-start gap-2">
              {navItems.map((item, index) => {
                if (item.role && item.role.includes(userInfo?.role || "user")) {
                  return (
                    item.href && (
                      <Link
                        key={index}
                        href={item.disabled ? "/" : item.href}
                        onClick={() => {
                          if (setOpen) setOpen(false);
                        }}
                      >
                        <span
                          className={cn(
                            "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                            path === item.href ? "bg-accent" : "transparent",
                            item.disabled && "cursor-not-allowed opacity-80",
                          )}
                        >
                          <item.icon className="mr-2 h-4 w-4" />
                          <span>{item.title}</span>
                        </span>
                      </Link>
                    )
                  );
                }
              })}
            </nav> */}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Sidebar