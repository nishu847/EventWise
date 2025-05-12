import React from 'react';
import Button from './Button';

const InfoCard = ({ title, description, image, reverse, register }) => (
  <div
    className={`flex flex-col md:flex-row p-5 md:p-10 items-center bg-[#fdfeec] rounded-3xl overflow-hidden ${
      reverse ? 'md:flex-row-reverse' : ''
    }`}
    style={{ border: '2px solid #ef8275' }}
  >
    <div className="w-full md:w-1/2">
      <img
        src={image}
        alt={title}
        className="w-full h-80 object-cover rounded-2xl"
      />
    </div>
    <div className="w-full md:w-1/2 p-6 flex flex-col justify-center items-start">
      <h3 className="text-2xl md:text-3xl font-semibold text-[#1e3034]">
        {title}
      </h3>
      <p className="mt-3 text-[#1e3034]">{description}</p>
      <Button
        type="button"
        onClick={register}
        classname="relative px-10 py-2 mt-4"
      >
        Get Registered
      </Button>
    </div>
  </div>
);

export default InfoCard;
