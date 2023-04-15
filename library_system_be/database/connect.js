// const { Sequelize } = require('sequelize');

// const sequelize= new Sequelize({
//     host: "localhost",
//     username: "root",
//     password: "",
//     database: "quan_ly_thu_vien"
// })

const mysql= require("mysql2/promise")

const connection= mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "quan_li_thu_vien",
})

module.exports= connection