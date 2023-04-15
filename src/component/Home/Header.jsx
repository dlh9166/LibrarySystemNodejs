import { HistoryOutlined } from '@mui/icons-material'
import React, { useContext } from 'react'
import {BsFillCartFill } from "react-icons/bs"
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../../App'
import DropDownCategory from './DropDownCategory'
import Search from './Search/Search'
import UserProfile from './UserProfile'


const Header = (props) => {

  const navigate= useNavigate()
  const {auth, user}= useContext(AppContext)
  
  return (
    <>
        <div style={{width: "100%", height: 60, position: "fixed", top: 0, left: 0, zIndex: 9, padding: "0 20px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#fff"}}>
            {/* Logo */}
            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <div onClick={()=> navigate("/") } style={{width: 300, height: 60, cursor: "pointer", }} className={"c-flex-center"}>
                    <img src="https://res.cloudinary.com/cockbook/image/upload/v1679076923/single/97e47f98424b9f15c65a_b6ojoi.png" style={{width: "100%", height: "100%", objectFit: "contain"}} alt="" />
                </div>
                <NavLink aria-current={"page"} className={"nav-link"}  to={"/"} style={{color: "#000", fontSize: 18, height: 60, display: "flex", justifyContent: "center", alignItems: 'center', padding: 10}}>
                    Home
                </NavLink>
                <DropDownCategory />
                <NavLink aria-current={"page"} className={"nav-link"}  to={"/about"} style={{color: "#000", fontSize: 18, height: 60, display: "flex", justifyContent: "center", alignItems: 'center', padding: 10}}>
                    About
                </NavLink>
                <NavLink aria-current={"page"} className={"nav-link"}  to={"/news"} style={{color: "#000", fontSize: 18, height: 60, display: "flex", justifyContent: "center", alignItems: 'center', padding: 10}}>
                    News
                </NavLink>
            </div>
            {/* right side */}
            <div style={{display: "flex", alignItems: "center", gap: 24}}>
            <Search {...props} />
                {
                    auth=== false && 
                    <div className={"h-e-1"} onClick={()=> navigate("/login?redirect_url="+ window.location.origin)} style={{fontSize: 17, cursor: "pointer"}}>Log in</div>
                }
                {
                    auth=== true && <>
                        <UserProfile {...user} />
                        <div onClick={()=> navigate("/history")} className={"c-flex-center"} style={{cursor: "pointer"}}>
                            <HistoryOutlined />
                        </div>
                        <div onClick={()=> navigate("/cart")} className={"c-flex-center"} style={{cursor: "pointer"}}>
                            <BsFillCartFill size={20} />
                        </div>
                    </>
                }
            </div>
        </div>
        <div style={{height: 60}}>
            
        </div>
    </>
  )
}

export default Header

