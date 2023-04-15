import axios from "axios"
import { API_URL } from "../../config"

const get_list_conversation= async ()=> {
    const res= await axios({
        url: API_URL+ "/conversation/list",
        method: "get"
    })
    const result= await res.data
    return result
}

export default get_list_conversation