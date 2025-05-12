import React from "react";
import InfoCard from "../Components/Infocard";
import Button from "../Components/Button";
import { DateRange, Info, LocationOn } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
const Home = () => {
  const [isLoggedin, setIsLoggedin] = useState(false); // State to track registration
  const navigate = useNavigate();

  const register = () => {
    navigate("/register");
  };
  const goToEvent = () => {
    // Navigate to events page
    navigate("/events");
  };
  const infoData = [
    {
      title: "Stay Updated Effortlessly",
      description: `Get early access to event registrations and RSVP easily to secure your spot at popular events.`,
      image:
        "src/assets/illus1.jpeg",
    },
    {
      title: "Reminders and Alerts",
      description: `EventWise sends automatic reminders for events you’re interested in, so you won’t forget the important dates.`,
      image:
        "src/assets/illus2.jpg",
    },
  ];

  const developers = [
    {
        name: 'Nishu Sharma',
        role: 'Full Stack Developer',
        contribution: 'Led the design and implementation of the user interface and experience along with all the backend login and database management.',
        image: 'src/assets/nishuimg.jpg' 
    }
];

  useEffect(() => {
    const loginStatus = sessionStorage.getItem("isLoggedin") === "true";
    setIsLoggedin(loginStatus);
  }, []);

  return (
    <div className="bg-[#0f0607]">
      {/* bgimage  and text*/}
      <div className="relative flex flex-col justify-center items-center h-[85vh] overflow-hidden">
        <div className='absolute inset-0 bg-[url("/assets/bgimage.jpg")] bg-cover bg-center brightness-[40%]'></div>
        <h1 className="relative text-3xl md:text-5xl text-[#fdfeec] font-semibold text-center mb-4 md:mb-8">
          ALL THE UPCOMING EVENTS OF THE COLLEGE
        </h1>
        <h2 className="relative text-2xl md:text-4xl text-[#fdfeec] font-semibold text-center mb-6 md:mb-10">
          AT ONE PLACE
        </h2>
        <div className="relative text-[#fdfeec] flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-10 mb-8">
          <div className="flex items-center space-x-2">
            <LocationOn />
            <h3>Venue</h3>
          </div>
          <div className="flex items-center space-x-2">
            <DateRange />
            <h3>Date</h3>
          </div>
          <div className="flex items-center space-x-2">
            <Info />
            <h3>Details</h3>
          </div>
        </div>
        {isLoggedin ? (
          <Button
            type="button"
            onClick={goToEvent}
            classname="relative px-10 py-2"
          >
            Events
          </Button>
        ) : (
          <Button
            type="button"
            onClick={register}
            classname="relative px-10 py-2"
          >
            Register
          </Button>
        )}
      </div>

      <div
        className=" md:mt-10 bg-[#fdfeec] px-6 md:px-32 py-8 text-center plus-jakarta-sans shadow-lg"
        style={{ border: '2px solid #ef8275' }}
      >
        <h1 className="text-xl md:text-2xl  font-semibold text-[#1e3034]  ">
          Never miss an important event again! EventWise keeps you informed
          about all college activities, from career workshops to exciting
          cultural fests, so you can plan ahead and get the most out of campus
          life.
        </h1>

        <div className="flex justify-center gap-4 mx-auto">
          <Button
            type="button"
            onClick={register}
            classname="relative px-10 py-2 mt-4"
          >
            Get Registered
          </Button>
        </div>
      </div>


<div className="px-4 md:px-20 py-16">
  <h2 className="text-3xl font-semibold text-center text-[#f4aca4] mb-10">
    Take a Glimpse of Previous Events
  </h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {[
      "event1.jpg",
      "event2.jpg",
      "event3.jpg",
      "event4.jpg",
      "event5.jpg",
      "event6.jpg",
    ].map((img, idx) => (
      <div
        key={idx}
        className="overflow-hidden rounded-xl shadow-md transform transition duration-300 hover:scale-105 hover:shadow-xl"
      >
        <img
          src={`src/assets/${img}`}
          alt={`Event ${idx + 1}`}
          className="w-full h-60 object-cover"
        />
      </div>
    ))}
  </div>
</div>

<div className="px-4 md:px-20 py-16">
  <h2 className="text-4xl font-semibold text-center text-[#f4aca4] mb-12">
    Features
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    {infoData.map((item, index) => (
      <InfoCard
        key={index}
        title={item.title}
        description={item.description}
        image={item.image}
        reverse={false} // keep consistent alignment for symmetry
        register={register}
      />
    ))}
  </div>
</div>




   
    </div>
  );
};

export default Home;
