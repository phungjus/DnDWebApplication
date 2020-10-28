import React from 'react';
import "./ForumPost.css";
import Toggle from "../Toggle/Toggle.js";

export default function ForumPost(props) {
    return(
        <div className="forumPost">
            <h4 className="postTitle">{props.title}</h4>
            <h4 className="postUser">by: {props.username}</h4>
            <p className="postContent">{props.postContent}</p>
            <Toggle title="Show Comments">
                Hello
            </Toggle>
        </div>
    )
}