class CustomApiError extends Error{
    constructor(msg){
        super(msg)
    }
}
export default CustomApiError