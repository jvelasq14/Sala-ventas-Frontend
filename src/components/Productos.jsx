import React from 'react'
import axios from '../services/Api'
const Productos = () => {
    const [categorias, setCategorias] = React.useState([]);
    const [productos, setProductos] = React.useState([]);
    const modo =  1;
    React.useEffect(() => {
        getProductos()
        getCategorias()
    },[])
    const getProductos = async () => {
        await axios.get(`/api/producto/${modo}`).then(response => {
            setProductos(response.data)
            console.log(productos)
        })
    }
    const getCategorias = async () => {
        await axios.get(`/api/categoria/${modo}`).then(response => {
            setCategorias(response.data)
        })
    }
    const [form, setForm] = React.useState({
        nombre: "",
        precio: "",
        id_categoria: ""
    });
    const onInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/api/productos-create", form);
            setForm({ nombre: "", precio: "", id_categoria: "" });
            getProductos()
        } catch (e) {
            console.log("error" + e)
        }
    }
    return (
        <>
            <div className='row justify-content-center'>
                <div className="col-12 col-sm-10 col-md-6 col-xl-4">
                    <form onSubmit={handleSubmit}>
                        <label>
                            Categoria
                        </label>
                        <select className="form-select mb-3" name="id_categoria" value={form.id_categoria} onChange={onInputChange} id="SelCategorias">
                            <option value={-1}> Selecione una categoria</option>
                            {

                                categorias.map((elemento)=>(
                                    <option key={"categoria"} value={elemento.categoria_id}>{elemento.nombre_categoria}</option>
                                ))

                            }
                        </select>

                        <label>
                            Nombre:
                        </label>
                        <input
                            className="form-control"
                            type="text"
                            name="nombre"
                            value={form.nombre}
                            onChange={onInputChange}
                        />

                        <label>
                            Precio:
                        </label>
                        <input
                            className="form-control"
                            type="text"
                            name="precio"
                            value={form.precio}
                            onChange={onInputChange}
                        />
                        <button className='btn btn-success mt-2'>Registrar</button>
                    </form>
                </div>
            </div>
            <div className='container'>

                <table class="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Categoria</th>
                            <th>Precio</th>
                            <th>Eliminar</th>
                            <th>Editar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                             productos.map(element=>(
                                <tr>
                                  <td>{element.id_producto}</td>
                                  <td>{element.nombre}</td>
                                  <td>{element.precio}</td>
                                  <td>{element.nombre_categoria}</td>
                                  <td><button className='btn btn-danger'>Eliminar</button></td>
                                  <td><button className='btn btn-primary'>Editar</button></td>
                                </tr>
                              ))
                        }
                    </tbody>
                </table>
            </div>
        </>

    )
}

export default Productos