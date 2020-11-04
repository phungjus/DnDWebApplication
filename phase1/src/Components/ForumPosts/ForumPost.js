import React, { useState } from 'react';
import "./ForumPost.css";
import Toggle from "../Toggle/Toggle.js";
import ForumComments from '../ForumComments/ForumComments';
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

}))


export default function ForumPost(props) {

    const [newComment, setNewComment] = useState("")

    function handleComment(username, comment, pid) {
        setNewComment("")
        props.handleNewComment(username, comment, pid)
    }

    return(

        <Grid 
        container 
        item 
        xs={12}
        direction="column"
        justify="flex-start"
        alignItems="stretch"
        >
            <Card variant="outlined">
                <CardContent style={{backgroundColor: '#464444'}}>
                    <Typography component="h4" className='postTitle'>{props.title}</Typography>
                    <Typography component="h4" className='postUser'>By: {props.username}</Typography>
                    <Typography component="p" className='postContent'>{props.postContent}</Typography>
                    <Toggle title="Show Comments">
                        <Grid item xs={12} component="div">
                            {
                                props.postComments.map((comments, i) => (
                                    <ForumComments username={comments.username} commentContent={comments.postComment} key={i}/>
                                ))
                            }
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                            id="postContent"
                            multiline
                            rows={6}
                            placeholder="Enter Comment"
                            variant="outlined"
                            fullWidth
                            value={newComment}
                            onChange={e => setNewComment(e.target.value)}
                            />
                            <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            onClick={() => handleComment(props.curUser, newComment, props.pid)}
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Toggle>
                    {
                        (props.curUser === props.username || props.curUser === 'admin') 
                        ?
                        <Button variant="contained" color="primary" onClick={() => props.handleDelete(props.pid)} component="div">
                            Delete
                        </Button>
                        :
                        <div></div>
                    }
                </CardContent>
            </Card>
        </Grid>

    )
}