import React from 'react'
import './styles.css'

class Chatbubbles extends React.Component {
    getDate = () => {
        const date = new Date()
        return date.toLocaleTimeString('en-US')
    }
    render() {
        return (
            <ul className="Chatbubbles">
                {this.props.messages.map((message) => {
                    return (
                        <li className="messageli">
                            <div className="icon"></div>
                            <div className="user">Kyoji</div>
                            <div className="date">{this.getDate()}</div>
                            <div className="message">{message}</div>
                        </li>
                    )
                })}
            </ul>
        )
    }
}

export default Chatbubbles