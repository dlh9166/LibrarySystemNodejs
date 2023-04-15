const expressAsyncHandler = require("express-async-handler")
const connection = require("../database/connect")

const get_category= expressAsyncHandler(async (req, res)=> {
    const [rows]= await connection.execute("SELECT category_id as id, category_name, category_description FROM category")
    return res.status(200).json(rows)
})

module.exports= get_category