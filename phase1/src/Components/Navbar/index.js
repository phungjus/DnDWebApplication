import React from 'react'
import { Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import AccountCircle from '@material-ui/icons/AccountCircle'
import logo from './static/index.png'
import './styles.css'

function Navbar(props) {
    return (
        <div>
            <AppBar position="sticky">
                <Toolbar>
                    <img id="logo" src={logo} alt="Logo"/>
                    <Button className="NavbarLink" component={Link} to={'/'}>Character Page</Button>
                    <Button className="NavbarLink" component={Link} to={'/Group'}>Group Page</Button>
                    <Button className="NavbarLink" component={Link} to={'/Forum'}>Forum Page</Button>
                    {props.auth ? <AccountCircle /> : null}
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Navbar;