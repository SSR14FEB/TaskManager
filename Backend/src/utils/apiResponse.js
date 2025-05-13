class apiResponse{
    constructor(statuscode,message="",data){
        this.statuscode = statuscode<400
        this.message = message
        this.data = data||{}
    }
}

export {apiResponse}