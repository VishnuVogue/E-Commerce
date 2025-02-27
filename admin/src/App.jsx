import React,{useState,useEffect} from 'react'
import Navbar from './Components/Navbar'
import Sidebar from './Components/Sidebar'
import {Routes,Route} from "react-router-dom"
import Add from './Pages/Add'
import Orders from './Pages/Orders'
import List from './Pages/List'
import Login from './Components/Login'

import { ToastContainer } from 'react-toastify';

export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = '₹'

const App = () => {

  const [token,setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):'');

  useEffect(() => {
    localStorage.setItem('token',token)
  },[token])

  return (
    <div className='bg-grey-50 min-h-screen'>
      <ToastContainer></ToastContainer>
        { token === "" ? <Login setToken={setToken} /> 
        :
        <>
          <Navbar setToken={setToken}></Navbar>
          <hr />
          <div className='flex w-full'>
            <Sidebar></Sidebar>
            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base ">
              <Routes>
                <Route path='/add' element={<Add token={token} />}></Route>
                <Route path='/list' element={<List token={token}  />}></Route>
                <Route path='/order' element={<Orders token={token}  />}></Route>
              </Routes>
            </div>
          </div>
        </>
        }
        
    </div>
  )
}

export default App