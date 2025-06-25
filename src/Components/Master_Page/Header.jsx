import React, { Suspense } from 'react'
import { FiSearch } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa"; 
import { IoMdNotificationsOutline } from "react-icons/io";
import { FiSettings } from "react-icons/fi"; // Feather Icons
import { GiHamburgerMenu } from "react-icons/gi";
import { RiLogoutBoxRLine } from "react-icons/ri"; // Re
import { MdOutlineNoteAlt } from "react-icons/md";           // Material Design
import { RiDeleteBin6Line } from "react-icons/ri";           // Remix Icons
import { HiOutlineDocumentAdd } from "react-icons/hi"; 
import { FiDownload } from 'react-icons/fi';
import { MdDarkMode } from "react-icons/md";

import { RiShieldUserLine } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { AiOutlineStar } from "react-icons/ai";

import { MdDashboard } from "react-icons/md";

import { FiDatabase } from "react-icons/fi";

import {useState, useEffect ,lazy} from 'react'



import { ToastContainer,toast } from 'react-toastify';
// import DashbaordMaster from './Pages/DashboardMaster'

const DashbaordMaster = lazy(()=>import('./Pages/DashboardMaster'))

import { Database } from 'lucide-react';

import Profile from './Pages/Profile';
import Gmail from './Pages/Gmail'

import Setting from './Pages/Setting'
import { SiGmail } from 'react-icons/si';



import DatabaseMain from './Pages/DatabaseMain'



import { CiEdit } from "react-icons/ci";
import Editor from './Services/Editor';
import axios from 'axios';
import {  replace, useNavigate } from 'react-router-dom';
function Header({theme,toggleTheme}) {

    const [currentstate,setCurrentState] = useState('dashboard');

    const navigate = useNavigate();



     useEffect(()=>{
         console.log("currnet state is ",currentstate);
     },[currentstate,setCurrentState]);

    const icons = [
  { id: "dashboard", label: "Dashboard", Icon: MdDashboard, size: 25 },
  { id: "database", label: "Database", Icon: FiDatabase, size: 25 },
  { id: "gmail", label: "Gmail", Icon: SiGmail, size: 25 },
  {id : "editor" , label : "Editor" , Icon : CiEdit  , size : 25},
  { id: "user", label: "User", Icon: FaUserCircle, size: 25 },
  { id: "setting", label: "Setting", Icon: FiSettings, size: 25 },
  
  
  { id: "logout", label: "Logout", Icon: FiLogOut, size: 25 },

  
];




const handleLogout = async ()=>{

     try{
          const response = await axios.post(
  'https://crm-backend-msk3.onrender.com/api/v8/master/api/logout',
  {}, 
  {
    withCredentials: true 
  }
);

        
         localStorage.removeItem('userIdPending');
         localStorage.removeItem('masterlogin');
        
         navigate('/masterdashboard', { replace: true });

          toast.success("Logout Successful");
          
     }catch(err){
            toast.error("Error in Logout");
            
            if(err.response && err.response.data){
                  toast.error("Error ",err.response.data.message);
            }
     }

}




  return (
    <div className={`w-full fixed shadow-lg px-2  ${theme}  py-2 rounded-lg`}>

          <div className='w-full px-0 py-0 h-screen shadow-lg bg-blue rounded-2xl bg-gradient-to-l from-blue-300 to-white '>

                  <div className={`w-full flex justify-between px-2 py-6 items-center lg:h-[20px] ${theme}`}>
                         <div className='flex space-x-5 text-2xl'>
                             <h1 className='font-bold'>CRM MASTER</h1>
                              <div className='flex items-center space-x-5 '>
                                 <input placeholder="...search" type="text" className='rounded-md  px-2 hover:border-black  ' style={{ width: '300px' , border:'2px solid black' }} />
                                    <FiSearch className='hover:scale-110 cursor-pointer'/>
      <MdOutlineNoteAlt title="Notepad" className='hover:scale-110 cursor-pointer' />
      <HiOutlineDocumentAdd title="Add Note" className='hover:scale-110 cursor-pointer' />
      <RiDeleteBin6Line title="Delete Note" className='hover:scale-110 cursor-pointer'/>
                              </div>
                         </div>

                            <div className="flex space-x-9 text-lg items-center text-gray-700">
      
        <IoMdNotificationsOutline size={25} className='hover:scale-110 cursor-pointer'/>
    
     
        <MdDarkMode size={25} className='hover:scale-110 cursor-pointer' />
      
        <FaUserCircle size={25} className='hover:scale-110 cursor-pointer'/>
      
        <RiShieldUserLine size={25} className='hover:scale-110 cursor-pointer' />
       
        <FiLogOut onClick={handleLogout}  size={25} className='hover:scale-110 cursor-pointer' />
         
      </div>

                  </div>


                  <div className='flex w-full'>

                                       

                         <div className='w-[5%] h-screen  rounded-2xl '>
                         

                         
                     
    <header className={`items-center p-4 ${theme} `}>

        {icons.map(({ id, label, Icon, size }) => (
  <div key={id} className={`items-center py-4    `}>
    <button
      onClick={() => setCurrentState(id)}
      className={`flex  items-center gap-3 px-3 py-3 hover:cursor-pointer rounded transition-transform hover:scale-105 ${
        currentstate === id ? "bg-blue-100 text-blue-600 font-semibold" : ""
      }`}
    >
      <Icon size={size} />
    </button>
  </div>
))}

     
    </header>

                        </div>

                       <div className={`w-[100%] px-6 py-6 h-screen  rounded-l-2xl ${theme}`}>

                                 {
  currentstate === 'dashboard' ? <Suspense fallback={<div>Loading...</div>}>
      <DashbaordMaster theme={theme}/>
    </Suspense>:
  currentstate === 'database' ? <DatabaseMain  theme={theme}/> :
  currentstate === 'gmail' ? <Gmail theme={theme} /> :
  currentstate === 'user' ? <Profile theme={theme} /> :
  currentstate == 'setting' ? <Setting theme={theme} toggleTheme ={toggleTheme}/>:
  currentstate == 'editor' ? <Editor theme={theme}/> :
  null
} 
                             
                        </div>

                    
                  </div>

                

              
          </div>
         
        


       <ToastContainer position="top-right" autoClose={300} />


    </div>
  ) 
}

export default Header