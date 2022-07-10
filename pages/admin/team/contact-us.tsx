/* eslint-disable no-nested-ternary */
import dynamic from 'next/dynamic'

import DashboardMainView from '@/components/Dashboard/DashboardMainView'
import SpinnerRipple from '@/components/Loader/SpinnerLoader'
import useDatabaseData from '@/hooks/useDatabaseData'
import DashboardLayout from '@/layouts/dashboard-layout'

const DynamicAdminContactusView = dynamic(
  () =>
    import(
      /* webpackChunkName: 'AdminContactusView' */ '@/components/Contactus/AdminContactusView'
    )
)

export default function ContactusPage() {
  const {
    dbdata: contactusState,
    loading,
    setDBData: setContactusState,
  } = useDatabaseData('articles/team/contact-us/content')

  function handleChange(evt: any, stateKey: string) {
    setContactusState({
      ...contactusState,
      [`${stateKey}`]: evt.target.value,
    })
  }
  return (
    <DashboardLayout title="About us page">
      <DashboardMainView>
        <h4 className="text-xl font-bold text-center">
          ✍🏻 Edit Contact us page content
        </h4>
        <p className="text-lg text-center mt-2 font-thin">
          Click on the text to edit content
        </p>

        {loading ? (
          <SpinnerRipple centerRipple />
        ) : contactusState !== null ? (
          <DynamicAdminContactusView
            contactusState={contactusState}
            handleChange={handleChange}
          />
        ) : (
          <p>Unable to fetch data</p>
        )}
      </DashboardMainView>
    </DashboardLayout>
  )
}
