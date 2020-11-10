import React from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import './character-panel-styles.css';

class CharacterPanel extends React.Component {
    state = {
        curr: this.props.hp
    }

    increaseHp = () => {
        this.setState({curr: this.state.curr + 1})
    }

    decreaseHp = () => {
        this.setState({curr: this.state.curr - 1})
    }

    render() {
        return (
            <div className="panel">
                <img className="character-image" alt="This is your character" src={this.props.image} />
                <h2 className="caption">{this.props.name.toUpperCase()}</h2>
                <h3 className="caption">LVL {this.props.level} {this.props.race.toUpperCase()} {this.props.class.toUpperCase()}</h3>
                <p className="caption bottom">{this.props.personality}</p>

                <Paper className="hit-points">
                    <p>{this.state.curr}/{this.props.hp} HP</p>
                </Paper>
                <div className="button-container">
                <Button variant="contained" component="p" className='hp-button' onClick={this.increaseHp}>
                    + 
                </Button>
                <span className="spacing"></span>
                <Button variant="contained" component="p" className='hp-button' onClick={this.decreaseHp}>
                    - 
                </Button>
                </div>

                <h3>IDEALS</h3>
                <p>{this.props.ideals}</p>

                <h3>BONDS</h3>
                <p>{this.props.bonds}</p>

                <h3>FLAWS</h3>
                <p>{this.props.flaws}</p>
            </div>
        )
    }
}

export default CharacterPanel;