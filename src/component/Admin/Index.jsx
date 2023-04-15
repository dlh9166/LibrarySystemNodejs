import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import Home from "./pages/home/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import NewProduct from "./pages/newProduct/NewProduct";
import Category from "./pages/addCategory/Category";
import ManageStaff from "./pages/staff/ManageStaff";
import BookList from "./pages/bookList/BookList";
import Book from "./pages/book/Book";
import NewBook from "./pages/newBook/NewBook";
import Author from "./pages/author/Author";
import NewsAdmin from "./components/news/NewsAdmin";

function IndexAdmin() {
  return (
    <>
      <Topbar />
      <div className="container-admin">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />}>
          </Route>
          <Route path="/users" element={<UserList />}>
          </Route>
          <Route path="/user/:userId" element={<User />}>
          </Route>
          <Route path="/newUser" element={<NewUser />}>
          </Route>
          <Route path="/newproduct" element={<NewProduct />}>
          </Route>
          <Route path="/books" element={<BookList />}></Route>
          <Route path="/book/:bookId" element={<Book />} />
          <Route path="/newbook" element={<NewBook />} />
          <Route path="/authors" element={<Author />}></Route>
          <Route path="/category" element={<Category />} />
          <Route path={"/news/*"} element={<NewsAdmin />} />
          <Route path={"/staff/*"} element={<ManageStaff />} />
          <Route path={"*"} element={<Navigate to={"/404"} />} />
        </Routes>
      </div>
    </>
  );
}

export default IndexAdmin;
