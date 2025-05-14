import React from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const navigate = useNavigate();

  const change = () => {
    navigate("https://event-backend-7nta.onrender.com/v1/api/users/register");
  };
  const forgot=()=>{
    navigate("https://event-backend-7nta.onrender.com/v1/api/users/forgotpassword")
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    const payload = {email, password };
    try {
      const response = await axios.post('https://event-backend-7nta.onrender.com/v1/api/users/login', payload,{ withCredentials: true } // Include cookies
      );
      console.log(response)
      alert("Login Successfully");
      sessionStorage.setItem('isLoggedin', response.data.data.isLoggedin);
      sessionStorage.setItem('role', response.data.data.role);   
      sessionStorage.setItem("user", JSON.stringify(response.data.data));
      sessionStorage.setItem("isLoggedin", true);



      navigate("/")
      console.log("response.data is",response.data)
    } catch (error) {
      alert(error.response?.data?.error || 'Login failed');
    }
  };
  
  return (
    <div className="flex h-[80vh] w-full justify-center items-center mt-20 bg-[#0f0607]">
    <div className="flex w-7/8 max-w-5xl shadow-2xl rounded-lg overflow-hidden p-10">
<div className="hidden md:flex w-1/2 bg-pink-100 p-10 flex-col justify-center items-center relative" >
{/* Background Image */}
<div
  className="absolute inset-0 bg-cover bg-center"
  style={{
    backgroundImage: `url('/assets/bgimage.jpg')`,
    filter: "brightness(100%)", // Increase brightness if necessary
  }}
></div>

{/* White Overlay */}
<div className="absolute inset-0 bg-white opacity-70"></div> {/* White overlay with 70% opacity */}

<div className="relative z-10 text-center">
  <h2 className="text-3xl font-bold text-gray-800">
    Get Back & Start{" "}
    <span className="text-red-600">Be Informed</span>
  </h2>
  <p className="text-[#1e3034] mt-4">
  One-stop platform for all college events    </p>
  <p className="text-[#1e3034] mt-4">Create an Account in just a few steps!!</p>
  <button
    onClick={() => navigate("/register")}
    className="mt-3 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-8 rounded-full"
  >
    Go to Register page
  </button>
</div>
</div>


      {/* Right Side */}
      <div className="w-full md:w-1/2 bg-[#fadedb] p-10 flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          <span className="inline-block bg-[pink-200]">Welcome Back!!</span>
        </h2>
        <p className="text-center text-gray-500 mt-2">Login to your account</p>
        
        <form className="mt-6 w-full max-w-md" onSubmit={onSubmit}>  {/* Increased max width */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Email</label>
            <input
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Enter your Email"
              className="w-full px-4 py-2 border border-red-300 rounded-lg focus:outline-none focus:border-red-500"
            />
          </div>
          <div className="mb-6 relative">
            <label className="block text-gray-700 font-bold mb-2">Password</label>
            <input
              type={isPasswordVisible ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-red-300 rounded-lg focus:outline-none focus:border-red-500"
            />
            <button
              type="button"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              className="absolute right-3 top-9 my-3 text-gray-600"
            >
              {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="w-3/4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full"  // Increased button width
            >
              Sign In
            </button>
          </div>
        </form>

        <p className="mt-8 text-center text-gray-500">
          Create an account?{" "}
          <span className="text-red-600 cursor-pointer" onClick={change}>
            Sign Up
          </span>
        </p>
        <span className="mt-4 text-center text-gray-600" onClick={forgot}>
          Forgot Password?{" "}
        </span>
      </div>
    </div>
  </div>
  );

}

export default Login