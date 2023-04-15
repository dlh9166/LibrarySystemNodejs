import axios from "axios"
import { API_URL } from "../../config"
import Cookies from "js-cookie"

const get_detail_conversation= async (id_conversation)=> {
    const res= await axios({
        url: API_URL+ "/api/v3/staff/conversation",
        method: "get",
        params: {
            id_conversation
        },
        headers: {
            "authorization": "Bearer "+ Cookies.get("accessToken")
        }
    })
    const result= await res.data
    return result
}

export default get_detail_conversation