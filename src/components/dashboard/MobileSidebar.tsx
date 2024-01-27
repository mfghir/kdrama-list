"use client";

import { useState } from "react";
import DashboardNav from "./DashboardNav";
import { MenuIcon } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "@/utilities/ModeToggle";
import ThemeSelector from "../theme/ThemeSelector";


const MobileSidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <MenuIcon />
        </SheetTrigger>

        <SheetContent side="left" className="!px-0">
          <div className="space-y-4 py-4">
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                Overview
              </h2>

              <div className="space-y-2 min-h-[400px] ">
                <DashboardNav setOpen={setOpen} />
              </div>

              <section className="w-full flex items-center justify-between ">
                <ModeToggle />
                <ThemeSelector />
              </section>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}

export default MobileSidebar