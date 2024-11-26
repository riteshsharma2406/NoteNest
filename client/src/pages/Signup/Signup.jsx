import { useState } from "react"
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import PasswordInput from "../../components/inputs/PasswordInput";
import { validateEmail } from "../../utils/helper";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance"
import TempNav from "../../components/Navbar/TempNav";


const Signup = () => {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignUp =  async (e) => {
    e.preventDefault();

    if(!name)
    {
      setError("Please Enter the Name");
      return;
    }

    if(!validateEmail(email))
    {
      setError("Please Enter the valid Email");
      return;
    }

    if(!password)
    {
      setError("Please Enter the password");
      return;
    }

    setError("");

    //signup API call
    try{
      const response = await axiosInstance.post("/create-account",{
        fullName: name,
        email: email,
        password: password
      });

      if(response.data && response.data.error)
      {
        setError(response.data.message)
        return;
      }

      if(response.data && response.data.accessToken)
      {
        localStorage.setItem("token", response.data.accessToken)
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
        <div className="w-96 border rounded-md bg-white px-7 py-10 drop-shadow-md mx-auto">
          <form onSubmit={handleSignUp}>
            <h4 className="text-2xl mb-4 flex items-center justify-center">SignUp</h4>

            <div className="input-field">
              <MdOutlineDriveFileRenameOutline 
                size={20}
                className="text-gray-500" 
              />
              <input
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    type="text"
                    placeholder="Name"
                    className="input-box"
              /> 
            </div>

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

            <button type="submit" className="btn-primary">Create an account</button>

            <p className="text-sm text-center mt-4"> 
              Already have a account?{" "}
              <Link to="/login"c className="font-medium text-primary underline">
                Login
              </Link>
            </p>

          </form>
        </div>
      </div>
    </div>


  )
}

export default Signup
