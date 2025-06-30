import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Login from './components/Login';
import AccountSetup from './components/AccountSetup';
import ChatPage from './components/ChatPage';
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/setup' element={<AccountSetup />} />
          <Route path='/chat' element={<ChatPage />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
