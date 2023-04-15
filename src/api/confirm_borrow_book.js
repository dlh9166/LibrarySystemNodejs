import axios from "axios"
import Cookies from "js-cookie"
import { API_URL } from "../config"

const confirm_borrow_book= async (book_id)=> {
    const res= await axios({
        url: API_URL+ "/api/v1/book/borrow/confirm",
        method: "post",
        data: {
            user_id: Cookies.get("uid"),
            book_id
        },
        headers: {
            "Authorization": "Bearer "+ Cookies.get("accessToken")
        }
    })
    const result= await res.data
    return result
}

export default confirm_borrow_book