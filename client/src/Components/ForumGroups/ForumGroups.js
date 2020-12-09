import React from 'react';
import './ForumGroups.css';

export default function ForumGroups(props) {

    return(    
        <div> 
        {props.userGroups.length === 0 
            ? 
            (<div className="yourGroups">
                <h1 id="yourGroupsTitle">Your Groups</h1>
            </div>) 
            : 
            (<div className="yourGroups">
                <h1 id="yourGroupsTitle">Your Groups</h1>
                {props.userGroups.map(groups =>
                    (<div className="groupDiv">
                        <h2 id="indivGroupTitle">{groups.name}</h2>
                        <h4 id="membersTitle">Group Members:</h4>
                        {groups.users.map(user => (<p id="groupID">{user.username}</p>))}
                    </div>
                ))}
            </div>
            )
        }
        </div>
    )
}
