import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    } from "react-router-dom";
import Categorias from './Categorias';
import Inicio from './Inicio';
import Productos from './Productos';
import Ventas from './Ventas';
import Navbar from './Navbar';
const Dashboard = () => {
  return (
    <>
 <Router>
    <Navbar/>
   <div className='container'>
   <Routes>
    <Route path='/' element={<Inicio/>}/>
    <Route path="/categorias" element={<Categorias/>}/>
    <Route path="/productos" element={<Productos/>}/>
    <Route path="/ventas" element={<Ventas/>}/>
  </Routes>
   </div>
 </Router>
    </>
  )
}

export default Dashboard