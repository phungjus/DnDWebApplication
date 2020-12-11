import React from 'react';
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom';
import './styles.css';

class Member extends React.Component {

    state = {
        user: null
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
                <Link to ={{
                    pathname: "/Character",
                    state: {id: this.props.id}
                    }
                }>
                    <Button>
                    Character sheet
                    </Button></Link>
                {this.props.userType === true ? <Button className="KickButton" onClick={() => this.props.deleteMember(this.state.user)}>Kick</Button>:null}
            </div>
        );
    }
}

export default Member;