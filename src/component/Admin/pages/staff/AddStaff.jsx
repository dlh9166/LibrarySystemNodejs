import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import AddIcon from '@mui/icons-material/Add';
import { Button } from "semantic-ui-react";
import { TextField } from '@mui/material';
import swal from 'sweetalert';
import add_category from '../../../../api/category/add_category';
import add_staff from '../../../../api/admin/add_staff';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddStaff(props) {
  const [open, setOpen] = React.useState(false);
  const [userName, setUserName]= React.useState("")
  const [email, setEmail]= React.useState("")
  const [phone, setPhone]= React.useState("")
  const [address, setAddress]= React.useState("")
  const [password, setPassword]= React.useState("")

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
        <Button color={"facebook"} onClick={handleClickOpen} style={{margin: "8px 0", display: "flex", alignItems: "center"}}>
          <span>Add staff</span>
          <AddIcon />
        </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Add category"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <TextField style={{width: 350}} value={userName} onChange={(e)=> setUserName(e.target.value)} placeholder={"User name"} />
            <div></div>
            <br />
            <div></div>
            <TextField type={"password"} style={{width: 350}} value={password} onChange={(e)=> setPassword(e.target.value)} placeholder={"Password"} />
            <div></div>
            <br />
            <div></div>
            <TextField style={{width: 350}} value={email} onChange={(e)=> setEmail(e.target.value)} placeholder={"Account"} />
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

              const result= await add_staff(userName, phone, address, email, password)
              if(result?.add=== true) {
                swal("Notice", "Created", "success")
                .then(()=> {
                  handleClose()
                  setUserName("")
                  setEmail("")
                  setPassword("")
                  setAddress("")
                  setPhone("")
                  props?.setChange(prev=> !prev)
                })
              }
              else {
                swal("Notice", "Error", "error")
              }
          }}>Create</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}