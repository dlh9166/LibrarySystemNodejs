const expressAsyncHandler = require("express-async-handler")
const connection = require("../database/connect")
const Fuse= require("fuse.js")

const options = {
    
    keys: [
      "book_name",
      "category_name"
    ]
  };
  
const search= expressAsyncHandler(async (req, res)=> {
    const [rows]= await connection.execute("SELECT * FROM category_book INNER JOIN book ON book.book_id = category_book.book_id INNER JOIN category ON category.category_id = category_book.category_id INNER JOIN author ON author.author_id = book.author_id")
    const fuse = new Fuse(rows, options);
    return res.status(200).json(fuse.search(req.query.query))
})

module.exports= search