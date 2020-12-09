import React, { useCallback, useState, useEffect } from 'react';
import ForumGroups from '../ForumGroups/ForumGroups.js';
import ForumPost from '../ForumPosts/ForumPost.js';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input'
import "./Forum.css";
import { Card, CardContent, Paper } from '@material-ui/core';
import { getPosts, addPosts, deletePosts } from "../../Actions/Forum"
import { addComments, deleteComments } from  "../../Actions/Comments"
import { getGroups } from '../../Actions/Group'

//TODO:
//1. When a user makes a group shouldn't they by default be a member of that group?
//2. When hovering over links on the nav bar the color changes to blend in with the background


//Steps to start everything up:
//1. mongod --dbpath mongo-data (load database)
//2. node server.js (load server)
//3. npm start (load front-end)

const useStyles = makeStyles((theme) => ({

    latestPost: {
        fontSize: '20px',
        fontWeight: 'bold',
        color: 'var(--textColour)',

    },

    forumPostBody : {
        marginTop: '20px',
    },

    Button : {
        color: 'var(--textColour)',
        backgroundColor: 'var(--buttonColour)',
        '&:hover': { backgroundColor: 'var(--buttonColour)' }
    },

    multiline : {
        color: 'var(--textColour)'
    },

    cardContent : {
        backgroundColor: 'var(--backgroundColourSecondary)'
    }
}))

export default function Forum(props) {

    const classes = useStyles()
    const user = props.user
    const [title, setTitle] = useState('')
    const [postContent, setPostContent] = useState('')

    const [forumPosts, setForumPosts] = useState([])
    const [userGroups, setUserGroups] = useState([])
    const [showPost, setShowPost] = useState(false)
    
    useEffect(() => {
        getPosts(setForumPosts)
        getGroups(user._id, setUserGroups)
    }, [user._id])

    function handleSubmit(e) {
        
        e.preventDefault();
        const newDate = new Date()
        const postDate = newDate.toLocaleDateString('en-US')
        const postTime = newDate.toLocaleTimeString('en-US')
        const dateTime = postTime + " " + postDate
        const newPost = {title: title, post: postContent, postComments: [], userPosted: user._id, dateTime: dateTime}
        addPosts(newPost, setForumPosts, forumPosts)
        setTitle('')
        setPostContent('')
        setShowPost(false)
    }

    const handleNewComment = useCallback((user, postComment, postPID, time) => {

        const newComment = {comment: postComment, pid: postPID, dateTime: time, curUser: user}
        addComments(newComment, setForumPosts)

    }, [])
    
    const handleDelete = useCallback(pid => {
        
        const pidObj = {pid: pid}
        deletePosts(pidObj, setForumPosts)

    }, [])

    const handleDeleteComment = useCallback((pid, cid) => {
        
        const commentObj = {pid: pid, cid: cid}
        deleteComments(commentObj, setForumPosts)

    }, [])


    return (
        <div className="mainForum">
            <Grid 
            container 
            spacing={2}
            direction="row"
            alignItems="flex-start"
            justify="center"
            >
                <Grid container item xs={3}>
                    <ForumGroups userGroups={userGroups}/>
                </Grid>
                <Grid item container xs={8} className={classes.forumPostBody} spacing={2} direction="row">
                    <Grid container item xs={12} alignItems="center" justify="space-between">
                        <Grid><Typography className={classes.latestPost} align="center" component="h1">Forum Posts</Typography></Grid>
                        <Grid><Button className={classes.Button} variant="contained" onClick={() => setShowPost(!showPost)}>New Post</Button></Grid>
                    </Grid>
                    {showPost ?
                
                        <Grid 
                        item 
                        xs={12} 
                        component='div'
                        // justify="center"
                        // alignItems="flex-start"
                        >
                            <Card variant="outlined">
                                <CardContent className={classes.cardContent}>
                                    <form id="newPost" onSubmit={e => handleSubmit(e)}>
                                        <Input
                                        name="postTitle"
                                        variant="outline"
                                        fullWidth
                                        inputProps={{className: classes.multiline}}
                                        id="postTitle"
                                        autoFocus
                                        placeholder="Enter Post Title"
                                        value={title}
                                        onChange={e => setTitle(e.target.value)}
                                        />
                                        <TextField 
                                        id="postContent"
                                        multiline
                                        inputProps={{className: classes.multiline}}
                                        rows={6}
                                        placeholder="Enter Post's Content"
                                        variant="outlined"
                                        fullWidth
                                        value={postContent}
                                        onChange={e => setPostContent(e.target.value)}
                                        />
                                        <Grid container item xs={12} alignItems="center" justify="space-between">
                                            <Grid>
                                                <Button
                                                type="submit"
                                                variant="contained"
                                                className={classes.Button}
                                                >
                                                    Submit
                                                </Button>
                                            </Grid>
                                            <Grid>
                                                <Button
                                                variant="contained"
                                                className={classes.Button}
                                                onClick={() => setShowPost(!showPost)}>
                                                    Cancel
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </form>
                                </CardContent>
                            </Card>
                        </Grid>
                        : 
                        <div></div>
                    }

                    {
                        forumPosts.map((posts) => (
                            
                            <Grid 
                            item 
                            container
                            xs={12} 
                            alignItems="center"
                            justify="flex-start"
                            direction="column"
                            key={posts._id.toString()}
                            >
                                <ForumPost
                                    title={posts.title} 
                                    username={posts.userPosted.username} 
                                    postContent={posts.post} 
                                    postComments={posts.postComments} 
                                    pid={posts._id.toString()} 
                                    handleDelete={handleDelete}
                                    handleNewComment={handleNewComment}
                                    handleDeleteComment={handleDeleteComment}
                                    curUser={user}
                                    dateTime={posts.dateTime}
                                />
                            </Grid>

                        ))
                    }

                </Grid>
                <Grid item xs={1}>
                    <Paper></Paper>
                </Grid>
            </Grid>

        </div>
    )

}