import axios from "axios"
import { API_URL } from "../config"

const detail_new= async (new_id)=> {
    const res= await axios({
        url: API_URL+ "/api/v1/news/detail",
        method: "get",
        params: {
            new_id
        }
    })
    const result= await res.data
    return result
}

export default detail_new