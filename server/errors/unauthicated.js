import CustomApiError from "./customApi.js";
import {StatusCodes} from 'http-status-codes'
class Unauthenticated extends CustomApiError{
    constructor(msg){
        super(msg)
        this.statusCode=StatusCodes.UNAUTHORIZED
    }
}
export default Unauthenticated