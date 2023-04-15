const expressAsyncHandler = require("express-async-handler");
const connection = require("../database/connect");

const detail_category= expressAsyncHandler(async (req, res)=> {
    try {
        const [rows]= await connection.execute("SELECT * FROM category WHERE category_id = ?", [req.query?.category_id])
        return res.status(200).json(rows)
        
    } catch (error) {
        return res.status(500).json(error)
    }
})

module.exports= detail_category