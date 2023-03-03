// from react
import { Route,BrowserRouter,Routes } from 'react-router-dom'
import { ProtectContext } from "./context/Protect";
import React,{useState,FormEvent,useContext} from 'react';
// Style
import './App.css'
// Pages
import Login from './pages/Login'
import Subs from './pages/Subs'
import DashB from './pages/DashB'

function App() {
  const {pro} = useContext(ProtectContext);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/Subs' element={<Subs/>}/>
          <Route path='/Login' element={<Login/>}/>
          {pro === "1" && <Route path='/DashB' element={<DashB/>}/>}
          <Route path='*' element={<Subs/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
