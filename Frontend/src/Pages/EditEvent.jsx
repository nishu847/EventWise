import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const EditEvent = () => {

  const [ eventDetails, setEventDetails ] = useState({
    eventName: "",
    description: "",
    venue: "",
    date: "",
    time: "",
    category: "",
    capacity: "",
    bannerImage: "",
    registrationLink: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);

  const navigate = useNavigate();
  const { eventId } = useParams();
  useEffect(() => {
    //fetch details automatically
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(
          `https://event-backend-7nta.onrender.com/v1/api/events/${eventId}`
        );
        console.log("response is :", response.data.data);
        setEventDetails(response.data.data);
      } catch (error) {
        console.error("Failed to fetch event details", error);
        alert("Failed to load event details.");
      }
    };
    fetchEventDetails();
  }, [eventId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value, // Update the correct field in the state
    }));
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      console.log("Selected Image:", file); // Log the selected image
      setEventDetails((prevDetails) => ({
        ...prevDetails,
        bannerImage: URL.createObjectURL(file), // Preview the image URL
      }));
    }
  };

  const onSave = async () => {
    try {
      const formData = new FormData();
      formData.append("eventName", eventDetails.eventName);
      formData.append("description", eventDetails.description);
      formData.append("venue", eventDetails.venue);
      const formattedDate = new Date(eventDetails.date).toISOString().split('T')[0];
      formData.append("date", formattedDate);
      formData.append("time", eventDetails.time);
      formData.append("category", eventDetails.category);
      formData.append("capacity", eventDetails.capacity);
      formData.append("registrationLink", eventDetails.registrationLink);
  
      // Check if an image is selected
      if (selectedImage) {
        formData.append("bannerImage", selectedImage);
      }
  
      // Log FormData before sending
      console.log("FormData being sent:", formData);
  
      // Perform the PUT request to update the event
      const response = await axios.put(
        `https://event-backend-7nta.onrender.com/v1/api/events/edit/${eventId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      console.log("onSave response:", response.data);
      if (response.data.data) {
        setEventDetails(response.data.data);
        alert("Event updated successfully!");
        navigate("/profile");
      } else {
        alert("Failed to update event. Please try again.");
      }
    } catch (error) {
      console.error("Failed to update event", error);
      alert("Failed to update the event. Please try again.");
    }
  };
  
  return (
    <div>
      <div className="min-h-screen bg-[#0F0607] p-8">
      <h1 className="text-4xl font-extrabold text-center text-white mb-8 mt-20 relative">
  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#fecdc8] to-[#f65c4b] mb-10">
Edit Event  </span>
  <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-20 h-1 bg-gradient-to-r from-[#fecdc8] to-[#f65c4b] rounded-full"></div>
</h1>
        <div className="bg-white p-6 rounded-xl shadow-lg max-w-5xl mx-auto" style={{ border: '2px solid #ef8275' }}>
          {/* Form Section */}
          <div className="space-y-6">
            {/* Event Name, Venue, and Capacity */}
            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="block text-lg font-medium text-gray-700">
                  Event Name
                </label>
                <input
                  type="text"
                  name="eventName"
                  value={eventDetails.eventName}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
  
              <div>
                <label className="block text-lg font-medium text-gray-700">
                  Venue
                </label>
                <input
                  type="text"
                  name="venue"
                  value={eventDetails.venue}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
  
              <div>
                <label className="block text-lg font-medium text-gray-700">
                  Capacity
                </label>
                <input
                  type="number"
                  name="capacity"
                  value={eventDetails.capacity}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
  
            {/* Banner Image */}
            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="block text-lg font-medium text-gray-700">
                  Banner Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
  
              {eventDetails.bannerImage && (
                <div className="col-span-2 flex items-center">
                  <img
                    src={eventDetails.bannerImage}
                    alt="Selected banner"
                    className="w-full max-w-sm h-auto object-cover rounded-lg border border-gray-300"
                  />
                </div>
              )}
            </div>
  
            {/* Description */}
            <div>
              <label className="block text-lg font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={eventDetails.description}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
  
            {/* Date, Time, and Category */}
            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="block text-lg font-medium text-gray-700">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={eventDetails.date}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
  
              <div>
                <label className="block text-lg font-medium text-gray-700">
                  Time
                </label>
                <input
                  type="time"
                  name="time"
                  value={eventDetails.time}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
  
              <div>
                <label className="block text-lg font-medium text-gray-700">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={eventDetails.category}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
  
            {/* Registration Link */}
            <div>
              <label className="block text-lg font-medium text-gray-700">
                Registration Link
              </label>
              <input
                type="url"
                name="registrationLink"
                value={eventDetails.registrationLink}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
  
            {/* Save Button */}
            <div className="text-center">
              <button
                onClick={onSave}
                className="bg-[#F4ACA4] hover:bg-[#e96c5f] text-[#FDFEEC] px-6 py-3 rounded-lg transition-transform transform hover:scale-105"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEvent;
