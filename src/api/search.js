import axios from "axios"
import { API_URL } from "../config"

const search= async (query)=> {
    const res= await axios({
        url: API_URL+ "/api/search",
        method: "get",
        params: {
            query
        }
    })
    const result= await res.data
    return result
}

export default search