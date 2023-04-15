import React, { useState } from "react";
import TelegramIcon from "@mui/icons-material/Telegram";
import { Button } from "@mui/material";
import OutsideClickHandler from "react-outside-click-handler";
import ComponentChat from "./ComponentChat";

const Chat = () => {
  const [open, setOpen] = useState(() => false);

  return (
    <div
      style={{ position: "fixed", right: 0, bottom: 0, margin: 20, zIndex: 99 }}
    >
      {open === false && (
        <Button onClick={() => setOpen(() => true)}>
          <TelegramIcon
            size={64}
            style={{
              color: "#2e89ff",
              width: 48,
              height: 48,
              borderRadius: "50%",
              border: "1px solid #e7e7e7",
              padding: 10,
              cursor: "pointer",
              background: "#fff",
            }}
            color={"#2e89ff"}
          />
        </Button>
      )}
      {open === true && (
        <OutsideClickHandler onOutsideClick={() => setOpen(() => false)}>
          <ComponentChat />
        </OutsideClickHandler>
      )}
    </div>
  );
};

export default Chat;
