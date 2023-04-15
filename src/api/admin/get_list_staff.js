import axios from "axios"
import Cookies from "js-cookie"
import { API_URL } from "../../config"

const get_list_staff= async ()=> {
    const res= await axios({
        url: API_URL+ "/api/v3/staff",
        method: "get",
        headers: {
            "authorization": "Bearer "+ Cookies.get("accessToken")
        }
    })
    const result= await res.data
    return result
}

export default get_list_staff