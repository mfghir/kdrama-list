"use client"

import { navItems } from '@/lib/data';
import DashboardNav from './DashboardNav'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useSession } from 'next-auth/react';



// interface DashboardNavProps {
//   // items: NavItem[];
//   userRole: string,
//   userEmail: string
//   setOpen?: Dispatch<SetStateAction<boolean>>;
// }

const Sidebar = ({ setOpen, userRole, userEmail,userInfo }: any) => {
  const session = useSession()
console.log("session",session.data.user);

  const path = usePathname();
  console.log("role role role" , userRole);
  console.log("email email email" , userEmail);
console.log("userInfo",userInfo);



  return (
    <nav className='relative hidden h-screen border-r pt-16 lg:block w-72'>
      <div className="space-y-4 py-4">
        <div className="px-3 py-6">
          <div className="space-y-2">
            <h2 className="mb-2 px-4 text-xl font-semibold tracking-tight">
              Overview
            </h2>

            <nav className="grid items-start gap-2">
              {navItems.map((item, index) => {
                console.log(item.role.includes("admin"));
                // Check if the user's role matches the allowed roles for the navigation item
                if (item.role === userRole ) {
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
            </nav>

          </div>
        </div>
      </div>
    </nav>
  )
}

export default Sidebar