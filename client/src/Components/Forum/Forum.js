import React, { useCallback, useState } from 'react';
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
    const username = props.user
    const [title, setTitle] = useState('')
    const [postContent, setPostContent] = useState('')

    const date = new Date()
    const localDate = date.toLocaleDateString('en-US')
    const localTime = date.toLocaleTimeString('en-US')
    const time = localTime + " " + localDate

    // the variable forumPosts would require a server call to to get all the posts that have been made to the
    // Forum, but here they are hard-coded for Phase 1
    const [forumPosts, setForumPosts] = useState([
        {username: 'DragonRider12', title: 'Introduction Post', postContent: "Hi everybody I am currently looking for a game to join. I have experience playing Dungeon's and Dragon's so I can hope right in. Hope to hear from you guys soon!",
        comments: [{username: 'OrcMan52', postComment: "Hey I am willing to join your game", date: time, cid: 0}, {username: 'DragonRider12', postComment: "Neat let me send you a private message", date: time}], pid: 0, date: time, cid: 1},
        {username: 'OrcMan52', title: 'Looking for Game', postContent: "Hi everybody I am currently looking for a game to join. I have experience playing Dungeon's and Dragon's so I can hope right in. Hope to hear from you guys soon!",
        comments: [{username: 'DnDMaster', postComment:'Hey we are starting a new game right now still wanna join?', date: time, cid: 2}], pid: 1, date: time}
    ])

    const [showPost, setShowPost] = useState(false)
    const [pid, setPID] = useState(2)
    const [cid, setCID] = useState(3)
    
    function handleSubmit(e) {
        
        e.preventDefault();
        const newDate = new Date()
        const postDate = newDate.toLocaleDateString('en-US')
        const postTime = newDate.toLocaleTimeString('en-US')
        const dateTime = postTime + " " + postDate
        const newPostInfo = { username: username, title: title, postContent: postContent, comments: [], pid: pid, date: dateTime }
        setForumPosts((forumPosts) => ([newPostInfo, ...forumPosts]))
        setTitle('')
        setPostContent('')
        setShowPost(false)
        setPID(pid + 1)
    }

    const handleNewComment = useCallback((username, postComment, postPID, date) => {
        const shallowCopy = forumPosts.slice()
        const prevPost = shallowCopy.filter(posts => posts.pid === postPID)
        const newComment = {username: username, postComment: postComment, date: date, cid: cid}
        prevPost[0].comments.push(newComment)
        setCID(cid + 1)
        setForumPosts(shallowCopy)
    }, [forumPosts, cid])
    
    const handleDelete = useCallback(pid => {
        const updatedList = forumPosts.filter(posts => posts.pid !== pid)
        setForumPosts(updatedList)
    }, [forumPosts])

    const handleDeleteComment = useCallback((pid, cid) => {
        const shallowCopy = forumPosts.slice()
        const indexOfComment = shallowCopy.filter(posts => posts.pid === pid)[0].comments.findIndex(comment => comment.cid === cid)
        shallowCopy.find(posts => posts.pid === pid).comments.splice(indexOfComment, 1)
        setForumPosts(shallowCopy)
    }, [forumPosts])

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
                        justify="center"
                        alignItems="flex-start"
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
                        forumPosts.map((posts, i) => (
                            
                            <Grid 
                            item 
                            container
                            xs={12} 
                            alignItems="center"
                            justify="flex-start"
                            direction="column"
                            >
                                <ForumPost
                                    key={i} 
                                    title={posts.title} 
                                    username={posts.username} 
                                    postContent={posts.postContent} 
                                    postComments={posts.comments} 
                                    pid={posts.pid} 
                                    handleDelete={handleDelete}
                                    handleNewComment={handleNewComment}
                                    handleDeleteComment={handleDeleteComment}
                                    curUser={username}
                                    dateTime={posts.date}
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