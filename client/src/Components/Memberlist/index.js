import React from 'react';
import './styles.css';
import Member from '../Member'
import Button from '@material-ui/core/Button'
import { getUsers } from '../../Actions/Group'

class Memberlist extends React.Component {
    
    state = {
        // Get members of the group from server
        members : []
    }

    componentDidMount() {
        if (this.props.groupid !== "undefined") {
            getUsers(this.props.groupid, (users) => {
                if (users !== "undefined") {
                    this.setState({
                        members: users
                    })
                }
            })
        }
    }

    deleteMember = (member) => {
        // delete member on server
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