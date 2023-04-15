const expressAsyncHandler = require("express-async-handler");
const connection = require("../../database/connect");

const get_dashboard= expressAsyncHandler(async (req, res)=> {
    try {
        const [rows]= await connection.execute("SELECT * FROM user WHERE role= 1 ORDER BY time_created LIMIT 5")
        const [rows2]= await connection.execute("SELECT * FROM history INNER JOIN user ON history.user_id = user.user_id INNER JOIN book ON book.book_id = history.book_id WHERE state = 1 AND is_borrow= 1")
        return res.status(200).json({newUser: rows, newHistory: rows2})
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)        
    }

})

module.exports= get_dashboard