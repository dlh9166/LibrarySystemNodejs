import axios from "axios"
import { API_URL } from "../../config"

const update_category= async (category_name, id)=> {
    const res= await axios({
        url: API_URL+ "/api/v3/category/update",
        method: "post",
        data: {
           category_name, id
        }
    })
    const result= await res.data
    return result
}

export default update_category