import axios from "axios";
import { API_URL } from "../../config";

const put_book = async (
  booId,
  bookName,
  bookQuantity,
  bookRating,
  bookDescription,
  coverPhoto,
  filteredAuthors,
  linkBook,
  filteredCategories
) => {
  const res = await axios({
    url: API_URL + "/api/v3/book",
    method: "put",
    data: {
      book_id: booId,
      book_name: bookName,
      book_quantity: bookQuantity,
      book_description: bookDescription,
      cover_photo: coverPhoto,
      link_book: linkBook,
      book_rating: bookRating,
      author_book: filteredAuthors.map((item) => {
        return {
          author_id: item.author_id,
        };
      }),
      category_book: filteredCategories.map((item) => {
        return {
          category_id: item.id,
        };
      }),
    },
  });
  const result = await res.data;
  return result;
};

export default put_book;
