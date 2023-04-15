import axios from "axios"
import Cookies from "js-cookie"
import { API_URL } from "../config"

const checkout= async (book_id)=> {
    const res= await axios({
        url: API_URL+ "/api/v1/checkout",
        method: "post",
        data: {
            book_id, user_id: Cookies.get("uid")
        },
        headers: {
            "authorization": "Bearer "+ Cookies.get("accessToken")
        }
    })
    const result= await res.data
    return result
}

export default checkout