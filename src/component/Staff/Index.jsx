import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Chat from './Component/Chat/Chat'
import Home from './Component/Home/Home'
import Request from './Component/pages/Request/Request'
import Sidebar from './Component/Sidebar/Sidebar'
import Topbar from './Component/Topbar/Topbar'
import ProductList from '../Admin/pages/bookList/BookList'
import Category from '../Admin/pages/addCategory/Category'

const IndexStaff = () => {
  return (
    <>
        <Topbar />
        <div className="container-admin">
            <Sidebar />
            <Routes>
              <Route path={"/"} element={<Home />} />
              <Route path={"/request/"} element={<Request />} />
              <Route path={"/feedback/message/*"} element={<Chat />} />
              <Route path={"/books"} element={<ProductList />} />
              <Route path={"/category"} element={<Category />} />
            </Routes>
        </div>
    </>
  )
}

export default IndexStaff