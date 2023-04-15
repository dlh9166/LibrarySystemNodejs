const connection = require("../database/connect")
const asyncHandler = require('express-async-handler')
// const md5 = require("md5")

const update_user= asyncHandler(async (req, res)=> {
    try {
        const [rows]= await connection.execute("UPDATE user SET user_name= ?, user_phone= ? , user_address= ? WHERE user_id= ?", [req.body.userName, req.body.phoneNumber, req.body.address, req.body.user_id])
        return res.status(200).json({update_user: true})
        
    } catch (error) {
        console.log(error)
        return res.status(200).json({update_user: false})
    }
})


module.exports= update_user