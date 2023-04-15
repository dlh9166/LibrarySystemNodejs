import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
// import { userRows } from "../../dummyData";
import { useEffect, useState } from "react";
import get_list_user from "../../../../api/admin/get_list_user";
import UpdateUser from "./updateUser";
import swal from "sweetalert";
import delete_user from "../../../../api/admin/delete_user";

export default function UserList() {
  const [data, setData] = useState([]);
  const [change, setChange]= useState(false)
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  useEffect(()=> {
    (async()=> {
      const result= await get_list_user()
      return setData(result)
    })()
  }, [change])
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Username",
      width: 200,
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "phone",
      headerName: "Phone",
      width: 120,
    },
    {
      field: "address",
      headerName: "Address",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <UpdateUser {...params.row} setChange={setChange} />
            <DeleteOutline
              className="userListDelete"
              onClick={() => {
                swal("Notice", "Are you sure want to delete this user ?", {buttons: {
                  delete: "Delete",
                  cancel: "Cancel"
                }})
                .then(async value=> {
                  if(value=== "delete") {
                    await delete_user(params.row?.id)
                    handleDelete(params.row.id)
                  } 
                  else {
                    return null
                  }
                })
                
              }}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList" style={{height: "500px"}}>
      
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        checkboxSelection
        pageSize={5}
        pagination={true}
        paginationMode="client"
      />
    </div>
  );
}
