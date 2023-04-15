import axios from "axios";
import { API_URL } from "../../config";

const update_book = async (
  bookId,
  bookName,
  bookQuantity,
  bookRating,
  bookDescription,
  coverPhoto,
  filteredAuthors,
  linkBook,
  filteredCategories,
  author_id
) => {
  const res = await axios({
    url: API_URL + "/api/v3/book/update",
    method: "post",
    data: {
      book_id: bookId,
      book_name: bookName,
      book_quantity: bookQuantity,
      book_rating: bookRating,
      book_description: bookDescription,
      cover_photo: coverPhoto,
      link_book: linkBook,
      author_book: filteredAuthors,
      category_book: filteredCategories.map((item) => {
        return item
      }),
      author_id
    },
  });
  const result = await res.data;
  return result;
};

export default update_book;
