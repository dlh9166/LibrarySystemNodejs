import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Visibility } from "@material-ui/icons";
import { List, ListItem, ListItemText } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DetailProfile(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button onClick={handleClickOpen} className="widgetSmButton">
        <Visibility className="widgetSmIcon" />
        <div>Display</div>
      </button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"User infomation"}</DialogTitle>
        <DialogContent>
          <List>
            <ListItem disablePadding>
                <ListItemText primary="User name:" style={{marginRight: 10, width: 120, marginBottom: 10}} />
                <ListItemText primary={props?.user_name} />
            </ListItem>
            <ListItem disablePadding>
                <ListItemText primary="User phone:" style={{marginRight: 10, width: 120, marginBottom: 10}} />
                <ListItemText primary={props?.user_phone} />
            </ListItem>
            <ListItem disablePadding>
                <ListItemText primary="User address:" style={{marginRight: 10, width: 120, marginBottom: 10}} />
                <ListItemText primary={props?.user_address} />
            </ListItem>
            <ListItem disablePadding>
                <ListItemText primary="Eamil:" style={{marginRight: 10, width: 120, marginBottom: 10}} />
                <ListItemText primary={props?.user_email} />
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
