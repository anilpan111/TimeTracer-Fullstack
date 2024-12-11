import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Sidebar from './Components/Sidebar'

function App() {
  return (
    <>
      <Navbar/>
      <Sidebar/>
      <Outlet/>
    </>
  )
}

export default App
