import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import swal from "sweetalert";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";
import { Button } from "semantic-ui-react";
import { TextField } from "@mui/material";
import add_author from "../../../../api/author/add_author";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function RedBar() {
  return (
    <Box
      sx={{
        height: 20,
      }}
    />
  );
}

function AddAuthor({ fetchData }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [value, setValue] = useState(null);
  const [valueForm, setValueForm] = useState({
    authorName: "",
  });

  const [errorForm, setErrorForm] = useState({
    authorName: "",
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValueForm({
      ...valueForm,
      [name]: value,
    });
  };

  return (
    <div>
      <Button
        onClick={() => setOpen(!open)}
        style={{ margin: "8px 0", display: "flex", alignItems: "center" }}
      >
        <span>Thêm tác giả</span>
        <AddIcon />
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        fullWidth={true}
        maxWidth={"sm"}
      >
        <DialogTitle>{"Thêm tác giả"}</DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <TextField
              fullWidth
              placeholder={"Tên tác giả"}
              value={valueForm.authorName}
              name="authorName"
              onChange={handleChange}
              helperText={
                errorForm.authorName.length > 0 ? errorForm.authorName : ""
              }
              error={errorForm.authorName.length > 0 ? true : false}
            />
            <RedBar />
          
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            color={"facebook"}
            onClick={async () => {
              setLoading(true);
              let isValid = true;
              const newError = {
                authorName: "",
                authorAvatar: "",
                authorBirthday: "",
                authorEmail: "",
                authorGender: "",
                authorPhone: "",
              };
              if (valueForm.authorName.length === 0) {
                isValid = false;
                newError.authorName = "Nhập tên sách";
              } else {
                newError.authorName = "";
              }
              if (isValid) {
                const {
                  authorName,
                } = valueForm;
                const res = await add_author(
                  authorName,
                );
                // console.log("res: ", res);
                if (res?.add === true) {
                  swal(
                    "Notice",
                    "Created",
                    "success"
                  ).then(() => {
                    handleClose();
                    fetchData();
                  });
                } else {
                  swal("Notice", "Error", "error");
                }
                setValueForm({
                  authorName: "",
                });
                setValue("");
              }

              setErrorForm({ ...newError });
              setLoading(false);
            }}
            loading={loading}
          >
            Thêm
          </Button>
          <Button onClick={handleClose}>Hủy</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddAuthor;
