
// notes cards


import { PenSquareIcon, Trash2Icon } from "lucide-react"
import {Link} from "react-router-dom"
import formatDate from "../Utils/formateDate.js"
import api from '../Utils/axios.js';
import {toast} from "react-hot-toast"

export default function NotesCard({note ,setNotes}){

    const handleDelete = async(e,id)=>{
        e.preventDefault()  //get rid of navigation to note details page 
        if(!window.confirm("Are you sure you want to delete this note?")) return;
        try {

          await api.delete(`/notes/${id}`)
          setNotes((prev)=>prev.filter((item)=>item._id !== id)) // get rid of delete node
          toast.success("Note deleted successfully!")


           
        } catch (error) {
            console.error("error in deleting note",error)
            toast.error("Something went wrong!")
        }

    }
    return (
        <Link to={`/notes/${note._id}`} className="card bg-gray-900 hover:shadow transition-all border-t-4 border-solid border-[#00ff9d]  " >
            <div className=" card-body "  >
                <h3 className=" card-title text-base-content  ">
                    {note.title}
                </h3>
                <p className=" text-base-content/70 line-clamp-3 " >
                    {note.content}
                </p>
                <div className=" card-actions justify-between items-center mt-4 ">
                    <span className=" text-sm text-base-content/60 ">{formatDate(note.createdAt)}
                    </span>
                    <div className="flex justify-center gap-1"> 
                        <PenSquareIcon/>
                        <button  className="btn btn-ghost btn-xs text-error" onClick={(e)=>handleDelete(e,note._id)}>
                            <Trash2Icon/>
                        </button>
                    </div>

                </div>
            </div>
        
        </Link>
    )
}