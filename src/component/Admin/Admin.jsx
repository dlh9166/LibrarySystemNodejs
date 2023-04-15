import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import index from '../../api'
import Login from './Component/Login'
import IndexAdmin from './Index'

const Admin = () => {
    // eslint-disable-next-line
    const [admin, setAdmin]= useState()
    const [auth, setAuth]= useState()
    let loading= false
    useEffect(()=> {
        (async ()=> {
            // eslint-disable-next-line
            loading= true
            const result= await index()
            loading= false
            if(parseInt(result?.role)=== 3) {
                setAuth(()=> true)
            }
            else {
                setAuth(()=> false)
            }
            return setAdmin(result)
        })()
    }, [])
    if(loading=== false ) {

        return (
            <Routes>
                {   
                    auth=== true && 
                    <>
                        <Route path={"/*"} element={<IndexAdmin />}  />
                        <Route path={"/login"} element={<Navigate to={"/admin/"} />} />
                    </>
                }
                {
                    auth=== false && 
                    <>
                        <Route path={"/*"} element={<Navigate to={"/admin/login"} replace={true} />} />
                        <Route path={"/login"} element={<Login />} />
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

export default Admin