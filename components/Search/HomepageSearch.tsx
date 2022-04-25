import {BsSearch} from 'react-icons/bs'

export default function HomepageSearch(){
    return (
        <div className="search flex bg-gray-100 rounded-md py-2 px-4 items-center">
            <input className='border-0 bg-transparent focus:border-0' type="text" placeholder="Search" />
            <button>
                <BsSearch />
            </button>
        </div>
    )
}