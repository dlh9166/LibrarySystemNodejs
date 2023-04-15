const expressAsyncHandler = require("express-async-handler");
const connection = require("../database/connect");

const index= expressAsyncHandler(async(req, res)=> {
    try {
        const [rows]= await connection.execute("SELECT user_name, user_email, user_phone, user_address, role FROM user WHERE user_id= ?", [req.body.uid])
        if(rows.length >0 ) {
            return res.status(200).json({auth: true, ...rows[0]})
        }
        else {
            return res.status(200).json({auth: false})
        }
    } catch (error) {
        return res.status(200).json({auth: false})
    }
    
})

module.exports= index