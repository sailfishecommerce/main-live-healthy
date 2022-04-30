import { MdKeyboardArrowUp } from 'react-icons/md'

import HomepageSearch from '@/components/Search/HomepageSearch'
import useNav from '@/hooks/useNav'

export default function MobileSearchbar() {
  const { toggleSearch } = useNav()

  return (
    <div className="relative flex mx-auto items-center container my-2">
      {/* <div className="search-container rounded-lg flex items-center w-11/12">
        <input
          className="bg-light-gray px-4 py-2 rounded-lg w-full"
          placeholder="Search"
        />
        <button type="button" className="-ml-8" title="search">
          <BsSearch />
        </button>
      </div> */}
      <HomepageSearch />
      <button
        type="button"
        title="close"
        className="h-10 search bar w-1/12 flex justify-center items-center"
        onClick={toggleSearch}
      >
        <MdKeyboardArrowUp />
      </button>
    </div>
  )
}
