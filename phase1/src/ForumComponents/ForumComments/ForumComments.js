import React from 'react';
import "./ForumComments.css";

export default function ForumComments(props) {
    return(
        <div className="postComment">
            <h4 className="postUser">by: {props.username}</h4>
            <p className="postContent">{props.commentContent}</p> 
        </div>
    )
}