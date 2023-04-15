import axios from "axios"
import Cookies from "js-cookie"
import { API_URL } from "../config"

const add_cart= async (amount, book_id)=> {
    const res= await axios({
        url: API_URL+ "/api/cart/add",
        method: "post",
        data: {
            user_id: Cookies.get("uid"),
            amount,
            book_id
        }
    })
    const result= await res.data
    return result
}

export default add_cart