import { Link, useNavigate } from "react-router-dom"
import Navbar from "../../components/Navbar/Navbar"
import PasswordInput from "../../components/inputs/PasswordInput"
import { useState } from "react"
import { validateEmail } from "../../utils/helper"
import { MdEmail } from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance"
import NavIndex from "../IndexPage/NavIndex"
import TempNav from "../../components/Navbar/TempNav"


const Login = () => {

  const [email,setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if(!validateEmail(email))
    {
      setError("Please enter a valid email address");
      return;
    }

    if(!password)
    {
      setError("Please enter a valid password")
      return;
    }

    setError("")

    //login API call
    try{
      const response = await axiosInstance.post("/login",{
        email: email,
        password: password
      });

      if(response.data && response.data.accessToken)
      {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard")
      }
    }catch(error)
    {
      if(error.response && error.response.data && error.response.data.message)
      {
        setError(error.response.data.message)
        
      }else{
        setError("An unexpected error occurred. Please try again")
      }
    }

  }

  return (
    <div>
      <TempNav/>
      <div className="flex items-center justify-center mt-20">
        <div className="w-96 border rounded bg-white px-7 py-10 drop-shadow-md m-auto">
          <form onSubmit={handleLogin}>
            <h4 className="text-2xl mb-4 flex items-center justify-center">Login</h4>

            <div className="input-field">

                <MdEmail 
                  size={20}
                  className="text-gray-500"                
                />

                <input
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  type="text"
                  placeholder="Email"
                  className="input-box"
                    />   
            </div>

            <PasswordInput value={password} onChange={(e)=>setPassword(e.target.value)} />

            {error && <p className="text-red-500 text-sm pb-1">{error}</p>}

            <button type="submit" className="btn-primary">Login</button>

            <p className="text-sm text-center mt-4"> 
              Not yet Registered?{" "}
              <Link to="/signup"c className="font-medium text-primary underline">
                Create an account
              </Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
