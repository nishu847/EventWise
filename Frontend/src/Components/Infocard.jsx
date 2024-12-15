import React from 'react'
import Button from './Button'
const InfoCard = ({ title, description, image, reverse, register }) => (
    <div className={`flex mx-5 md:mx-20 flex-col md:flex-row p-5 md:p-10 items-center bg-slate-100 rounded-3xl overflow-hidden ${
        reverse ? 'md:flex-row-reverse' : 'md:flex-row'
      }`}>
      <img src={image} alt={title}  className="w-1/2 h-80 object-cover rounded-2xl" />
      <div className="p-6 flex flex-col justify-center items-start">
        <h3 className="text-2xl md:text-3xl font-semibold text-slate-700">{title}</h3>
        <p className="mt-3 text-slate-500">{description}</p>
        <Button type="button" onClick={register} classname="relative px-10 py-2 mt-4">Get Registered</Button>

      </div>
    </div>
)

export default InfoCard