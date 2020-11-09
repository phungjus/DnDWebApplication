import React from 'react'
import Memberlist from '../Memberlist'
import Diceroller from '../Diceroller'
import Chatbox from '../Chatbox'
import { Link } from 'react-router-dom'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import ButtonBase from '@material-ui/core/ButtonBase'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import './style.css'

class Group extends React.Component {

    state = {
        inviteGroupModal: null,
        leaveGroupModal: null
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

    copyToClipboard = (event) => {
        document.querySelector('#code').select();
        document.execCommand('copy');
        this.setState({ copySuccess: true });
    };

    render() {
        return (
            <div className="Group">
                <Memberlist
                    togglePop={() => this.handleOpen('inviteGroupModal')}
                    startLeaveEvent={() => this.handleOpen('leaveGroupModal')}
                    userType={this.props.userType}
                />
                <Chatbox/>
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
                        ref={(textarea) => this.textArea = textarea}
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

export default Group;