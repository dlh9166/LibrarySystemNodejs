import React, { useState } from 'react'
import { useEffect } from 'react'
import get_rating_book from '../../api/get_rating_book'
import { useParams } from 'react-router-dom'
import _ from "lodash"
import { Rating } from '@mui/material'
import ProgressBar from "@ramonak/react-progress-bar";

const RatingComponent = (props) => {
  const [data, setData]= useState([])
  const scoreBand= [1, 2 ,3 ,4 ,5]
  const {book_id }= useParams()
  useEffect(()=> {
    (async ()=> {
        const result= await get_rating_book(book_id)
        return setData(result)
    })()
  }, [book_id])
  return (
    <>
        <div style={{display: "flex", alignItems: "center", gap :10}}>
            <Rating readOnly size={"large"} name="half-rating" value={_.meanBy(data, e=> parseFloat(e.score)).toFixed(1) || 0} precision={0.1} />
            <span style={{fontSize: 24, fontWeight: 600, color: "#00000080"}}>{typeof _.meanBy(data, e=> parseFloat(e.score))=== "number" ? _.meanBy(data, e=> parseFloat(e.score)).toFixed(1) : 0}</span>
            <div style={{fontSize: 20}}>({data?.length} rating)</div>
            
        </div>
        <br />
        <>
            {
                props?.expand=== true && <>
                    {
                        scoreBand?.map((item, key)=> <div style={{marginBottom: 12, width: "70%", display: 'flex', alignItems: 'center', gap: 10}} key={key}>
                            <div className={"c-flex-center"}>{item} <Rating max={1} value={1} disabled size={"large"}/></div>
                            <div style={{flex: "1 1 0"}}>
                                <ProgressBar completed={Math.floor(_.meanBy(data?.filter(item2=> parseInt(item2?.score)=== parseInt(item)), e=> parseFloat(e.score)) / _.meanBy(data, e=> parseFloat(e.score)) * 100) || 0} customLabel={(Math.floor(_.meanBy(data?.filter(item2=> parseInt(item2?.score)=== parseInt(item)), e=> parseFloat(e.score)) / _.meanBy(data, e=> parseFloat(e.score)) * 100) || 0) + "%"} />
                            </div>
                            <div>{data?.filter(item2=> Math.floor(parseInt(item2?.score))=== parseInt(item))?.length || 0} rating</div>
                        </div>)
                    }
                </>
            }
        </>
    </>
  )
}

export default RatingComponent