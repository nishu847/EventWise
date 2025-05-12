import React from 'react'

function Button({
    type="",
    text="text-white",
    bgcolor="",
    classname="",
    children="",
    ...props
}){

    return(
        <button className={` block bg-[#ef8275] hover:bg-[#ef8275] focus:bg-[#ef8275] text-white font-semibold rounded-lg 
       ${classname} ${bgcolor} ${text} `} type={type}  {...props}>{children}</button>
    )
}

export default Button