import Dropdown from '@/components/Dropdown'
import DropdownItem from '@/components/Dropdown/DropdownItem'

export default function ProductTabDropdown() {
  const tabs = ['Special Products', 'Featured Products']
  function selectedTabHandler(e: any) {
    e.preventDefault()
  }
  return (
    <Dropdown
      className="bg-transparent text-lg text-black border-none shadow-none"
      dropdownText="New Products"
    >
      {tabs.map((tab, index) => (
        <DropdownItem key={index} onClick={selectedTabHandler}>
          {tab}
        </DropdownItem>
      ))}
    </Dropdown>
  )
}
