import React from 'react'
import Grid from '@material-ui/core/Grid'
import Grouptile from '../Grouptile'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import group1 from './static/group1.jpg'
import group2 from './static/group2.jpg'
import './styles.css'
import CardMedia from '@material-ui/core/CardMedia'
import { getGroups, addGroup, createGroup } from '../../Actions/Group'


class Grouplist extends React.Component {

    state = {
        // Get the user's group information from a server call
        anchorEl: null,
        joinGroupModal: false,
        createGroupModal: false,
        submitDisabled: true,
        createDisabled: true,
        code: null,
        groups: [],
        image: null,
        groupName: "",
        groupDescription: ""
    }

    componentDidMount() {
        getGroups(this.props.user._id, (groups) => {
            this.setState({
                groups: groups
            })
            console.log(this.state)
        })
    }

    handleClose = () => {
        this.setState({
            anchorEl: null
        })
    }

    handleMenu = (event) => {
        this.setState({
            anchorEl: event.currentTarget
        })
    }

    handleGroupOpen = (option) => {
        this.setState({
            [option]: true
        })
    }

    handleGroupClose = (option) => {
        this.handleClose()
        this.setState({
            [option]: false,
            submitDisabled: true,
            code: null,
            createDisabled: true,
            image: null,
            groupName: "",
            groupDescription: ""
        })
    }

    handleInputChange = (event) => {
        const bool = event.target.value === "";
        this.setState({
            submitDisabled: bool,
            [event.target.id]: event.target.value
        })
    }

    handleCreateInputChange = (event) => {
        const bool = this.state.groupName === "" || this.state.groupDescription === "" || this.state.image === null || event.target.value === "";
        this.setState({
            createDisabled: bool,
            [event.target.id]: event.target.value
        })
    }

    joinGroup = () => {
        // Handle join group on a server
        addGroup(this.props.user._id, this.state.code, (groups) => {
            this.setState({
                groups: groups,
                submitDisabled: true,
                code: null
            })
            this.handleClose()
            this.handleGroupClose('joinGroupModal')
        })
    }

    handleUpload = (event) => {
        // console.log(event.target.files[0])
        // console.log(new FormData(event.target.files[0]))
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                this.setState({
                    image: reader.result,
                    createDisabled: this.state.groupName === "" || this.state.groupDescription === ""
                })
            }
        }
        reader.readAsDataURL(event.target.files[0])
    }

    handleGroupCreate = () => {
        // handle creating a group with a server call
        createGroup(this.props.user._id, this.state.groupName, this.state.groupDescription, this.state.image.split(',')[1], (groups) => {
            this.setState({
                groups: groups,
                createDisabled: true,
                image: null,
                groupName: "",
                groupDescription: ""
            })
            this.handleClose()
            this.handleGroupClose('createGroupModal')
        })
    }

    render() {
        return (
            <div className="Gridwrapper">
                <Grid
                    container
                    direction="row"
                    justify="space-evenly"
                    alignItems="center"
                    className="Groupgrid"
                    id="Groupgrid"
                >
                    {(this.state.groups || []).map(group => (
                        <Grouptile
                            link={"group/" + group._id}
                            image={group.image ? group.image.image_url : null}
                            Groupname={group.name}
                            Groupdescription={group.description}
                        />
                    ))}
                    <div>
                        <IconButton
                            onClick={this.handleMenu}
                            className="addGroup"
                        >
                            <AddCircleOutlineIcon className="addGroup"/>
                        </IconButton>
                        <Menu
                            anchorEl={this.state.anchorEl}
                            keepMounted
                            transformOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            open={Boolean(this.state.anchorEl)}
                            onClose={this.handleClose}
                            className="Addmenu"
                            PaperProps={{
                                style: {
                                    backgroundColor: "#b95c0d"
                                }
                            }}
                        >
                            <MenuItem className="Addmenuitem" onClick={() => this.handleGroupOpen('createGroupModal')}>Create Group</MenuItem>
                            <MenuItem className="Addmenuitem" onClick={() => this.handleGroupOpen('joinGroupModal')}>Join Group</MenuItem>
                        </Menu>
                    </div>
                </Grid>
                <Dialog open={this.state.createGroupModal} onClose={() => this.handleGroupClose('createGroupModal')} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Create a New Group</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        Please fill in the form to create a group
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="groupName"
                        label="Group Name"
                        fullWidth
                        onChange={this.handleCreateInputChange}
                    />
                    <TextField
                        margin="dense"
                        id="groupDescription"
                        label="Group Description"
                        multiline
                        fullWidth
                        onChange={this.handleCreateInputChange}
                    />
                    {this.state.image ? <CardMedia image={this.state.image}></CardMedia> : <DialogContentText>Import an image to continue</DialogContentText>}
                    <Button onClick={() => document.getElementById('fileInput').click()}>
                        Import Group image
                    </Button>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={() => this.handleGroupClose('createGroupModal')} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleGroupCreate} type="submit" disabled={this.state.createDisabled} color="primary">
                        Create
                    </Button>
                    </DialogActions>
                </Dialog>
                
                <input id="fileInput" type="file" accept="image/*" style={{display: "none"}} onChange={this.handleUpload}/>
                
                <Dialog open={this.state.joinGroupModal} onClose={() => this.handleGroupClose('joinGroupModal')} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Join a New Group</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        To join a new group, please enter the code that was given to you by a current member of the group.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="code"
                        label="Group Code"
                        onChange={this.handleInputChange}
                    />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={() => this.handleGroupClose('joinGroupModal')} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => this.joinGroup()} type="submit" disabled={this.state.submitDisabled} color="primary">
                        Join
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default Grouplist;