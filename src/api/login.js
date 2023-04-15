import axios from "axios"
import { API_URL } from "../config"

const login= async (account, password)=> {
    const res= await axios({
        url: API_URL+ "/api/login",
        method: "post",
        data: {
            account, password
        }
    })
    const result= await res.data
    return result
}

export default login