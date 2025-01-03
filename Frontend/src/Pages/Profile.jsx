import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState({});
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [updatedUsername, setUpdatedUsername] = useState("");
  const navigate = useNavigate();
  const [products,setProducts]=useState([]);

  const userData = JSON.parse(localStorage.getItem("user")); // Assuming user details are stored in local storage
    const userId=userData._id


  const fetchUserData = async () => {
    try {
      setLoading(true);
      setUser(userData);
      const response = await axios.get(
        `http://localhost:8000/v1/api/users/${userId}/events`
      );
      console.log(response.data.data)
      setEvents(response.data.data);
    } catch (err) {
      setError("Failed to fetch user data or events.");
    } finally {
      setLoading(false);
    }
  };
  const fetchProductData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8000/v1/api/users/${userId}/products`
      );
      console.log(response.data.data)
      setProducts(response.data.data);
    } catch (err) {
      setError("Failed to fetch Products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(()=>{    
    fetchProductData();
  },[])

  const handleUpdateUsername = async () => {
    try {
      await axios.put(`http://localhost:8000/v1/api/users/${userId}`, {
        username: updatedUsername,
      });
      alert("Username updated successfully!");
      setUser({ ...user, username: updatedUsername });
    } catch (err) {
      alert("Failed to update username.");
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await axios.delete(`http://localhost:8000/v1/api/events/${eventId}`);
      setEvents(events.filter((event) => event._id !== eventId));
      alert("Event deleted successfully!");
    } catch (err) {
      alert("Failed to delete the event.");
    }
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    navigate(`/events/edit/${event._id}`); // Redirect to the event edit page
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:8000/v1/api/products/${productId}`);
      setProducts(products.filter((product) => product._id !== productId));
      alert("product deleted successfully!");
    } catch (err) {
      alert("Failed to delete the Product.");
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    navigate(`/products/update/${product._id}`); // Redirect to the event edit page
  };

  const handleForgotPassword = () => {
    navigate("/forgotpassword");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
     <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8 mt-20 relative">
  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#cbeddd] to-[#30433a] mb-10">
My Profile  </span>
  <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-20 h-1 bg-gradient-to-r from-[#cbeddd] to-[#3d5449] rounded-full"></div>
</h1>
  
    {/* User Details */}
    <div className="bg-white p-8 rounded-xl shadow-xl max-w-3xl mx-auto mb-12 border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">User Details</h2>
      <div className="space-y-4">
        <p className="text-lg text-gray-700">
          <strong className="font-medium">Username:</strong> {user.username}
        </p>
        <p className="text-lg text-gray-700">
          <strong className="font-medium">Email:</strong> {user.email}
        </p>
  
        {/* Update Username */}
        <div className="flex items-center gap-4 mt-6">
          <input
            type="text"
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
            placeholder="Update your username"
            value={updatedUsername}
            onChange={(e) => setUpdatedUsername(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-lg transition-transform transform hover:scale-105"
            onClick={handleUpdateUsername}
          >
            Update
          </button>
        </div>
  
        {/* Forgot Password */}
        <div className="mt-6 text-center">
          <button
            className="text-red-600 font-semibold hover:underline"
            onClick={handleForgotPassword}
          >
            Forgot Password?
          </button>
        </div>
      </div>
    </div>
  
    {/* Events Created by User */}
    <div className="bg-white p-8 rounded-xl shadow-xl max-w-full mx-auto border border-gray-200 mb-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">My Events</h2>
      {events.length === 0 ? (
        <p className="text-lg text-gray-600">You haven't created any events yet...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div key={event._id} className="h-full max-w-sm mx-auto">
              {/* Event Card */}
              <div className="shadow-xl rounded-lg overflow-hidden bg-white">
                <img
                  className="w-full h-60 object-cover"
                  src={event.bannerImage}
                  alt={event.eventName}
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {event.eventName}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{event.description}</p>
                  <p className="text-gray-700 text-sm">Venue: {event.venue}</p>
                  <p className="text-gray-700 text-sm">Date: {event.date}</p>
                  <p className="text-gray-700 text-sm">Time: {event.time}</p>
                  <p className="text-gray-700 text-sm">Capacity: {event.capacity}</p>
                </div>
                <div className="flex justify-between p-4 bg-gray-50">
                  <button
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md transition-transform transform hover:scale-105"
                    onClick={() => handleEditEvent(event)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md transition-transform transform hover:scale-105"
                    onClick={() => handleDeleteEvent(event._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    {/*Products added by User */}
    <div className="bg-white p-8 rounded-xl shadow-xl max-w-full mx-auto border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">My Products</h2>
      {products.length === 0 ? (
        <p className="text-lg text-gray-600">You haven't added any products yet...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product._id} className="h-full max-w-sm mx-auto">
              {/* Event Card */}
              <div className="shadow-xl rounded-lg overflow-hidden bg-white">
                <img
                  className="w-full h-60 object-cover"
                  src={product.productImage}
                  alt={product.productName}
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {product.productName}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{product.productInfo}</p>
                  <p className="text-gray-700 text-sm">Price: {product.price}</p>
                  <p className="text-gray-700 text-sm">Owner: {product.owner}</p>
                  <p className="text-gray-700 text-sm">Category: {product.productcategory}</p>
                  <p className="text-gray-700 text-sm">Condition: {product.condition}</p>
                </div>
                <div className="flex justify-between p-4 bg-gray-50">
                  <button
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md transition-transform transform hover:scale-105"
                    onClick={() => handleEditProduct(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md transition-transform transform hover:scale-105"
                    onClick={() => handleDeleteProduct(product._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
  

  );
};

export default Profile;
