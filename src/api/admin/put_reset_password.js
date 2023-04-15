import axios from "axios";
import { API_URL } from "../../config";

const put_reset_password = async (oldPassword, newPassword, userEmail) => {
  try {
    const res = await axios({
      url: API_URL + "/api/v3/user/reset-password",
      method: "put",
      data: {
        old_password: oldPassword,
        new_password: newPassword,
        user_email: userEmail,
      },
    });
    const result = await res.data;
    return result;
  } catch (error) {
    return error;
  }
};

export default put_reset_password;
