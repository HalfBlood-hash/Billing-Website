
// app
import './App.css'
import BillForm from './pages/BillForm'
import Header from './components/Header/Header'


import { Route, Routes } from 'react-router-dom'
import Home from './pageNote/Home'
import CreatePage from './pageNote/CreatePage'
import NoteDetailsPage from './pageNote/NoteDetailsPage'

import Navbar from './pageNote/Navbar'
function App() {
  

  return (
   <>
     <div className=" relative h-full w-full overflow-x-hidden">
     <div className="relative h-full w-full bg-slate-950"><div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div><div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div></div>
   <Routes>
    <Route  path="/" element={<Home/>}  />
    <Route  path="/create" element={<CreatePage/>}  />
    <Route  path="/notes/:id" element={<NoteDetailsPage/>}  />
   </Routes>
   </div>
   {/* <Header/>
   <BillForm/> */}


   </>
  )
}

export default App
