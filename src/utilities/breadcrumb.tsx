"use client"

import { ChevronRightIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import Link from "next/link";

import React from "react";
import { usePathname } from "next/navigation";

type BreadCrumbType = {
  title: string;
  link: string;
};

type BreadCrumbPropsType = {
  items: BreadCrumbType[];
};

export default function BreadCrumb({ items }: BreadCrumbPropsType) {
  const pathname = usePathname()
  // console.log(pathname)

  return (
    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
      <Link
        href={pathname.includes("/dashboard") ? "/dashboard" : "/"}
        className="overflow-hidden text-ellipsis whitespace-nowrap"
      >
        {pathname.includes("/dashboard") ? "Dashboard" : "Home"}
      </Link>

      {items?.map((item: BreadCrumbType, index: number) => (
        <React.Fragment key={item.title}>
          <ChevronRightIcon className="h-4 w-4" />
          <Link
            href={item.link}
            className={cn("font-medium",
              index === items.length - 1
                ? "text-foreground pointer-events-none"
                : "text-muted-foreground",
            )}
          >
            {item.title}
          </Link>
        </React.Fragment>
      ))}
    </div>
  );
}