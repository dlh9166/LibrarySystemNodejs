import axios from "axios"
import Cookies from "js-cookie"
import { API_URL } from "../../config"

const add_category= async (category_name, category_description)=> {
    const res= await axios({
        url: API_URL+ "/api/v3/category/add",
        method: "post",
        data: {
           category_name, category_description
        },
        headers: {
            "authorization": "Bearer "+ Cookies.get("accessToken")
        }
    })
    const result= await res.data
    return result
}

export default add_category