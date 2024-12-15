import React from "react";
import { useForm } from "react-hook-form";
import CloseIcon from '@mui/icons-material/Close';
import Button from "./Button";
const Eventform = ({onClose,handlesubmit}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onsubmit = (data) => {
    console.log(data);
    handlesubmit(data);
  };
 
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="relative bg-[#f0f4f2] rounded-lg shadow-lg p-6 w-full max-w-md">
      {/* Close Button */}
      <button
        className="absolute top-3 right-3 text-black hover:text-gray-700"
        onClick={onClose}
      >
        <CloseIcon className="h-5 w-5" />
      </button>
  
      <h2 className="text-2xl font-bold mb-4 text-center">Create New Event</h2>
      <form onSubmit={handleSubmit(onsubmit)}>
        {/* Event Name */}
        <label className="block mb-2">
          <span className="text-gray-700">Event Name:</span>
          <input
            {...register("eventname", {
              required: "Event Name is required",
              minLength: 6,
              maxLength: 50,
            })}
            className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:border-blue-500 p-2"
          />
        </label>
        {errors.eventname && (
          <p className="text-red-500 text-sm">{errors.eventname.message}</p>
        )}
  
        {/* Event Description */}
        <label className="block mb-2">
          <span className="text-gray-700">Event Description:</span>
          <textarea
            {...register("eventinfo", {
              required: "Event Description is required",
              minLength: 20,
              maxLength: 1000,
            })}
            className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:border-blue-500 p-2"
            rows="4"
          ></textarea>
        </label>
        {errors.eventinfo && (
          <p className="text-red-500 text-sm">{errors.eventinfo.message}</p>
        )}
  
        {/* Event Type */}
        <label className="block mb-2">
          <span className="text-gray-700">Event Type:</span>
          <select
            {...register("eventtype", { required: "Event Type is required" })}
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
        {errors.eventtype && (
          <p className="text-red-500 text-sm">{errors.eventtype.message}</p>
        )}
  
        {/* Event Date */}
        <label className="block mb-2">
          <span className="text-gray-700">Event Date:</span>
          <input
            type="date"
            {...register("eventdate", { required: "Event Date is required" })}
            className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:border-blue-500 p-2"
          />
        </label>
        {errors.eventdate && (
          <p className="text-red-500 text-sm">{errors.eventdate.message}</p>
        )}
  
        {/* Event Time */}
        <label className="block mb-2">
          <span className="text-gray-700">Event Time:</span>
          <input
            type="time"
            {...register("eventtime", { required: "Event Time is required" })}
            className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:border-blue-500 p-2"
          />
        </label>
        {errors.eventtime && (
          <p className="text-red-500 text-sm">{errors.eventtime.message}</p>
        )}
  
        {/* Event Location */}
        <label className="block mb-4">
          <span className="text-gray-700">Event Location:</span>
          <input
            type="text"
            {...register("eventlocation", {
              required: "Event Location is required",
            })}
            className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:border-blue-500 p-2"
          />
        </label>
        {errors.eventlocation && (
          <p className="text-red-500 text-sm">{errors.eventlocation.message}</p>
        )}
  
        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full text-black rounded-md py-2 mt-4 bg-[#6c9380]"
        >
          Submit
        </Button>
      </form>
    </div>
  </div>
  );
};

export default Eventform;
