import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import BillForm from './pages/BillForm'
import Header from './components/Header/Header'

function App() {
  const [count, setCount] = useState(0)

  return (
   <>
   <Header/>
   <BillForm/>
   </>
  )
}

export default App
