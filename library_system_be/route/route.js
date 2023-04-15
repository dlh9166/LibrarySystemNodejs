const express= require("express")
const index = require("../controller")
const category = require("../controller/admin/category")
const user = require("../controller/admin/user")
const cart = require("../controller/cart")
const category2 = require("../controller/category/category")
const checkout = require("../controller/checkout")
const comment = require("../controller/comment")
const conversation = require("../controller/conversation/conversation")
const get_category = require("../controller/get_category")
const get_detail_book = require("../controller/get_detail_book")
const get_most_popular_book = require("../controller/get_most_popular_book")
const get_release_book = require("../controller/get_release_book")
const get_history = require("../controller/history")
const login = require("../controller/login")
const get_dashboard = require("../controller/manage/dashboard")
const stats = require("../controller/manage/stats")
const search = require("../controller/search")
const signup = require("../controller/signup")
const get_detail_conversation = require("../controller/staff/get_detail_conversation")
const request = require("../controller/staff/request")
const update_user = require("../controller/update_user")
const is_admin = require("../middleware/is_admin")
const { verifyToken } = require("../middleware/jwt")
//reset Password
const reestPassword = require("../controller/reset_password")
// Book manager
const adminBook = require("../controller/admin/books")
// Author
const adminAuthor = require("../controller/admin/author")
const blog = require("../controller/blog/blog")
const uploadImage = require("../controller/upload_image")
const rating = require("../controller/rating")
const forgot_password = require("../controller/forgot_password")
const recover_password = require("../controller/recover_password")
const reset_password = require("../controller/reset_password")
const confirm_account = require("../controller/confirm_account")
const confirm_borrow_book = require("../controller/confirm_borrow_book")
const post_rating = require("../controller/post_rating")
const detail_category = require("../controller/detail_category")
const finish_book = require("../controller/finish_book")
const get_rating_book = require("../controller/get_rating_book")

const router= express.Router()

router.post("/api/signup", signup.signUp)
router.post("/api/login", login)
router.post("/api/", index)
router.get("/api/get_release_book", get_release_book)
router.get("/api/book", get_detail_book)
router.get("/api/cart", verifyToken , cart.get)
router.post("/api/cart/add", cart.add)
router.post("/api/cart/delete", cart.delete)
router.post("/api/user/update", update_user)
router.get("/api/search", search)
router.get("/api/comment", comment.get)
router.post("/api/comment/add", comment.add)
router.get("/api/get_most_popular_book", get_most_popular_book)
router.get("/api/get_category", get_category)
router.get("/api/v3/user",is_admin , verifyToken, user.get)
router.get("/api/v3/staff", is_admin, verifyToken, user.getStaff)
router.post("/api/v3/category/add", verifyToken, category.add)
router.post("/api/v3/category/update",verifyToken , category.update)
router.post("/api/v3/category/delete", verifyToken, category.delete)
router.get("/api/history", get_history)
router.get("/staff/request-book", request.get)
router.post("/staff/request/delete", request.delete)
router.post("/staff/request/action", request.action)
router.get("/conversation", conversation.get)
router.get("/conversation/list", conversation.getAll)
router.get("/api/v3/staff/conversation", get_detail_conversation)
router.get("/api/v2/get_dashboard", get_dashboard)
router.get("/api/v2/stats", stats)
router.post("/api/v1/checkout", checkout)
router.get("/api/v1/category/list/book", category2.getListBookByCategory)
// Books
router.get("/api/v3/book", adminBook.get);
router.post("/api/v3/book", adminBook.add);
router.put("/api/v3/book", adminBook.update);
router.delete("/api/v3/book", adminBook.delete);
router.get("/api/v3/book/detail", adminBook.getById);
router.post("/api/v3/book/update", adminBook.update)
// Author
router.get("/api/v3/author", adminAuthor.get);
router.get("/api/v3/author/detail", adminAuthor.getById);
router.post("/api/v3/author", adminAuthor.add);
router.put("/api/v3/author", adminAuthor.update);
router.delete("/api/v3/author", adminAuthor.delete);
// Reset password
router.get("/api/v3/user/profile", user.getById);
router.put("/api/v3/user/reset-password", reestPassword);
router.post("/api/v3/user/verify-email", signup.verifyEmail);

router.post("/api/v3/blogs/add", is_admin, blog.add)
router.post("/api/v1/upload-image", uploadImage)
router.get("/api/v3/blogs/get", verifyToken, blog.get)
router.post("/api/v3/blogs/delete", is_admin, blog.delete)
router.post("/api/v3/user/update", is_admin, user.updateUser)
router.post("/api/v3/user/delete", is_admin, user.delete)
router.post("/api/v3/staff/add", is_admin , user.addStaff)
router.post("/api/v3/blog/delete", is_admin, blog.delete)

router.post("/api/v1/book/rating", verifyToken, rating)
router.post("/forgot-password", forgot_password)
router.post("/recover-password", recover_password)
router.post("/reset-password", reset_password)
router.post("/api/v1/account/confirm", confirm_account)
router.post("/api/v1/book/borrow/confirm", confirm_borrow_book)
router.get("/api/v1/news/detail", blog.getDetail)
router.post("/api/rating/post", verifyToken, post_rating)
router.get("/api/category/detail", detail_category)
router.post("/api/v1/book/action/finish", verifyToken, finish_book)
router.get("/api/v1/book/score", get_rating_book)

module.exports= router