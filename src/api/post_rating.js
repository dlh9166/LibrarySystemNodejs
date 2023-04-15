import axios from "axios"
import { API_URL } from "../config"
import Cookies from "js-cookie"

const post_rating= async (score, book_id,)=> {
    const res= await axios({
        url: API_URL+ "/api/rating/post",
        method: "post",
        data: {
            score, book_id, user_id: Cookies.get("uid")
        },
        headers: {
            "authorization": "Bearer "+ Cookies.get("accessToken")
        }
    })
    const result= await res.data
    return result
}

export default post_rating