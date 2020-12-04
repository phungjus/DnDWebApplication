import React from 'react';
import './styles.css';
import backgroundImage from './static/backgroundImage.jpg'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";


class Login extends React.Component {

    state = {
        username : "",
        pass : "",
        singup_user: "",
        singup_password: "",
        singup_first: "",
        singup_last: "",
        value: 0
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        if (name === 'current-password') {
            this.setState({
                pass: value
            });
        } else if (name === 'current-username') {
            this.setState({
                username: value 
            });
        } else if (name === 'signup-firstname') {
            this.setState({
                singup_first: value 
            });
        } else if (name === 'signup-lastname') {
            this.setState({
                singup_last: value 
            });
        } else if (name === 'signup-username') {
            this.setState({
                singup_user: value 
            });
        } else  {
            this.setState({
                singup_password: value 
            });
        }
    };

    handleEnterLogin = (e) => {
        //it triggers by pressing the enter key
      if (e.key === "Enter") {
        this.handleLogin();
      }
    };

    handleEnterSignup = (e) => {
        //it triggers by pressing the enter key
      if (e.key === "Enter") {
        this.handleSignup();
      }
    };

    handleLogin = (e) => {
        // Handle login in a backend server
        this.props.handleLogin(this.state.username, this.state.pass)
    }

    handleSignup = (e) => {
        // Backend call
        console.log(this.state)
    }

    handleChange = (event, newValue) => {
        this.setState({
            value: newValue
        });
    };

    TabPanel(props) {
        const { children, value, index, ...other } = props;
      
        return (
          <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
          >
            {value === index && (
            <div>{children}</div>
            )}
          </div>
        );
      }
      
    a11yProps(index) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
      }
      

    render() {
        return (
            <div className="Wrapper">
                <div className="bg">
                    <img src={backgroundImage} alt="background"/>
                </div>
                <Card className="loginCard">
                <Tabs value={this.state.value} onChange={this.handleChange} aria-label="simple tabs example" centered>
                        <Tab label="Sign" {...this.a11yProps(0)} />
                        <Tab label="Sign up" {...this.a11yProps(1)} />
                    </Tabs>
                <this.TabPanel value={this.state.value} index={0}>
                    <form>
                        <CardContent className="loginField">
                            <TextField
                                variant="outlined"
                                margin="dense"
                                id="username"
                                label="Username"
                                type="username"
                                name="current-username"
                                fullWidth
                                onChange={this.handleInputChange}
                            />
                            <TextField
                                variant="outlined"
                                margin="dense"
                                id="standard-password-input"
                                name="current-password"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                fullWidth
                                onChange={this.handleInputChange}
                                onKeyPress={this.handleEnterLogin}
                            />
                        </CardContent>
                        <CardActions>
                            <Button className="Signin" onClick={this.handleLogin} size="small" color="primary">
                                Sign In
                            </Button>
                        </CardActions>
                    </form>
                </this.TabPanel>
                <this.TabPanel value={this.state.value} index={1}>
                    <form>
                        <CardContent className="loginField">
                            <TextField
                                variant="outlined"
                                margin="dense"
                                id="username"
                                label="First Name"
                                name="signup-firstname"
                                type="username"
                                fullWidth
                                onChange={this.handleInputChange}
                            />
                            <TextField
                                variant="outlined"
                                margin="dense"
                                id="username"
                                label="Last Name"
                                name="signup-lastname"
                                type="username"
                                fullWidth
                                onChange={this.handleInputChange}
                            />
                            <TextField
                                variant="outlined"
                                margin="dense"
                                id="username"
                                label="Username"
                                type="username"
                                name="signup-username"
                                fullWidth
                                onChange={this.handleInputChange}
                            />
                            <TextField
                                variant="outlined"
                                margin="dense"
                                id="standard-password-input"
                                name="signup-password"
                                label="Password"
                                type="password"
                                fullWidth
                                onChange={this.handleInputChange}
                                onKeyPress={this.handleEnterSignup}
                            />
                        </CardContent>
                        <CardActions>
                            <Button className="Signin" onClick={this.handleSignup} size="small" color="primary">
                                Sign Up
                            </Button>
                        </CardActions>
                    </form>
                </this.TabPanel>
                </Card>
        </div>
        );
    }
}

export default Login;