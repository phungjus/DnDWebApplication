import React from 'react'
import './styles.css'

class Chatbubbles extends React.Component {

    formatDate = (date) => {
        const now = new Date()
        console.log(date)
        if (date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth() && date.getDate() === now.getDate()) {
            return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        } else if (date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth()) {
            return (now.getDate() - date.getDate()) + " days ago"
        } else if (date.getFullYear() === now.getFullYear()) {
            return (now.getMonth() - date.getMonth()) + " months ago"
        } else {
            return (now.getFullYear() - date.getFullYear()) + " months ago"
        }
    }

    render() {
        return (
            <ul className="Chatbubbles">
                {[...this.props.messages].reverse().map((message) => {
                    console.log(message)
                    return (
                        <li className="messageli">
                            {/* <div className="icon"></div> */}
                            <div className="user">{message.userPosted.username}</div>
                            <div className="date">{this.formatDate(new Date(message.createdAt))}</div>
                            <div className="message">{message.message}</div>
                        </li>
                    )
                })}
            </ul>
        )
    }
}

export default Chatbubbles