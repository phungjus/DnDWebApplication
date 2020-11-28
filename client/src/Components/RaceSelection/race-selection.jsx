import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import human from '../../images/human.jpg';
import elf from '../../images/elf.png';
import dwarf from '../../images/dwarf.png';
import './race-selection-styles.css';

class RaceSelection extends React.Component {

    state = {
        selectedValue: "human"
    }

    handleChange = (e) => {
        this.setState({selectedValue: e.target.value})
    }

    render(){
        return (
            <div className='raceselection'>
                <h2>STEP 3: CHOOSE A RACE</h2>
                <h3>Something about choosing a race... </h3>
                <Grid container spacing={3} className='grid'>
                    <Grid item xs={4}>
                        <Paper className='card'>
                            <img className='card-image' alt= "A human." src={human}/>
                            <h2>HUMAN</h2>
                            <p>Humans are the most adaptable and ambitious people among the common races. Whatever drives them, humans are the innovators, the achievers, and the pioneers of the worlds.</p>
                            <p><strong>RACIAL TRAITS</strong></p>
                            <p>+1 to all ability scores, Extra Language</p>
                            <Radio
                                color="default"
                                checked={this.state.selectedValue === 'human'}
                                value="human"
                                onChange={this.handleChange}
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper className='card'>
                            <img className='card-image' alt="An elf" src={elf}/>
                            <h2>ELF</h2>
                            <p>Elves are a magical people of otherworldly grace, living in the world but not entirely part of it.</p>
                            <p><strong>RACIAL TRAITS</strong></p>
                            <p>+2 Dexterity, Darkvision, Keen Senses, Fey Ancestry, Trance</p>
                            <Radio
                                color="default"
                                checked={this.state.selectedValue === 'elf'}
                                value="elf"
                                onChange={this.handleChange}
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper className='card'>
                            <img className='card-image' alt="A dwarf" src={dwarf}/>
                            <h2>DWARF</h2>
                            <p>Bold and hardy, dwarves are known as skilled warriors, miners, and workers of stone and metal.</p>
                            <p><strong>RACIAL TRAITS</strong></p>
                            <p>+2 Constitution, Darkvision, Dwarven Resilience, Dwarven Combat Training, Stonecunning</p>
                            <Radio
                                color="default"
                                checked={this.state.selectedValue === 'dwarf'}
                                value="dwarf"
                                onChange={this.handleChange}
                            />
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default RaceSelection