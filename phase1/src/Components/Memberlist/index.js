import React from 'react';
import './styles.css';
import Member from '../Member'
import PopUp from '../Groupinvite'

class Memberlist extends React.Component {
    
    state = {
        members : [
            {name: "Matt", memberType: "DM"},
            {name: "Kyoji", memberType: "Player"},
            {name: "Jess", memberType: "Player"},
            {name: "Justin", memberType: "Player"},
            {name: "Kai", memberType: "Player"},
            {name: "Maddy", memberType: "Player"},
            {name: "Ma", memberType: "Player"},
            {name: "Pa", memberType: "Player"},
            {name: "Ricky", memberType: "Player"},
            {name: "Ishan", memberType: "Player"},
            {name: "Shakir", memberType: "Player"},
        ]
    }

    togglePop = () => {
        this.setState({
         seen: !this.state.seen
        });
    };

    startLeaveEvent = () => {
        if(window.confirm("Are you sure you want to leave the group?")){
            console.log('okay')
        } else {
            console.log('no')
        }
    }
    
    render() {
        const members = this.state.members.map((member) => 
            <li>
                <Member
                    name={member.name}
                    memberType={member.memberType}
                />
            </li>)
        return (
            <div className="Memberlist">
                <ul className="Memberlistul">
                    <h1 className="MemberTitle">
                        Members
                    </h1>
                    <div className="Members">
                        {members}
                    </div>
                    <li>
                        <button onClick={this.togglePop}>
                            Invite to group
                        </button>
                    </li>
                    <li>
                        <button onClick={this.startLeaveEvent}>
                            Leave group
                        </button>
                    </li>
                </ul>
                {this.state.seen ? <PopUp toggle={this.togglePop} /> : null}
            </div>
        );
   }
}

export default Memberlist;