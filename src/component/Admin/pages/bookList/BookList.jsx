import "./bookList.css";
import { DeleteOutline } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import get_list_book from "../../../../api/book/get_list_book";
import delete_book from "../../../../api/book/delete_book";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import { Button } from "semantic-ui-react";
import swal from "sweetalert";
import NewBook from "../newBook/NewBook";
import Book from "../book/Book";
import { DataGrid } from "@material-ui/data-grid";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ProductList() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [bookId, setBookId] = useState();

  async function fetchData() {
    const res = await get_list_book();
    // const res = [];
    setData(res);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    // { field: "book_id", headerName: "ID", width: 90 },
    {
      field: "cover_image",
      headerName: "Cover image",
      width: 160,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img
              className="productListImg"
              src={params.row.cover_photo}
              alt=""
            />
            {/* {params.row.name} */}
          </div>
        );
      },
    },
    { field: "book_name", headerName: "Name", width: 200 },
    { field: "book_quantity", headerName: "Quantity", width: 120 },
    { field: "book_rating", headerName: "Rating", width: 120,
      renderCell: (params)=> {
        return parseFloat(params.row?.book_rating).toFixed(1)
      }
    },
    {
      field: "author_name",
      headerName: "Author",
      width: 180,
      renderCell: (params) => {
        return params.row.auths?.map((item, idx) => {
          return (
            <span key={"book-list-" + idx}>{item.author_name + ", "}</span>
          );
        });
        // return <>{/* <span>{params.row.auths}</span> */}</>;
      },
    },
    { field: "book_description", headerName: "Description", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            
            <Book props={params.row} bookId={params.row.book_id} fetchData={fetchData} />
            <DeleteOutline
              className="bookListDelete"
              onClick={() => {
                setBookId(params.row.book_id);
                setOpen(true);
              }}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <NewBook fetchData={fetchData} />
      <div style={{ marginBottom: 8 }}>List books</div>
      <div style={{height: 500}}>
        <DataGrid
          rows={data}
          columns={columns}
          disableSelectionOnClick
          pageSize={8}
          getRowId={(row) => row.book_id}
          getRowHeight={() => "auto"}
        />
      </div>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Are you want to delete this book?"}</DialogTitle>
        <DialogActions>
          <Button
            color={"facebook"}
            onClick={async () => {
              const result = await delete_book(bookId);
              if (result?.delete === true) {
                swal("Notice", "Deleted", "success").then(
                  () => {
                    fetchData();
                    handleClose();
                  }
                );
              } else {
                swal("Notice", "Error", "error");
              }
            }}
          >
            Delete
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
