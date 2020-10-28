import React from 'react';
import "./ForumPost.css";
import Toggle from "../Toggle/Toggle.js";
import ForumComments from '../ForumComments/ForumComments';


export default function ForumPost(props) {

    return(
        <div className="forumPost">
            <h4 className="postTitle">{props.title}</h4>
            <h4 className="postUser">by: {props.username}</h4>
            <p className="postContent">{props.postContent}</p>
            <Toggle title="Show Comments">
                {
                    props.postComments.map((comments) => (
                        <ForumComments username={comments.username} commentContent={comments.postComment} />
                    ))
                }
            </Toggle>
        </div>
    )
}