import DashboardNav from "@/components/dashboard/DashboardNav"

export default function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <section>
        {/* Include shared UI here e.g. a header or sidebar */}
        <nav
      className='relative hidden h-screen border-r pt-16 lg:block w-72 '
    >
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <h2 className="mb-2 px-4 text-xl font-semibold tracking-tight">
              Overview
            </h2>
            <DashboardNav  />
          </div>
        </div>
      </div>
    </nav>
   
        {children}
      </section>
    )
  }