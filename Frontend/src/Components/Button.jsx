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
        <button className={` block bg-[#6c9380] hover:bg-[#4c705e] focus:bg-[#8ec0a7] text-white font-semibold rounded-lg 
       ${classname} ${bgcolor} ${text} `} type={type}  {...props}>{children}</button>
    )
}

export default Button