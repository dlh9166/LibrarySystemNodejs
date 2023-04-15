import React, { useEffect, useState } from "react";
import "./book.css";
// import put_book from "../../../../api/book/put_book";
import get_category from "../../../../api/get_category";
import get_list_author from "../../../../api/author/get_list_author";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import { Button } from "semantic-ui-react";
import { FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import swal from "sweetalert";
// import get_book_by_id from "../../../../api/book/get_book_by_id";
import upload_image from "../../../../api/upload_image";
import UploadImage from "../../../Component/UploadImage";
import update_book from "../../../../api/book/update_book";

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
// 

export default function Book({ bookId, fetchData, props }) {
  const [open, setOpen] = useState(false);
  const [dataCategory, setDataCategory] = useState([]);
  const [dataAuthor, setDataAuthor] = useState([]);
  const [personAuthor, setPersonAuthor] = React.useState([]);
  
  const [personCategory, setPersonCategory] = React.useState([]);
  // const [loading, setLoading] = useState(false);
  const [authorChoosen, setAuthorChoosen]= useState("")
  const [image, setImage]= useState("")
  const [valueForm, setValueForm] = useState({
    bookName: props?.props?.book_name,
    bookQuantity: props?.props?.book_quantity,
    bookRating: props?.props?.book_rating,
    bookDescription: props?.props?.book_description,
    coverPhoto: props?.props?.cover_photo,
    linkBook: props?.props?.link_book,
    categoryId: "",
  });
  
  useEffect(()=> {
    setValueForm({
      bookId: props?.book_id,
      bookName: props?.book_name,
      bookQuantity: props?.book_quantity,
      bookRating: parseFloat(props?.book_rating).toFixed(1),
      bookDescription: props?.book_description,
      coverPhoto: props?.cover_photo,
      linkBook: props?.link_book,
      categoryId: "",
    })
    setPersonCategory(JSON.parse(props?.categories))
    setPersonAuthor(()=> props?.author_id)
  }, [props])

  const [errorForm, setErrorForm] = useState({
    bookId: "",
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
        <DialogTitle>{"Edit book"}</DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <TextField
              fullWidth
              placeholder={"Book's name"}
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
                  return <span>Thể loại</span>;
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
              <FormHelperText>Category</FormHelperText>
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
                  
                  <FormControlLabel checked={(item?.author_id === personAuthor) ? true : false } key={key} value={item?.author_id} control={<Radio />} label={item?.author_name} />
              ))}
              </RadioGroup>
            </Select>
            {personAuthor.length === 0 && (
              <FormHelperText>Choose an author</FormHelperText>
            )}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            color={"facebook"}
            onClick={async () => {
              if(image?.thumbUrl) {
                const resultImage= await upload_image(image?.thumbUrl)
                const result= await update_book(valueForm.bookId, valueForm.bookName, valueForm.bookQuantity, valueForm.bookRating, valueForm.bookDescription, resultImage, authorChoosen, valueForm.linkBook, personCategory, personAuthor )
                if(result?.update === true ) {
                  swal("Notice", "Update book successfully", "success")
                }
                else {
                  swal("", "Error", "error")
                }

              }
              else {
                const result= await update_book(valueForm.bookId,valueForm.bookName, valueForm.bookQuantity, valueForm.bookRating, valueForm.bookDescription, valueForm.coverPhoto, authorChoosen, valueForm.linkBook, personCategory, personAuthor )
                if(result?.update === true ) {
                  swal("Notice", "Update book successfully", "success")
                }
                else {
                  swal("", "Error", "error")
                }
              }
            }}
          >
            Save
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
