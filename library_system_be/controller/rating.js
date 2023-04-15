const expressAsyncHandler = require("express-async-handler")
const { v4 } = require("uuid")
const connection = require("../database/connect")

const rating= expressAsyncHandler(async (req, res)=> {
    try {
        const [rows]= connection.execute("INSERT INTO rating(rating_id, rate, book_id, user_id) VALUES(?, ?, ?, ?)", [v4(), req.body.rate, req.body.book_id, req.body.user_id])
        return res.status(200).json({rating: true})
        
    } catch (error) {
        return res.status(500).json({error})
    }
})

module.exports= rating