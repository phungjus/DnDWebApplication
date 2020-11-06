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
    }

    render(){
        return (
            <div className='class-selection'>
                <h2>STEP 4: CHOOSE A CLASS</h2>
                <h3>Something about choosing a class... </h3>
                <Grid container spacing={3} className='grid'>
                    <Grid item xs={4}>
                        <Paper className='card'>
                            <img className='card-image' src={wizard}/>
                            <h2>WIZARD</h2>
                            <p>Humans are the most adaptable and ambitious people among the common races. Whatever drives them, humans are the innovators, the achievers, and the pioneers of the worlds.</p>
                            <p><strong>RACIAL TRAITS</strong></p>
                            <p>+1 to all ability scores, Extra Language</p>
                            <Radio
                                checked={this.state.selectedValue === 'wizard'}
                                value="wizard"
                                onChange={this.handleChange}
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper className='card'>
                            <img className='card-image' src={rogue}/>
                            <h2>ROGUE</h2>
                            <p>Elves are a magical people of otherworldly grace, living in the world but not entirely part of it.</p>
                            <p><strong>RACIAL TRAITS</strong></p>
                            <p>+2 Dexterity, Darkvision, Keen Senses, Fey Ancestry, Trance</p>
                            <Radio
                                checked={this.state.selectedValue === 'rogue'}
                                value="rogue"
                                onChange={this.handleChange}
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper className='card'>
                            <img className='card-image' src={fighter}/>
                            <h2>FIGHTER</h2>
                            <p>Bold and hardy, dwarves are known as skilled warriors, miners, and workers of stone and metal.</p>
                            <p><strong>RACIAL TRAITS</strong></p>
                            <p>+2 Constitution, Darkvision, Dwarven Resilience, Dwarven Combat Training, Stonecunning</p>
                            <Radio
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