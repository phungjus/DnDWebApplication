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
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    box: {
        left: '0',
        maxWidth: '75px',
        maxHeight: '40px',
        minWidth: '75px',
        minHeight: '40px',
    },

    comment : {
        marginBottom: '10px'
    },

    Button : {
        color: '#0b0200',
        backgroundColor: '#b95c0d',
        '&:hover': { backgroundColor: '#b95c0d' },
    }
}))


export default function ForumPost(props) {

    const classes = useStyles()

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
                    <Typography component="h4" className='postTitle' align="left">{props.title}</Typography>
                    <Typography component="h4" className='postUser' align="left">By: {props.username}</Typography>
                    <Typography component="p" className='postContent' align="left">{props.postContent}</Typography>
                    <Toggle title="Show Comments">
                        <Grid item xs={12} component="div">
                            {
                                props.postComments.map((comments, i) => (
                                    <ForumComments username={comments.username} commentContent={comments.postComment} key={i}/>
                                ))
                            }
                        </Grid>
                        <Grid item xs={12} className={classes.comment}>
                            <Card variant="outlined">
                                <CardContent style={{backgroundColor: '#464444'}}>
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
                                    className={classes.Button}
                                    fullWidth
                                    onClick={() => handleComment(props.curUser, newComment, props.pid)}
                                    >
                                        Submit
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Toggle>
                    {
                        (props.curUser === props.username || props.curUser === 'admin') 
                        ?
                        <Box component="div" className={classes.box}>
                            <Button variant="contained" className={classes.Button} onClick={() => props.handleDelete(props.pid)} fullWidth>
                                Delete
                            </Button>
                        </Box>
                        :
                        <div></div>
                    }
                </CardContent>
            </Card>
        </Grid>

    )
}