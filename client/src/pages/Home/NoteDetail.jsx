import { MdClose } from "react-icons/md";
import { MdFileDownload } from "react-icons/md";

const NoteDetail = ({noteData, onClose}) => {

  if(!noteData)
  {
    return null;
  }

  const downloadNotes = () => {
    const fileContent = `Title: ${noteData.title}\nContent: ${noteData.content}\nTags: ${noteData.tags?.join(", ")}`;
    const blob = new Blob([fileContent], {type: "text/plain"});
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${noteData.title || "note"}.txt`;
    link.click();

    URL.revokeObjectURL(url);
  }
  
  return (
    <div className='relative'>
      <button className='flex w-10 h-10 p-0 m-0 items-center justify-center absolute -top-3 right-9 hover:bg-slate-50 rounded'
          onClick={downloadNotes}
      >
        <MdFileDownload className='text-xl text-blue-400'/>
      </button>
      <button className='flex w-10 h-10 p-0 m-0 items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50 rounded'
          onClick={onClose}
      >
        <MdClose className='text-xl text-red-400'/>
      </button>
      
      <div className="flex flex-col">
        <h2 className="text-xl font-medium mb-8 text-center">Note Summary</h2>
        <div className='flex flex-col gap-2'>
          <label className='text-xs text-slate-400 font-medium'>TITLE</label>
          <h2 className='text-2xl text-slate-950'>{noteData.title}</h2>
        </div>

        <div className='flex flex-col gap-2 mt-4'>
          <label className='text-xs text-slate-400 font-medium underline'>CONTENT</label>
          <h2 className='text-sm text-slate-950 overflow-y-auto max-h-[50vh]'>{noteData.content}</h2>
        </div>
        

        <div className='mt-3'>
          <label className='text-xs text-slate-400 font-medium underline'>TAGS</label>
          <div className='flex gap-3 items-center flex-wrap'>
            {noteData.tags.map((tag, index) => (
                <span key={index} className='flex gap-2 items-center text-sm bg-slate-100 text-slate-900 rounded px-2 py-1 mt-1'>
                  #{tag} 
                </span>    
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoteDetail
