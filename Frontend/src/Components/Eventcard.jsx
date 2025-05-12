import React from "react";

const EventCard = ({ bannerImage, eventName, description, registrationLink, onLearnMore }) => {
  const openregister = () => {
    window.location.href = registrationLink;
  };

  return (
    <div className="flex flex-col max-w-sm bg-white rounded-lg overflow-hidden shadow-lg h-full">
      {/* Dynamic Image with Aspect Ratio */}
      <div className="w-full aspect-[4/3]">
        <img
          className="w-full h-full object-cover"
          src={bannerImage}
          alt={eventName}
        />
      </div>

      {/* Fixed Text Area */}
      <div className="flex flex-col justify-between flex-grow bg-gray-900 text-white">
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2 truncate">{eventName}</h3>
          <p className="text-sm text-gray-300 line-clamp-3">{description}</p>
        </div>

        {/* Action Buttons */}
        <div className="px-4 py-2 flex justify-between bg-gray-800 text-blue-400 text-sm font-medium">
          <button onClick={openregister} className="hover:underline">
            {registrationLink ? "REGISTER" : "IN-EVENT REGISTRATION"}
          </button>
          <button onClick={onLearnMore} className="hover:underline">
            LEARN MORE
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
