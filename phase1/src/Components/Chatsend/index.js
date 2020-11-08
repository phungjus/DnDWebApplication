import React from 'react'
import './styles.css'

class Chatsend extends React.Component {
    
    state = {
        message: '',
        time: null
    }

    getTime = () => {
        const date = new Date()
        return date.toLocaleTimeString('en-US')
    }
    
    handleChange = (event) => {
        this.setState({
            message: event.target.value
        })
    }
    
    handleSubmit = (event) => {
        event.preventDefault()
        this.props.sendMessage(this.state.message, this.getTime())
        this.setState({
            message: ''
        })
    }
    
    render() {
        return (
            <form
                onSubmit={this.handleSubmit}
                className="Chatsend">
                <input
                    onChange={this.handleChange}
                    value={this.state.message}
                    placeholder="Type your message and hit ENTER"
                    type="text" />
            </form>
        )
    }
}

export default Chatsend