import React from "react";

const Eventcard = ({
  eventname = "",
  eventinfo = "",
  eventtype = "",
  eventdate = "",
  eventtime = "",
  eventlocation = "",
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 w-full max-w-sm">
      <h2 className="text-lg font-bold mb-2">{eventname}</h2>
      <p className="text-sm text-gray-600 mb-2">{eventinfo}</p>
      <div className="text-sm mb-2">
        <strong>Type:</strong> {eventtype}
      </div>
      <div className="text-sm mb-2">
        <strong>Date:</strong> {eventdate}
        
      </div>
      <div className="text-sm mb-2">
        <strong>Time:</strong> {eventtime}
      </div>
      <div className="text-sm">
        <strong>Location:</strong> {eventlocation}
      </div>
    </div>
  );
};

export default Eventcard;
