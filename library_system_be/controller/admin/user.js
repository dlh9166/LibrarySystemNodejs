const expressAsyncHandler = require("express-async-handler")
const md5 = require("md5")
const { v4 } = require("uuid")
const connection = require("../../database/connect")

const user= {
    get: expressAsyncHandler(async(req, res)=> {
        const [rows]= await connection.execute("SELECT user_id as id, user_name as name, user_email as email, user_phone as phone, user_address as address FROM user WHERE user.role= 1")
        return res.status(200).json(rows)
    }),
    getById: expressAsyncHandler(async(req, res)=> {
        try{
            const [rows]= await connection.execute("SELECT user_id as id, user_name as name, user_email as email, user_phone as phone, user_address as address FROM user WHERE user_id = '"+req.query.id+"';")
            return res.status(200).json(rows[0])
        }catch(e){
        return res.status(500).json({e})
        }
    }),
    getStaff: expressAsyncHandler(async(req, res)=> {
        const [rows]= await connection.execute("SELECT user_id as id, user_name as name, user_email as email, user_phone as phone, user_address as address FROM user WHERE user.role= 2")
        return res.status(200).json(rows)
    }),
    updateUser: expressAsyncHandler(async (req, res)=> {
        try {
            const [rows]= await connection.execute("UPDATE user SET user_name= ?, user_phone= ? , user_address= ?, user_email= ? WHERE user_id= ?", [req.body.userName, req.body.phoneNumber, req.body.address, req.body.email, req.body.user_id])
            return res.status(200).json({update: true})
            
        } catch (error) {
            return res.status(500).json({error})  
        }
    }),
    delete: expressAsyncHandler(async (req, res)=> {
        try {
            const [rows]= await connection.execute("DELETE FROM user WHERE user_id= ?", [req.body?.user_id])
            return res.status(200).json({delete: true})
            
        } catch (error) {
            return res.status(500).json({error})  
        }
    }),
    addStaff: expressAsyncHandler(async (req, res)=> {
        try {
            const [rows]= await connection.execute("INSERT INTO user(user_id, user_name, user_email, user_phone, user_password, user_address, role, time_created) VALUES(?, ?, ?, ?, ?, ?, ?, ?)", [v4(), req.body.userName, req.body.phoneNumber, req.body.email, md5(req.body.password), req.body.address, 2, new Date()])
            return res.status(200).json({add: true})
        } catch (error) {
            return res.status(500).json({error})
        }
    })
}

module.exports= user