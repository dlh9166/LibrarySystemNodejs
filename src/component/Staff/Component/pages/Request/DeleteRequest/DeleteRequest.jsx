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
import delete_request from '../../../../../../api/staff/delete_request';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ApproveRequest(props) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
        <Button onClick={handleClickOpen} style={{margin: "8px 0", display: "flex", alignItems: "center"}}>
          Delete
        </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Delete request"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure to delete this request ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color={"red"} onClick={async ()=> {
              const result= await delete_request(props?.id)
                  if(result?.delete=== true) {
                    swal("Notice", "You've deleted this request successfully", "success")
                    .then(()=> {
                      handleClose()
                      props?.setChange(prev=> !prev)
                    })
                  }
                  else {
                    swal("Notice", "Error", "error")
                  }
          }}>Delete</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}