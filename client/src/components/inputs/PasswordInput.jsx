/* eslint-disable react/prop-types */
import { useState } from "react"
import {FaRegEye, FaRegEyeSlash} from "react-icons/fa6"
import { FaKey } from "react-icons/fa";


const PasswordInput = ({value, onChange, placeholder}) => {

  const [isShowPassword, setIsShowPassword] = useState(false);
  
  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  }

  return (
    <div className="input-field">
        
        <FaKey
            size={20}
            className="text-gray-500"
        />

      <input
       value={value}
       onChange={onChange}
       type={isShowPassword ? "text" : "password"}
       placeholder={placeholder || "Password"}
       className="input-box"
        />

        {isShowPassword ? <FaRegEye
            size={22}
            className="text-gray-500 cursor-pointer"
            onClick={()=> toggleShowPassword()}
        /> : <FaRegEyeSlash
        size={22}
        className="text-gray-500 cursor-pointer"
        onClick={()=> toggleShowPassword()}
    />}

        
    </div>
  )
}

export default PasswordInput
