import React from 'react'
import Memberlist from '../Memberlist'
import Diceroller from '../Diceroller'
import Chatbox from '../Chatbox'
import './style.css'

class Group extends React.Component {
    render() {
        return (
            <div>
                <Memberlist/>
                <Chatbox/>
                <Diceroller/>
            </div>
        )
    }
}

export default Group;