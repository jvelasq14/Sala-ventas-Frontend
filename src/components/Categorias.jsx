import React from 'react'
import axios from '../services/Api';
const Categorias = () => {
  const [categorias, setCategorias] = React.useState([]);
  const modo = 1;
  const [form, setForm] = React.useState({
    nombre_categoria: ""
  });
  React.useEffect(()=>{
    getCategorias()
  }, [])
  const onInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/categorias-create", form);
            setForm({ nombre_categoria: "" }); 
            getCategorias()
    } catch (e) {
      console.log("error" + e)
    }
    }
    const getCategorias = async ()=>{
      await axios.get(`/api/categoria/${modo}`).then(response=>{
        setCategorias(response.data)
      })
    }
  return (
    <div>
           <>
    <div className='row justify-content-center'>
        <div className='col-12 col-sm-10 col-md-6 col-xl-4'>
          <form onSubmit={handleSubmit}>
          <label>
                Nombre: 
              </label>
              <input
                className="form-control"
                type="text"
                name='nombre_categoria'
                value={form.nombre_categoria}
                onChange={onInputChange}
              />
    
              <button className='btn btn-success mt-2'>Guardar</button>
          </form>
        </div>
    </div>
    <div className='container'>
    
    <table class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Nombre</th>
          <th>Eliminar</th>
          <th>Editar</th>
        </tr>
      </thead>
      <tbody>
       {
          categorias.map(element =>(
            <tr>
              <td>{element.categoria_id}</td>
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
    </div>
  )
}

export default Categorias