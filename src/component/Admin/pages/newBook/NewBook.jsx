import React, { useEffect, useState } from "react";
import get_category from "../../../../api/get_category";
import get_list_author from "../../../../api/author/get_list_author";
import AddIcon from "@mui/icons-material/Add";
import add_book from "../../../../api/book/add_book";
import swal from "sweetalert";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import { Button } from "semantic-ui-react";
import { TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import UploadImage from "../../../Component/UploadImage"
import "./newBook.css";
import upload_image from "../../../../api/upload_image";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function RedBar() {
  return (
    <Box
      sx={{
        height: 20,
      }}
    />
  );
}

export default function NewBook({ fetchData }) {
  const [open, setOpen] = useState(false);
  const [dataCategory, setDataCategory] = useState([]);
  const [dataAuthor, setDataAuthor] = useState([]);
  const [personAuthor, setPersonAuthor] = React.useState([]);

  const [personCategory, setPersonCategory] = React.useState([]);
  // const [loading, setLoading] = useState(false);
  const [authorChoosen, setAuthorChoosen]= useState("")
  const [image, setImage]= useState("")
  const [valueForm, setValueForm] = useState({
    bookName: "",
    bookQuantity: "",
    bookRating: "",
    bookDescription: "",
    coverPhoto: "",
    linkBook: "",
    categoryId: "",
  });

  const [errorForm, setErrorForm] = useState({
    bookName: "",
    bookQuantity: "",
    bookRating: "",
    bookDescription: "",
    coverPhoto: "",
    linkBook: "",
    categoryId: "",
  });

  useEffect(() => {
    (async () => {
      const result = await get_category();
      return setDataCategory(result);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const result = await get_list_author();
      return setDataAuthor(result);
    })();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "authorId") {
      setPersonAuthor(value);
    } else if (name === "categoryId") {
      setPersonCategory(typeof value === "string" ? value.split(",") : value);
    } else {
      setValueForm({
        ...valueForm,
        [name]: value,
      });
    }
  };

  return (
    <div>
      <Button
        onClick={() => setOpen(!open)}
        style={{ margin: "8px 0", display: "flex", alignItems: "center" }}
      >
        <span>Add book</span>
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
        <DialogTitle>{"Thêm sách"}</DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <TextField
              fullWidth
              placeholder={"Name's book"}
              value={valueForm.bookName}
              name="bookName"
              onChange={handleChange}
              helperText={
                errorForm.bookName.length > 0 ? errorForm.bookName : ""
              }
              error={errorForm.bookName.length > 0 ? true : false}
            />
            <RedBar />
            <TextField
              fullWidth
              placeholder={"Amount"}
              value={valueForm.bookQuantity}
              name="bookQuantity"
              onChange={handleChange}
              helperText={
                errorForm.bookQuantity.length > 0 ? errorForm.bookQuantity : ""
              }
              error={errorForm.bookQuantity.length > 0 ? true : false}
            />
            <RedBar />

            <TextField
              fullWidth
              name="bookRating"
              value={valueForm.bookRating}
              onChange={handleChange}
              placeholder={"Rating"}
              helperText={
                errorForm.bookRating.length > 0 ? errorForm.bookRating : ""
              }
              error={errorForm.bookRating.length > 0 ? true : false}
            />
            <RedBar />
            <TextField
              fullWidth
              name="linkBook"
              value={valueForm.linkBook}
              onChange={handleChange}
              placeholder={"Link book"}
              helperText={
                errorForm.linkBook.length > 0 ? errorForm.linkBook : ""
              }
              error={errorForm.linkBook.length > 0 ? true : false}
            />
            <RedBar />
            <UploadImage title={"Upload cover book"} setImage={setImage} />
            <RedBar />
            <TextField
              fullWidth
              name="bookDescription"
              value={valueForm.bookDescription}
              onChange={handleChange}
              placeholder={"Description"}
              helperText={
                errorForm.bookDescription.length > 0
                  ? errorForm.bookDescription
                  : ""
              }
              error={errorForm.bookDescription.length > 0 ? true : false}
            />
            <RedBar />
            <Select
              onChange={handleChange}
              value={personCategory}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              name="categoryId"
              fullWidth
              input={<OutlinedInput />}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <span>Category</span>;
                }

                return selected?.map(item=> item?.category_name + ",")
              }}
              multiple
              MenuProps={MenuProps}
              error={personCategory.length === 0 ? true : false}
            >
              {dataCategory?.map((item) => (
                <MenuItem value={item} key={item.category_name}>
                  {/* {item.category_name} */}
                  <Checkbox
                    checked={personCategory.map(item=> item?.category_name).indexOf(item.category_name) > -1}
                  />
                  <ListItemText primary={item.category_name} />
                </MenuItem>
              ))}
            </Select>

            
            {personCategory.length === 0 && (
              <FormHelperText>Choose category</FormHelperText>
            )}
            <RedBar />
            <Select
              value={personAuthor}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              name="authorId"
              fullWidth
              input={<OutlinedInput />}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <span>Author</span>;
                }

                return dataAuthor.find(item=> item?.author_id=== selected)?.author_name;
              }}
              MenuProps={MenuProps}
            >
              <RadioGroup value={personAuthor} onChange={(e)=> setPersonAuthor(e.target.value)} style={{padding: 10}}>

                {dataAuthor?.map((item, key) => (
                  
                  <FormControlLabel key={key} value={item?.author_id} control={<Radio />} label={item?.author_name} />
              ))}
              </RadioGroup>
            </Select>
            {personAuthor.length === 0 && (
              <FormHelperText>Choose author</FormHelperText>
            )}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            color={"facebook"}
            onClick={async () => {
              const resultImage= await upload_image(image?.thumbUrl)
              const result= await add_book(valueForm.bookName, valueForm.bookQuantity, valueForm.bookRating, valueForm.bookDescription, resultImage, authorChoosen, valueForm.linkBook, personCategory, personAuthor )
              if(result?.add === true ) {
                swal("Notice", "Add book successfully", "success")
              }
              else {
                swal("", "Error", "error")
              }
            }}
          >
            Add
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
