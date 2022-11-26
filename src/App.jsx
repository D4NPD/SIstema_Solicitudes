import React from 'react'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import Inicio from './Componentes/Inicio';
import Login from './Componentes/Login';
import Consultas from './Componentes/Consultas';
import Navbar from './Componentes/Navbar';
import { auth } from './firebase';
import './App.css'

function App() {

  const [fireBaseUser, setFireBaseUser] = React.useState(false)
  React.useEffect(()=>{
    auth.onAuthStateChanged(user=>{
      if(user){
        setFireBaseUser(user)
      }else{
        setFireBaseUser(null)
      }
    })
  },[])

  return fireBaseUser !== false ? (
    <div className="App">
      <Router>
        <div>
        <Navbar fireBaseUser={fireBaseUser}/>
        <Routes>
          <Route path='/' element={<Inicio/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path='consultas' element={<Consultas/>}/>
        </Routes>
        </div>
      </Router>
    </div>
  ):
  (
    <div className="text-center">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default App;
