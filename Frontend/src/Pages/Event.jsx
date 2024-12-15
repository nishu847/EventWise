import React, { useState } from "react";
import PostAddIcon from "@mui/icons-material/PostAdd";
import Button from "../Components/Button";
import Eventform from "../Components/Eventform";

const Event = () => {
  const [formopen, setformopen] = useState(false);
  const [eventData, setEventData] = useState(null);
  function openForm() {
    setformopen(!formopen);
  }
  function handleSubmit(data){
    setEventData(data);
    console.log(eventData)
    setformopen(false);
  }
  return (
    <div className="p-6 bg-gray-100 font-sans mt-20">
      <div>
        <button onClick={openForm} className="bg-gray-100 text-black">
          Add Event <PostAddIcon />
        </button>
        {formopen && <Eventform onClose={openForm} handlesubmit={handleSubmit}/>}
      </div>
    </div>
  );
};

export default Event;
