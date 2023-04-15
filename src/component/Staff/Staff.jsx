import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import index from '../../api'
import LoginStaff from './Component/Login'
import IndexStaff from './Index'

const Staff = () => {
    // eslint-disable-next-line
    const [staff, setStaff]= useState()
    const [auth, setAuth]= useState()
    let loading= false
    useEffect(()=> {
        (async ()=> {
            // eslint-disable-next-line
            loading= true
            const result= await index()
            loading= false
            if(parseInt(result?.role)=== 2) {
                setAuth(()=> true)
            }
            else {
                setAuth(()=> false)
            }
            return setStaff(result)
        })()
    }, [])
    if(loading=== false ) {

        return (
            <Routes>
                {   
                    auth=== true && 
                    <>
                        <Route path={"/*"} element={<IndexStaff />}  />
                        <Route path={"/login"} element={<Navigate to={"/staff/"} />} />
                    </>
                }
                {
                    auth=== false && 
                    <>
                        <Route path={"/*"} element={<Navigate to={"/staff/login"} replace={true} />} />
                        <Route path={"/login"} element={<LoginStaff />} />
                    </>
                }
            </Routes>
      )
    }
    else {
        return (
            <>Loading...</>
        )
    }
}

export default Staff