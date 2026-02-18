
// create page
import axios from 'axios';
import { ArrowLeftIcon } from 'lucide-react'
import React, { use, useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import {toast} from "react-hot-toast"
import api from '../Utils/axios.js';
export default function CreatePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!title.trim() || !content.trim()) {
      toast.error("All feild required!")
      return
    }
    setLoading(true)

    try {
      await api.post('/notes', {
      title,
        content
      })
      toast.success("Note created successfully!")
      navigate("/")
    } catch (error) {
      toast.error("Something went wrong!")
    }
    finally {
      setLoading(false)
    }
  }
  return (
    <div className="min-h-screen bg-base-200">
      <div className="w-full mx-auto px-4 py-8 ">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Back to Notes
          </Link>
          <div className='card bg-base-100'>
            <div className='card-body'>
              <h2 className='card-title'>Create New Note</h2>
              <form onSubmit={handleSubmit} >
                <div className='form-control mb-4'>
                  <label className='label'><span className='label-text'>Title</span></label>
                  <input
                    type='text'
                    placeholder='Note title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className='input input-bordered w-full rounded-2xl p-4'
                  />
                </div>
                <div className='form-control mb-4'>
                  <label className='label'><span className='label-text'>Content</span></label>
                  <textarea
                    type='text'
                    placeholder='Content'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className='input input-bordered w-full rounded-2xl h-32 p-4'
                  />
                </div>
                <div className="card-action flex justify-end">
                  <button type='submit' disabled={loading} className='btn btn-success' >{loading ? "Creating " : "Creata Notes"} </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    </div>

  )
}
