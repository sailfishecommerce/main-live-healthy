import AllCategoriesDropdown from '@/components/Dropdown/AllCategoriesDropdown'
import SecondaryMenuLinks from '@/components/Menu/SecondaryMenuLinks'
import HomepageSearch from '@/components/Search/HomepageSearch'

export default function SecondaryMenu() {
  return (
    <div className="md:flex lg:px-4 xl:px-0 items-center relative justify-between py-2">
      <AllCategoriesDropdown />
      <SecondaryMenuLinks />
      <HomepageSearch />
    </div>
  )
}
