import axios from "axios"
import { API_URL } from "../config"

const confirm_account= async (email, code)=> {

    const res= await axios({
        url: API_URL+ "/api/v1/account/confirm",
        method: "post",
        data: {
            code, email
        }
    })
    const result= await res.data
    return result
}

export default confirm_account