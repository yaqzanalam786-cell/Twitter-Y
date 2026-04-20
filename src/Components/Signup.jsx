import React, { use } from 'react'
import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom' 
import {login as Storelogin } from '../Store/AuthSlice'
import {Button, Logo, Input} from '../Components' 
import { useDispatch } from 'react-redux' 
import {useForm} from 'react-hook-form'
import authService from '../Appwrite/AuthService'


function Signup() {
const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} =  useForm()
    const [error, setError] = useState(null)

    const Signup = async (data) => {
       
         setError("")
         try {
            const session = await authService.createAccount(data)
            if (session){
                const userdata = await authService.getCurrentAccount()
                if (userdata){
                    dispatch(Storelogin(userdata))
                    navigate('/')
                }
            }
            
         } catch (error) {
            setError(error.message)
         }
    }
 return (
   <div className="flex items-center justify-center py-4"> 
        <div className="mx-auto w-full max-w-lg bg-black rounded-xl p-7 border border-white/10 shadow-lg">
            
            <div className="mb-6 flex justify-center">
                <span className="inline-block w-full max-w-[100px]">
                    <Logo width="100%" />
                </span>
            </div>

            <h2 className="text-center text-2xl text-white font-bold leading-tight">
                Sign up to create account
            </h2>
            
            <p className="mt-2 text-center text-base text-white/60">
                Already have an account?&nbsp;
                <Link
                    to="/login"
                    className="font-medium text-blue-500 transition-all duration-200 hover:underline"
                >
                    Sign In
                </Link>
            </p>

            {error && <p className="text-red-600 mt-4 text-center">{error}</p>}

            <form onSubmit={handleSubmit(Signup)} className="mt-8">
                <div className="space-y-5">
                   
                    <div className="w-full">
                        <Input
                            label="Full Name: "
                            placeholder="Enter your full name"
                            className="w-full" 
                            {...register("name", { required: true })}
                        />
                    </div>

                    <div className="w-full">
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            className="w-full"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => 
                                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />
                    </div>

                    <div className="w-full">
                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            className="w-full"
                            {...register("password", { required: true })}
                        />
                    </div>

                    <Button 
                        type="submit" 
                        className="w-full bg-white text-black hover:bg-gray-200 cursor-pointer mt-4 py-2 rounded-lg font-bold transition-all duration-200"
                    >
                        Create Account
                    </Button>
                </div>
            </form>
        </div>
    </div>
)
}

export default Signup