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

class ForumGroups extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    // Inside the ForumGroups components for the next phase this data would need to be pulled from the
    // back-end of the program in order to find out which groups that current user is a part of, but
    // for the purposes of Phase 1 the groups the user is part of is hard-coded.

    render() {
        return(
            <div className="yourGroups">
                <h1 id="yourGroupsTitle">Your Groups</h1>
                <div className="groupDiv">
                    <h2 id="indivGroupTitle">TM9</h2>
                    <div className="groupIcons">
                        <img id="icon" alt="assassin" src={assassin}></img>
                        <img id="icon" alt="bard" src={bard}></img>
                        <img id="icon" alt="druid" src={druid}></img>
                        <img id="icon" alt="mage" src={mage}></img>
                        <img id="icon" alt="monk" src={monk}></img>
                    </div>
                </div>
                <div className="groupDiv">
                    <h2 id="indivGroupTitle">VM</h2>
                    <div className="groupIcons">
                        <img id="icon" alt="paladin" src={paladin}></img>
                        <img id="icon" alt="ranger" src={ranger}></img>
                        <img id="icon" alt="warlock" src={warlock}></img>
                        <img id="icon" alt="druid" src={druid}></img>
                    </div>
                </div>
            </div>
        )
    }

}

export default ForumGroups;