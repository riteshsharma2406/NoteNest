/* eslint-disable react/jsx-key */
import NotesCard from "../../components/Cards/NotesCard"
import Navbar from "../../components/Navbar/Navbar"
import { FiPlus } from "react-icons/fi";
import AddNotes from "./AddNotes";
import { useEffect, useState } from "react";
import Modal from 'react-modal';
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import moment from 'moment';
import Toast from "../../components/ToastMessage/Toast";
import EmptyCard from "../../components/Cards/EmptyCard";
import AddNote from "../../assets/addNotes.png"
import NoData from "../../assets/noData.png"
import axios from "axios";
import NoteDetail from "./NoteDetail";


const Home = () => {

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null
  })

  const [openNoteDetail, setOpenNoteDetail] = useState({
    isShown: false,
    data: null
  })

  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([])
  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: "",
    type: ""
  })
  const [isSearch, setIsSearch] = useState(false);

  const navigate = useNavigate();

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({isShown: true, type: "edit", data: noteDetails})
  }

  const handleDetail = (noteDetails) => {
    setOpenNoteDetail({isShown: true, data: noteDetails})
  }

  const showToastMessage = (message, type) => {
    setShowToastMsg({
      isShown: true,
      message,
      type
    })
  }

  const handleCloseToast = () => {
    setShowToastMsg({
      isShown: false,
      message: "",
    })
  }

  //Get user info
  const getUserInfo = async () => {
    try{
      const response = await axiosInstance.get("/get-user");
      if(response.data && response.data.user)
      {
        setUserInfo(response.data.user)
      }
    }catch(error)
    {
      if(error.response.status === 404)
      {
        localStorage.clear();
        navigate("/login")
      }
    }
  };

  // get all notes
  const getAllNotes = async () => {

    try{
      const response = await axiosInstance.get("/get-all-notes");
      if(response.data && response.data.notes){
        setAllNotes(response.data.notes)
      }
    }catch(error)
    {
      console.log("An unexpected error occurred please try again")
    }
  }

  //delete notes
  const deleteNote = async (data) => {
    const noteId = data._id;
    try{
      const response = await axiosInstance.delete("/delete-note/" + noteId);

      if(response.data && !response.data.error)
      {
        showToastMessage("Note Deleted successfully","delete")
        getAllNotes();
      }
    }catch(error) {
      if(error.response && error.response.data && error.response.data.message)
      {
        console.log("An unexpected error occurred. Please try again later.")
      }
    }
  };

  //search for note 
  const onSearchNote = async (query)=>{
    try{
      const response = await axiosInstance.get("/search-notes",{
        params: {query}
      });

      if(response.data && response.data.notes)
      {
        setIsSearch(true)
        setAllNotes(response.data.notes)
      }
    }catch(error)
    {
      console.log(error)
    }
  }

  //isPinned for note
  const updateIsPinned = async (noteData) => {
    const noteId = noteData._id;

    try{
      const response = await axiosInstance.put(
        "/pinned/" + noteId,
        {
          isPinned: !noteData.isPinned
        }
      );

      if(response.data && response.data.note)
      {
        getAllNotes()
      }
    }catch(error)
    {
      console.log(error)
    }
  };

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes()
  }

  useEffect(()=>{
    getAllNotes()
    getUserInfo()
    return ()=>{}
  },[])

  

  return (
    <div>
      <Navbar 
        userInfo = {userInfo} 
        onSearchNote={onSearchNote} 
        handleClearSearch={handleClearSearch}
      />

      {allNotes.length>0 ? 
        (<div className="mx-5">
          <div className="grid gap-3 grid-cols-3 mt-8">
          {allNotes.map((item, index)=>(
            <NotesCard 
              key={item._id}
              title={item.title}
              date={moment(item.createdOn).format("Do MMM YYYY")} 
              content={item.content}
              tags={item.tags}
              isPinned={item.isPinned}
              onDetail={()=>{handleDetail(item)}}
              onEdit={()=> handleEdit(item)}
              onDelete={()=>deleteNote(item)}
              onPinNote={()=>updateIsPinned(item)}
          />
          ))}
          </div>
        </div>) : (
          <EmptyCard imgSrc={isSearch? NoData : AddNote} message={isSearch? `Oops! No notes found matching your search` : `Start creating your first note! Click on Add button. Capture your Ideas and organize your life. \n Let's get started!`}/>
        )
      
      }

      <button className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10 transition-all ease-in-out" onClick={()=>{
        setOpenAddEditModal({isShown:true, type: "add", data: null})
      }}>
        <FiPlus className="text-[32px] text-white"/>
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={()=>{}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
            backdropFilter: "blur(5px)",
            WebkitBackdropFilter: "blur(5px)",
          },
        }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-auto"
      >
        <AddNotes 
          type={openAddEditModal.type} 
          noteData={openAddEditModal.data} 
          onClose={()=>{setOpenAddEditModal({isShown: false, type: "add", data: null})}}
          getAllNotes = {getAllNotes}
          showToastMessage={showToastMessage}
          showToastMsg={showToastMsg}
          setShowToastMsg={setShowToastMsg}

        />
      </Modal>

      <Modal
        isOpen={openNoteDetail.isShown}
        onRequestClose={()=>{}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
            backdropFilter: "blur(5px)",
            WebkitBackdropFilter: "blur(5px)",
          },
        }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-10 p-5 overflow-auto"
      >
        <div>
          {openNoteDetail.data ? (
            <NoteDetail 
              noteData={openNoteDetail.data}
              onClose={()=>{setOpenNoteDetail({isShown:false, data: null})}}
          />
          ) : null}
        </div>
      </Modal>

      <Toast
        isShown={showToastMsg.isShown}
        message={showToastMsg.message}
        type={showToastMsg.type}
        onClose={handleCloseToast}
      />

    </div>
  )
}

export default Home
