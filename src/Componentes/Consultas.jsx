import React from 'react'
import {auth} from '../firebase'
import { useNavigate } from 'react-router-dom'
import Registro from './Registro'

const Consultas = () => {

  const navigate = useNavigate()
  const [user, setUser] = React.useState(null) 
  React.useEffect(()=>{
    if(auth.currentUser){
      setUser(auth.currentUser)
    }else{
      console.log('El usuario no existe')
      navigate('/login')
    }
  },[navigate])

  return (
    <div className='container text-center'>
      <h2>Consultas</h2>
      <Registro user = {user}/>
    </div>
  )
}

export default Consultas