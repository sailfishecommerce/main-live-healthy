import { useState } from 'react'

import TabBody from '@/components/Tabs/TabBody'
import TabHeader from '@/components/Tabs/TabHeader'

export default function Tabs() {
  const [tab, setTab] = useState(0)

  const onTabChange = (tabIndex: number) => setTab(tabIndex)

  return (
    <div className="mx-auto">
      <TabHeader tab={tab} onClickHandler={onTabChange} />
      <TabBody tab={tab} />
    </div>
  )
}
