import { DataGrid } from "@material-ui/data-grid";
// import { DeleteOutline } from '@mui/icons-material';
import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom';
import get_category from '../../../../api/get_category';
import AddCategoryComponent from "./AddCategoryComponent";
import DeleteCategory from "./DeleteCategory";
import UpdateCategory from "./UpdateCategory";

const Category = () => {
    const [data, setData] = useState([]);
    const [change, setChange]= useState(false)

    useEffect(() => {
        (async () => {
            const result = await get_category()
            return setData(result)
        })()
    }, [change])

    const columns = [
        { field: "id", headerName: "ID", width: 150 },
        {
            field: "category_name",
            headerName: " name",
            width: 200,
        },
        {
            field: "category_description",
            headerName: "Category description",
            width: 400,
        },
        {
            field: "action",
            headerName: "Action",
            width: 300,
            renderCell: (params) => {
                return (
                    <div style={{gap: 10, display: "flex", alignItems: "center"}}>
                        <UpdateCategory id={params.row.id} setChange={setChange} />
                        <DeleteCategory id={params.row.id} setChange={setChange} />
                    </div>
                );
            },
        },
    ];
    return (
        <div className="userList">
            <AddCategoryComponent setChange={setChange} />
            <div style={{marginBottom: 8}}>Danh sách danh mục</div>
            <div style={{height: "500px"}}>

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

        </div>
    )
}

export default Category