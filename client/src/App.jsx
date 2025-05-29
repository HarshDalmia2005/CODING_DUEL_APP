import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router'
import Home from './components/Home'
import Duel from './components/Duel'

function App() {

  return (
    <>
      <Routes>
        <Route path='*' element={<Home/>} />
        <Route path='/duel/:roomId' element={<Duel/>} />
      </Routes>
    </>
  )
}

export default App
