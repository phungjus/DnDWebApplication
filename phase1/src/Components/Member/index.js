import React from 'react';
import './styles.css';

class Member extends React.Component {
    render() {
        return(
            <div className="Member">
                <span className="dot"></span>
                <p className="Memberp">
                    {this.props.name}
                    {" (" + this.props.memberType + ")"}
                </p>
                <a href="">
                    Character sheet
                </a>
            </div>
        );
    }
}

export default Member;