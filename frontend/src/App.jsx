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

function App() {
  return (

    <div className='px-4 sm:px-[5vw] md:px-[5vw] lg:px-[9vw]'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/About' element={<About/>} />
        <Route path='/Cart' element={<Cart/>} />
        <Route path='/Collection' element={<Collection/>} />
        <Route path='/Home' element={<Home/>} />
        <Route path='/Login' element={<Login/>} />
        <Route path='/Orders' element={<Orders/>} />
        <Route path='/PlaceOrder' element={<PlaceOrder/>} />
        <Route path='/Product' element={<Product/>} />
        <Route path='/Contact' element={<Contact/>} />
      </Routes>
      <Footer></Footer>
    </div>
  )
}

export default App