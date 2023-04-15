import { Button, Grid, Input } from "@mui/material";
import { Box } from "@mui/system";
import { Divider } from "antd";
import React, { useContext, useEffect, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import get_conversation from "../../api/get_conversation";
import { SocketContext } from "../Socket/Socket";
import Cookies from "js-cookie";
import ScrollToBottom from "react-scroll-to-bottom";

const ComponentChat = () => {
  const [data, setData] = useState({
    conversation: "",
    message: [],
  });
  const { socketState } = useContext(SocketContext);
  const [message, setMessage] = useState("");
  useEffect(() => {
    (async () => {
      const result = await get_conversation();
      return setData(result);
    })();
  }, []);
  useEffect(() => {
    if (data?.conversation) {
      socketState?.emit("open_chat_connection", { roomId: data?.conversation });
    }
  }, [socketState, data?.conversation]);

  useEffect(() => {
    socketState?.on("receive_new_message", (dataSocket) => {
      const newMessage = data?.message.concat([dataSocket]);
      setData((prev) => ({ ...prev, message: newMessage }));
    });
  }, [socketState, data?.message]);

  const sendNewMessage = () => {
    socketState?.emit("send_new_message", {
      sender_id: Cookies.get("uid"),
      message,
      conversation_id: data?.conversation,
      time_created: new Date(),
    });
    setMessage("");
  };
  return (
    <Box
      sx={{
        width: 350,
        height: 500,
        backgroundColor: "#fff",
        borderRadius: 2,
        border: "1px solid #e7e7e7",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ fontSize: 18, fontWeight: 600, padding: 10 }}>
        Chat with librarian
      </div>
      <Divider style={{margin: 0}} />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <ScrollToBottom>
          <Box
            sx={{
              height: "100%",
              width: "100%",
              
              padding: "0 5px",
              maxHeight: "400px",
            }}
          >
            {data?.message?.map((item, key) => (
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
          </ScrollToBottom>
        </Box>
        <Divider style={{margin: 0}} />
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
    </Box>
  );
};

export default ComponentChat;
