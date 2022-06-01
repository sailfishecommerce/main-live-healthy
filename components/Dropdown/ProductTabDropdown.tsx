import Dropdown from '@/components/Dropdown'
import DropdownItem from '@/components/Dropdown/DropdownItem'

interface ProductTabDropdownProp {
  dropdown: Array<{ name: string; value: number }>
  onClick: (tabValue: number) => void
}

export default function ProductTabDropdown({
  dropdown,
  onClick,
}: ProductTabDropdownProp) {
  return (
    <Dropdown
      className="bg-transparent text-lg text-black border-none shadow-none"
      dropdownText="New Products"
    >
      {dropdown.map((tab) => (
        <DropdownItem key={tab.value} onClick={onClick}>
          {tab.name}
        </DropdownItem>
      ))}
    </Dropdown>
  )
}
