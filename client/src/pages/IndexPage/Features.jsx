import feature from "../../assets/feature.png"
import { Link } from "react-router-dom"

const Features = () => {
  return (
    <div className="w-full bg-white py-16 px-4">
      <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
        <img className="w-[500px] mx-auto my-4 rounded-lg" src={feature} alt="feature" />
        <div className="flex flex-col justify-center gap-4"> 
            <h1 className="text-[#623817] font-bold md:text-4xl sm: text-3xl text-2xl uppercase">Smart Note Management</h1>
            <p className="">Take control of your ideas with features that let you add, edit, and delete notes effortlessly. With secure authentication, your data stays protected, and downloadable options keep your notes accessible anytime. Stay organized like never before!</p>
            <Link to="/signup">
             <button className='bg-[#BC957D] w-[200px] rounded-md font-medium my-6 mx-auto py-3 hover:bg-[#A27246] transition-all ease-in-out'>Get Started</button>
            </Link>
        </div>
        
      </div>
    </div>
  )
}

export default Features
