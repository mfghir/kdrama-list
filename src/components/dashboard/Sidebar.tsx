import DashboardNav from './DashboardNav'

const Sidebar = () => {
  return (
    <nav className='relative hidden h-screen border-r pt-16 lg:block w-72'>
    <div className="space-y-4 py-4">
      <div className="px-3 py-6">
        <div className="space-y-2">
          <h2 className="mb-2 px-4 text-xl font-semibold tracking-tight">
            Overview
          </h2>
          <DashboardNav />
        </div>
      </div>
    </div>
  </nav>
  )
}

export default Sidebar