import React from 'react';
import './ForumMenu.css';

function ForumMenu(props) {
    return (
        <div className="forumMenu">
            <a className="otherViews" href='#'>Create a Character</a>
            <a className="otherViews" href='#'>View Characters</a>
            <a className="otherViews" href="#">Create a Group</a>
            <a className="otherViews" href="#">Join Group</a>
            <a className="otherViews" href="#">Log Out</a>
        </div>
    )
}

export default ForumMenu;