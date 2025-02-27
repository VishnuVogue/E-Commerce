import React from 'react'
import { Routes,Route } from "react-router-dom"

import About from './Pages/About'
import Cart from './Pages/Cart'
import Collection from './Pages/Collection'
import Home from './Pages/Home'
import PlaceOrder from './Pages/PlaceOrder'
import Product from './Pages/Product'
import Login from './Pages/Login'
import Orders from './Pages/Orders'
import Contact from './Pages/Contact'

import Navbar from './Components/Navbar'
import Footer from './Components/Footer'


import { ToastContainer, toast } from 'react-toastify';
import Verify from './Pages/Verify'
import Term from './Pages/Term'

function App() {
  return (

    <div className='px-4 sm:px-[5vw] md:px-[5vw] lg:px-[9vw]'>
      <ToastContainer></ToastContainer>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/About' element={<About/>} />
        <Route path='/Cart' element={<Cart/>} />
        <Route path='/Collection' element={<Collection/>} />
        <Route path='/Home' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/Orders' element={<Orders/>} />
        <Route path='/place-Order' element={<PlaceOrder/>} />
        <Route path='/product/:productId' element={<Product/>} />
        <Route path='/Contact' element={<Contact/>} />
        <Route path='/verify' element={<Verify/>} />
        <Route path='/term' element={<Term/>} />
      </Routes>
      <Footer></Footer>
    </div>
  )
}

export default App
