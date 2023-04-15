import React from 'react'
import Rating from '@mui/material/Rating';
import { useState } from 'react';
import { Button } from 'antd';
import post_rating from '../../api/post_rating';
import swal from 'sweetalert';

const RatingComponent = (props) => {
  const [score, setScore]= useState(props?.score || 1)
    
  return (
    <div style={{margin: "12px 0", }}>
      {
        !props?.book_id_rating && 
        <>
        <div style={{margin: "8px 0"}}>Rating for this book: </div>
        <Rating name="half-rating" value={score} onChange={(e, value)=> setScore(value)} precision={0.5} size={"large"} />
        <br />
        <Button onClick={async ()=> {
          const result= await post_rating(score, props?.book_id)
          if(result?.add=== true ) {
            props?.setChange(prev=> !prev)

          }
          else {
            swal("Notice", "Error", "error")
          }
        }} type={"primary"}>Submit</Button>
        </>
      }
      {
        props?.book_id_rating && <>
        <Rating disabled={true} name="half-rating" value={score} onChange={(e, value)=> setScore(value)} precision={0.5} size={"large"} />
        <br />
        <div style={{margin: "8px 0"}}>You rated this book</div>
        
        </>
      }
    </div>
  )
}

export default RatingComponent