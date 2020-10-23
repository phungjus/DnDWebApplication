import React from 'react';
import './ForumGroups.css';

class ForumGroups extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return(
            <div className="yourGroups">
                <h1 id="yourGroupsTitle">Your Groups</h1>
            </div>
        )
    }

}

export default ForumGroups;