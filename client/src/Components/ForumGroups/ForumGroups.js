import React from 'react';
import './ForumGroups.css';
import assassin from './groupImages/assasin.jpg'
import bard from './groupImages/bard.png'
import druid from './groupImages/druid.png'
import mage from './groupImages/mage.jpg'
import monk from './groupImages/monk.png'
import paladin from './groupImages/paladin.jpg'
import ranger from './groupImages/ranger.png'
import warlock from './groupImages/warlock.png'

export default function ForumGroups(props) {

    console.log(props.userGroups)

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
                        {groups.users.map(user => (<p id="groupID">{user.email}</p>))}
                    </div>
                ))}
            </div>
            )
        }
        </div>
    )
}
