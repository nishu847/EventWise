import React from "react";
import { useForm } from "react-hook-form";
import Button from "../Components/Button";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const CreateEvent = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [event, setEvent] = useState("");
  const [bannerImage, setBannerImage] = useState(null);
  const [uploading, setUploading] = useState(false); // State for upload progress
  const [organizerName, setOrganizerName] = useState("");

  const onsubmit = async (data) => {

    if (!organizerName) {
      alert("Organizer name is required. Please log in.");
      return;
    }

    const formData = new FormData();
    formData.append("eventName", data.eventName);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("venue", data.venue);
    formData.append("date", data.date);
    formData.append("time", data.time);
    formData.append("capacity", data.capacity);
    formData.append("registrationLink", data.registrationLink);
    if (bannerImage) {
      formData.append("bannerImage", bannerImage); // Append banner image
    }
    formData.append("organizerName", organizerName); // Include the organizer name

    try {
      setUploading(true);
      const response = await axios.post(
        "http://localhost:8000/v1/api/events/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      setEvent(response.data);
      navigate("/events");
      alert("Event Created Successfully");
    } catch (error) {
      alert(error.response?.data?.error || "Event Creation Failed");
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    // Retrieve user data from local storage
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData && userData.username) {
      setOrganizerName(userData.username); // Set organizer name dynamically
    } else {
      alert("User not logged in. Please log in to create an event.");
      navigate("/login"); // Redirect to login if no user data is found
    }
  }, [navigate]);

  const handleFileChange = (e) => {
    setBannerImage(e.target.files[0]);
  };

  const onclose = () => {
    navigate("/events");
  };

  useEffect(() => {
    if (event) {
      console.log("Event Updated:", event); // Log when event state updates
    }
  }, [event]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-[#f0f4f2] rounded-lg shadow-lg p-6 w-full max-w-2xl">
        {/* Close Icon */}
        <button
          onClick={onclose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 focus:outline-none"
          aria-label="Close"
        >
          <CloseIcon />
        </button>

        {/* Heading */}
        <h2 className="text-2xl font-bold mb-6 text-center">Create New Event</h2>

        {/* Form */}
        <form onSubmit={handleSubmit(onsubmit)}>
          <div className="grid grid-cols-2 gap-4">
            {/* Event Name */}
            <div>
              <label className="block mb-1">
                <span className="text-gray-700">Event Name:</span>
                <input
                  {...register("eventName", {
                    required: "Event Name is required",
                    minLength: 6,
                    maxLength: 50,
                  })}
                  className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:border-blue-500 p-2"
                />
              </label>
              {errors.eventName && (
                <p className="text-red-500 text-sm mb-2">
                  {errors.eventName.message}
                </p>
              )}
            </div>

            {/* Event Category */}
            <div>
              <label className="block mb-1">
                <span className="text-gray-700">Event Type:</span>
                <select
                  {...register("category", { required: "Event Type is required" })}
                  className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:border-blue-500 p-2"
                >
                  <option value="">Select Type</option>
                  <option value="Seminar">Seminar</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Cultural">Cultural</option>
                  <option value="Sports">Sports</option>
                  <option value="Technical">Technical</option>
                </select>
              </label>
              {errors.category && (
                <p className="text-red-500 text-sm mb-2">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* Date */}
            <div>
              <label className="block mb-1">
                <span className="text-gray-700">Event Date:</span>
                <input
                  type="date"
                  {...register("date", { required: "Event Date is required" })}
                  className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:border-blue-500 p-2"
                />
              </label>
              {errors.date && (
                <p className="text-red-500 text-sm mb-2">{errors.date.message}</p>
              )}
            </div>

            {/* Time */}
            <div>
              <label className="block mb-1">
                <span className="text-gray-700">Event Time:</span>
                <input
                  type="time"
                  {...register("time", { required: "Event Time is required" })}
                  className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:border-blue-500 p-2"
                />
              </label>
              {errors.time && (
                <p className="text-red-500 text-sm mb-2">{errors.time.message}</p>
              )}
            </div>

            {/* Location */}
            <div>
              <label className="block mb-1">
                <span className="text-gray-700">Event Location:</span>
                <input
                  type="text"
                  {...register("venue", {
                    required: "Event Location is required",
                  })}
                  className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:border-blue-500 p-2"
                />
              </label>
              {errors.venue && (
                <p className="text-red-500 text-sm mb-2">{errors.venue.message}</p>
              )}
            </div>

            <div>
              <label className="block mb-1">
                <span className="text-gray-700">Capacity:</span>
                <input
                  type="number"
                  {...register("capacity", {
                    required: "Capacity is required",
                  })}
                  className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:border-blue-500 p-2"
                />
              </label>
              {errors.capacity && (
                <p className="text-red-500 text-sm mb-2">
                  {errors.capacity.message}
                </p>
              )}
            </div>
            
          </div>

          {/* Description */}
          <div className="mt-4">
            <label className="block mb-1">
              <span className="text-gray-700">Event Description:</span>
              <textarea
                {...register("description", {
                  required: "Event Description is required",
                  minLength: 20,
                  maxLength: 1000,
                })}
                className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:border-blue-500 p-2"
                rows="3"
              ></textarea>
            </label>
            {errors.description && (
              <p className="text-red-500 text-sm mb-2">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Registration Link */}
          <div className="mt-4">
            <label className="block mb-1">
              <span className="text-gray-700">Registration Link:</span>
              <input
                {...register("registrationLink", {
                  required: "Registration Link is required",
                })}
                className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:border-blue-500 p-2"
              />
            </label>
            {errors.registrationLink && (
              <p className="text-red-500 text-sm mb-2">
                {errors.registrationLink.message}
              </p>
            )}
          </div>

          {/* Banner Image */}
          <div className="mt-4">
            <label className="block mb-1">
              <span className="text-gray-700">Banner Image:</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:border-blue-500 p-2"
              />
            </label>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={uploading}
            className="w-full text-white rounded-md py-2 mt-6 bg-[#6b8fa9] hover:bg-[#8eb8d6]"
          >
            {uploading ? "Uploading..." : "Submit"}
          </Button>

        </form>
      </div>
      {event && (
        

        <div className="mt-6">
           {console.log("event details",event)}
          <h3 className="text-xl font-semibold mb-4 text-center">Event Details</h3>
          <Eventcard key={event._id} eventName={eventName} description={description} venue={venue} date={date} time={time} capacity={event.capacity} organizerName={event.organizerName} category={category} bannerImage={bannerImage} registrationLink={regi} /> {/* Pass event data to EventCard */}
        </div>
      )}
    </div>
  );
};

export default CreateEvent;
