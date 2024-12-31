import React from "react";
import Button from "./Button";

const Eventcard = ({
  bannerImage,
  eventName,
  description,
  category,
  date,
  time,
  venue,
  organizerName,
  capacity,
  registrationLink,
}) => {

  const openregister = () => {
    window.location.href = registrationLink;
  };

  return (
<div className="bg-white shadow-md mt-4 mb-6 rounded-lg p-6 w-full flex gap-6 transition transform hover:scale-90 hover:shadow-xl">

      {/* Banner Image */}
      <div className="flex-shrink-0 w-1/3">
        <img
          src={bannerImage}
          alt={eventName}
          className="w-full h-auto object-cover rounded-lg"
        />
      </div>

      {/* Event Details */}
      <div className="flex flex-col w-2/3">
        {/* Event Name */}
        <h2 className="text-xl font-semibold text-gray-800 mb-3 truncate">
          {eventName}
        </h2>

        {/* Description */}
        <p className="text-gray-600 mb-4 break-words">{description}</p>

        {/* Event Details */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <strong className="font-medium">Type:</strong>
            <span className="bg-blue-100 text-blue-700 py-1 px-2 rounded-lg text-xs">
              {category}
            </span>
          </div>
          <div className="flex items-center gap-2 text-md text-gray-700">
            <strong className="font-medium">Date:</strong>
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2 text-md text-gray-700">
            <strong className="font-medium">Time:</strong>
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-2 text-md text-gray-700">
            <strong className="font-medium">Location:</strong>
            <span>{venue}</span>
          </div>
          <div className="flex items-center gap-2 text-md text-gray-700">
            <strong className="font-medium">Organizer:</strong>
            <span>{organizerName}</span>
          </div>
          <div className="flex items-center gap-2 text-md text-gray-700">
            <strong className="font-medium">Capacity:</strong>
            <span>{capacity}</span>
          </div>
        </div>

        {/* View More Button */}
        <div className="flex justify-start items-center mt-4">
          <Button className="font-bold py-5 px-10 rounded-lg shadow-md hover:scale-105 text-lg transition-transform duration-300 text-white bg-[#6b8fa9]" onClick={openregister}>
            {registrationLink ? <span>Register Now</span> : <span>IN-EVENT REGISTRATION</span>}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Eventcard;
