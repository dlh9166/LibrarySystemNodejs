import axios from "axios";
import { API_URL } from "../../config";

const verify_email = async (email) => {
  try {
    const res = await axios({
      url: API_URL + "/api/v3/user/verify-email",
      method: "post",
      data: {
        email
      }
    });
    const result = await res.data;
    return result;
  } catch (error) {
    return error;
  }
};

export default verify_email;
