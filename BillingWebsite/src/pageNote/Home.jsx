
// home page
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import NotesCard from './NotesCards'
import api from '../Utils/axios.js';
import NotesNotFound from './NotesNotFound.jsx';
export default function () {
  const [loading, setLoading] = useState(true)
  const [notes, setNotes] = useState([])
  useEffect(() => {
    const fectchData = async () => {
      try {
        const res = await api.get('/notes')
        setNotes(res.data.payload)
        
      } catch (error) {
        console.error('Error fectching data in home  ', error);
      }
      finally {
        setLoading(false)
      }
    }
    fectchData()
  }, [])
  return (
    <div className='min-h-screen'>
      <Navbar />
      <div className='max-w-7xl mx-auto p-4 mt-6'>
        {   loading && (<div className='text-center text-2xl font-bold text-purple-700'>Loading...</div> )}
        { notes.length===0 && <NotesNotFound/>}
        { notes && (
            <div className='grid grid-cols-1 md:grid-col-2 lg:grid-cols-3 gap-6'>
              {
                notes.map((note)=>(
                    <NotesCard key={note._id} note={note} setNotes={setNotes}  />
                ))
              }
            </div>
          )}
      </div>

    </div>
  )
}
