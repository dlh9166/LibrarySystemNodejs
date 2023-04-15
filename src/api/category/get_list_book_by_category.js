import axios from "axios"
import Cookies from "js-cookie"
import { API_URL } from "../../config"

const get_list_book_by_category= async (category_id)=> {
    const res= await axios({
        url: API_URL+ "/api/v1/category/list/book",
        method: "get",
        params: {
            category_id
        },
        headers: {
            "authorization": "Bearer "+ Cookies.get("accessToken")
        }
    })
    const result= await res.data
    return result
}

export default get_list_book_by_category