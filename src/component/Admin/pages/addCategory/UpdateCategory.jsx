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
import update_category from '../../../../api/category/update_category';
import { TextField } from '@mui/material';
import { Input } from 'antd';

const { TextArea } = Input;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UpdateCategory(props) {
  const [open, setOpen] = React.useState(false);
  const [categoryName, setCategoryName]= React.useState(props?.categoryName)
  const [categoryDescription, setCategoryDescription]= React.useState(props?.categoryDescription)
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
        <Button onClick={handleClickOpen} style={{margin: "8px 0", display: "flex", alignItems: "center"}}>
          Update
        </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Sửa danh mục"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <TextField value={categoryName} onChange={(e)=> setCategoryName(e.target.value)} placeholder={"Category name"} />
            <div></div>
            <br />
            <div></div>
            <TextArea placeholder={"Category description"} value={categoryDescription} onChange={(e)=> setCategoryDescription(e.target.value)} rows={4} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color={"facebook"} onClick={async ()=> {
              const result= await update_category(categoryName, props?.id)
              if(result?.update=== true) {
                swal("Thông báo", "Bạn đã cập nhật thể loại thành công", "success")
                .then(()=> {
                  handleClose()
                  setCategoryName("")
                  props?.setChange(prev=> !prev)
                })
              }
              else {
                swal("Thông báo", "Error", "error")
              }
          }}>Lưu</Button>
          <Button onClick={handleClose}>Hủy</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}