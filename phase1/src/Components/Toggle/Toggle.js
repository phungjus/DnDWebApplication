import React from 'react';

import './Toggle.css'

class Toggle extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            toggled: false
        }

        this.toggleComments = this.toggleComments.bind(this)

    }

    toggleComments() {
        const toggled = this.state.toggled
        this.setState({toggled: !toggled})
    }

    render() {

        let { title, children } = this.props
        const toggled = this.state.toggled

        if (toggled) {
            title = 'Hide Comments';
        } else {
            title = 'Show Comments';
        }

        return(
            <div className="toggleBox">
                <div className="toggleTitle" onClick={this.toggleComments}>
                    {title}
                </div>
                {toggled && (
                    <div className="comments">
                        {children}
                    </div>
                )}
            </div>
        )
    }

}

export default Toggle;