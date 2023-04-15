const expressAsyncHandler = require("express-async-handler")
const connection = require("../../database/connect")
const {v4 }= require("uuid")

const category= {
    get: expressAsyncHandler(async(req, res)=> {
        const [rows]= await connection.execute("SELECT category_id as id, category_name FROM category")
        return res.status(200).json(rows)
    }),
    add: expressAsyncHandler(async (req, res)=> {
        try {
            // eslint-disable-next-line
            const [rows]= await connection.execute("INSERT INTO category VALUES(?, ?, ?)", [v4(), req.body.category_name, req.body?.category_description])
            return res.status(200).json({add: true})
        } catch (error) {
           return res.status(500).send(error) 
        }
    }),
    delete: expressAsyncHandler(async (req, res)=> {
        try {
            // eslint-disable-next-line
            const [rows]= await connection.execute("DELETE FROM category WHERE category_id= ?", [req.body.id])
            return res.status(200).json({delete: true})
        } catch (error) {
           return res.status(500).send(error) 
        }
    }),
    update: expressAsyncHandler(async (req, res)=> {
        try {
            // eslint-disable-next-line
            const [rows]= await connection.execute("UPDATE category SET category_name= ? WHERE category_id= ?", [req.body.category_name, req.body.id])
            return res.status(200).json({update: true})
        
        } catch (error) {
           return res.status(500).send(error) 
            
        }
    })
}

module.exports= category