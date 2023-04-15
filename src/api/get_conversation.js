import axios from "axios"
import Cookies from "js-cookie"
import { API_URL } from "../config"

const get_conversation= async ()=> {
    const res= await axios({
        url: API_URL+ "/conversation",
        method: "get",
        params: {
            user_id: Cookies.get("uid") || ""
        }
    })
    const result= await res.data
    return result
}

export default get_conversation