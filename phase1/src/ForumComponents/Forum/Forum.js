import React, { useState } from 'react';
import ForumGroups from '../ForumGroups/ForumGroups.js';
import ForumHeader from '../ForumHeader/ForumHeader.js';
import ForumMenu from '../ForumMenu/ForumMenu.js';
import ForumPost from '../ForumPosts/ForumPost.js';
import "./Forum.css";

export default function Forum() {

    const [username, setUsername] = useState('LoggedInUser')
    const [title, setTitle] = useState('')
    const [postContent, setPostContent] = useState('')
    const [postComments, setPostComments] = useState([])
    const [forumPosts, setForumPosts] = useState([
        {username: 'DragonRider12', title: 'Introduction Post', postContent: "Hi everybody I am currently looking for a game to join. I have experience playing Dungeon's and Dragon's so I can hope right in. Hope to hear from you guys soon!",
        comments: [{username: 'DragonRider12', postComment: "Neat let me send you a private message"}, {username: 'OrcMan52', postComment: "Hey I am willing to join your game"}]},
        {username: 'OrcMan52', title: 'Looking for Game', postContent: "Hi everybody I am currently looking for a game to join. I have experience playing Dungeon's and Dragon's so I can hope right in. Hope to hear from you guys soon!",
        comments: [{username: 'DnDMaster', postComment:'Hey we are starting a new game right now still wanna join?'}]}
    ])
    const [showPost, setShowPost] = useState(false)

    async function handleSubmit(e) {
        
        e.preventDefault();
        const newPostInfo = {username: username, title: title, postContent: postContent, comments: postComments}
        setForumPosts([newPostInfo, ...forumPosts])
        setShowPost(false)
        console.log(forumPosts)
    }

    return (
        <div className="mainForum">
            <ForumHeader />
            <ForumGroups />
            <ForumMenu />
            <div className="forumPostBody">
                <h1>Latest Posts <button className="button" onClick={() => setShowPost(true)}>New Post</button></h1>
                <div className="forumBody">
                    
                    {/* ToDO: */}

                    {/* DONE: Add functionality to the New Post Button */}

                    {/* Add a Time Stamp to all Posts and Comments */}

                    {/* Add an option to comment on each Post 
                    NOTE: This will most likely need to be done with a callback function */}

                    {/* Add functionality to the Groups section of the page */}

                    {/* Remember to create another view dedicated to the Admin
                     (i.e. the ability to delete posts) */}

                    {/* DONE: Add in a ForumPost Component Later it should take in
                    3 variables: postTitle, postUser, and postContent. Don't forget
                    each post requires a timestamp along with it */}
                    
                    {/* DONE: Add in a PostComment Component later it should also take in
                    2 variables: commentUser, and commentContent. Don't forget each post
                    requires a timestamp along with it*/}

                    {/* Add in the page redirects */}

                    {showPost ? 
                        <div className="newPostDiv">
                            <form id="newPost" onSubmit={e => handleSubmit(e)}>
                                <label htmlFor="postTitle">Title:</label><br />
                                <input type="text" id="postTitle" name="postTitle" value={title} onChange={e => setTitle(e.target.value)}/> <br />
                                <textarea name="postContent" form="newPost" rows="6" cols="80" value={postContent} onChange={e => setPostContent(e.target.value)}/>
                                <input type="submit" />
                            </form> 
                        </div> 
                        : 
                        <div></div>
                        }

                    {
                        forumPosts.map((posts) => (
                            <ForumPost title={posts.title} username={posts.username} postContent={posts.postContent} postComments={posts.comments}/>
                        ))
                    }

                </div>
            </div>
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