import axios from "axios"
import { API_URL } from "../../config"

const get_dashboard= async ()=> {
    const res= await axios({
        url: API_URL+ "/api/v2/get_dashboard",
        method: "get",

    })
    const result= await res.data
    return result 
}

export default get_dashboard