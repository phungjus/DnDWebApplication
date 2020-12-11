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
import Typography from "@material-ui/core/Typography"
import { login, createUser } from '../../Actions/User'


class Login extends React.Component {

    state = {
        username : "",
        pass : "",
        signin_error: null,
        signup_user: "",
        signup_password: "",
        signup_password_confirm: "",
        signup_success: null,
        signup_error: null,
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
        } else if (name === 'signup-username') {
            this.setState({
                signup_user: value 
            });
        } else if (name === 'signup-password') {
            this.setState({
                signup_password: value 
            });
        } else  {
            this.setState({
                signup_password_confirm: value 
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
        login(this.state.username, this.state.pass, (user) => {
            if (user !== "undefined") {
                this.setState({
                    signin_error: null
                })
                this.props.handleLogin(user.currentUser)
            } else {
                this.setState({
                    signin_error: "Invalid username and password! Please try again"
                })
            }
          })
    }

    handleSignup = (e) => {
        // Backend call
        if (this.state.signup_password === this.state.signup_password_confirm) {
            createUser(this.state.signup_user, this.state.signup_password, (res) => {
                if (typeof res === 'number') {
                    // error
                    this.setState({
                        signup_error: 'This username is already in use! Please use a different username.',
                        signup_success: false
                    })
                } else {
                    // Success message - set state
                    this.setState({
                        signup_success: "Account created successfully",
                        signup_error: null
                    })
                }
            })
        } else {
            this.setState({
                signup_error: "Passwords do not match!"
            })
        }
    }

    handleChange = (event, newValue) => {
        this.setState({
            value: newValue
        });
    };

    showError = () => {
        console.log(this)
        return this.state.signup_error ? "Passwords do not match!" : "testing"
    }

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
                        <Tab label="Sign In" {...this.a11yProps(0)} />
                        <Tab label="Sign Up" {...this.a11yProps(1)} />
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
                            <Typography variant="body2" component="p">
                                {this.state.signin_error}
                            </Typography>
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
                            />
                            <TextField
                                variant="outlined"
                                margin="dense"
                                id="standard-password-input"
                                name="signup-password-confirm"
                                label="Confirm Password"
                                type="password"
                                fullWidth
                                onChange={this.handleInputChange}
                                onKeyPress={this.handleEnterSignup}
                            />
                            <p>
                                {this.state.signup_error ? this.state.signup_error : this.state.signup_success}
                            </p>
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