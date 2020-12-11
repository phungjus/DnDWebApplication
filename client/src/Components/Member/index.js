import React from 'react';
import Button from '@material-ui/core/Button'
import './styles.css';

class Member extends React.Component {

    state = {
        user = null
    }

    componentDidMount() {
        this.setState({
            user: this.props.user
        })
    }

    render() {
        return(
            <div className="Member">
                {/* <span className="dot"></span> */}
                <p className="Memberp">
                    {this.props.name}
                    {" (" + this.props.memberType + ")"}
                </p>
                <a href="/Character">
                    Character sheet
                </a>
                {this.props.userType === true ? <Button className="KickButton" onClick={() => this.props.deleteMember(this.props.name)}>Kick</Button>:null}
            </div>
        );
    }
}

export default Member;