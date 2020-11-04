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
import { Paper } from '@material-ui/core';


{/* ToDO: */}

{/* Add a Time Stamp to all Posts and Comments (note: it would be easier if each post has a dateTime stamp as a state) */}
{/* DONE: Add in the page redirects */}
{/* DONE: Update the color scheme to be consistent throughout the application */}
{/* DONE: Add Material-UI to the View */}
{/* Add Comments refering to places where data needs to be called */}
{/* Update the README.md file with instructions about how to use the Web Application */}

const useStyles = makeStyles((theme) => ({

    latestPost: {
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#0b0200',

    },

    forumPostBody : {
        marginTop: '20px',
    },

    submitBtn: {
    },

    Button : {
        maxWidth: '75px',
        maxHeight: '45px',
        minWidth: '75px',
        minHeight: '45px',
        color: '#0b0200',
        backgroundColor: '#b95c0d',
        '&:hover': { backgroundColor: '#b95c0d' },
        left: '0px'
    },

    fields : {
        backgroundColor: '#2c2f33',
        color: '#ff0000'
    }
}))

export default function Forum(props) {

    const classes = useStyles()

    const [username, setUsername] = useState('admin')
    const [title, setTitle] = useState('')
    const [postContent, setPostContent] = useState('')
    const [forumPosts, setForumPosts] = useState([
        {username: 'DragonRider12', title: 'Introduction Post', postContent: "Hi everybody I am currently looking for a game to join. I have experience playing Dungeon's and Dragon's so I can hope right in. Hope to hear from you guys soon!",
        comments: [{username: 'OrcMan52', postComment: "Hey I am willing to join your game"}, {username: 'DragonRider12', postComment: "Neat let me send you a private message"}], pid: 0},
        {username: 'OrcMan52', title: 'Looking for Game', postContent: "Hi everybody I am currently looking for a game to join. I have experience playing Dungeon's and Dragon's so I can hope right in. Hope to hear from you guys soon!",
        comments: [{username: 'DnDMaster', postComment:'Hey we are starting a new game right now still wanna join?'}], pid: 1}
    ])
    const [showPost, setShowPost] = useState(false)
    const [pid, setPID] = useState(2)

    
    function handleSubmit(e) {
        
        e.preventDefault();
        const newPostInfo = { username: username, title: title, postContent: postContent, comments: [], pid: pid }
        setForumPosts((forumPosts) => ([newPostInfo, ...forumPosts]))
        setTitle('')
        setPostContent('')
        setShowPost(false)
        setPID(pid + 1)
    }

    const handleNewComment = useCallback((username, postComment, postPID) => {
        const shallowCopy = forumPosts.slice()
        const prevPost = forumPosts.filter(posts => posts.pid === postPID)
        const newComment = {username: username, postComment: postComment}
        prevPost[0].comments.push(newComment)
        setForumPosts(shallowCopy)
    }, [forumPosts])
    
    const handleDelete = useCallback(pid => {
        const updatedList = forumPosts.filter(posts => posts.pid !== pid)
        setForumPosts(updatedList)
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
                        <Grid><Button className={classes.Button} variant="contained" onClick={() => setShowPost(true)}>New Post</Button></Grid>
                    </Grid>
                    {showPost ?
                
                        <Grid 
                        item 
                        xs={12} 
                        component='div'
                        justify="center"
                        alignItems="flex-start"
                        >

                            <form id="newPost" onSubmit={e => handleSubmit(e)}>
                                <Input
                                className={classes.fields}
                                name="postTitle"
                                variant="outline"
                                fullWidth
                                id="postTitle"
                                autoFocus
                                placeholder="Enter Post Title"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                />
                                <TextField 
                                className={classes.fields}
                                id="postContent"
                                multiline
                                rows={6}
                                placeholder="Enter Post's Content"
                                variant="outlined"
                                fullWidth
                                value={postContent}
                                onChange={e => setPostContent(e.target.value)}
                                />
                                <Button
                                type="submit"
                                variant="contained"
                                className={classes.submitBtn}
                                >
                                    Submit
                                </Button>
                            </form>
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
                                    curUser={username}
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


// class Forum extends React.Component {

//     constructor(props) {
//         super(props);
//         this.state = {
            // forumPosts : [
            //     {username: 'DragonRider12', title: 'Introduction Post', postContent: "Hi everybody I am currently looking for a game to join. I have experience playing Dungeon's and Dragon's so I can hope right in. Hope to hear from you guys soon!"},
            //     {username: 'OrcMan52', title: 'Looking for Game', postContent: "Hi everybody I am currently looking for a game to join. I have experience playing Dungeon's and Dragon's so I can hope right in. Hope to hear from you guys soon!"}
            // ],
//             showPost: false,
//             newPostUsername: 'Me',
//             newPostTitle: '',
//             newPostContent: ''
//         }
//         this.handleNewPost = this.handleNewPost.bind(this);
//         this.handleNewTitle = this.handleNewTitle.bind(this);
//         this.handleNewPostContent = this.handleNewPostContent.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }

//     handleNewPost() {
//         this.setState({showPost: true})
//     }

//     handleNewTitle(e) {
//         // console.log(e.target.value)
//         this.setState({newPostTitle: e.target.value}, () => console.log("titleUpdated"))
//     }

//     handleNewPostContent(e) {
//         this.setState({newPostContent: e.target.value}, () => console.log("postContentUpdated"))
//     }

//     handleSubmit(e) {
//         e.preventDefault();
//         const newPost = [{username: this.newPostUsername, title: this.newPostTitle, postContent: this.newPostContent}]
//         console.log(newPost)
//         // this.setState(state => {
//         //     const list = [ newPost, ...state.forumPosts ]
//         // })
//         this.setState({forumPosts: [newPost, ... this.state.forumPosts]})

//         console.log(this.state.forumPosts)
//         // const newPosts = this.state.forumPosts.concat([{username: this.newPostUsername, title: this.newPostTitle, postContent: this.newPostContent}])
//         // console.log(newPosts)
//         // this.setState({forumPosts : newPosts})
//         // console.log(this.state.forumPosts)
//     }

//     render() {
//         return (
//             <div className="mainForum">
//                 <ForumHeader />
//                 <ForumGroups />
//                 <ForumMenu />
//                 <div className="forumPostBody">
//                     <h1>Latest Posts <button className="button" onClick={this.handleNewPost}>New Post</button></h1>
//                     <div className="forumBody">
                        
//                         {/* ToDO: */}

//                         {/* Add functionality to the New Post Button */}

//                         {/* Add an option to comment on each Post */}

//                         {/* Add functionality to the Groups section of the page */}

//                         {/* Remember to create another view dedicated to the Admin
//                          (i.e. the ability to delete posts) */}

//                         {/* DONE: Add in a ForumPost Component Later it should take in
//                         3 variables: postTitle, postUser, and postContent. Don't forget
//                         each post requires a timestamp along with it */}
                        
//                         {/* Add in a PostComment Component later it should also take in
//                         2 variables: commentUser, and commentContent. Don't forget each post
//                         requires a timestamp along with it*/}

//                         {/* Add in the page redirects */}

//                         {this.state.showPost ? 
//                             <div className="newPostDiv">
//                                 <form id="newPost" onSubmit={this.handleSubmit}>
//                                     <label htmlFor="postTitle">Title:</label><br />
//                                     <input type="text" id="postTitle" name="postTitle" value={this.state.newPostTitle} onChange={this.handleNewTitle}/> <br />
//                                     <textarea name="postContent" form="newPost" rows="6" cols="80" value={this.state.newPostContent} onChange={this.handleNewPostContent}/>
//                                     <input type="submit" />
//                                 </form> 
//                             </div> 
//                             : 
//                             <div></div>
//                             }

//                         {
//                             this.state.forumPosts.map((posts) => (
//                                 <ForumPost title={posts.title} username={posts.username} postContent={posts.postContent}/>
//                             ))
//                         }

//                     </div>
//                 </div>
//             </div>
//         )
//     }

// }

// export default Forum;