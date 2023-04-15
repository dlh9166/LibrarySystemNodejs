import axios from "axios"
import { API_URL } from "../config"

const verify_signup= async (email)=> {
    const res= await axios({
        url: API_URL+ "/api/v1/verify_email",
        method: "post",
        data: {
            email
        }
    })
    const result= await res.data
    return result
}

export default verify_signup