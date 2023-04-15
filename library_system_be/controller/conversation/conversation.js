const expressAsyncHandler = require("express-async-handler")
const { v4 } = require("uuid")
const connection = require("../../database/connect")

const conversation= {
    get: expressAsyncHandler(async (req, res)=> {
        try {
            const [rows1]= await connection.execute("SELECT * FROM conversation WHERE conversation.user_id =? ", [req.query.user_id])
            if(rows1.length > 0) {
                const [rows] =await connection.execute("SELECT * FROM message INNER JOIN user ON user.user_id = message.sender_id WHERE message.conversation_id= ?", [rows1[0].conversation_id])
                return res.status(200).json({conversation: rows1[0].conversation_id, message: rows})
            }
            else {
                const conversation_id= v4()
                // eslint-disabel-next-line
                const [row1]= await connection.execute("INSERT INTO conversation VALUES (?, ?)", [conversation_id, req.query.user_id])
                const [rows]= await connection.execute("SELECT * FROM message INNER JOIN user ON user.user_id = message.sender_id WHERE message.conversation_id= ?", [conversation_id])
                return res.status(200).json({conversation: conversation_id, message: rows})
            }
            
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    }),
    getAll: expressAsyncHandler(async (req, res)=> {
        try {
            const [rows]= await connection.execute("SELECT * FROM conversation INNER JOIN user ON conversation.user_id = user.user_id")
            return res.status(200).json(rows)
            
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    })
}

module.exports= conversation