import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { BsFillCartFill } from 'react-icons/bs';
import swal from 'sweetalert';
import add_cart from '../../api/add_cart';
import { AppContext } from '../../App';
import { useParams } from 'react-router-dom';

// eslint-disable-next-line
const requestAuthentication= ()=> {
  return swal("Thông báo", "Bạn cần đăng nhập để tiếp tục", "error")
}
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddToCart(props) {
  const {book_id }= useParams()
  const {auth }= React.useContext(AppContext)
  const [open, setOpen] = React.useState(false);
  const {amount, setAmount}= props
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
        <div onClick={()=> {
          if(auth=== true) {
            handleClickOpen()
          }
          else {
            swal("Thông báo", "Bạn cần đăng nhập để tiếp tục", "error")
          }
        }} style={{padding: 10, background: "#2e89ff", borderRadius: 10, color: "#fff", width: "max-content", gap: 10, marginTop: 12, cursor: "pointer"}} className={"c-flex-center"}>
            <div className={"c-flex-center"}>
                <BsFillCartFill size={18} color={"#fff"} />
            </div>
            <div>
                Add to cart
            </div>
            
        </div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        {
          auth=== true && <>
            <DialogTitle>{"Add to cart"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                <div style={{padding: "10px 20px", borderRadius: 20, border: "1px solid #000", display: "flex", justifyContent: 'space-between', alignItems: "center", height: 40}}>
                    <div style={{cursor: "pointer"}} onClick={()=> {
                        return swal("Thông báo", "Chỉ được mượn ít nhất một quyển", "error")
                        // eslint-disable-next-line
                        if(amount> 1) {
                            setAmount(()=> amount - 1)
                        }
                    }}>-</div>
                    <div style={{padding: "0 16px", fontWeight: 600}}>{amount}</div>
                    <div style={{cursor: "pointer"}} onClick={()=> {
                       return swal("Thông báo", "Chỉ được mượn tối đa một quyển", "error")
                        // eslint-disable-next-line
                        setAmount(()=> amount + 1)
                    }}>+</div>
                </div>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={async ()=> {
                try {
                  const result= await add_cart(parseInt(props?.amount), book_id)
                  if(result?.add=== true) {
                    swal("Thông báo", "Thêm vào giỏ hàng thành công", "success")
                  }
                  else if(result?.exist=== true) {
                    swal("Thông báo", "Bạn đã đặt cuốn sách này", "error")
                  }
                  else {
                    swal("Thông báo", "Error", "error")

                  }
                  handleClose()
                  }
                catch(err) {
                  swal("Thông báo", "Error", "error")

                }
              }}>Add</Button>
            </DialogActions>
          </>
          
        }
        {
          auth!== true && <>
          <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Bạn cần đăng nhập để tiếp tục
              </DialogContentText>
            </DialogContent>
          </>
        }
        
      </Dialog>
    </div>
  );
}