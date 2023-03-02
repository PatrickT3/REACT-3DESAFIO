// from react
import { Route,BrowserRouter,Routes } from 'react-router-dom'
// Style
import './App.css'
// Pages
import Login from './pages/Login'
import Subs from './pages/Subs'
import DashB from './pages/DashB'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/Subs' element={<Subs/>}/>
          <Route path='/Login' element={<Login/>}/>
          <Route path='/DashB' element={<DashB/>}/>
          <Route path='*' element={<Subs/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
