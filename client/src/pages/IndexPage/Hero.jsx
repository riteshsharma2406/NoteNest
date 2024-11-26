
import { ReactTyped } from "react-typed";
import { Link } from "react-router-dom"

const Hero = () => {
  return (
    <div>
        <div className="max-w-[800px] mt-[-96px] w-full h-screen mx-auto flex flex-col justify-center text-center" >
            <p className='font-bold text-lg p-2'>Capture your Ideas, Organize your life with</p>
            <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md: py-6 text-[#623817]'>NoteNest.</h1>
            <div className='flex flex-col gap-5'>
                <p className='md:text-5xl sm:text-4xl text-xl font-bold'>Capture. Organize. Remember.</p>
                <ReactTyped
                    className='md:text-5xl sm:text-4xl text-xl font-bold text-[#623817]'
                    strings={[
                        "Ideas",
                        "Tasks",
                        "Thoughts",
                        "Reminders",
                        "Plans"
                    ]}
                    typeSpeed={120}
                    backSpeed={140}
                    loop
                />
            </div>
            <Link to="/signup">
             <button className='bg-[#BC957D] w-[200px] rounded-md font-medium my-6 mx-auto py-3 hover:bg-[#A27246] transition-all ease-in-out'>Get Started</button>
            </Link>
        </div>
    </div>
  )
}

export default Hero
