import React, { useEffect, useState } from "react";
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
import get_author_by_id from "../../../../api/author/get_author_by_id";
import put_author from "../../../../api/author/put_author";

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

function UpdateAuthor({ authorId, fetchData, props }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [value, setValue] = useState(null);
  const [data, setData] = useState({});
  const [valueForm, setValueForm] = useState({
    authorName: "",
  });

  const [errorForm, setErrorForm] = useState({
    authorName: "",
  });

  useEffect(() => {
    (async () => {
      const result = await get_author_by_id(authorId);
      return setData(result);
    })();
  }, [authorId]);

  useEffect(() => {
    setValueForm({
      authorName: data?.author_name})
  }, [data, authorId]);

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
        <span>Edit</span>
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
        <DialogTitle>{"Chỉnh sửa tác giả"}</DialogTitle>

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
                const res = await put_author(
                  authorId,
                  authorName,
                );
                // console.log("res: ", res);
                if (res?.update === true) {
                  swal(
                    "Notice",
                    "Updated",
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
                  authorAvatar: "",
                  authorBirthday: "",
                  authorEmail: "",
                  authorGender: "",
                  authorPhone: "",
                });
                setValue("");
              }

              setErrorForm({ ...newError });
              setLoading(false);
            }}
            loading={loading}
          >
            Save
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UpdateAuthor;
