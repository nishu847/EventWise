class ApiError extends Error{
    constructor( statusCode,message="Somthing went wrong",errors=[],stack){
       super(message)    // ye to change hoga hi hoga
       this.statusCode=statusCode
       this.data=null
       this.message=message
       this.success=false
       this.errors=errors

        if(stack)
            {
                this.stack=stack

            }else{
                Error.captureStackTrace(this,this.constructor)
            }



    }
}

export {ApiError}