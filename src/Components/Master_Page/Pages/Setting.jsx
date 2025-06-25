import React, { use, useEffect, useState } from 'react';
import { FiUser, FiLock, FiBell, FiMoon, FiGlobe, FiCreditCard, FiShield, FiHelpCircle, FiLogOut } from 'react-icons/fi';
import { SiTestinglibrary } from 'react-icons/si';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { TryOutlined, TryRounded } from '@mui/icons-material';

import { useContext } from 'react';
function Setting({theme,toggleTheme}) {
  const [activeTab, setActiveTab] = useState('profile');
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    newsletter: false,
  });
  const [language, setLanguage] = useState('english');
  const [twoFactor, setTwoFactor] = useState(null);

  

  const [updatePassword, setUpdatePassword] = useState({
        oldPassword : '',
        newPassword : ''
  });

  useEffect(()=>{
       const fetchAuthStatus = async()=>{
            try {
      const userId = localStorage.getItem('userIdPending');

      const response = await axios.post('https://crm-backend-msk3.onrender.com/api/v8/twostep/status', {
        userId: userId,
      });
      console.log("response data",response);
      if(response.data.status==true){
          console.log("come inside status setting");
          const currentstatus = response.data.message ===1 ? true : false;
          setTwoFactor(currentstatus);
      }

      
    } catch (error) {
      console.error('Error checking 2FA status:', error);
      setTwoFactor(false); // fallback value
    }
       }
       fetchAuthStatus();
  },[]);
  


  const handleNotificationChange = (type) => {
    setNotifications({
      ...notifications,
      [type]: !notifications[type]
    });
  };


  const [passwordState,setPasswordState] = useState(false);

  const handlepassword = async ()=>{
      


      setPasswordState(true);
  }


  const handleDarkMode = ()=>{
        toggleTheme('dark')
        setDarkMode(true);
  }





 const updatepassword = async () => {
  console.log("call api");

  console.log("Passwrod is change here");

     
         console.log("update password",updatePassword   );

      try{
          
           


             
              const userId = localStorage.getItem('userIdPending');
              const currentPassword = updatePassword.oldPassword;
              const newPassword = updatePassword.newPassword;
              
              const response = await axios.post('https://crm-backend-msk3.onrender.com/api/v8/master/changePassword',{
                   userId,
                   currentPassword,
                   newPassword
              },{
                withCredentials: true
              });
              toast.success("Password is updated");
              console.log("api update password working , ",response.data);
      }
      catch(err){
          if(err.response && err.response.data){
             console.log("Error in Update password",err.response.data.message);
             toast.error(err.response.data.message);
          }
      }

  

  // Wait 1 second before closing the modal
  setTimeout(() => {
    setPasswordState(false);
  }, 1000);
};



