import axios from "axios"
import Cookies from "js-cookie"
import { API_URL } from "../config"

const update_user= async (userName, phoneNumber, address)=> {
    const res= await axios({
        url: API_URL+ "/api/user/update",
        method: "post",
        data: {
            user_id: Cookies.get("uid"), userName, phoneNumber, address
        }
    })
    const result= await res.data
    return result
}

export default update_user