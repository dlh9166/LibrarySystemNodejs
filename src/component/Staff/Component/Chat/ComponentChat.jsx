import { Box, Divider, Grid, Input, Button } from "@mui/material";
import Cookies from "js-cookie";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import get_detail_conversation from "../../../../api/staff/get_detail_conversation";
import SendIcon from "@mui/icons-material/Send";
import { SocketContext } from "../../../Socket/Socket";
import ScrollableFeed from "react-scrollable-feed";
import ScrollToBottom from "react-scroll-to-bottom";
// import ScrollToBottom from "react-scroll-to-bottom";

const ComponentChat = () => {
  const { socketState } = useContext(SocketContext);
  const { id_conversation } = useParams();
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  useEffect(() => {
    (async () => {
      const result = await get_detail_conversation(id_conversation);
      return setData(result.reverse());
    })();
  }, [id_conversation]);
  //
  useEffect(() => {
    socketState?.emit("open_chat_connection", { roomId: id_conversation });
  }, [socketState, id_conversation]);
  //
  useEffect(() => {
    socketState?.on("receive_new_message", (dataSocket) => {
      if (dataSocket.conversation_id === id_conversation) {
        setData((prev) => [...prev, dataSocket]);
      }
    });
  }, [socketState, id_conversation]);
  const sendNewMessage = () => {
    socketState?.emit("send_new_message", {
      sender_id: Cookies.get("uid"),
      message,
      conversation_id: id_conversation,
      time_created: new Date(),
    });
    setMessage("");
  };
  return (
    <div style={{ width: "100%", height: "inherit" }}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          flex: 1,
          height: "inherit",
        }}
      >
        <ScrollableFeed>
          <ScrollToBottom>
            <Box sx={{ flex: 1, maxHeight: "800px" }}>
              <Box
                sx={{
                  height: "100%",
                  width: "100%",
                  padding: "0 5px",
                }}
              >
                {data?.map((item, key) => (
                  <Grid item xs={12} key={key}>
                    {item?.sender_id === Cookies.get("uid") ? (
                      <div
                        style={{
                          width: "100%",
                          direction: "rtl",
                          marginBottom: 10,
                        }}
                      >
                        <div
                          style={{
                            padding: "10px",
                            borderRadius: 80,
                            backgroundColor: "#2e89ff",
                            color: "#fff",
                            width: "max-content",
                          }}
                        >
                          {item?.message}
                        </div>
                      </div>
                    ) : (
                      <div style={{ width: "100%", marginBottom: 10 }}>
                        <div
                          style={{
                            padding: "10px",
                            borderRadius: 80,
                            backgroundColor: "#555",
                            color: "#fff",
                            width: "max-content",
                          }}
                        >
                          {item?.message}
                        </div>
                      </div>
                    )}
                  </Grid>
                ))}
              </Box>
            </Box>
          </ScrollToBottom>
        </ScrollableFeed>
        <Divider />
        <Box
          sx={{
            width: "100%",
            height: 60,
            padding: 1.25,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box style={{ flex: 1 }}>
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{ flex: 1, width: "100%" }}
              placeholder={"Type message"}
            />
          </Box>
          <Box>
            <Button
              onClick={sendNewMessage}
              style={{ width: 64, height: 64, borderRadius: "50%" }}
            >
              <SendIcon style={{ width: 20, height: 20 }} />
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default ComponentChat;
