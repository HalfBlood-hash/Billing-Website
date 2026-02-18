// note details page

import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { LoaderIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../Utils/axios'
import { ArrowLeftIcon,Trash2Icon } from 'lucide-react'

export default function NoteDetailsPage() {
  const [loading, setLoading] = useState(true)
  const [save, setSave] = useState(false)

  const [note, setNote] = useState(null)
  const { id } = useParams()
  
  const navigate = useNavigate()
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`)
        setNote(res.data.payload)
        // toast.success("Note fetch  successfully!")
      } catch (error) {
        console.log("Error in fetching note by id ")
        toast.error("Something went wrong!")
      }
      finally {
        setLoading(false)
      }
    }
    fetchNote()
  }, [])

  const handleDelete = async() => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted");
      navigate("/");
    } catch (error) {
      console.log("Error deleting the note:", error);
      toast.error("Failed to delete note");
    }
   }
  const handleSave = async (e) => {
    e.preventDefault()
    console.log(note)
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add a title or content");
      return;
    }
    setSave(true)

    try {
      await api.put(`/notes/${id}`, note)
      toast.success("Note updated successfully!")

      setSave(false)
      navigate("/")
    } catch (error) {
      console.error("Error in updating note", error)
      toast.error("Something went wrong!")

    }
    finally {
      setLoading(false)
    }

  }

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className=" min-h-screen bg-base-200  ">
      <div className='w-full mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
          <div className='flex justify-between items-center'>

          <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Back to Notes
          </Link>
          <button onClick={handleDelete} className="btn btn-error btn-outline">
              <Trash2Icon className="h-5 w-5" />
              Delete Note
            </button>
          </div>
          <div className='card bg-base-100'>
            <div className='card-body'>
              <h2 className='card-title'>Create New Note</h2>
              <form onSubmit={handleSave} >
                <div className='form-control mb-4'>
                  <label className='label'><span className='label-text'>Title</span></label>
                  <input
                    type='text'
                    placeholder='Note title'
                    value={note.title}
                    onChange={(e) => setNote({ ...note, title: e.target.value })}
                    className='input input-bordered w-full rounded-2xl p-4'
                  />
                </div>
                <div className='form-control mb-4'>
                  <label className='label'><span className='label-text'>Content</span></label>
                  <textarea
                    type='text'
                    placeholder='Content'
                    value={note.content}
                    onChange={(e) => setNote({ ...note, content: e.target.value })}
                    className='input input-bordered w-full rounded-2xl h-32 p-4'
                  />
                </div>
                <div className="card-action flex justify-end">
                  <button type='submit' disabled={save} className='btn btn-success' >{loading ? "saving... " : "save Notes"} </button>
                </div>
              </form>
            </div>
          </div>

        </div>

      </div>

    </div>
  )
}
