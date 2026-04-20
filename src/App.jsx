import { useState, useEffect } from 'react'
import {useDispatch} from 'react-redux'
import './App.css'
import authService from './AppWrite/AuthService'
import { login,logout } from './Store/AuthSlice'
import Header from './Components/Header'
import SideNav from './Components/SideNav'
import RSideNav from './Components/RsideNav'
import { Outlet } from 'react-router-dom'

function App() {

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect (()=>{
  
    authService.getCurrentAccount()
    .then((userData)=>{
      if (userData){
        dispatch(login({userData}))
      } 
      else {
        dispatch(logout())
      }
    })
    
    .finally(()=>setLoading(false))

  },[])

return !loading ? (
<div className='min-h-screen flex flex-wrap content-between bg-black ' >
  <div className='w-full block' > 
    <Header/>
    <SideNav/>
    <RSideNav/>
    <main>
     <Outlet/> 
    </main>
    

  </div>
</div>)
 : (null)
}

export default App
