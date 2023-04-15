import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
// import AddIcon from '@mui/icons-material/Add';
import { Button } from "semantic-ui-react";
// import { TextField } from '@mui/material';
import swal from 'sweetalert';
import { TextField } from '@mui/material';
import update_user from '../../../../api/admin/update_user';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UpdateUser(props) {
  const [open, setOpen] = React.useState(false);
  // eslint-disable-next-line
  const [id, setId]= React.useState(props?.id)
  const [userName, setUserName]= React.useState(props?.name)
  const [email, setEmail]= React.useState(props?.email)
  const [phone, setPhone]= React.useState(props?.phone)
  const [address, setAddress]= React.useState(props?.address)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
    <button onClick={handleClickOpen} className="userListEdit">Edit</button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{props?.is_edit_staff === true ? "Edit staff" : "Edit user"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <TextField style={{width: 350}} value={userName} onChange={(e)=> setUserName(e.target.value)} placeholder={"User name"} />
            <div></div>
            <br />
            <div></div>
            <TextField style={{width: 350}} value={email} onChange={(e)=> setEmail(e.target.value)} placeholder={"Email"} />
            <div></div>
            <br />
            <div></div>
            <TextField style={{width: 350}} value={phone} onChange={(e)=> setPhone(e.target.value)} placeholder={"Phone"} />
            <div></div>
            <br />
            <div></div>
            <TextField style={{width: 350}} value={address} onChange={(e)=> setAddress(e.target.value)} placeholder={"Address"} />
            <div></div>
            <br />
            <div></div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color={"facebook"} onClick={async ()=> {
              const result= await update_user(userName, phone, address, email, id)
              if(result?.update=== true) {
                swal("Notice", "Updated", "success")
                .then(()=> {
                  handleClose()
                  setUserName("")
                  setEmail("")
                  setAddress("")
                  setPhone("")
                  props?.setChange(prev=> !prev)
                })
              }
              else {
                swal("Notice", "Error", "error")
              }
          }}>Save</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}