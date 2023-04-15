import axios from "axios";
import { API_URL } from "../../config";

const get_detail_user = async (userId) => {
  const res = await axios({
    url: API_URL + "/api/v3/user/profile?id=" + userId,
    method: "get",
  });
  const result = await res.data;
  return result;
};

export default get_detail_user;
