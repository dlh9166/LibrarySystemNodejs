const expressAsyncHandler = require("express-async-handler")
const connection = require("../../database/connect")

const category2= {

    getListBookByCategory: expressAsyncHandler(async (req, res)=> {
        try {
            const [rows]= await connection.execute("SELECT * FROM category_book INNER JOIN book ON book.book_id = category_book.book_id LEFT JOIN category ON category_book.category_id = category.category_id WHERE category_book.category_id = ?", [req.query?.category_id])
            return res.status(200).json(rows)
            
        } catch (error) {
            return res.status(500).json(error)
        }
    })
}

module.exports= category2