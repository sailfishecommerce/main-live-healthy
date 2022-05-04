import React from 'react'

import DashboardMainView from '@/components/Dashboard/DashboardMainView'
import DashboardLayout from '@/layouts/dashboard-layout'

export default function index() {
  return (
    <DashboardLayout title="Admin page">
      <DashboardMainView />
    </DashboardLayout>
  )
}
