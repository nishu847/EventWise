import { React, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role,setRole]=useState("")
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate=useNavigate()

  const onSubmit = async (event) => {
    event.preventDefault();
    const payload = { username, email, password, role};
    console.log("payload",payload)
    try {
      console.log("sending:")
      const response = await axios.post('https://event-backend-7nta.onrender.com/v1/api/users/register', payload);
      console.log("response",response.data)
      alert(response.data.message);
      navigate('/login');
    } catch (error) {
      alert(error.response?.data?.error || 'Registration failed');
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen p-4 md:p-8 bg-[#0f0607] mt-14">
      <div className="pl-6 w-full max-w-5xl flex flex-col lg:flex-row items-center justify-between shadow-2xl rounded-lg overflow-hidden bg-white" style={{ border: '2px solid #ef8275' }}>
        
       <div
  className="hidden lg:flex relative w-full lg:w-1/2 bg-cover bg-center min-h-[500px]"
  style={{ backgroundImage: "url('/assets/bgimage.jpg')" }}
>
  <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-white p-8 lg:p-10 text-center">
    <h2 className="text-2xl md:text-3xl font-semibold mb-4">
      Register Now to Explore Events
    </h2>
    <h2 className="text-3xl md:text-4xl font-bold mb-4">
      Be Informed about <span className="text-[#e99990]">Events</span>
    </h2>
    <p className="text-base md:text-lg">
      One-stop platform for all college events
    </p>
  </div>
</div>
        {/* Right Section with Form */}
        <div className="w-full lg:w-1/2 p-6 md:p-8 flex flex-col items-center justify-center bg-white">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#1e3034] mb-2">
            <span className="bg-[#f4aca4] px-2 py-1 rounded-md">Sign Up Now</span>
          </h2>
          <p className="text-gray-500 mb-4 text-center">
            Create an account in just a few steps!
          </p>

          <form
            onSubmit={onSubmit}
            className="w-full max-w-sm space-y-4 shadow-md p-5 rounded-lg border border-gray-200"
          >
            <div className="font-semibold">
              <label htmlFor="name">Name</label>
              <input
                id="name"
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
              <label htmlFor="password">Password</label>
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
                className="absolute right-3 top-10 text-gray-600"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="font-semibold">
              <label htmlFor="email">Email Address</label>
              <input
                required
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="abc@gmail.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500"
                value={email}
              />
            </div>

            <div className="font-semibold">
              <label htmlFor="role">Role</label>
              <select
                id="role"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="Roles">Choose</option>
                <option value="Student">Student</option>
                <option value="Organizer">Organizer</option>
                <option value="Admin">Admin</option>
              </select>
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
            <a href="https://event-backend-7nta.onrender.com/v1/api/users/login" className="text-red-600 underline">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
