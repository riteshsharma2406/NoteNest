import { Link } from 'react-router-dom';

const TempNav = () => {
  return (
    <div className='flex items-center justify-between max-w-[1240px] mx-auto px-6 py-2'>
        <Link to="/">
            <div className='text-xl font-bold text-black py-2'>NoteNest.</div>
        </Link>
    </div>
  )
}

export default TempNav
