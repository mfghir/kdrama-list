"use client"

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { UserInfo, navItems } from '@/lib/data';

import { cn } from '@/lib/utils';


const DashboardNav = ({ setOpen, userInfo }: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userInfo: UserInfo
}) => {
  const path = usePathname();
  
  if (!navItems?.length) return null;

  return (
    <nav className="grid items-start gap-2">
      {navItems.map((item, index) => {
        if (item.role.includes(userInfo?.role)) {
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
                    {/* @ts-ignore  */}
                  <item.icon className="mr-2 h-4 w-4" />
                  
                  <span>{item.title}</span>
                </span>
              </Link>
            )
          );
        }
      })}
    </nav>
  )
}

export default DashboardNav