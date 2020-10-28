import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import human from '../images/human.jpg';
import elf from '../images/elf.png';
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
            <div className='selection'>
                <h2>STEP 3: CHOOSE A RACE</h2>
                <h3>Something about choosing a race... </h3>
                <Grid container spacing={3} className='grid'>
                    <Grid item xs={4}>
                        <Paper className='card'>
                            <img className='card-image' src={human}/>
                            <h2>HUMAN</h2>
                            <Radio
                                checked={this.state.selectedValue === 'human'}
                                value="human"
                                onChange={this.handleChange}
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper className='card'>
                            <img className='card-image' src={elf}/>
                            <h2>ELF</h2>
                            <Radio
                                checked={this.state.selectedValue === 'elf'}
                                value="elf"
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