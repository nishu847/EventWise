import React, { useState, useEffect } from "react";
import axios from "axios";
import Eventcard from "../Components/Eventcard";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [role,setRole]=useState("")
  const [searchTerm, setSearchTerm] = useState("");
  const [date,setDate] = useState("")
  const [category, setCategory] = useState("");
  const [venue, setVenue] = useState("");

    const navigate=useNavigate();
    const createevent=()=>{
        navigate('create')
    }

  useEffect(() => {
    const userrole=localStorage.getItem("role")
    setRole(userrole)
    fetchEvents();
  }, [date, category, venue]);

  const fetchEvents = async () => {
    
    setLoading(true);
    setError(null);

    try {
      // Build query params dynamically
      const params = {};
      if (date) params.date = date;
      if (category) params.category = category;
      if (venue) params.venue = venue;

      const response = await axios.get("http://localhost:8000/v1/api/events", { params });
      setEvents(response.data.data); // Assuming the API returns { data: events }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred while fetching events");
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = events.filter((event) =>
    searchTerm ? event.eventName.toLowerCase().includes(searchTerm.toLowerCase()) : true
  );

  return (
    <div className="min-h-screen bg-[#f7f9f8] p-6">
      <div className="max-w-[100%] mx-auto">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8 mt-20 relative">
  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#cbeddd] to-[#30433a]">
    Upcoming Events
  </span>
  <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-20 h-1 bg-gradient-to-r from-[#cbeddd] to-[#3d5449] rounded-full"></div>
</h1>

  
        {/* Filters and Add Event Button */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search events..."
            className="p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 flex-grow"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
  
          {/* Date Picker */}
          <input
            type="date"
            className="p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
  
          {/* Category Filter */}
          <select
            className="p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Seminar">Seminar</option>
            <option value="Workshop">Workshop</option>
            <option value="Cultural">Cultural</option>
            <option value="Sports">Sports</option>
            <option value="Technical">Technical</option>
          </select>
  
          {/* Venue Filter */}
          <input
            type="text"
            placeholder="Venue..."
            className="p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 flex-grow"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
          />
  
          {/* Add Event Button */}
          {(role==="Organizer" || role==="Admin") && <button
            className="bg-[#6b8fa9] text-white font-medium px-6 py-3 rounded-lg shadow hover:bg-[#80a4bd] transition duration-300"
            onClick={createevent}
          >
            + Add Event
          </button>}
        </div>
  
        {/* Events List */}
        {loading ? (
          <div className="text-center text-gray-500 text-lg">
            Loading events...
          </div>
        ) : error ? (
          <div className="text-center text-red-600 text-lg">
            Error: {error}
          </div>
        ) : filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 mx-6">
            {filteredEvents.map((event) => (
              <Eventcard
                key={event._id}
                eventName={event.eventName}
                description={event.description}
                venue={event.venue}
                date={event.date}
                time={event.time}
                category={event.category}
                capacity={event.capacity}
                organizerName={event.organizerName}
                bannerImage={event.bannerImage}
                registrationLink={event.registrationLink}
                className="h-full shadow-lg rounded-lg p-4 bg-white"
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg">No events found.</p>
        )}
      </div>
      <Outlet />
    </div>
  );
  
  
  
};

export default AllEvents;
