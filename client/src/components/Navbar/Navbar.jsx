import ProfileInfo from "../Cards/ProfileInfo"
import { useNavigate } from 'react-router-dom';
import SearchBar from "../SearchBar/SearchBar";
import { useState } from "react";
import { Link } from 'react-router-dom';


const Navbar = ({userInfo,onSearchNote,handleClearSearch}) => {

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if(searchQuery)
    {
      onSearchNote(searchQuery)
    }
  }

  const clearSearch = () => {
    setSearchQuery("")
    handleClearSearch()
  }

  const navigate = useNavigate()

  const onLogout = () => {
    localStorage.clear()
    navigate("/login")
  }

  return (
    <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow'>
        <Link to="/">
          <div className='text-xl font-bold text-black py-2'>NoteNest.</div>
        </Link>
        <SearchBar
          value={searchQuery}
          onChange={(e)=>setSearchQuery(e.target.value)}
          handleSearch={handleSearch}
          clearSearch={clearSearch}
          userInfo = {userInfo}
        />
        <ProfileInfo userInfo = {userInfo} onLogout={onLogout}/>

    </div>
  )
}

export default Navbar
