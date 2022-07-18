import dynamic from 'next/dynamic'

// import AllCategoriesDropdown from '@/components/Dropdown/AllCategoriesDropdown'
import HomepageSearch from '@/components/Search/HomepageSearch'

const DynamicAllCategoriesDropdown = dynamic(
  () =>
    import(
      /* webpackChunkName: 'AllCategoriesDropdown' */ '@/components/Dropdown/AllCategoriesDropdown'
    ),
  { ssr: false }
)

const DynamicSecondaryMenuLinks = dynamic(
  () =>
    import(
      /* webpackChunkName: 'SecondaryMenuLinks' */ '@/components/Menu/SecondaryMenuLinks'
    ),
  { ssr: false }
)

export default function SecondaryMenu() {
  return (
    <div className="md:flex lg:px-4 xl:px-0 items-center relative justify-between py-2">
      <DynamicAllCategoriesDropdown />
      <DynamicSecondaryMenuLinks />
      <HomepageSearch />
    </div>
  )
}
