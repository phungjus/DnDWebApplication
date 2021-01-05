import React from 'react'
import './styles.css'

class Chatbubbles extends React.Component {

    render() {
        return (
            <ul className="Chatbubbles">
                {this.props.messages.reverse().map((message) => {
                    return (
                        <li className="messageli">
                            <div className="icon"></div>
                            <div className="user">{message.user}</div>
                            <div className="date">{message.time}</div>
                            <div className="message">{message.message}</div>
                        </li>
                    )
                })}
            </ul>
        )
    }
}

export default Chatbubbles