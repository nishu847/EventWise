import React from "react";
import InfoCard from "../Components/Infocard";
import Button from "../Components/Button";
import { DateRange, Info, LocationOn } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
const Home = () => {
  const [isLoggedin, setIsLoggedin] = useState(false); // State to track registration
const navigate=useNavigate();

  const register = () => {
    navigate('/register')
}
const goToEvent = () => {
  // Navigate to events page
  navigate("/events");
};
  const infoData = [
    { title: 'Stay Updated Effortlessly', description: `Get early access to event registrations and RSVP easily to secure your spot at popular events.`, image: 'https://picsum.photos/320/280' },
    { title: 'Reminders and Alerts', description: `EventWise sends automatic reminders for events you’re interested in, so you won’t forget the important dates.`, image: 'https://picsum.photos/320/280' },
    { title: 'Second-Hand Tools at Affordable Prices', description: `Why spend extra on new tools or materials when you can get them second-hand from seniors? Find affordable, well-maintained items like lab equipment, textbooks, and more, saving money and helping the environment.`, image: 'https://picsum.photos/320/280' }
  ];

  useEffect(() => {
    const loginStatus = localStorage.getItem('isLoggedin') === 'true';
    setIsLoggedin(loginStatus);
  }, []);

  return (
    <div className="bg-gray-200">

      {/* bgimage  and text*/}
  <div className="relative flex flex-col justify-center items-center h-[85vh] overflow-hidden">
  <div className='absolute inset-0 bg-[url("src/assets/bgimage.jpg")] bg-cover bg-center brightness-[40%]'></div>
  <h1 className="relative text-3xl md:text-5xl text-white font-semibold text-center mb-4 md:mb-8">
    ALL THE UPCOMING EVENTS OF THE COLLEGE
  </h1>
  <h2 className="relative text-2xl md:text-4xl text-white font-semibold text-center mb-6 md:mb-10">
    AT ONE PLACE
  </h2>
  <div className="relative text-white flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-10 mb-8">
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

<div className=" m-10 md:mt-8 bg-[#f0f4f2] px-6 md:px-32 py-8 text-center plus-jakarta-sans shadow-lg" style={{border:'1px solid #6c9380'}}>
            
            <h1 className="text-xl md:text-2xl  font-semibold text-gray-700  ">
            Never miss an important event again! EventWise keeps you informed about all college activities, from career workshops to exciting cultural fests, so you can plan ahead and get the most out of campus life.
            </h1>
        
            <div className='flex justify-center gap-4 mx-auto'>
            <Button type="button" onClick={register} classname="relative px-10 py-2 mt-4">Get Registered</Button>

            </div>
</div> 

<div className=" plus-jakarta-sans mx-auto mt-4 px-0 md:px-0 py-20 flex flex-col gap-10">
      {infoData.map((item, index) => (
        <InfoCard key={index} title={item.title} description={item.description} image={item.image} reverse={index % 2 !== 0} register={register}  />
      ))}
      <div className="w-full text-center">
      </div>
    </div>


    </div>
  );
};

export default Home;
