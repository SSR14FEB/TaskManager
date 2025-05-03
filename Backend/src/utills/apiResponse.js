class apiResponse{
    constructor(massage="",statuscode,data){
        this.massage = massage
        this.statuscode = statuscode<400
        this.data = data
    }
}