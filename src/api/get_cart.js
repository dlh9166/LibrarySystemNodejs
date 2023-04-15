import axios from "axios"
import Cookies from "js-cookie"
import { API_URL } from "../config"

const get_cart= async ()=> {
    const res= await axios({
        url: API_URL+ "/api/cart",
        method: "get",
        params: {
            user_id: Cookies.get("uid")
        },
        headers: {
            "authorization": "Bearer "+ Cookies.get("accessToken")
        }
    })
    const result= await res.data
    return result
}

export default get_cart