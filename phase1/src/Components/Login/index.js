import React from 'react';
import './styles.css';

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
        } else if (this.state.username === 'admin' && this.state.pass === 'admin') {
            console.log("Logged in as an admin")
        } else {
            console.log("Could not log in")
        }
    }

    render() {
        return (
            <div className="login">
                <form onSubmit={this.handleLogin}>
                    <label htmlFor="username">Username:</label><br/>
                    <input type="text" id="username" name="username" value={this.state.username} onChange={this.handleInputChange}/><br/><br/>
                    <label htmlFor="current-password">Password:</label><br/>
                    <input type="password" id="current-password" name="current-password" value={this.state.pass} onChange={this.handleInputChange}/><br/><br/>
                    <button type="submit">Login</button>
                </form>
            </div>
        );
    }
}

export default Login;