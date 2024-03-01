import './App.css'
import Navbar from './components/Navbar'
import Login from './features/auth/Login'
import Signup from './components/authentication/signup'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import RequireAuth from './features/auth/requireAuth'

function App() {

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<RequireAuth/>}>
        <Route path='/home' element={<Home/>}></Route>
      </Route>
      <Route path=''></Route>
    </Routes>
    </>
  )
}

export default App
