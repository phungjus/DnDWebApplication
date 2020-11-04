import React from 'react';
import './ForumMenu.css';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { Link } from 'react-router-dom'

function ForumMenu(props) {
    return (
        <div className="forumMenu">
            <Grid 
            container 
            direction="column"
            alignItems="center"
            >
                <Grid item>
                    <Button className="createCharPage" component={Link} to={'/'}>Character Page</Button>
                    {/* <Button className="viewChar" component={Link} to={'/'}>Character Page</Button> */}
                    <Button className="groupPage" component={Link} to={'/Group'}>Group Page</Button>
                    <Button className="logOut" component={Link} to={'/'}>Log Out</Button>
                </Grid>
            </Grid>


            {/* <a className="otherViews" href='#'>Create a Character</a>
            <a className="otherViews" href='#'>View Characters</a>
            <a className="otherViews" href="#">Create a Group</a>
            <a className="otherViews" href="#">Join Group</a>
            <a className="otherViews" href="#">Log Out</a> */}
        </div>
    )
}

export default ForumMenu;