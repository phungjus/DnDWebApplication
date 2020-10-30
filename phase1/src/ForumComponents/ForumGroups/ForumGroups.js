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

    render() {
        return(
            <div className="yourGroups">
                <h1 id="yourGroupsTitle">Your Groups</h1>
                <div className="groupDiv">
                    <h2 id="indivGroupTitle">TM9</h2>
                    <div className="groupIcons">
                        <img id="icon" src={assassin}></img>
                        <img id="icon" src={bard}></img>
                        <img id="icon" src={druid}></img>
                        <img id="icon" src={mage}></img>
                        <img id="icon" src={monk}></img>
                    </div>
                </div>
                <div className="groupDiv">
                    <h2 id="indivGroupTitle">VM</h2>
                    <div className="groupIcons">
                        <img id="icon" src={paladin}></img>
                        <img id="icon" src={ranger}></img>
                        <img id="icon" src={warlock}></img>
                        <img id="icon" src={druid}></img>
                    </div>
                </div>
            </div>
        )
    }

}

export default ForumGroups;