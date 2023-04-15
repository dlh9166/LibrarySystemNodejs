import axios from "axios"
import Cookies from "js-cookie"
import { API_URL } from "../../config"

const add_staff= async (userName, phoneNumber, address, email, password)=> {
    const res= await axios({
        url: API_URL+ "/api/v3/staff/add",
        method: "post",
        headers: {
            "authorization": "Bearer "+ Cookies.get("accessToken")
        },
        data: {
            userName, phoneNumber, address, email, password
        }
    })
    const result= await res.data
    return result
}

export default add_staff