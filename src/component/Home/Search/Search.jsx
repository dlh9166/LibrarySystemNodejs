import React, { useContext, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import search from "../../../api/search";
import { AppContext } from "../../../App";
// import * as Scroll from "react-scroll";
// import Menu from "@mui/material/Menu";
import { MenuItem } from "@mui/material";
import { Image } from "antd";
import { Typography } from 'antd';
import { Rate } from 'antd';
import { useNavigate } from "react-router-dom";

const { Title } = Typography;
const Search = (props) => {
  // const scroll = Scroll.animateScroll;
  const { searchResult } = useContext(AppContext);
  const [searchQuery, setSearchQuery]= useState("")
  const searchOn = false;
  const { setSearchResult, setIsSearching } = useContext(AppContext);
  // const [anchorEl, setAnchorEl] = React.useState(null);
  // const handleClick = (event) => {
  //   setAnchorEl(event?.currentTarget);
  // };
  // const open = Boolean(anchorEl);
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  const navigate= useNavigate()
  return (
    <div
      className={"search-bar"}
      style={{
        width: searchOn === false ? 350 : 700,
        position: searchOn === false ? "relative" : "absolute",
        top: searchOn === false ? "0" : "100%",
        right: searchOn === false ? "0" : "50%",
        transform:
          searchOn === false ? "translate(0, 0)" : "translate(50%, -50%)",
      }}
    >
      <input
        value={searchQuery}
        onChange={async (e) => {
          if (e.target.value.trim().length > 0) {
            setIsSearching(() => true);
          } else {
            setIsSearching(() => false);
          }
          setSearchQuery(e.target.value)
          const result = await search(e.target.value);
          setSearchResult(() => result);
        }}
        placeholder="Search"
        type="text"
        style={{
          width: "100%",
          height: 40,
          borderRadius: 80,
          outlineColor: "#2e89ff",
          padding: 10,
          border: "1px solid #000",
        }}
      />
      <div
        className={"c-flex-center"}
        style={{
          position: "absolute",
          top: "50%",
          right: "0",
          transform: "translate(-50%, -50%)",
        }}
      >
        <AiOutlineSearch size={20} />
      </div>
      {searchResult?.length > 0 && (
        <div style={{ position: "absolute", top: "100%", left: 0, padding: 10, borderRadius: 10, backgroundColor: "#fff"}}>
          {
            searchResult?.map((item, key)=> <MenuItem key={key}>
              <div style={{display: "flex"}}>
                <Image src={item?.item?.cover_photo} style={{width: 70, aspectRatio: 2 / 3, borderRadius: 10}} />
                <div onClick={()=> {
                  navigate("/book/"+ item?.item?.book_id)
                  setSearchQuery("")
                  setSearchResult([])
                }} style={{marginLeft: 10}}>
                  <Title level={5}>{item?.item?.book_name}</Title>
                  <Rate allowHalf disabled  value={parseFloat(item?.item?.book_rating)?.toFixed(1)} />
                  <Title level={5}>{item?.item?.author_name}</Title>
                </div>
              </div>
            </MenuItem>)
          }
        </div>
      )}
    </div>
  );
};

export default Search;