const handletwostep =async ()=>{
     const newstatus = twoFactor===true ? false : true;
     console.log("Inside of handletwostep",newstatus);
     const userId = localStorage.getItem('userIdPending');

     try {
  const response = await axios.post('https://crm-backend-msk3.onrender.com/api/v8/gettwostep/change', {
    requiredauthstatus: newstatus,
    userId: userId
  });
  

  if (response.data.success === true) {
    toast.success("Two-step auth status changed successfully");
  } else {
    toast.error(response.data.message || "Failed to change 2FA status");
  }

} catch (err) {
  if (err.response && err.response.data) {
    console.error("Error in two-step:", err.response.data.message);
    toast.error(err.response.data.message);
  } else {
    toast.error("An unexpected error occurred");
  }
}

      
      setTwoFactor(!twoFactor )
}


  return (
    <div className={`min-h-screen ${theme}` }>
      <div className="w-full mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="md:w-64">
            <div className={`rounded-xl p-6 shadow-lg ${theme}`}>
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <FiUser className="mr-2" /> Account Settings
              </h2>
              
              <nav>
                <ul className="space-y-2">
                  {[
                    { id: 'profile', icon: FiUser, label: 'Profile' },
                    { id: 'security', icon: FiLock, label: 'Security' },
                    // { id: 'notifications', icon: FiBell, label: 'Notifications' },
                    { id: 'preferences', icon: FiMoon, label: 'Preferences' },
                    // { id: 'language', icon: FiGlobe, label: 'Language' },
                    // { id: 'billing', icon: FiCreditCard, label: 'Billing' },
                    { id: 'privacy', icon: FiShield, label: 'Privacy' },
                    { id: 'help', icon: FiHelpCircle, label: 'Help & Support' },
                  ].map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center px-4 py-3 rounded-lg transition-all ${
                          activeTab === item.id 
                            ? 'bg-blue-500 text-white' 
                            : `${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`
                        }`}
                      >
                        <item.icon className="mr-3" />
                        <span>{item.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
              
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button className="flex items-center w-full px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                  <FiLogOut className="mr-3" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Main Content Area */}
          <div className="flex-1">
            {/* Profile Section */}
            {activeTab === 'profile' && (
              <div className={`rounded-xl p-6 shadow-lg '}`}>
                <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>
                
                <div className="flex flex-col md:flex-row gap-8 mb-8">
                  <div className="md:w-1/3">
                    <div className="flex flex-col items-center">
                      <div className="relative">
                        <div className="w-32 h-32 rounded-full  dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                          <FiUser className="w-16 h-16 text-gray-400" />
                        </div>
                        <button className="absolute bottom-2 right-2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </button>
                      </div>
                      <button className="mt-4 text-blue-500 hover:text-blue-700 transition-colors">
                        Change Profile Picture
                      </button>
                    </div>
                  </div>
                  
                  <div className="md:w-2/3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">First Name</label>
                        <input 
                          type="text" 
                          className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Last Name</label>
                        <input 
                          type="text" 
                          className={`w-full p-3 rounded-lg border  focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                          placeholder="Doe"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input 
                          type="email" 
                          className={`w-full p-3 rounded-lg border  focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                          placeholder="john.doe@example.com"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2">Bio</label>
                        <textarea 
                          className={`w-full p-3 rounded-lg border  focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                          rows="4"
                          placeholder="Tell us about yourself..."
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end gap-4">
                  <button className="px-5 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    Cancel
                  </button>
                  <button className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            )}
            
            {/* Security Section */}
            {activeTab === 'security' && (
              <div className={`rounded-xl p-6 shadow-lg   ${theme}'}`}>
                <h1 className="text-2xl font-bold mb-6">Security Settings</h1>
                
                <div className="space-y-6">
                  <div className={`p-5 rounded-lg ${theme}'}`}>
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">Password</h3>
                        <p className="text-sm text-gray-500 mt-1">Last changed: 3 months ago</p>
                      </div>
                      <button onClick={handlepassword} className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors">
                        Change Password
                      </button>
                    </div>
                  </div>
                  
                  <div className={`p-5 rounded-lg ${theme}'}`}>
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">Two-Factor Authentication</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {twoFactor 
                            ? "Enabled - Provides an extra layer of security" 
                            : "Disabled - Add an extra layer of security to your account"}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <span className={`mr-3 text-sm ${twoFactor ? 'text-green-500' : 'text-gray-500'}`}>
                          {twoFactor ? 'Enabled' : 'Disabled'}
                        </span>
                        <button 
                          onClick={handletwostep}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            twoFactor ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                          }`}
                        >
                          <span 
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              twoFactor ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                    
                    {twoFactor && (
                      <div className="mt-4 pt-4 border-t border-gray-300 dark:border-gray-600">
                        <div className="flex items-center">
                          <div className="bg-gray-200 dark:bg-gray-600 rounded-lg p-3">
                            <div className="grid grid-cols-3 gap-1">
                              {[...Array(9)].map((_, i) => (
                                <div key={i} className="w-2 h-2 bg-gray-700 dark:bg-gray-300 rounded-full"></div>
                              ))}
                            </div>
                          </div>
                          <div className="ml-4">
                            <h4 className="font-medium">Authenticator App</h4>
                            <p className="text-sm text-gray-500">Two Step Authentication is On via Otp Verification</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className={`p-5 rounded-lg ${theme}  h-[150px] overflow-y-auto `}>
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">Active Sessions</h3>
                        <p className="text-sm text-gray-500 mt-1">You're logged in on 2 devices</p>
                      </div>
                      <button className="px-4 py-2 text-blue-500 hover:text-blue-700 transition-colors">
                        View All
                      </button>
                    </div>
                    
                    <div className="mt-4 space-y-3">
                      <div className="flex items-center justify-between p-3 border border-gray-300 dark:border-gray-600 rounded-lg">
                        <div className="flex items-center">
                          <div className="bg-gray-200 dark:bg-gray-600 p-2 rounded-lg mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">Windows PC</h4>
                            <p className="text-sm text-gray-500">Chrome • New York, USA</p>
                          </div>
                        </div>
                        <div className="text-sm text-green-500">Current session</div>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border border-gray-300 dark:border-gray-600 rounded-lg">
                        <div className="flex items-center">
                          <div className="bg-gray-200 dark:bg-gray-600 p-2 rounded-lg mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium">iPhone 13 Pro</h4>
                            <p className="text-sm text-gray-500">Safari • California, USA</p>
                          </div>
                        </div>
                        <button className="text-sm text-red-500 hover:text-red-700">Log out</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

          

          {passwordState && (
  <div className="fixed inset-0  bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl shadow-2xl p-6 w-[90%] max-w-md animate-fadeIn">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Change Password</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Previous Password
        </label>
        <input
          onChange={(e) =>
    setUpdatePassword((prev) => ({
      ...prev,
      oldPassword: e.target.value,
    }))
  }
          type="password"
          placeholder="Enter old password"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          New Password
        </label>
        <input
          onChange={(e) =>
    setUpdatePassword((prev) => ({
      ...prev,
      newPassword: e.target.value,
    }))
  }
          type="password"
          placeholder="Enter new password"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="flex justify-end space-x-3">
        <button
          onClick={() => setPasswordState(false)}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-5 rounded-lg transition"
        >
          Cancel
        </button>
        <button
          onClick={updatepassword}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-5 rounded-lg transition"
        >
          Update
        </button>
      </div>
    </div>
  </div>
)}




            
            {/* Notifications Section */}
            {activeTab === 'notifications' && (
              <div className={`rounded-xl p-6 shadow-lg ${theme}'}`}>
                <h1 className="text-2xl font-bold mb-6">Notification Preferences</h1>
                
                <div className="space-y-6">
                  <div className={`p-5 rounded-lg ${theme}'}`}>
                    <h3 className="font-semibold mb-4">Email Notifications</h3>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Account Activity</h4>
                          <p className="text-sm text-gray-500">Important notifications about your account</p>
                        </div>
                        <button 
                          onClick={() => handleNotificationChange('email')}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            notifications.email ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                          }`}
                        >
                          <span 
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              notifications.email ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Product Updates</h4>
                          <p className="text-sm text-gray-500">News about new features and improvements</p>
                        </div>
                        <button 
                          onClick={() => handleNotificationChange('newsletter')}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            notifications.newsletter ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                          }`}
                        >
                          <span 
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              notifications.newsletter ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`p-5 rounded-lg ${theme}'}`}>
                    <h3 className="font-semibold mb-4">Push Notifications</h3>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Messages</h4>
                          <p className="text-sm text-gray-500">Notify me about new messages</p>
                        </div>
                        <button 
                          onClick={() => handleNotificationChange('push')}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            notifications.push ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                          }`}
                        >
                          <span 
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              notifications.push ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`p-5 rounded-lg ${theme}'}`}>
                    <h3 className="font-semibold mb-4">Do Not Disturb</h3>
                    
                    <div className="flex items-center">
                      <div className="flex-1">
                        <h4 className="font-medium">Schedule Quiet Hours</h4>
                        <p className="text-sm text-gray-500">Mute notifications during specific times</p>
                      </div>
                      <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        Configure
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Preferences Section */}
            {activeTab === 'preferences' && (
              <div className={`rounded-xl p-6 shadow-lg ${theme}'}`}>
                <h1 className="text-2xl font-bold mb-6">Preferences</h1>
                
                <div className="space-y-6">
                  <div className={`p-5 rounded-lg ${theme}'}`}>
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">Theme</h3>
                        <p className="text-sm text-gray-500 mt-1">Customize your application theme</p>
                      </div>
                      <div className="flex items-center">
                        <span className={`mr-3 text-sm ${theme}'}`}>
                          Light
                        </span>
                        <button 
                          //onClick={() => setDarkMode(!darkMode)}
                         onClick={handleDarkMode}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            darkMode ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                          }`}
                        >
                          <span 
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              darkMode ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                        <span className={`ml-3 text-sm ${theme}'}`}>
                          Dark
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`p-5 rounded-lg}`}>
                    <h3 className="font-semibold mb-4">Display Density</h3>
                    
                    <div className="flex gap-4">
                      <button onClick={() => {
  toggleTheme('comfortable');
  setDarkMode(false);
}} className={`px-4 py-2 rounded-lg border`}>
                        Comfortable
                      </button>
                      <button onClick={() => {
  toggleTheme('compact');
  setDarkMode(false);
}}  className={`px-4 py-2 rounded-lg border `}>
                        Compact
                      </button>
                      <button  onClick={() => {
  toggleTheme('spacious');
  setDarkMode(false);
}}  className={`px-4 py-2 rounded-lg borde`}>
                        Spacious
                      </button>
                    </div>
                  </div>
                  
                  <div className={`p-5 rounded-lg'}`}>
                    <h3 className="font-semibold mb-4">Accessibility</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          id="high-contrast"
                          className="h-4 w-4 text-blue-500 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="high-contrast" className="ml-2">
                          High contrast mode
                        </label>
                      </div>
                      
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          id="reduce-motion"
                          className="h-4 w-4 text-blue-500 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="reduce-motion" className="ml-2">
                          Reduce motion
                        </label>
                      </div>
                      
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          id="keyboard-shortcuts"
                          className="h-4 w-4 text-blue-500 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="keyboard-shortcuts" className="ml-2">
                          Enable keyboard shortcuts
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
           
            
            {/* Other sections would follow the same pattern */}
            
            {/* Default view for other sections */}
            {/* {!['profile', 'security', 'notifications', 'preferences', 'language'].includes(activeTab) && (
              <div className={`rounded-xl p-6 shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <h1 className="text-2xl font-bold mb-6 capitalize">{activeTab} Settings</h1>
                 
              </div>
             )} */}
                  
            {/* get profile  */}
          
            {['privacy'].includes(activeTab) && (
  <div className=" border border-gray-200 rounded-xl p-6 shadow-md text-left mx-auto ">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">Privacy Policy</h2>

    <p className="text-gray-700 text-sm mb-3">
      At <strong>IMS Pvt. Ltd.</strong>, we are committed to protecting your personal and professional data. This privacy policy outlines how we collect, use, and safeguard the information you provide on our platform.
    </p>

    <p className="text-gray-700 text-sm mb-3">
      <strong>1. Data Collection:</strong> We collect information such as your name, email, IP address, and usage behavior when you access our services. This data is used to improve functionality, provide support, and ensure compliance.
    </p>

    <p className="text-gray-700 text-sm mb-3">
      <strong>2. Data Usage:</strong> Your data is used internally for authentication, access control, and service enhancement. We do not sell or share your information with third parties without your explicit consent.
    </p>

    <p className="text-gray-700 text-sm mb-3">
      <strong>3. Cookies & Session:</strong> We use cookies and secure session tokens to manage login status and session security. These are never exposed to third-party scripts or services.
    </p>

    <p className="text-gray-700 text-sm mb-3">
      <strong>4. Confidentiality:</strong> All data stored and processed is treated as confidential and is protected using industry-standard encryption and access controls.
    </p>

    <p className="text-gray-700 text-sm mb-3">
      <strong>5. Your Rights:</strong> You may request to view, update, or delete your personal data by contacting our support team.
    </p>

    <p className="text-gray-600 text-xs mt-6 italic">
      For questions or concerns about this policy, please contact our Data Protection Officer at <u>privacy@ims.in</u>.
    </p>
  </div>
)}

        




          </div>
        </div>

        <ToastContainer position="top-right" autoClose={1000} />

      </div>
    </div>
  );
}

export default Setting;