import Cookies from 'js-cookie'
import moment from 'moment/moment'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Comment, Form, Header } from 'semantic-ui-react'
import swal from 'sweetalert'
import { v4 } from 'uuid'
import addComment from '../../api/add_comment'
import getComment from '../../api/get_comment'
import { AppContext } from '../../App'

const CommentComponent = () => {
    const [content, setContent]= useState("")
    const {book_id }= useParams()
    const [comment, setComment]= useState()
    const {user }= useContext(AppContext)
    useEffect(()=> {
        (async ()=> {
            const result= await getComment(book_id)
            setComment(result.reverse())

        })()
    }, [book_id])
    return (
        <Comment.Group className={"comment-container"}>
            <Header as='h2' dividing>
                Comments
            </Header>
            {
                comment?.length <= 0 && <div style={{padding: 20, textAlign: "center", fontWeight: 600, fontSize: 18}}>
                    No more comment. Let's become to first person comment
                </div>
            }
            {
                comment?.length >0 && comment?.map((item, key)=> <Comment key={key}>
                <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
                <Comment.Content>
                    <Comment.Author as='a'>{item?.user_name}</Comment.Author>
                    <Comment.Metadata>
                        <div>{moment(item?.time_created).format("DD/MM/YYYY HH:mm")}</div>
                    </Comment.Metadata>
                    <Comment.Text>{item?.content}</Comment.Text>
                </Comment.Content>
            </Comment>)
            }
            <Form reply>
                <Form.TextArea value={content} onChange={(e)=> setContent(e.target.value)} placeholder={"Write a comment"} />
                <Button onClick={async ()=> {
                    if(content.trim().length <= 0) {
                        swal("Thông báo", "Bạn hãy nhập comment")
                    }
                    else {
                        const comment_id= v4()
                        const user_id= Cookies.get("uid")
                        const time_created= new Date()
                        const result= await addComment(comment_id, book_id, user_id, content, time_created)
                        if(result?.add === true) {
                            setComment(prev=> ([{comment_id, book_id, user_id, content, time_created, user_name: user?.user_name}, ...prev]))
                        }
                        else {
                            swal("Thông báo", "Error", "error")
                        }
                    }
                    setContent("")
                }} content='Comment' labelPosition='left' icon='edit' primary />
            </Form>
        </Comment.Group>
    )
}

export default CommentComponent