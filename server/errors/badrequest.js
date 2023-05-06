import CustomApiError from "./customApi.js";
import {StatusCodes} from 'http-status-codes'
class BadRequest extends CustomApiError{
    constructor(msg){
        super(msg)
        this.statusCode = StatusCodes.BAD_REQUEST;
    }
}
export default BadRequest