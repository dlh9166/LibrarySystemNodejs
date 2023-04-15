const expressAsyncHandler = require("express-async-handler");
const connection = require("../database/connect");

const get_detail_book= expressAsyncHandler(async(req, res)=> {
    try {
        const [rows]= await connection.execute("SELECT *, CONCAT('[',GROUP_CONCAT(JSON_OBJECT('category_id', category.category_id, 'category_name', category.category_name)),']') AS categories FROM book INNER JOIN author ON author.author_id = book.author_id LEFT JOIN category_book ON book.book_id = category_book.book_id LEFT JOIN category ON category.category_id = category_book.category_id WHERE book.book_id= ? GROUP BY book.book_id", [req.query.book_id])
        if(rows.length >0 ) {
            return res.status(200).json(rows[0])
        }
        else {
            return res.status(200).json({})
        }
    } catch (error) {
        console.log(error)
        return res.status(200).json({})
    }
    
})

module.exports= get_detail_book