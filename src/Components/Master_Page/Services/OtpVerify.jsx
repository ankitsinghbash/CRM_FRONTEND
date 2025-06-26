import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {useState} from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
export function OtpVerify({setMasterLogin}) {


    const [currentotp , currentSetOtp] = useState("");

    const navigate = useNavigate();
 

    const handleVerify = async ()=>{
        const userId = localStorage.getItem('userIdPending');
        console.log("currentotp",currentotp);


       try {
  const response = await axios.post(
    'https://crm-backend-msk3.onrender.com/api/v8/master/verifyotp_v1',
    {
      userId: userId,
      otp: currentotp
    },
    {
      withCredentials: true
    }
  );
    
    88
  if (response.data.success) {
    setMasterLogin(true);
    localStorage.setItem("masterlogin", true);
    navigate('/master/system/dashboard', {replace : true});
    // Optionally navigate to dashboard
  } 
} catch (err) {
     if(err.response?.data || err.response.data?.message){  
             console.log("Error get fomr backend",err.response.data.message);
     }
}

    
    }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br  px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-black    mb-2">
          MASTER LOGIN VERIFICATION PAGE
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Enter the 6-digit OTP sent to your registered email or phone
        </p>

        {/* OTP Input */}   
        <div className="flex justify-center mb-6">
          <InputOTP  value={currentotp}  onChange={currentSetOtp} maxLength={6}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>

        {/* Buttons */}
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={handleVerify}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition"
          >
            Verify OTP
          </button>

          <button
            className="text-sm text-black    hover:underline"
            onClick={() => alert("Resend OTP logic goes here")}
          >
            Resend OTP
          </button>
        </div>
      </div>
    </div>
  );
}
