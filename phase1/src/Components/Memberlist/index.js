import React from 'react';
import './styles.css';
import Member from '../Member'
import PopUp from '../Groupinvite'
import Button from '@material-ui/core/Button'

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

    deleteMember = (member) => {
        const notKicked = this.state.members.filter( el => el.name !== member)
        this.setState({
            members: notKicked
        })
    }
    
    render() {
        const members = this.state.members.map((member) => 
            <li>
                <Member
                    name={member.name}
                    memberType={member.memberType}
                    userType={this.props.userType}
                    deleteMember={this.deleteMember}
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
                        <Button className="GroupAction" onClick={this.props.togglePop}>
                            Invite to group
                        </Button>
                    </li>
                    <li>
                        <Button className="GroupAction" onClick={this.props.startLeaveEvent}>
                            Leave group
                        </Button>
                    </li>
                </ul>
            </div>
        );
   }
}

export default Memberlist;