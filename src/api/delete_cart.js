import axios from "axios"
import Cookies from "js-cookie"
import { API_URL } from "../config"

const delete_cart= async (book_id)=> {
    const res= await axios({
        url: API_URL+ "/api/cart/delete",
        method: "post",
        data: {
            user_id: Cookies.get("uid"),
            book_id
        }
    })
    const result= await res.data
    return result
}

export default delete_cart