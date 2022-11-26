import React from 'react'
import {auth, db} from '../firebase'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [registrar, setRegistrar] = React.useState(true)
  const [error, setError] = React.useState(null)
  const [exito, setExito] = React.useState(null)
  const navigate = useNavigate()

  const guardarDatos = e =>{
    e.preventDefault()
    setExito(null)
    if(!email.trim() || !password.trim()){
      setError('Por favor, complete todos los campos')
      return
    }
    if(password.length < 6){
      setError('La contraseña debe ser mayor a 6 caracteres')
      return
    }
    setError(null)
    if(registrar){
      registrarUsuario()
    }else{
      login()
    }
  }

  const registrarUsuario = React.useCallback(async()=>{
    try {
      const respuesta = await auth.createUserWithEmailAndPassword(email, password)
      console.log(respuesta.user) 
      await db.collection('usuariosdb').doc(respuesta.user.email).set({
        email: respuesta.user.email,
        id: respuesta.user.uid
      })
      setExito('Usuario registrado correctamente')
      setEmail('')
      setPassword('')
      setError(null)
    } catch (error) {
      console.log(error)
      if(error.code === 'auth/email-already-in-use'){
        setError('El usuario ya está registrado')
      }
      if(error.code === 'auth/invalid-email'){
        setError('El email no es valido')
      }
    }
  },[email,password])

  const login = React.useCallback(async()=>{
    try {
      const respuesta = await auth.signInWithEmailAndPassword(email,password)
      console.log(respuesta.user)
      setEmail('')
      setPassword('')
      setError(null)
      navigate('/consultas')
    } catch (error) {
      console.log(error.code)
      if(error.code === 'auth/invalid-email'){
        setError('El email no es valido')
      }
      if(error.code === 'auth/user-not-found'){
        setError('Usuario no registrado')
      }
      if(error.code === 'auth/wrong-password'){
        setError('La contraseña es incorrecta')
      }
    }
  },[email,password,navigate])

  return (
    
    <div className='text-center'>
      <div className='form-signin w-25 m-auto'> 
        <form onSubmit={guardarDatos}>
          <img className="mb-4" src={'../images/contenido-dark.png'} alt="" width="72" height="57"/>
          <h1 className="h3 mb-3 fw-normal">{registrar ? 'Please sign in': 'Please Login'}</h1>
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
          <div className="form-floating">
            <input autoComplete='off' className="form-control" id="floatingInput" placeholder="name@example.com" onChange={e=>setEmail(e.target.value)} value={email}/>
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={e=>setPassword(e.target.value)} value = {password}/>
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <div className='d-flex aling-items-start'>
           <button type="button" className="btn btn-link" onClick={()=>{
            setRegistrar(!registrar)
            setExito(null)
            setError(null)
            }}>{registrar ? 'I have an account': 'Create an account'}</button>
          </div>
          <button className="w-100 btn btn-lg btn-dark" type="submit">{registrar ? 'Sign in' : 'Login'}</button>
        </form>
      </div>
    </div>
  )
}

export default Login