import useNav from "@/hooks/useNav";
import { BsSearch } from "react-icons/bs";
import { MdKeyboardArrowUp } from "react-icons/md";

export default function MobileSearchbar() {
  const { toggleSearch } = useNav();

  return (
    <div className="flex mx-auto items-center container my-2">
      <div className="search-container rounded-lg flex items-center w-11/12">
        <input
          className="bg-light-gray px-4 py-2 rounded-lg w-full"
          placeholder="Search"
        />
        <button className="-ml-8" title="search">
          <BsSearch />
        </button>
      </div>
      <button
        title="close"
        onClick={toggleSearch}
        className="h-10 search bar w-1/12 flex justify-center items-center"
      >
        <MdKeyboardArrowUp />
      </button>
    </div>
  );
}
