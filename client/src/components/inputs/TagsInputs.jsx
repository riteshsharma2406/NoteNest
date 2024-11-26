import { useState } from 'react'
import { IoAddOutline } from "react-icons/io5";
import { MdClose } from "react-icons/md";

const TagsInputs = ({tags, setTags}) => {

    const [inputValue,setInputValue] = useState("");

    const addNewTag = () => {
        if(inputValue.trim() !== "")
        {
            setTags([...tags, inputValue]);
            setInputValue("");
        }
    }

    const handleKeyDown = (e) => {
        if(e.key === "Enter")
        {
            addNewTag()
        }
    }

    const handleRemoveTag = (tagRemove) => {
      setTags(tags.filter((_,index) => index !== tagRemove))
    }

  return (
    <div>
        
      <div className='flex gap-3 items-center flex-wrap'>
          {tags.map((tag, index) => (
              <span key={index} className='flex gap-2 items-center text-sm bg-slate-100 text-slate-900 rounded px-2 py-1 mt-1'>
                #{tag} 
                <button onClick={()=>{handleRemoveTag(index)}}>
                  <MdClose className='hover:text-red-400 cursor-pointer'/>
                </button>
              </span>    
          ))}
      </div>

      <div className="flex items-center gap-4 mt-3">

        <input 
            type="text" 
            className="text-sm bg-transparent border outline-none px-3 py-2 rounded" 
            placeholder='Add Tags'
            value={inputValue}
            onChange={(e)=>setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
        />

        <button className='w-8 h-8 flex items-center justify-center rounded hover:bg-primary border border-primary'
            onClick={addNewTag}
        >
            <IoAddOutline className='text-2xl text-primary hover:text-white' />
        </button>

      </div>
    </div>
  )
}

export default TagsInputs
