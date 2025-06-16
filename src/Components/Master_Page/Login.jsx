import React from 'react';
import { FaEyeSlash } from "react-icons/fa6";
import { useState } from 'react';
import { IoEyeSharp } from "react-icons/io5";
import axios from 'axios'
import {ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"




const Login = ({setMasterLogin}) => {
 
    const [openState,setOpenState] =  useState(false);
    const [formData,setFromData] = useState({
        email: '',
        password : ''   
    });

    const handlePassword = async()=>{
           setOpenState(!openState);
           console.log("User State is ",openState);
    }


     const navigate = useNavigate();

    const handlesubmit = async()=>{
            console.log("form data",formData);
            try{
                const response = await axios.post('http://localhost:8000/api/v8/master/',formData,{withCredentials : true}); 
                setMasterLogin(true);
                localStorage.setItem("masterlogin",true);
                navigate(
  '/master/system/dashboard',
  {
    state: { toastMessage: "Login successful!" }
  }
);

            }
            catch(err){
                setMasterLogin(false);
                if(err.response && err.response.data){
                     toast.error(`${err.response.data.message}`)
                    console.log("Error in backend",err.response.data.message);
                }
                else{
                     console.log("Login Error Unknown");
                }
            }
           
    }


  return (
    // <div className="h-screen bg-[#562a2a] flex items-center justify-center"> {/* Darker blue background */}
      <div className="bg-[#0e0e0f] rounded-xl shadow-2xl overflow-hidden w-full  flex flex-col md:flex-row relative"> {/* Main card background */}
        
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full opacity-30 transform rotate-45"></div>
        
          <div className="absolute bottom-10 -left-10 w-60 h-60 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full opacity-20 transform -rotate-30"></div>
        </div>

        {/* Login Content Area */}
        <div className="relative z-10 w-full p-8 md:p-12 text-center text-white flex flex-col items-center justify-center">
          {/* Logo and Tagline */}
          <div className="mb-10">
            <div className="flex items-center justify-center mb-2">
              {/* This is a placeholder for the logo. You might use an SVG here. */}
              <div className="w-10 h-10 bg-blue-400 rounded-full mr-2"></div> {/* Example circle for logo */}
              <h1 className="text-4xl font-bold text-white">Master Login</h1>
            </div>
            <p className="text-gray-400 text-sm">Fast & Easy Product Management</p>
          </div>

          <h2 className="text-3xl font-semibold mb-8">Welcome Back!</h2>

          <Card className="w-full max-w-md bg-black  text-white">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription className={'text-white'}>
          Enter your email below to login to your account
        </CardDescription>
        {/* <CardAction>
          <Button variant="link">Sign Up</Button>
        </CardAction> */}
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                onChange = {(e)=>setFromData({...formData, email : e.target.value})}
                type="email"
                placeholder="steftomanagement@gmail.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password"
               
                >Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
               <div className='relative'>
                    <Input 
                    onChange = {(e)=>setFromData({...formData, password : e.target.value})}
                    type={openState ? "password" : 'text'}
               placeholder="**********"
              required />

                      <span onClick={handlePassword} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer">
                   {
                      openState==false ? <IoEyeSharp style={{ height: '20px',width : '20px' }}/> : <FaEyeSlash style={{ height: '20px',width : '20px' }} />
                       
                   }
                   

                </span>
               </div>
             


            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button onClick={handlesubmit} className="w-full">
          Login
        </Button>
        <Button variant="outline" className="w-full text-black">
          Login with Google
        </Button>
      </CardFooter>
    </Card>

          

          {/* Terms and Privacy Policy */}
          <div className="mt-10 text-sm text-gray-500 underline cursor-pointer">
            <span>Term of use</span> <span className="mx-2">|</span> <span>Privacy policy</span>
          </div>
        </div>

        {/* Floating buttons on the right/bottom */}
      
      
      <ToastContainer/>

      </div>
    // </div>
  );
};

export default Login;