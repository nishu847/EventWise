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
        <button className={`w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg 
              px-4 py-3   ${classname} ${bgcolor} ${text} `} type={type}  {...props}>{children}</button>
    )
}

export default Button