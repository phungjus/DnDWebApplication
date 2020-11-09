import React from 'react';
import './styles.css';
import backgroundImage from './static/backgroundImage.jpg'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

class Login extends React.Component {

    state = {
        username : "",
        pass : ""
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        if (name === 'current-password') {
            this.setState({
                pass: value
            });
        } else {
            this.setState({
                username: value 
            });
        }
    };

    handleLogin = (e) => {
        e.preventDefault();
        if (this.state.username === 'user' && this.state.pass === 'user') {
            console.log("Logged in as a user")
            this.props.handleLogin('user')
        } else if (this.state.username === 'admin' && this.state.pass === 'admin') {
            console.log("Logged in as an admin")
            this.props.handleLogin('admin')
        } else {
            console.log("Could not log in")
        }
    }

    render() {
        return (
            <div className="Wrapper">
                <div className="bg">
                    <img src={backgroundImage}/>
                </div>
                <Card className="loginCard">
                    <Typography gutterBottom variant="h5" component="h5" className="LoginTitle">
                    Login
                    </Typography>
                        <CardContent className="loginField">
                            <TextField
                                autoFocus
                                margin="dense"
                                id="username"
                                label="Username"
                                type="username"
                                fullWidth
                                onChange={this.handleInputChange}
                            />
                            <TextField
                                margin="dense"
                                id="standard-password-input"
                                name="current-password"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                fullWidth
                                onChange={this.handleInputChange}
                            />
                        </CardContent>
                    <CardActions>
                        <Button className="Signin" onClick={this.handleLogin} size="small" color="primary">
                            Sign In
                        </Button>
                    </CardActions>
                </Card>
        </div>
        );
    }
}

export default Login;