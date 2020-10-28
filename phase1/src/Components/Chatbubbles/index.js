import React from 'react'
import './styles.css'

class Chatbubbles extends React.Component {
    render() {
        return (
            <ul className="Chatbubbles">
                {this.props.messages.map((message) => {
                    return (
                      <li className="message">
                        <div>{message}</div>
                      </li>
                    )
                })}
            </ul>
        )
    }
}

export default Chatbubbles