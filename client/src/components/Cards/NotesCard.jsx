import React from 'react'
import { MdOutlinePushPin } from "react-icons/md";
import { MdCreate } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FiBookOpen } from "react-icons/fi";

const NotesCard = ({
    title,
    date,
    content,
    tags,
    isPinned,
    onDetail,
    onEdit,
    onDelete,
    onPinNote
}) => {
  return (
    <div className='border border-[#BC9F7D] rounded-md p-4 hover:shadow-xl transition-all ease-in-out bg-white'>
      <div className="flex items-center justify-between">
        <div className=''>
            <h6 className="text-sm font-medium">{title}</h6>
            <span className='text-xs text-slate-600'>{date}</span>
        </div>
        <MdOutlinePushPin className={`icon-btn ${isPinned ? 'text-primary': 'text-slate-400'}`} onClick={onPinNote}/>
      </div>
        <p className="text-xs text-slate-600 mt-2">{content?.slice(0,60)}</p>

        <div className="flex items-center justify-between">
            <div className="text-xs text-slate-600">{`${tags} `}</div>
                <div className='flex items-center gap-2 mt-2'>
                    <FiBookOpen className='icon-btn hover:text-blue-600' onClick={onDetail}/>
                    <MdCreate className='icon-btn hover:text-green-600' onClick={onEdit} />
                    <MdDelete className='icon-btn hover:text-red-600' onClick={onDelete}/>
                </div>  
        </div>     
    </div>
  )
}

export default NotesCard
