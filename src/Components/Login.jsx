import React from 'react'
import {Link, useNavigate} from 'react-router-dom' 
import {login as Storelogin } from '../Store/AuthSlice' 
import {Logo, Input, Button} from '../Components' 
import { useDispatch } from 'react-redux' 
import {useForm} from 'react-hook-form'
import authService from '../Appwrite/AuthService'
import { useState } from 'react'




function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {register, handleSubmit} =  useForm()

  const [error, setError] = useState(null)

 
  const login = async (data) => {
    setError("") 
    try {
      const session = await authService.login(data)
      
      if (session){
        const userData = await authService.getCurrentAccount()
        
        if (userData){
          dispatch(Storelogin(userData))
          navigate('/')
        }

      }
    } catch (error) {
      setError(error.message)
    }
  }

 return (
    <div className='flex items-center justify-center w-full py-4'> 
      <div className={`mx-auto w-full max-w-md bg-black rounded-xl p-7 border border-white/10 shadow-lg`}>
        
        <div className="mb-4 flex justify-center">
            <span className="inline-block w-full max-w-[80px]">
                <Logo width="100%" />
            </span>
        </div>
        
        <h2 className="text-center text-white text-xl font-bold leading-tight">
          Sign in to your account
        </h2>
        
        <p className="mt-1 text-center text-sm text-white/60">
            Don&apos;t have any account?&nbsp;
            <Link
                to="/signup"
                className="font-medium text-blue-500 hover:underline transition-all duration-200"
            >
                Sign Up
            </Link>
        </p>
      
        {error && <p className="text-red-600 mt-4 text-sm text-center">{error}</p>}
        
        <form onSubmit={handleSubmit(login)} className='mt-6'>
            <div className='space-y-4'>
            
                <Input 
                    label="Email:"
                    placeholder="Enter your Email"
                    type="email"
                    className="w-full"
                    {...register("email",{
                        required : true,
                        validate : {
                            matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                            "Email address must be a valid address",
                        } 
                    })}
                />

                <Input
                    label="Password:"
                    placeholder="Enter your Password"
                    type="password"
                    className="w-full"
                    {...register("password",{
                        required : true,
                    })}
                />
              
                <Button
                    type="submit" 
                    className="w-full bg-white text-black hover:bg-gray-200 cursor-pointer mt-2 py-2 rounded-lg font-bold transition-all duration-200"
                > 
                    Sign in 
                </Button>

            </div>
        </form>
      </div>
    </div>
)
}

export default Login