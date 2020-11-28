import React from 'react';
import Chatbubbles from '../Chatbubbles'
import Chatsend from '../Chatsend'
import './styles.css'

class Chatbox extends React.Component {

    state = {
        // get messages through a server call
        messages: []
    }
    
    sendMessage = (text, time) => {
        // send message though a server call
        const messages = this.state.messages
        messages.push({message: text, time: time, user: "User"})
        this.setState({
            messages : messages
        });
    }
    
    render() {
        return (
            <div className="Chatbox">
              <Chatbubbles 
                  messages={this.state.messages} />
              <Chatsend
                  sendMessage={this.sendMessage} />
            </div>
        );
    }
}

export default Chatbox;