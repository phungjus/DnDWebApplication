import React from 'react';
import './styles.css';
import backgroundImage from './static/backgroundImage.jpg'

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
                <div className="login">
                    <form className="loginForm" onSubmit={this.handleLogin}>
                        {/* <label htmlFor="username">Username:</label><br/> */}
                        <input className="input" type="text" id="username" name="username" placeholder="Username" alue={this.state.username} onChange={this.handleInputChange}/><br/><br/><br/><br/>
                        {/* <label htmlFor="current-password">Password:</label><br/> */}
                        <input className="input" type="password" id="current-password" name="current-password" placeholder="Password" value={this.state.pass} onChange={this.handleInputChange}/><br/><br/><br/><br/><br/>
                        <button className="loginButton" type="submit">LOGIN</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;