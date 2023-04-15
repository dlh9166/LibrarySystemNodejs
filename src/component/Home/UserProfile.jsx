import React, { useState } from 'react'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import {FaUserAlt } from "react-icons/fa"
import {AiOutlineClose } from "react-icons/ai"
import { Form, Input } from 'antd';
import update_user from '../../api/update_user';
import swal from 'sweetalert';
import Cookies from 'js-cookie';

const UserProfile = (props) => {
  const [update, setUpdate]= useState(false)
  const [userName, setUserName]= useState(props?.user_name)
  const [phoneNumber, setPhoneNumber]= useState(props?.user_phone)
  const [address, setAddress]= useState(props?.user_address)

  return (
    <Popup
        trigger={<div className={"c-flex-center"} style={{cursor: "pointer"}}>
                    <FaUserAlt size={20} />
                </div>}
        modal
        nested
    >
        {close => (
        <div className="modal" style={{borderRadius: 10}}>
            <div onClick={()=> {close();setUpdate(false)}} className={""} style={{cursor: "pointer", width: "100%", direction: "rtl"}}>
                    <AiOutlineClose size={20} />
                </div>
            <div className="header" style={{textAlign: "center", fontWeight: 600, fontSize: 24}}> Information user </div>
            {update=== false && 
                <div className="content">
                    <div style={{display: "flex", alignItems: "center", fontSize: 18, margin: "12px 0", padding: "10px"}}>
                        <div style={{width: 130}}>User name: </div>
                        <div>{props?.user_name}</div>
                    </div>
                    <div style={{display: "flex", alignItems: "center", fontSize: 18, margin: "12px 0", padding: "10px"}}>
                        <div style={{width: 130}}>Email: </div>
                        <div>{props?.user_email}</div>
                    </div>
                    <div style={{display: "flex", alignItems: "center", fontSize: 18, margin: "12px 0", padding: "10px"}}>
                        <div style={{width: 130}}>Phone number: </div>
                        <div>{props?.user_phone}</div>
                    </div>
                    <div style={{display: "flex", alignItems: "center", fontSize: 18, margin: "12px 0", padding: "10px"}}>
                        <div style={{width: 130}}>Address: </div>
                        <div>{props?.user_address}</div>
                    </div>
                </div>
            }
            {
                update=== true && <>
                {
                    <Form>
                        <Form.Item

                            label={<p style={{fontSize:"18px"}}>Username</p> }
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                            >
                                <Input value={userName} onChange={(e)=> setUserName(e.target.value)} placeholder={userName} />
                        </Form.Item>
                        <Form.Item

                            label={<p style={{fontSize:"18px"}}>Phone number</p> }
                            name="phonenumber"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your phone number!',
                                },
                            ]}
                            >
                                <Input value={phoneNumber} onChange={(e)=> setPhoneNumber(e.target.value)} placeholder={phoneNumber}  />
                        </Form.Item>
                        <Form.Item

                            label={<p style={{fontSize:"18px"}}>Address</p> }
                            name="address"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your address!',
                                },
                            ]}
                            >
                                <Input value={address} onChange={(e)=> setAddress(e.target.value)} placeholder={address} />
                        </Form.Item>
                    </Form> 
                    
                }
                </>
            }
            <div className="actions" style={{direction: "rtl", display: "flex", gap: 16}}>
             <button
                    style={{padding: "10px 30px", borderRadius: 80, background: "#555", border: "none", outline: "none", color: "#fff", fontSize: 16, fontWeight: 600}}
                    className="button"
                    onClick={() => {
                        Cookies.remove("uid")
                        Cookies.remove("accessToken")
                        window.location.reload()
                    }}
                >
                    Logout
                </button>
                <button
                    style={{padding: "10px 30px", borderRadius: 80, background: "#555", border: "none", outline: "none", color: "#fff", fontSize: 16, fontWeight: 600}}
                    className="button"
                    onClick={() => {
                        setUpdate(()=> false)
                        close();
                    }}
                >
                    Close
                </button>
                {
                    update=== false && 
                    <button
                        style={{padding: "10px 30px", borderRadius: 80, background: "#2e89ff", border: "none", outline: "none", color: "#fff", fontSize: 16, fontWeight: 600}}
                        className="button"
                        onClick={() => {
                            setUpdate(()=> true)
                        }}
                    >
                        Update
                    </button>
                }
                {
                    update=== true && 
                    <button
                        style={{padding: "10px 30px", borderRadius: 80, background: "#2e89ff", border: "none", outline: "none", color: "#fff", fontSize: 16, fontWeight: 600}}
                        className="button"
                        onClick={async () => {
                            const result= await update_user(userName, phoneNumber, address)
                            if(result?.update_user=== true) {
                                swal("Thông báo", "Cập nhật thông tin thành công", "success")
                                .then(()=> window.location.reload())
                            }
                            else {
                                swal("Thông báo", "Lỗi", "error")

                            }
                        }}
                    >
                        Confirm
                    </button>
                }
            </div>
        </div>
        )}
    </Popup>
  )
}

export default UserProfile