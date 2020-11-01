import React, { useState } from 'react';
import "./ForumPost.css";
import Toggle from "../Toggle/Toggle.js";
import ForumComments from '../ForumComments/ForumComments';


export default function ForumPost(props) {

    const [newComment, setNewComment] = useState("")

    function handleComment(username, comment, pid) {
        setNewComment("")
        props.handleNewComment(username, comment, pid)
    }

    return(
        <div className="forumPost">
            <h4 className="postTitle">{props.title}</h4>
            <h4 className="postUser">by: {props.username}</h4>
            <p className="postContent">{props.postContent}</p>
            <Toggle title="Show Comments">
                <div>
                    {
                        props.postComments.map((comments, i) => (
                            <ForumComments username={comments.username} commentContent={comments.postComment} key={i}/>
                        ))

                        
                    }
                    <label htmlFor="newComment">Enter Comment: </label>
                    <textarea form="newCommentForm" name="newCommentForm" rows="6" cols="80" value={newComment} onChange={e => setNewComment(e.target.value)} />
                    <button onClick={() => handleComment(props.curUser, newComment, props.pid)}>Submit</button>

                </div>
            </Toggle>

            {(props.curUser === props.username || props.curUser === 'admin') ? 
            <button onClick={() => props.handleDelete(props.pid)} id="deleteButton">Delete Post</button>
            :
            <div></div>
            }

        </div>
    )
}