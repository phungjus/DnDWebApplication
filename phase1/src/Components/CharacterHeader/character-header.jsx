import React from 'react';
import './character-header-styles.css';

class CharacterHeader extends React.Component {
    render() {
        return(
            <div className="character-header">
                <div className="circle-container">
                    <span className="large-circle">{this.props.ac}</span>
                    <p className="circle-label">AC</p>
                </div>
                <div className="circle-container">
                    <span className="large-circle">{this.props.initiative}</span>
                    <p className="circle-label">INITIATIVE</p>
                </div>
                <div className="circle-container">
                    <span className="large-circle">{this.props.speed}</span>
                    <p className="circle-label">SPEED</p>
                </div>
                <div className="circle-container">
                    <span className="large-circle">+{this.props.proficiency}</span>
                    <p className="circle-label">PROF.</p>
                </div>
                <div className="rectangle-container">
                    <span className="rectangle">+{this.props.attack}</span>
                    <p className="circle-label">ATTACK MOD.</p>
                </div>
            </div>
        )
    }
}

export default CharacterHeader;