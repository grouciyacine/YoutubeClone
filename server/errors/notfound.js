import CustomApiError from "./customApi.js";
import {StatusCodes} from 'http-status-codes'
class NotFound extends CustomApiError{
    constructor(msg){
        super(msg)
        this.statusCode = StatusCodes.NOT_FOUND;
    }
}
export default NotFound