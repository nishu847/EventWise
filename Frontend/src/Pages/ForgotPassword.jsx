import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newpassword, setnewPassword] = useState("");
  const [step, setStep] = useState(1);
    const navigate=useNavigate();

  const getOTP = async (e) => {
    e.preventDefault();
    const payload={email}
    try {
        await axios.post('https://event-backend-7nta.onrender.com/v1/api/users/forgotpassword',payload);
        alert(`OTP sent to ${email}`)
        setStep(2)
    } catch (error) {
        alert(error.response?.data?.message || 'Failed to send OTP');

    }
  };

  const giveOTP=async(e)=>{
    e.preventDefault();
    const payload={otp,email,newpassword}
    try {
        await axios.post("https://event-backend-7nta.onrender.com/v1/api/users/resetpassword",payload)
        alert("Password Reset Successfully")
        navigate('/login')
    } catch (error) {
        alert(error.response?.data?.message || 'Failed to reset password');
    }
  }

  return (
    <div>
      {step === 1 && (
        <div className="flex items-center justify-center min-h-screen bg-[#0F0607]">
          <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 text-center">
              Forgot Password
            </h2>
            <p className="mt-2 text-sm text-gray-600 text-center">
              Please enter your email to reset your password
            </p>

            <form className="mt-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button
                type="submit"
                className="w-full mt-4 px-4 py-2 text-white bg-[#F4ACA4] rounded-md hover:bg-[#ea6d5f]"
                onClick={getOTP}
              >
                Reset Password
              </button>
            </form>
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="flex items-center justify-center min-h-screen bg-[#0F0607]">
          <div className="w-full max-w-sm p-6 bg-[#0F0607] rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 text-center">
              Check Your Email
            </h2>
            <p className="mt-2 text-sm text-gray-600 text-center">
              We sent a 6-digit code to your email. Enter the code and new
              password below.
            </p>

            <form className="mt-6">
              {/* OTP Input */}
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-700"
              >
                OTP
              </label>
              <input
                type="text"
                id="otp"
                value={otp}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter OTP"
                onChange={(e) => setOtp(e.target.value)}
              />

              {/* New Password Input */}
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mt-4"
              >
                New Password
              </label>
              <input
                type="password"
                id="password"
                value={newpassword}
                placeholder="New Password Here"
                onChange={(e) => setnewPassword(e.target.value)}
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full mt-4 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:outline-none"
                onClick={giveOTP}
              >
                Confirm
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
