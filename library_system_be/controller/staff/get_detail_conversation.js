const expressAsyncHandler = require("express-async-handler")
const connection = require("../../database/connect")

const get_detail_conversation= expressAsyncHandler(async (req, res)=> {
    try {
        const [rows]= await connection.execute("SELECT * FROM message INNER JOIN user ON message.sender_id = user.user_id WHERE message.conversation_id= ? ORDER BY message.time_created DESC", [req.query.id_conversation])   
        return res.status(200).json(rows)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
})

module.exports= get_detail_conversation