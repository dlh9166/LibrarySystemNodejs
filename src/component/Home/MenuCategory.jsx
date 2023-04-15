import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Typography } from 'antd';
import get_category from '../../api/get_category';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const { Title } = Typography;

export default function MenuCategory(props) {
  const navigate= useNavigate()
  const [data, setData]= React.useState([])
  
  React.useEffect(()=> {
    (async ()=> {
        const result= await get_category()
        return setData(result)
    })()
  }, [])
  const open = Boolean(props?.anchorEl);
  const handleClose = () => {
    props?.setAnchorEl(null);
  };

  return (
    <div> 
      <Menu
        id="basic-menu"
        anchorEl={props?.anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Title level={4} style={{padding: 10}}>Genres</Title>
        <Grid container>
            {
                data?.map((item, key)=> <Grid key={key} item xs={4}>
                    <MenuItem onClick={()=> {
                        handleClose()
                        navigate("/category/"+ item?.id)
                    }}>{item?.category_name}</MenuItem>
                </Grid>)
            }
        </Grid>
      </Menu>
    </div>
  );
}