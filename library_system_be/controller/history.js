const expressAsyncHandler = require("express-async-handler")
const connection = require("../database/connect")

const get_history= expressAsyncHandler(async (req, res)=> {
    try {
        const [rows]= await connection.execute("SELECT *, book.book_id AS book_id, rating.book_id AS book_id_rating, rating.user_id AS user_id_rating FROM history INNER JOIN book ON book.book_id = history.book_id INNER JOIN author ON author.author_id = book.author_id LEFT JOIN rating ON rating.book_id = history.book_id WHERE history.user_id= ? GROUP BY history.history_id", [req.query.user_id])
        return res.status(200).json(rows)
        
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
})

module.exports= get_history