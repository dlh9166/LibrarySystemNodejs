import axios from "axios"
import { API_URL } from "../config"

const signup= async (userName, email, phone, password, address)=> {
    const res= await axios({
        url: API_URL+ "/api/signup",
        method: "post",
        data: {
            userName, email, phone, password, address
        }
    })
    const result= await res.data
    return result
}

export default signup