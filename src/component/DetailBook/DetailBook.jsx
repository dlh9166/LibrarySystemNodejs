import { Divider, Grid } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import get_detail_book from '../../api/get_detail_book'
import CommentComponent from '../Comment/Comment'
import Header from '../Home/Header'
import AddToCart from './AddToCart'
import Rating from '@mui/material/Rating';
import Loading from '../Loading/Loading'
import ErrorFallback from '../Error/Error'
import ShowMoreText from "react-show-more-text";
import RatingComponent from './RatingComponent'
import ComnunityReview from './ComnunityReview'

const DetailBook = () => {
  const [amount, setAmount]= useState(()=> 1)
  const [searchOn, setSearchOn]= useState(()=> false)
  const [data, setData]= useState({})
  const [categories, setCategories]= useState([])
  const [loading, setLoading]= useState(true)
  const [error, setError]= useState()
  const {book_id }= useParams()
  useEffect(()=> {
    (async ()=> {
        try {
            const result= await get_detail_book(book_id)
            setCategories(JSON.parse(result?.categories)?.filter(obj => Object.values(obj).every(val => val !== null)))
            return setData(result)
            
        } catch (error) {
            setError(error)
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    })()
  }, [book_id])
  if(loading=== true) {
    return <Loading />
  }
  if(error) {
    return <ErrorFallback error={error} />
  }
  return (
    <>
        <Header searchOn={searchOn} setSearchOn={setSearchOn} />
        {
            searchOn=== true && <div style={{padding: 20, width: "100%"}} className={"c-flex-center"}>
            
            </div>
        }
        <>

        </>
        <div className={"c-flex-center"} style={{width: "100%", marginTop: 12}}>
            <div style={{width: "100%", maxWidth: 1200, display: "flex", gap: 20, padding: 5}}>
                <div className={"x-2-a"} style={{width: 350}}>
                    <img style={{width: "100%", aspectRatio: 2 / 3, borderRadius: 10}} src={data?.cover_photo} alt="" />
                </div>
                <div style={{flex: "1 1 0"}}>
                    <div style={{fontWeight: 600, fontSize: 32, marginBottom: 20, lineHeight: 1.8}}>{data?.book_name}</div>
                    <div style={{margin: "4px 0", display: "flex", alignItems: "center"}}>
                        <span style={{fontSize: 20}}>Author: </span>
                        <span style={{fontSize: 24, fontWeight: 600}}>{data?.author_name}</span>
                    </div>
                    <br />
                    <div style={{display: "flex", alignItems: "center", gap: 10}}>
                        <RatingComponent />
                        {/* <Rating readOnly size={"large"} name="half-rating" value={parseFloat(data?.book_rating)} precision={0.1} /> */}
                        {/* <span style={{fontSize: 24, fontWeight: 600, color: "#00000080"}}>{parseFloat(data?.book_rating).toFixed(1)}</span> */}
                    </div>
                    <br />
                    <div style={{margin: "4px 0"}}>
                        <span style={{fontSize: 18, marginBottom: 10}}>Description: </span>
                    </div>
                    <ShowMoreText
                        lines={5}
                        anchorClass="show-more-less-clickable"
                        more="Show more"
                        less="Show less"
                        width={"100%"}
                        truncatedEndingComponent={"... "}
                        expanded={false}
                    >
                        <div style={{maxWidth: "70%"}}>
                            {
                                data?.book_description?.split("\n")?.map((item, key)=> <Fragment key={key}>
                                    <div >
                                        <div style={{margin: "6px 0", fontSize: 20, marginBottom: 16}}>
                                            {item}
                                        </div>
                                    </div>
                                </Fragment>)
                            }
                        </div>
                    </ShowMoreText>
                    {
                        data?.link_book?.length > 0 && <div>
                            Link book <a rel="noreferrer" href={data?.link_book} target={"_blank"} style={{color: "#2e89ff", fontWeight: 600}}>here</a>
                        </div>
                    }
                    <br />
                    <Divider />
                    <br />
                    {
                        categories?.length > 0 && 
                        <Grid container>
                            <Grid item xs={2} padding={1} margin={1}>
                                <div className={"c-flex-center"} style={{fontSize: 18}}>Genre: </div>
                            </Grid>
                            {
                                categories?.map((item, key)=> <Grid margin={1} key={key} item xs={2} padding={1} style={{borderRadius: 80, color: "#fff", background: "#2e89ff", fontSize: 18, display: "flex", justifyContent: "center", alignItems: "center"}}>
                                    <Link style={{color: "unset", textDecoration: "none"}} to={"/category/"+ item?.category_id}>
                                        {item?.category_name}
                                    </Link>
                                </Grid>)
                            }
                        </Grid>
                    }
                    <AddToCart amount={amount} setAmount={setAmount} {...data} />
                    <div ></div>
                    <br />
                    <ComnunityReview />
                    <div></div>
                    <br />
                    <Divider />
                    <br />
                    <div style={{width: "100%", padding: 5}}>
                        <CommentComponent />
                    </div>
                </div>
            </div>
        </div>
        
    </>
  )
}

export default DetailBook