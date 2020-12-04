import React from 'react';
import Chatbubbles from '../Chatbubbles'
import Chatsend from '../Chatsend'
import './styles.css'
import { getMessages, addMessage } from '../../Actions/Messages'

class Chatbox extends React.Component {

    state = {
        // get messages through a server call
        messages: []
    }

    componentDidMount() {
        if (this.props.groupid !== "undefined") {
            getMessages(this.props.groupid, (messages) => {
                if (messages !== "undefined") {
                    this.setState({
                        messages: messages
                    })
                }
            })
        }
    }
    
    sendMessage = (text, time) => {
        // send message though a server call
        addMessage(this.props.groupid, this.props.userid, text, (messages) => {
            if (messages !== "undefined") {
                this.setState({
                    messages: messages
                })
            }
        })
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