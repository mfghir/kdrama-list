"use client"

import { Dispatch, SetStateAction } from 'react'
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { NavItem, navItems } from '@/lib/data';
import { cn } from '@/lib/utils';


interface DashboardNavProps {
  // items: NavItem[];
  setOpen?: Dispatch<SetStateAction<boolean>>;
}


const DashboardNav = ({ setOpen }: DashboardNavProps) => {
  const path = usePathname();

  if (!navItems?.length) return null;

  return (
    <nav className="grid items-start gap-2">
      {navItems.map((item, index) => {
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
      })}
    </nav>
  )
}

export default DashboardNav