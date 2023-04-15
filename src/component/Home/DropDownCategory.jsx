import React, { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { NavLink } from "react-router-dom";
import MenuCategory from "./MenuCategory";
import 'boxicons'

const DropDownCategory = () => {
//   const location= useLocation()
  const [activeLink, setActiveLink]= useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event?.currentTarget);
  };
  return (
    <OutsideClickHandler onOutsideClick={()=> setActiveLink(false)}>
        <NavLink
        onClick={(e)=> {
            e.preventDefault()
            setActiveLink(()=> true)
            handleClick(e)
        }}
        aria-current={"page"}
        className={activeLink=== true ? "nav-link active" : "nav-link"}
        to={"/category"}
        style={{
            color: "#000",
            fontSize: 18,
            height: 60,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
        }}
        >
        Category <box-icon name='chevron-down'></box-icon> 
        </NavLink>
        <MenuCategory anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
    </OutsideClickHandler>
  );
};

export default DropDownCategory;


