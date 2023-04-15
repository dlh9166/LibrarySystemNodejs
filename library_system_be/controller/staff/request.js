const expressAsyncHandler = require("express-async-handler")
const connection = require("../../database/connect")

const request = {
    get: expressAsyncHandler(async (req, res) => {
        try {
            const [rows] = await connection.execute("SELECT *, history.history_id AS id FROM history INNER JOIN user ON user.user_id = history.user_id INNER JOIN book ON book.book_id = history.book_id")
            return res.status(200).json(rows)
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    }),
    delete: expressAsyncHandler(async (req, res) => {
        try {
            // eslint-disable-next-line
            const [rows] = await connection.execute("DELETE FROM history WHERE history_id= ?", [req.body.id])
            return res.status(200).json({delete: true})
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    }),
    action: expressAsyncHandler(async(req, res)=> {
        try {
            // eslint-disable-next-line
            const [rows] = await connection.execute("UPDATE history SET state= ?, time_approve= ?, is_borrow= ?, borrow_time= ? WHERE history_id= ?", [req.body.status, new Date(), req.body?.is_borrow || 0, parseInt(req.body?.day_borrow) || 0, req.body.id])
            return res.status(200).json({update: true})
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    })
}

module.exports = request