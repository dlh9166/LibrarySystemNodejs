import axios from "axios"
import Cookies from "js-cookie"
import { API_URL } from "../config"

const index= async ()=> {
    const res= await axios({
        url: API_URL+ "/api/",
        method: "post",
        data: {
            uid: Cookies.get("uid")
        }
    })
    const result= await res.data
    return result
}

export default index