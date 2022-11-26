import React from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { auth } from '../firebase'

const Navbar = (props) => {

  const navigate = useNavigate()
  const cerrarSesion= ()=>{
    console.log(props.fireBaseUser)
    auth.signOut()
    .then(()=>{
      navigate('/login')
    })
  }
  return (
    <div className='navbar navbar-dark bg-dark mb-4'>
      <Link className='navbar-brand mx-3' to='/'>
        <img src={'../images/contenido.png'} alt={'Logo'} width="50" height="32" className="d-inline-block align-text-top"/>
        Inicio
      </Link>
      <div className='d-flex'>
        {
          props.fireBaseUser !== null ? (
            <Link className='btn btn-dark mr-2' to='/consultas'>Consultas</Link>
            ): null
        }
        {
          props.fireBaseUser !== null ? (
            <button type='button' className='btn btn-danger mx-2' onClick={()=>cerrarSesion()}>Sign Out</button>
          ): 
          <Link className='btn btn-secondary mx-3' to='/login'>Login</Link>
        }
      </div>
    </div>
  )
}

export default Navbar