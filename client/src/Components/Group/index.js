import React from 'react'
import Memberlist from '../Memberlist'
import Diceroller from '../Diceroller'
import Chatbox from '../Chatbox'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import './style.css'
import { getGroup } from '../../Actions/Group'
import { withRouter } from "react-router"

class Group extends React.Component {

    state = {
        inviteGroupModal: null,
        leaveGroupModal: null,
        group: null
    }

    handleOpen = (modal) => {
        this.setState({
            [modal]: true
        })
    }

    handleClose = (modal) => {
        this.setState({
            [modal]: null,
            copySuccess: null
        })
    }

    copyToClipboard = () => {
        document.querySelector('#code').select();
        document.execCommand('copy');
        this.setState({ copySuccess: true });
    };

    componentDidMount() {
        console.log(this.props.match.params.gid)
        getGroup(this.props.match.params.gid, group => {
            if(group !== "undefined") {
                this.setState({
                    group: group
                })
            }
        })
    }

    render() {
        return (
            <div className="Group">
                <Memberlist
                    togglePop={() => this.handleOpen('inviteGroupModal')}
                    startLeaveEvent={() => this.handleOpen('leaveGroupModal')}
                    userType={this.props.userType}
                    groupid={this.state.group ? this.state.group._id : "undefined"}
                />
                <Chatbox
                    groupid={this.state.group ? this.state.group._id : "undefined"}
                    userid={this.props.user._id}
                />
                <Diceroller/>
                
                <Dialog open={this.state.inviteGroupModal} onClose={() => this.handleClose('inviteGroupModal')} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Invite to Group</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        Send this link to your friends to add them to the group!
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="code"
                        label="Group Code"
                        value='bit.ly/dndgroup1234'
                    />
                    <DialogContentText>{this.state.copySuccess ? "Copied!" : ""}</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={() => this.handleClose('inviteGroupModal')} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => this.copyToClipboard()} type="submit" disabled={this.state.submitDisabled} color="primary">
                        Copy Link
                    </Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={this.state.leaveGroupModal} onClose={() => this.handleClose('leaveGroupModal')} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Leave Group</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        Are you sure you want to leave the group?
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={() => this.handleClose('leaveGroupModal')} color="primary">
                        No
                    </Button>
                    <Button component={Link} to={'/Grouplist'} type="submit" disabled={this.state.submitDisabled} color="primary">
                        Yes
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default withRouter(Group);