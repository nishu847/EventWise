import React from 'react'
import { forwardRef,useId } from 'react'

const Input=forwardRef(function Input({
    type="text",
    classname="",
    value="",
    onChange,
    label,
    ...props
},ref){
    const id=useId()
    return(
        <div className='w-full mt-4'>
        {label && <label className='ml-2' htmlFor={id}>{label}</label>}
        <input type={type} value={value} className={`px-10 py-1 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700  ${classname}`} style={{border:"1px solid gray",}}
        {...props} ref={ref} id={id}  />

        </div>    
    )
})


export default Input