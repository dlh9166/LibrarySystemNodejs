const expressAsyncHandler = require("express-async-handler");
const connection = require("../database/connect");

const finish_book= expressAsyncHandler(async (req, res)=> {
    try {
        
        const [rows]= await connection.execute("UPDATE history SET state= 3 WHERE history_id= ? AND user_id= ?", [req.body.history_id, req.user])
        return res.status(200).json({finish: true})
        
    } catch (error) {
        return res.status(500).json(error)
    }
})

module.exports= finish_book