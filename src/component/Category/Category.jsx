import { Box, Divider, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import get_list_book_by_category from '../../api/category/get_list_book_by_category'
import ComponentBook from '../ComponentBook/ComponentBook'
import Header from '../Home/Header'
import Breadcrumb from '../BreadCrumb/BreadCrumb'
import get_detail_category from '../../api/get_detail_category'

const Category = () => {
  const {category_id }= useParams()
  const [data, setData]= useState([])
  const [dataCategory, setDataCategory]= useState()
  useEffect(()=> {
    (async ()=> {
        const result= await get_list_book_by_category(category_id)
        return setData(result)
    })()
    
  }, [category_id])
  useEffect(()=> {
    (async ()=> {
      const result= await get_detail_category(category_id)
      return setDataCategory(result?.[0])
  })()
  }, [category_id])

  return (
    <>
        <Header searchOn={false} />
        <Box sx={{width: "100%", padding: 1.25}}>
          <Breadcrumb />
            <div style={{margin: "12px 0", fontWeight: 600, fontSize: 18}}>{dataCategory?.category_name}</div>
            <div style={{margin: "8px 0", fontSize: 16}}>{dataCategory?.category_description?.split("\n")?.map((item, key)=> <div style={{margin: "8px 0"}} key={key}>{item}</div>)}</div>
            <div style={{margin: "12px 0", fontWeight: 600, fontSize: 18, textTransform: "uppercase"}}>MOST READ THIS WEEK TAGGED "{dataCategory?.category_name}"</div>
            <Divider />
            <Grid container padding={2.5} spacing={2}>
                {
                    data?.map((item, key)=> <Grid xs={3} item key={key}>
                        <ComponentBook width={"100%"} {...item} />
                    </Grid>)
                }
            </Grid>
        </Box>
    </>
  )
}

export default Category