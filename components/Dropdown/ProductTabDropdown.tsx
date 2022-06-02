import { useState } from 'react'

import Dropdown from '@/components/Dropdown'
import DropdownItem from '@/components/Dropdown/DropdownItem'

interface ProductTabDropdownProp {
  dropdown: Array<{ name: string; value: number }>
  onClick: (tabValue: number) => void
}

type stateType = { value: string; show: boolean }

export default function ProductTabDropdown({
  dropdown,
  onClick,
}: ProductTabDropdownProp) {
  const [dropdownData, setDropdownData] = useState<stateType>({
    value: 'New Products',
    show: false,
  })

  function dropdownHandler(tab: { name: string; value: number }) {
    onClick(tab.value)
    setDropdownData({ value: tab.name, show: false })
  }

  function onClickDropdownHandler() {
    setDropdownData({ ...dropdownData, show: !dropdownData.show })
  }

  return (
    <Dropdown
      className="bg-transparent text-lg text-black border-none shadow-none"
      dropdownText={dropdownData.value}
      show={dropdownData.show}
      onToggle={onClickDropdownHandler}
    >
      {dropdown.map((tab) => (
        <DropdownItem key={tab.value} onClick={() => dropdownHandler(tab)}>
          {tab.name}
        </DropdownItem>
      ))}
    </Dropdown>
  )
}
