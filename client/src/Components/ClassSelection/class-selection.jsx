import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import wizard from '../../images/wizard.png';
import rogue from '../../images/rogue.png';
import fighter from '../../images/fighter.png';
import './class-selection-styles.css';

class ClassSelection extends React.Component {

    state = {
        selectedValue: "wizard"
    }

    handleChange = (e) => {
        this.setState({selectedValue: e.target.value})
        this.props.onClassChange(e.target.value)
    }

    render(){
        return (
            <div className='class-selection'>
                <h2>STEP 4: CHOOSE A CLASS</h2>
                <h3>Your character’s class determines their skills and abilities. Skills are determined by a particular Class’ Class Features, while abilities are measured by Ability Scores.</h3>
                <Grid container spacing={3} className='grid'>
                    <Grid item xs={4}>
                        <Paper className='card'>
                            <img className='card-image' alt="A wizard" src={wizard}/>
                            <h2>WIZARD</h2>
                            <p>A scholarly magic-user capable of manipulating the structures of reality.</p>
                            <p><strong>CLASS TRAITS</strong></p>
                            <p>Hit Die: d6. Primary ability: Intelligence.</p>
                            <Radio
                                color="default"
                                checked={this.state.selectedValue === 'wizard'}
                                value="wizard"
                                onChange={this.handleChange}
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper className='card'>
                            <img className='card-image' alt="A rogue." src={rogue}/>
                            <h2>ROGUE</h2>
                            <p>A scoundrel who uses stealth and trickery to overcome obstacles and enemies.</p>
                            <p><strong>CLASS TRAITS</strong></p>
                            <p>Hit die: d8. Primary ability: Dexterity.</p>
                            <Radio
                                color="default"
                                checked={this.state.selectedValue === 'rogue'}
                                value="rogue"
                                onChange={this.handleChange}
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper className='card'>
                            <img className='card-image' alt="A fighter." src={fighter}/>
                            <h2>FIGHTER</h2>
                            <p>A master of martial combat, skilled with a variety of weapons and armor.</p>
                            <p><strong>CLASS TRAITS</strong></p>
                            <p>Hit Die: d10. Primary ability: Strength or Dexterity.</p>
                            <Radio
                                color="default"
                                checked={this.state.selectedValue === 'fighter'}
                                value="fighter"
                                onChange={this.handleChange}
                            />
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default ClassSelection