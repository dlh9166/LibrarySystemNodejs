const express= require("express")
const cors= require("cors")
const router = require("./route/route")
const http= require("http")
require('dotenv').config()
const app= express()
const httpServer= http.createServer(app)
const { Server } = require("socket.io")
const connection = require("./database/connect")
const io= new Server(httpServer)

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(express.static(__dirname+ "/assets"))
app.use(cors())
app.use(function(req, res, next) {
    const authHeader= req.headers.authorization
    if(authHeader) {
        const token= authHeader.split(" ")[1]
        req.token= token
    }
    next()
})
app.use(router)

io.on("connection", socket=> {
    socket.on("open_chat_connection", (data)=> {
        socket.join(data?.roomId)
    })
    socket.on("send_new_message", (data)=> {
        io.in(data?.conversation_id).emit("receive_new_message", data)
        connection.execute("INSERT INTO message(sender_id, message, conversation_id, time_created) VALUES(?, ?, ?, ?)", [data?.sender_id, data?.message, data?.conversation_id, data?.time_created])
    })


})

httpServer.listen(4000, ()=> console.log("Server run on port 4000"))