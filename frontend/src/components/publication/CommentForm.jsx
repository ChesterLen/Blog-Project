import React from "react"
import { Form } from "react-router"

export default function CommentForm(props) {
    return (
        <Form id={props.id}>
            <input type="text" name="comment" id="comment" />
            <button>Comment</button>            
        </Form>
    )
}