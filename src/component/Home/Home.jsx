import React, { useEffect, useState } from 'react'
import Header from './Header'
import Slider from "react-slick";
// eslint-disable-next-line
import {AiFillStar } from "react-icons/ai"
import Category from './Category';
import get_release_book from '../../api/get_release_book';
// import { useNavigate } from 'react-router-dom';
import ComponentBook from '../ComponentBook/ComponentBook';
// import { AppContext } from '../../App';
// import Search from '../Search/Search';
import get_most_popular_book from '../../api/get_most_popular_book';
import Footer from '../Footer/Footer';

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    centerPadding: 10,
};
const Home = () => {

  const [searchOn, setSearchOn]= useState(()=> false)
//   const {isSeaching, searchResult }= useContext(AppContext)

  return (
    <div style={{width: "100%"}}>
        <Header searchOn={searchOn} setSearchOn={setSearchOn} />
        {/* {
            searchOn=== true && <div style={{padding: 20, width: "100%"}} className={"c-flex-center"}>
            
            </div>
        } */}
        {/* {
            isSeaching=== true && searchResult?.length > 0 &&  <Search />
        } */}
        {/* {
            isSeaching=== true && searchResult?.length <= 0 && <div style={{padding: 10, textAlign: "center", fontSize: 18, fontWeight: 600}}>Not found any results</div> 
        } */}
        <Category />
        <div style={{width: "100%", padding: 20}}>
            <NewRelease />
            <br /><br />
            <MostPopular />
        </div>
        <Footer />
    </div>
  )
}

const NewRelease= ()=> {

    const [data, setData]= useState(()=> [])
    useEffect(()=> {
        (async ()=> {
            const result= await get_release_book()
            return setData(()=> result)
        })()
    }, [])
    return (
        <div style={{width: "100%"}}>
            <Title title={"New Release"} />
            <div style={{width: "100%"}}>
                <Slider {...settings}>
                    {
                        data?.map((item, key)=> <ComponentBook {...item} key={item?.book_id} />)
                    }
                </Slider>
            </div>
        </div>
    )
}

const MostPopular= ()=> {
    
    const [data, setData]= useState(()=> [])
    useEffect(()=> {
        (async ()=> {
            const result= await get_most_popular_book()
            return setData(()=> result)
        })()
    }, [])
    return (
        <div style={{width: "100%"}}>
            <Title title={"Most popular"} />
            <div style={{width: "100%"}}>
                <Slider {...settings}>
                    {
                        data?.map((item, key)=> <ComponentBook {...item} key={item?.book_id} />)
                    }
                </Slider>
            </div>
        </div>
    )
}

const Title= (props)=> {
    return (
        <div style={{fontSize: 20, fontWeight: 600, margin: "16px 0"}}>
            {props?.title}
        </div>
    )
}

export default Home