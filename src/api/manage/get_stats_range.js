import axios from "axios"
import { API_URL } from "../../config"

const get_stats_range= async (time_start, time_end)=> {
    const res= await axios({
        url: API_URL+ "/api/v2/stats",
        method: "get",
        params: {
            time_range: true,
            time_start,
            time_end
        }

    })
    const result= await res.data
    return result
}

export default get_stats_range