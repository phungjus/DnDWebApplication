import React from 'react';
import ForumGroups from '../ForumGroups/ForumGroups.js';
import ForumHeader from '../ForumHeader/ForumHeader.js';
import ForumMenu from '../ForumMenu/ForumMenu.js';
import Toggle from '../Toggle/Toggle.js'
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
                        
                        {/* ToDO: */}

                        {/* Add functionality to the New Post Button */}

                        {/* Add an option to comment on each Post */}

                        {/* Add functioanlity to the Groups section of the page */}

                        {/* Remember to create another view dedicated to the Admin
                         (i.e. the ability to delete posts) */}

                        {/* Add in a ForumPost Component Later it should take in
                        3 variables: postTitle, postUser, and postContent. Don't forget
                        each post requires a timestamp along with it */}
                        
                        {/* Add in a PostComment Component later it should also take in
                        2 variables: commentUser, and commentContent. Don't forget each post
                        requires a timestamp along with it*/}

                        {/* Add in the page redirects */}

                        {/* Forum Post 1 */}
                        <div className="forumPost">
                            <h4 className="postTitle">Introduction Post</h4>
                            <h4 className="postUser">by: DragonRider12</h4>
                            <p className="postContent">Hi everybody I am new to these forums and wanted to introduce myself. 
                            I am looking for a game to join, I haven't played but I am willing to learn. Hope to hear from somebody soon! 
                            </p>
                            <Toggle title="Show Comments">
                                Hello
                            </Toggle>
                        </div>

                        {/* Forum Post 2 */}
                        <div className="forumPost">
                            <h4 className="postTitle">Looking for Game</h4>
                           <h4 className="postUser">by: OrcMan52</h4>
                           <p className="postContent">Hi everybody I am currently looking for a game to join. I have experience playing
                          Dungeon's and Dragon's so I can hope right in. Hope to hear from you guys soon!
                         </p>
                        <Toggle title="Show Comments">
                            Hello
                        </Toggle>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Forum