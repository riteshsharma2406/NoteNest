import React from 'react'
import { MdClear } from "react-icons/md";
import { FaMagnifyingGlass } from "react-icons/fa6";

const SearchBar = ({value, onChange, handleSearch, clearSearch, userInfo}) => {
  return (
    <>
    {userInfo && <div className='w-80 flex items-center px-4 bg-slate-100 rounded-md'>
      <input 
        type="text" 
        placeholder='Search Notes'
        className='w-full text-sm bg-transparent py-[11px] outline-none'
        value={value}
        onChange={onChange}
        />

        {value && <MdClear size={20} className='text-slate-500 cursor-pointer hover:text-black mr-3'
            onClick={clearSearch} />}
        
        <FaMagnifyingGlass  size={20} className='text-slate-500 cursor-pointer hover:text-black'
            onClick={handleSearch}/>

    </div>}
    </>
  )
}

export default SearchBar
