import axios from "axios"
import { API_URL } from "../../config"

const delete_request= async (id)=> {
    const res= await axios({
        url: API_URL+ "/staff/request/delete",
        method: "post",
        data: {
            id
        }
    })
    const result= await res.data
    return result
}

export default delete_request