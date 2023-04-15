import axios from "axios";
import { API_URL } from "../../config";

const put_author = async (
  authorId,
  authorName,
) => {
  const res = await axios({
    url: API_URL + "/api/v3/author",
    method: "put",
    data: {
      author_id: authorId,
      author_name: authorName,
    },
  });
  const result = await res.data;
  return result;
};

export default put_author;
