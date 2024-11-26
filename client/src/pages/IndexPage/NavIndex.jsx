import { useState } from 'react'
import { MdMenu, MdClose } from "react-icons/md";
import { Link } from 'react-router-dom';

const NavIndex = () => {

    const [nav,setNav] = useState(false)

    const handleNav = () => {
        setNav(!nav)
    }

  return (
    
        <div className='flex items-center justify-between max-w-[1240px] mx-auto px-6 py-2'>
            <div className='text-xl font-bold text-black py-2'>NoteNest.</div>
            <ul className='hidden md:flex gap-4 '>
                <li><a href="#home" className="relative text-lg group">
                        Home
                        <span
                            className="absolute left-0 bottom-0 h-0.5 w-0 bg-[#A27246] transition-all duration-300 group-hover:w-full"
                        ></span>
                    </a>
                </li>
                <li><a href="#feature" className="relative text-lg group">
                        Feature
                        <span
                            className="absolute left-0 bottom-0 h-0.5 w-0 bg-[#A27246] transition-all duration-300 group-hover:w-full"
                        ></span>
                    </a>
                </li>
                <li><a href="#about" className="relative text-lg group">
                        About
                    <span
                        className="absolute left-0 bottom-0 h-0.5 w-0 bg-[#A27246] transition-all duration-300 group-hover:w-full"
                    ></span>
                    </a>
                </li>
                <li>
                    <span className="relative text-lg group">|</span>
                </li>
                <li>
                    <Link to="/login" className="relative text-lg group">
                        <button className=''>
                            Login
                            <span
                                className="absolute left-0 bottom-0 h-0.5 w-0 bg-[#A27246] transition-all duration-300 group-hover:w-full"
                            ></span>
                        </button>
                    </Link>
                </li>
                <li>
                    <Link to="/signup" className="relative text-lg group">
                        <button className=''>
                            Signup
                            <span
                                className="absolute left-0 bottom-0 h-0.5 w-0 bg-[#A27246] transition-all duration-300 group-hover:w-full"
                            ></span>
                        </button>
                    </Link>
                </li>
            </ul>
            <div onClick={handleNav} className='block md:hidden'>
                {nav ? (<MdClose size={20}/>) : (<MdMenu size={20}/>)}
            </div>

            <div className={nav ? `fixed left-0 top-0 w-[40%] h-full border-r border-r-red-200 px-6 py-2 nav-color ease-in-out duration-500`: `fixed left-[-100%] ease-in-out duration-500`}>
            <div className='text-xl font-bold text-black py-2'>NoteNest.</div>
                <ul className='pt-10 uppercase flex flex-col gap-5'>
                    <li className='border-b border-[#A27246]'><a href="#home">Home</a></li>
                    <li className='border-b border-[#A27246]'><a href="#feature">Feature</a></li>
                    <li className='border-b border-[#A27246]'><a href="#about">About</a></li>
                </ul>
            </div>
        </div>
    
  )
}

export default NavIndex
