import React from 'react'

import DashboardMainView from '@/components/Dashboard/DashboardMainView'
import DashboardProfile from '@/components/Dashboard/DashboardProfile'
import DashboardSidebar from '@/components/Dashboard/DashboardSidebar'

export default function index() {
  return (
    <div className="w-full grid grid-cols-6 bg-white">
      <DashboardSidebar />
      <DashboardMainView />
      <DashboardProfile />
    </div>
  )
}
