import React from 'react';
import Chatbubbles from '../Chatbubbles'
import Chatsend from '../Chatsend'
import './styles.css'
import { getMessages, addMessage } from '../../Actions/Messages'

const URL = 'ws://localhost:5001'

class Chatbox extends React.Component {

    state = {
        // get messages through a server call
        messages: []
    }

    ws = new WebSocket(URL)

    componentDidMount() {
        this.ws.onopen = () => {
            // on connecting, do nothing but log it to the console
            console.log('connected')
        }

        this.ws.onmessage = evt => {
            // on receiving a message, add it to the list of messages
            const message = JSON.parse(evt.data)
            this.addMessage(message)
        }

        this.ws.onclose = () => {
            console.log('disconnected')
            // automatically try to reconnect on connection loss
            this.setState({
                ws: new WebSocket(URL),
            })
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.groupid !== prevProps.groupid) {
            getMessages(this.props.groupid, (messages) => {
                if (messages !== "undefined") {
                    console.log(messages)
                    this.setState({
                        messages: messages
                    })
                }
            })
        }
    }

    addMessage(message) {
        const messages = this.state.messages
        messages.push(message)
        this.setState({
            messages: messages
        })
    }
    
    sendMessage = (text) => {
        // send message though a server call
        addMessage(this.props.groupid, this.props.userid, text)
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