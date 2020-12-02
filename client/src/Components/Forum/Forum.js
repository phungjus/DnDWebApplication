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

//TODO:
//1. Implement correct User key for Posts object and Comment object (i.e. newPost and newComment require a user object right now they don't)
//2. Update Schema to require User for each Post and Comment
//3. Add backend calls to the Group portion of the database


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
    // const username = props.user
    const [title, setTitle] = useState('')
    const [postContent, setPostContent] = useState('')

    // the variable forumPosts would require a server call to to get all the posts that have been made to the
    // Forum, but here they are hard-coded for Phase 1
    // const [forumPosts, setForumPosts] = useState([
    //     {username: 'DragonRider12', title: 'Introduction Post', postContent: "Hi everybody I am currently looking for a game to join. I have experience playing Dungeon's and Dragon's so I can hope right in. Hope to hear from you guys soon!",
    //     comments: [{username: 'OrcMan52', postComment: "Hey I am willing to join your game", date: time, cid: 0}, {username: 'DragonRider12', postComment: "Neat let me send you a private message", date: time}], pid: 0, date: time, cid: 1},
    //     {username: 'OrcMan52', title: 'Looking for Game', postContent: "Hi everybody I am currently looking for a game to join. I have experience playing Dungeon's and Dragon's so I can hope right in. Hope to hear from you guys soon!",
    //     comments: [{username: 'DnDMaster', postComment:'Hey we are starting a new game right now still wanna join?', date: time, cid: 2}], pid: 1, date: time}
    // ])

    const [forumPosts, setForumPosts] = useState([])

    const [showPost, setShowPost] = useState(false)
    
    useEffect(() => {
        getPosts(setForumPosts)
    }, [])

    function handleSubmit(e) {
        
        e.preventDefault();
        const newDate = new Date()
        const postDate = newDate.toLocaleDateString('en-US')
        const postTime = newDate.toLocaleTimeString('en-US')
        const dateTime = postTime + " " + postDate
        const newPost = {title: title, post: postContent, postComments: [], userPosted: username, dateTime: dateTime}
        addPosts(newPost, setForumPosts, forumPosts)
        setTitle('')
        setPostContent('')
        setShowPost(false)
    }

    const handleNewComment = useCallback((username, postComment, postPID, time) => {

        const newComment = {comment: postComment, pid: postPID, dateTime: time}
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
                    <ForumGroups />
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
                                    //username={posts.userPosted.toString()} 
                                    postContent={posts.post} 
                                    postComments={posts.postComments} 
                                    pid={posts._id.toString()} 
                                    handleDelete={handleDelete}
                                    handleNewComment={handleNewComment}
                                    handleDeleteComment={handleDeleteComment}
                                    curUser={username}
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