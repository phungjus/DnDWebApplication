import React from 'react';
import Chatbubbles from '../Chatbubbles'
import Chatsend from '../Chatsend'
import Groupbanner from '../Groupbanner'
import './styles.css'

class Chatbox extends React.Component {

    state = {
        messages: []
    }
    
    sendMessage = (text) => {
        const messages = this.state.messages
        messages.push(text)
        this.setState({
            messages : messages
        });
    }
    
    render() {
        return (
            <div className="Chatbox">
              {/* <Groupbanner /> */}
              <Chatbubbles 
                  messages={this.state.messages} />
              <Chatsend
                  sendMessage={this.sendMessage} />
            </div>
        );
    }
}

export default Chatbox;