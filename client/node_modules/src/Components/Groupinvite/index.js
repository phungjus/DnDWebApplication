import React from "react";
import './styles.css';

class PopUp extends React.Component {
    handleClick = () => {
        this.props.toggle();
    };
    
    state = { copySuccess: '' }
    
    copyToClipboard = (event) => {
        this.textArea.select();
        document.execCommand('copy');
        event.target.focus();
        this.setState({ copySuccess: 'Copied!' });
    };
    
    render() {
        return (
        <div className="modal">
            <div className="modal_content">
                <span className="close" onClick={this.handleClick}>&times;    </span>
                <p>Send this link to add people to the group: </p>
                <br/>
                <form>
                <textarea
                    ref={(textarea) => this.textArea = textarea}
                    value='bit.ly/dndgroup1234'
                />
                </form>
                <button onClick={this.copyToClipboard}>Copy</button>
                {this.state.copySuccess}
            </div>
        </div>
        );
    }
}

export default PopUp;