import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../Components/Button";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const CreateEvent = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [bannerImage, setBannerImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [organizerName, setOrganizerName] = useState("");

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("user"));
    if (userData && userData.username) {
      setOrganizerName(userData.username);
    } else {
      alert("User not logged in. Please log in to create an event.");
      navigate("/login");
    }
  }, [navigate]);

  const handleFileChange = (e) => {
    setBannerImage(e.target.files[0]);
  };

  const onsubmit = async (data) => {
    if (!organizerName) {
      alert("Organizer name is required.");
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
      formData.append("bannerImage", bannerImage);
    }
    formData.append("organizerName", organizerName);

    try {
      setUploading(true);
      await axios.post("https://event-backend-7nta.onrender.com/v1/api/events/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      alert("Event Created Successfully");
      navigate("/events", { state: { refresh: true } }); // ✅ triggers refetch in AllEvents
    } catch (error) {
      alert(error.response?.data?.error || "Event Creation Failed");
    } finally {
      setUploading(false);
    }
  };

  const onclose = () => {
    navigate("/events");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-[#FDFEEC] rounded-lg shadow-lg p-6 w-full max-w-2xl">
        <button
          onClick={onclose}
          className="absolute top-4 right-4 text-[#1E3034]"
        >
          <CloseIcon />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">Create New Event</h2>

        <form onSubmit={handleSubmit(onsubmit)}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">
                <span className="text-[#1E3034]">Event Name:</span>
                <input
                  {...register("eventName", {
                    required: "Event Name is required",
                    minLength: 6,
                    maxLength: 50,
                  })}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </label>
              {errors.eventName && <p className="text-red-500 text-sm">{errors.eventName.message}</p>}
            </div>

            <div>
              <label className="block mb-1">
                <span className="text-[#1E3034]">Event Type:</span>
                <select
                  {...register("category", { required: "Event Type is required" })}
                  className="w-full border border-gray-300 rounded-md p-2"
                >
                  <option value="">Select Type</option>
                  <option value="Seminar">Seminar</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Cultural">Cultural</option>
                  <option value="Sports">Sports</option>
                  <option value="Technical">Technical</option>
                </select>
              </label>
              {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
            </div>

            <div>
              <label className="block mb-1">
                <span className="text-[#1E3034]">Event Date:</span>
                <input
                  type="date"
                  {...register("date", { required: "Event Date is required" })}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </label>
              {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
            </div>

            <div>
              <label className="block mb-1">
                <span className="text-[#1E3034]">Event Time:</span>
                <input
                  type="time"
                  {...register("time", { required: "Event Time is required" })}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </label>
              {errors.time && <p className="text-red-500 text-sm">{errors.time.message}</p>}
            </div>

            <div>
              <label className="block mb-1">
                <span className="text-[#1E3034]">Event Location:</span>
                <input
                  type="text"
                  {...register("venue", { required: "Event Location is required" })}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </label>
              {errors.venue && <p className="text-red-500 text-sm">{errors.venue.message}</p>}
            </div>

            <div>
              <label className="block mb-1">
                <span className="text-[#1E3034]">Capacity:</span>
                <input
                  type="number"
                  {...register("capacity", { required: "Capacity is required" })}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </label>
              {errors.capacity && <p className="text-red-500 text-sm">{errors.capacity.message}</p>}
            </div>
          </div>

          <div className="mt-4">
            <label className="block mb-1">
              <span className="text-[#1E3034]">Event Description:</span>
              <textarea
                {...register("description", {
                  required: "Event Description is required",
                  minLength: 20,
                  maxLength: 1000,
                })}
                rows="3"
                className="w-full border border-gray-300 rounded-md p-2"
              ></textarea>
            </label>
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>

          <div className="mt-4">
            <label className="block mb-1">
              <span className="text-[#1E3034]">Registration Link:</span>
              <input
                {...register("registrationLink", {
                  required: "Registration Link is required",
                })}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </label>
            {errors.registrationLink && <p className="text-red-500 text-sm">{errors.registrationLink.message}</p>}
          </div>

          <div className="mt-4">
            <label className="block mb-1">
              <span className="text-[#1E3034]">Banner Image:</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </label>
          </div>

          <Button
            type="submit"
            disabled={uploading}
            className="w-full text-white rounded-md py-2 mt-6 bg-[#F4ACA4] hover:bg-[#f08c81]"
          >
            {uploading ? "Uploading..." : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
