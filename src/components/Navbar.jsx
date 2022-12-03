import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {
    return (
        <div>
            <div className='navbar navbar-dark bg-success mb-3'>
                <Link className='navbar-brand' to="/"><h2>Salon Ventas</h2></Link>
                <div className='d-flex'>
                    <Link to="/categorias" className='btn btn-success mr-3'><h5>Categorias</h5></Link>
                    <Link to="/productos" className='btn btn-success mr-3'><h5>Productos</h5></Link>
                    <Link to="/ventas" className='btn btn-success mr-3'><h5>Productos Salas Ventas</h5></Link>
                </div>
            </div>

        </div>
    )
}

export default Navbar