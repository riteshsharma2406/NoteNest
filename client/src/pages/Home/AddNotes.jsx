import { useState } from 'react'
import TagsInputs from '../../components/inputs/TagsInputs'
import { MdClose } from "react-icons/md";
import axiosInstance from '../../utils/axiosInstance';

const AddNotes = ({noteData, type, onClose, getAllNotes, showToastMessage}) => {

  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);
  const [error, setError] = useState(null);


  //Add new Notes
  const addNewNotes = async () => {
    try{
      const response = await axiosInstance.post("/add-notes",{
        title,
        content,
        tags
      });

      if(response.data && response.data.notes)
      {
        showToastMessage("Note added successfully")
        getAllNotes();
        onClose();
      }
    }catch(error) {
      if(error.response && error.response.data && error.response.data.message)
      {
        setError(error.response.data.message)
      }
    }
  };

  //edit notes
  const editNotes = async () => {
    const noteId = noteData._id;
    try{
      const response = await axiosInstance.put("/edit-notes/" + noteId ,{
        title,
        content,
        tags
      });

      if(response.data && response.data.notes)
      {
        showToastMessage("Note updated successfully")
        getAllNotes();
        onClose();
      }
    }catch(error) {
      if(error.response && error.response.data && error.response.data.message)
      {
        setError(error.response.data.message)
      }
    }
  };


  const handleAddNote = async () => {
    if(!title)
    {
      setError("Please add the title");
      return;
    }

    if(!content)
    {
      setError("Please add the Content")
      return;
    }

    setError("");

    if(type==="edit")
    {
      editNotes();
    }
    else{
      addNewNotes();
    }


  }
  

  return (
    <div className='relative'>
        <button className='flex w-10 h-10 p-0 m-0 items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50 rounded'
          onClick={onClose}
        >
          <MdClose className='text-xl text-red-400'/>
        </button>
      

      <div className='flex flex-col gap-2'>
        <label className='input-label'>TITLE</label>
        <input 
            type="text"
            className='text-2xl text-slate-950 outline-none'
            placeholder='Go to Gym...'
            value={title}
            onChange={({target})=>{setTitle(target.value)}}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className='input-label'>CONTENT</label>
        <textarea type="text"
            className='text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded overflow-y-scroll'
            placeholder='Content'
            rows={10}
            value={content}
            onChange={({target})=>setContent(target.value)}
        />
      </div>

      <div className="mt-3">
        <label className='input-label'>TAGS</label>
        <TagsInputs tags={tags} setTags={setTags}/>
        
      </div>

      {error && (<p className='text-red-500 pt-4 text-xs'>
        {error}
      </p>)}

      <button className='btn-primary font-medium mt-5 p-3'
        onClick={handleAddNote}
      >
        {type === "edit" ? "UPDATE NOTE" : "ADD NOTE"}
      </button>
    </div>
  )
}

export default AddNotes
