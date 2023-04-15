import axios from "axios"
import Cookies from "js-cookie"
import { API_URL } from "../../config"

const update_user= async (userName, phoneNumber, address, email, id)=> {
    const res= await axios({
        url: API_URL+ "/api/v3/user/update",
        method: "post",
        headers: {
            "authorization": "Bearer "+ Cookies.get("accessToken")
        },
        data: {
            userName, phoneNumber, address,email, user_id: id
        }
    })
    const result= await res.data
    return result
}

export default update_user