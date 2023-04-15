import { Box } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import get_list_conversation from "../../../../api/staff/get_list_conversation";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, Route, Routes } from "react-router-dom";
import ComponentChat from "./ComponentChat";

const Chat = () => {
  const [data, setData] = useState([]);
  useEffect(()=> {
    document.body.style.overflow= "hidden"
    return ()=> {
      document.body.style.overflow= "auto"
    }
  }, [])
  useEffect(() => {
    (async () => {
      const result = await get_list_conversation();
      return setData(result);
    })();
  }, []);

  return (
    <div className="userList" style={{height: "calc(100vh - 60px)", overflow: "hidden"}}>
      <Box sx={{ width: "100%", height: "100%"}}>
        <Routes>
          <Route
            path={"/"}
            element={
              <nav aria-label="main mailbox folders">
                <List>
                  {data?.map((item, key) => (
                    <Fragment key={key}>
                      <Link style={{color: "unset"}} to={"/staff/feedback/message/"+ item?.conversation_id}>
                        <ListItem
                          style={{ background: "#f7f7f7" }}
                          disablePadding
                        >
                          <ListItemButton>
                            <ListItemIcon>
                              <AccountCircleIcon />
                            </ListItemIcon>
                            <ListItemText primary={item?.user_name} />
                          </ListItemButton>
                        </ListItem>
                      </Link>
                      <Divider />
                    </Fragment>
                  ))}
                </List>
              </nav>
            }
          />
          <Route path={"/:id_conversation"} element={<ComponentChat />} />
        </Routes>
      </Box>
    </div>
  );
};

export default Chat;
