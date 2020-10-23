import React from 'react';
import ForumGroups from '../ForumGroups/ForumGroups.js';
import ForumHeader from '../ForumHeader/ForumHeader.js';
import ForumMenu from '../ForumMenu/ForumMenu.js';
import "./Forum.css";

class Forum extends React.Component {

    constructor(props) {
        super(props);
        this.state = {username: "user1"};
    }

    render() {
        return (
            <div className="mainForum">
                <ForumHeader />
                <ForumGroups />
                <ForumMenu />
                <div className="forumPostBody">
                    <h1>Latest Posts <button className="button">New Post</button></h1>
                    <div className="forumBody">
                        {/* Forum Post 1 */}
                        <div className="forumPost">
                            <h4 className="postTitle">Introduction Post</h4>
                            <h4 className="postUser">by: DragonRider12</h4>
                            <p className="postContent">Hi everybody I am new to these forums and wanted to introduce myself. 
                            I am looking for a game to join, I haven't played but I am willing to learn. Hope to hear from somebody soon! 
                            </p>
                            <h4 className="postComments">0 Comments</h4>
                        </div>

                        {/* Forum Post 2 */}
                        <div className="forumPost">
                            <h4 className="postTitle">Looking for Game</h4>
                           <h4 className="postUser">by: OrcMan52</h4>
                           <p className="postContent">Hi everybody I am currently looking for a game to join. I have experience playing
                          Dungeon's and Dragon's so I can hope right in. Hope to hear from you guys soon!
                         </p>
                         <h4 className="postComments">0 Comments</h4>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Forum