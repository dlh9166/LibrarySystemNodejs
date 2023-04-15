const expressAsyncHandler = require("express-async-handler")
const connection = require("../../database/connect")

const blog= {
    add: expressAsyncHandler(async (req, res)=> {
        try {
            const [rows]= await connection.execute("INSERT INTO blogs(content, time_created, title, image) VALUES(?, ?, ?, ?)", [req.body.content, req.body.time_created, req.body.title, req.body.image])
            return res.status(200).json({add: true})
            
        } catch (error) {
            return res.status(500).json(error)
        }
    }),
    get: expressAsyncHandler(async (req, res)=> {
        try {
            const [rows]= await connection.execute("SELECT * FROM blogs")
            return res.status(200).json(rows)
        } catch (error) {
            return res.status(500).json(error)
        }
    }),
    delete: expressAsyncHandler(async (req, res)=> {
        try {
            const [rows]= await connection.execute("DELETE FROM blogs WHERE id= ?", [req.body.id])
            return res.status(200).json({delete: true})
        }
        catch(error) {
            return res.status(500).json(error)
        }
    }),
    getDetail: expressAsyncHandler(async (req, res)=> {
        try {
            const [rows]= await connection.execute("SELECT * FROM blogs WHERE id= ?", [req.query?.new_id])
            return res.status(200).json(rows?.[0])
        } catch (error) {
            return res.status(500).json(error)
        }
    })
}

module.exports= blog