import axios from "axios"
import { API_URL } from "../../config"

const action_book= async (id, status, is_borrow, day_borrow)=> {
    const res= await axios({
        url: API_URL+ "/staff/request/action",
        method: "post",
        data: {
            id,
            status,
            is_borrow,
            day_borrow
        }
    })
    const result= await res.data
    return result
}

export default action_book