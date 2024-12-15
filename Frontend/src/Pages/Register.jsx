import { React, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRef } from "react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate=useNavigate()


  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const onSubmit = async (event) => {
    event.preventDefault();
    const payload = { username, email, password};
    try {
      const response = await axios.post('http://localhost:8000/v1/api/users/register', payload);
      console.log(response.data.data)
      console.log(response.data.data.isRegistered)
      localStorage.setItem('isRegistered', response.data.data.isRegistered);
      alert(response.data.message);
      navigate('/login');
    } catch (error) {
      alert(error.response?.data?.error || 'Registration failed');
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen p-4 md:p-8">
    <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-between shadow-2xl rounded-lg overflow-hidden">
      {/* Left Section with Background Image */}
      <div
        className="hidden lg:flex relative w-full lg:w-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url('/src/assets/bgimage.jpg')` }}
      >
        {/* Overlay Text */}
        <div className="absolute inset-0 bg-white bg-opacity-70 flex flex-col items-center justify-center text-black p-8 lg:p-10">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-center">
            Register Now to Explore Events
          </h2>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            Be Informed about <span className="text-red-500">Events</span>
          </h2>
          <p className="text-base md:text-lg text-center">
            One-stop platform for all college events
          </p>
        </div>
      </div>
  
      {/* Right Section with Form */}
      <div className="w-full lg:w-1/2 p-6 md:p-10 flex flex-col items-center justify-center bg-white">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">
          <span className="bg-[#95cdb2] px-2 py-1 rounded-md">Sign Up Now</span>
        </h2>
        <p className="text-gray-500 mb-4 text-center">
          Create an account in just a few steps!
        </p>
        <form
          onSubmit={onSubmit}
          className="w-full max-w-md space-y-4 shadow-lg p-6 rounded-lg border border-gray-200"
        >
          <div className="font-semibold">
            <h4>Name</h4>
            <input
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Name"
              minLength={3}
              maxLength={15}
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500"
              value={username}
            />
          </div>
  
          <div className="font-semibold relative">
            <h4>Password</h4>
            <input
              required
              type={isPasswordVisible ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500"
              value={password}
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-600"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
  
          <div className="font-semibold">
            <h4>Email Address</h4>
            <input
              required
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="abc@gmail.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500"
              value={email}
            />
          </div>
  
          <button
            type="submit"
            className="w-full bg-red-600 text-white rounded-lg px-4 py-2 hover:bg-red-700"
          >
            Sign Up
          </button>
        </form>
  
        <p className="text-gray-600 mt-4 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-red-600 underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  </div>
  
  );
};

export default Register;
