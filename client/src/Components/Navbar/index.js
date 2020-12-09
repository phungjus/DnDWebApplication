import React from 'react'
import { Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import AccountCircle from '@material-ui/icons/AccountCircle'
import logo from './static/logo.png'
import './styles.css'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

class Navbar extends React.Component {
    state = {
        // Get the user's group information from a server call
        anchorEl: null
    }

    handleClose = () => {
        this.setState({
            anchorEl: null
        })
    }

    handleMenu = (event) => {
        this.setState({
            anchorEl: event.currentTarget.parentNode
        })
    }

    handleLogout = () => {
        this.handleClose()
        this.props.handleLogout()
    }

    render() {
        return (
            <div>
                <AppBar position="sticky">
                    <Toolbar className="Navbar">
                        <img id="logo" src={logo} alt="Logo"/>
                        <Button className="NavbarLink" component={Link} to={'/'}>Character Page</Button>
                        <Button className="NavbarLink" component={Link} to={'/Grouplist'}>Groups Page</Button>
                        <Button className="NavbarLink" component={Link} to={'/Forum'}>Forum Page</Button>
                        {this.props.auth ?   <div className="AccountIcon"> 
                                            <IconButton
                                                onClick={this.handleMenu}
                                            > 
                                                <AccountCircle /> 
                                            </IconButton> 
                                            <Menu
                                                anchorEl={this.state.anchorEl}
                                                keepMounted
                                                transformOrigin={"center top"}
                                                open={Boolean(this.state.anchorEl)}
                                                onClose={this.handleClose}
                                                className="Accountmenu"
                                                PaperProps={{
                                                    style: {
                                                        backgroundColor: "#464444"
                                                    }
                                                }}
                                            >
                                                <MenuItem className="Accountmenuitem" id="NavigateCharacter" component={Link} to={'/Character'}>View Character</MenuItem>
                                                <MenuItem className="Accountmenuitem" onClick={() => this.handleLogout()}>Log Out</MenuItem>
                                            </Menu>
                                        </div>: null}
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default Navbar;