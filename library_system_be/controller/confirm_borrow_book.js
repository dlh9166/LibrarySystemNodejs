const expressAsyncHandler = require("express-async-handler")
const connection = require("../database/connect")

const confirm_borrow_book= expressAsyncHandler(async (req, res)=> {
    try {
        const [rows]= await connection.execute("SELECT * FROM history WHERE book_id= ? AND user_id= ? AND state= 1 AND is_borrow= 0", [req.body.book_id, req.body.user_id])
        if(rows.length > 0) {
            const [rows1]= await connection.execute("UPDATE history SET is_borrow= 1 WHERE book_id= ? AND user_id= ? AND state= 1", [req.body.book_id, req.body.user_id])
            return res.status(200).json({borrow: true, timeup: false})
        }
        else {
            return res.status(200).json({borrow: false, timeup: true})
        }
    } catch (error) {
        return res.status(500).json(error)
    }
})

module.exports= confirm_borrow_book