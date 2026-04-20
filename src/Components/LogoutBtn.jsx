import React from 'react'
import {useDispatch} from 'react-redux'

import authService from '../AppWrite/AuthService'

import { logout } from '../Store/AuthSlice'


function LogoutBtn() {
    const dispatch = useDispatch()
  
    const logoutHandler = ()=>{
        
        authService.logout()
        .then(()=>{
            dispatch(logout())
        })
    }
  return (
    <button 
     className='inline-bock px-6 py-2 duration-200 hover:bg-white/10 rounded-full cursor-pointer'
     onClick={logoutHandler} 
     >Logout
     </button>
  )
}

export default LogoutBtn