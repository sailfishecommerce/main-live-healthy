import { MdKeyboardArrowUp } from 'react-icons/md'

import HomepageSearch from '@/components/Search/HomepageSearch'
import useNav from '@/hooks/useNav'

export default function MobileSearchbar() {
  const { toggleSearch } = useNav()

  return (
    <div className="relative flex mx-auto items-center container my-2">
      <HomepageSearch />
      <button
        type="button"
        title="close"
        aria-label="search"
        className="h-10 search bar w-1/12 flex justify-center items-center"
        onClick={toggleSearch}
      >
        <MdKeyboardArrowUp />
      </button>
    </div>
  )
}
