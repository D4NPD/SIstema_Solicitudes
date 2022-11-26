import React from 'react'
import './Registro.css'
import { db } from '../firebase'

const Registro = ({user}) => {
  
  const [registro, setRegistro] = React.useState(true)
  const [categoria, setCategoria] = React.useState('')
  const [listaServicios, setListaServicios] = React.useState(['Baños','Cielo Raso', 'Electrico','Pared','Puerta'])
  const [servicio, setServicio] = React.useState('')
  const [descripcion, setDescripcion] = React.useState('')
  const [ubicacion, setUbicacion] = React.useState('')
  const [fecha, setFecha] = React.useState('')
  const [id, setId] = React.useState('')
  const [listaSolicitudes, setLista] = React.useState([])
  const [error, setError] = React.useState('')
  const [exito, setExito] = React.useState(null)
  const [registrado, setRegistrado] = React.useState(false)


  const getTipoServicio = (categoria)=>{
    if(categoria === 'M. Inmuebles'){
      setListaServicios(['Baños','Cielo Raso', 'Electrico','Pared','Puerta'])
    }
    if(categoria === 'M. Muebles'){
      setListaServicios(['Aire Acondicionado','Archivador','Puesto de Trabajo', 'Silla'])
    }
    if(categoria === 'Servicios'){
      setListaServicios(['Aseo', 'Transporte', 'Vigilancia'])
    }
  }

  const getData = async()=>{
    try {
      const data = await db.collection(user.email).get()
      const arrayData = data.docs.map((doc)=>({id:doc.id,...doc.data()}))
      setLista(arrayData) 
    } catch (error) {
        console.log(error)
      }
  }
  const cancelar = ()=>{

      setCategoria('')
      setServicio('')
      setDescripcion('')
      setUbicacion('')
      setFecha('')
  }

  const registrar = async(e)=>{
    e.preventDefault()
    setExito(null)
    if(!categoria.trim() || !servicio.trim() || !descripcion.trim() || !ubicacion.trim() || !fecha.trim()){
      setError('Complete todos los campos')
      return
    }
    try {
      const nuevaSolicitud = {
        categoria,
        servicio,
        descripcion,
        ubicacion,
        fecha
      }
      const data = await db.collection(user.email).add(nuevaSolicitud)
      setLista([...listaSolicitudes,{...nuevaSolicitud,id:data.id}])
      setExito('Solicitud Registrada')
    } catch (error) {
      console.log(error)
    }
    setError(null)
  }

  const eliminar = async(id)=>{
    try {
      await db.collection(user.email).doc(id).delete()
      const nuevaLista = listaSolicitudes.filter((solicitud) => solicitud.id !== id)
      setLista(nuevaLista)
    } catch (error) {
      
    }
  }

  const editar = solicitud =>{

    setRegistrado(true)
    setCategoria(solicitud.categoria)
    setServicio(solicitud.servicio)
    setDescripcion(solicitud.descripcion)
    setUbicacion(solicitud.ubicacion)
    setFecha(solicitud.fecha)
    setId(solicitud.id)
    setRegistro(true)
  }

  const editarSolicitud = async(e)=>{
    e.preventDefault()
    if(!categoria.trim() || !servicio.trim() || !descripcion.trim() || !ubicacion.trim() || !fecha.trim()){
      setError('Complete todos los campos')
      return
    }
    try {
      await db.collection(user.email).doc(id).update(
        {
          categoria,
          servicio,
          descripcion,
          ubicacion,
          fecha
        }
      )
      const nuevaLista = listaSolicitudes.map((solicitud)=>solicitud.id === id ? {
        id,
        categoria,
        servicio,
        descripcion,
        ubicacion,
        fecha
      }:solicitud)
      setLista(nuevaLista)
      setCategoria('')
      setServicio('')
      setDescripcion('')
      setUbicacion('')
      setFecha('')
      setId('')
      setRegistrado(false)
      setExito('Solicitud Editada')
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div className='container'>
        <div className='my-3'>
          <button type='button'className='btn btn-primary mx-3' onClick={()=>setRegistro(true)}>Crear Solicitud</button>
          <button type='button' className='btn btn-success' onClick={()=>{setRegistro(false); getData(); setExito(null)}}>Listar Solicitudes</button>
        </div>
        {
          registro ? (
            <>
              <h2>{registrado ? 'Editar Solicitud' : 'Crear Solicitud'}</h2>
              <form onSubmit={registrado? editarSolicitud : registrar}>
                <div className='m-auto w-50'>
                  {
                    error&&(
                      <div className='alert alert-danger'>
                        {error}
                      </div>
                    )
                  }
                  {
                    exito&&(
                      <div className='alert alert-success'>
                        {exito}
                      </div>
                    )
                  }
                  <img className="mb-2" src={'../images/contenido-dark.png'} alt="" width="72" height="57"/>
                  <h6 className='text-start ms-1'>Categoria de la Solicitud</h6>
                  <select onChange={e=>{setCategoria(e.target.value) ; getTipoServicio(e.target.value)}} className="form-select mb-3" aria-label="Default select example">
                    <option defaultValue value="M. Inmuebles">Mantenimiento Inmuebles</option>
                    <option value="M. Muebles">Mantenimiento Muebles</option>
                    <option value="Servicios">Servicios</option>
                  </select>
                  <h6 className='text-start ms-1'>Servico de la Solicitud</h6>
                  <select onChange={e=>setServicio(e.target.value)} className="form-select mb-2" aria-label="Default select example">
                  {
                  listaServicios.map((servicio, index)=>(
                    <option key={index} value={servicio}>{servicio}</option>
                    ))
                  }
                  </select>
                  <h6 className='text-start ms-1'>Descripcion de la Solicitud</h6>
                  <textarea value={descripcion} onChange={e=>setDescripcion(e.target.value)} className='form-control mb-2'></textarea>
                  <h6 className='text-start ms-1'>Ubicación de la Solicitud</h6>
                  <input value={ubicacion} onChange={e=>setUbicacion(e.target.value)} type="text" className='form-control mb-2'/>
                  <h6 className='text-start ms-1'>Fecha de la Solicitud</h6>
                  <input value={fecha} onChange={e=>setFecha(e.target.value)} type="date" className='form-control mb-2'/>
                  <div className='text-end'>
                    <button onClick={()=>cancelar()} type='button' className='btn btn-outline-danger mx-2'>Cancelar</button>
                    <button type='submit' className='btn btn-success'>{registrado ? 'Editar' : 'Guardar'}</button>
                  </div>
                </div> 
              </form>
            </>
            
          ):(
            <div className=''>
              <div className='m-auto w-75'>
                {
                  listaSolicitudes.map((solicitud)=>(
                    <div key={solicitud.id} className='contenedor-lista'>
                      <div className='texto-solicitud'>
                          {solicitud.categoria} - {solicitud.servicio} - {solicitud.descripcion} - {solicitud.ubicacion} - {solicitud.fecha}
                      </div>
                      <div className='btn btn-outline-secondary' onClick={()=>editar(solicitud)}>Editar</div>
                      <div className='btn btn-danger' onClick={()=>eliminar(solicitud.id)}>Eliminar</div>
                    </div>
                  ))
                }
              </div>
            </div>
          )
        }
    </div>
  )
}

export default Registro