import axios from "axios";
import { API_URL } from "../../config";

const get_author_by_id = async (book_id) => {
  const res = await axios({
    url: API_URL + "/api/v3/author/detail?id=" + book_id,
    method: "get",
    // params: {
    //   book_id,
    // },
  });
  const result = await res.data;
  return result;
};

export default get_author_by_id;
