import React from 'react'
import axios from '../services/Api'
const Ventas = () => {
    const [producto, setProductos] = React.useState([])
    const [sala, setSala] = React.useState([])
    const [salaProductos, setSalaProductos] = React.useState([])
    const modo = 1;
    React.useEffect(()=>{
        getSala()
        getProductos()
        getSalaProductos()
    },[])

const estado = 0;
    const getSalaProductos = async ()=>{
        await axios.get(`/api/salas-producto/${modo}`).then(response=>{
            setSalaProductos(response.data)
        })
      }

    const getProductos = async ()=>{
        await axios.get(`/api/producto/${modo}`).then(response=>{
          setProductos(response.data)
        })
      }
      const getSala = async ()=>{
        await axios.get("/api/salas").then(response=>{
          setSala(response.data)
        })
      }
    const [form, setForm] = React.useState({
        id_sala: "",
        id_productos: "",
        cantidad: ""
    });
    const onInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleUpdateClick = (data) => {
        setForm({ updateId: data.id, id_sala: data.id_sala, id_productos: data.id_producto, cantidad: data.cantidad });
      };

      const handleDelete = async (id) => {
        try {
          await axios.post(`/salas-productos-cambio-estado/${id}`);
          getSalaProductos();
        } catch (e) {
          console.log("error"+ e)
        }
      };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        if (form.updateId) {
            await axios.post(`/api/salas-productos-update/${form.updateId}`, {
              id_sala: form.id_sala,
              id_productos: form.id_productos,
              cantidad:  form.cantidad
            });
            getSalaProductos();
        }else{
            await axios.post("/api/salas-productos-create", form);
            setForm({ id_sala: "", id_productos: "", cantidad: "" });
            getSalaProductos()
        }
            
        } catch (e) {
            console.log("error" + e)
        }
    }
    return (
        <div>
            <>
                <div className='row justify-content-center'>
                    <div className="col-12 col-sm-10 col-md-6 col-xl-4">
                        <form onSubmit={handleSubmit}>
                            <label>
                                Sala
                            </label>
                            <select className="form-select mb-3" name="id_sala" value={form.id_sala} onChange={onInputChange} id="SelCategorias">
                                <option value={-1}> Selecione una sala</option>
                                {
                                    sala.map((elemento)=>(
                                        <option key={"sala"} value={elemento.id}>{elemento.nombre_sala}</option>
                                    ))
                                }
                            </select>

                            <label>
                                Producto
                            </label>
                            <select className="form-select mb-3" name="id_productos" value={form.id_productos} onChange={onInputChange} id="SelCategorias">
                                <option value={-1}> Selecione un producto</option>
                                {
                                     producto.map((elemento)=>(
                                        <option key={"producto"} value={elemento.id_producto}>{elemento.nombre}</option>
                                     ))
                                }
                            </select>
                            <label>
                                Cantidad 
                            </label>
                            <input
                              className="form-control"
                              type="number"
                              name="cantidad"
                              value={form.cantidad}
                              onChange={onInputChange}
                            />
                        
                            <button className='btn btn-success mt-2'>{form.updateId ? "Editar":"Crear"}</button>
                        </form>
                    </div>
                </div>
                <div className='container'>

                    <table class="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nombre Producto</th>
                                <th>Cantidad Producto</th>
                                <th>Sala Producto</th>
                                <th>Eliminar</th>
                                <th>Editar</th>
                            </tr>
                        </thead>
                        <tbody>
                        {salaProductos.length > 0 ? (
                  <>
                    {salaProductos.map((row, index) => (
                      <tr key={`row${index}`}>
                        <td>{row.id_sala_producto}</td>
                        <td>{row.nombre}</td>
                        <td>{row.cantidad}</td>
                        <td>{row.nombre_sala}</td>
                        <td>
                          <button
                            className="btn btn-success"
                            onClick={() => {
                              handleUpdateClick(row);
                            }}
                          >
                            Editar
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => {
                              handleDelete(row.id_sala_producto);
                            }}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </>
                ) : (
                  <tr colSpan={2}>
                    <td>No hay ningún usuario</td>
                  </tr>
                )}
                        </tbody>
                    </table>
                </div>
            </>
        </div>
    )
}

export default Ventas