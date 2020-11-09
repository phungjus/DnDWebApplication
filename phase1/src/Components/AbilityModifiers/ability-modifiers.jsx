import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import './ability-modifiers-styles.css';

class AbilityModifiers extends React.Component {

    state = {
        abilities: {"acrobatics": 1, 
                    "animal handling": 4, 
                    "arcana": 3,
                    "athletics": 0,
                    "deception": 5,
                    "history": 3,
                    "insight": 4,
                    "intimidation": 5,
                    "investigation": 3,
                    "medicine": 4,
                    "nature": 3,
                    "perception": 4,
                    "performance": 5,
                    "persuasion": 5,
                    "religion": 3,
                    "sleight of hand": 1,
                    "stealth": 1,
                    "survival": 4
                },
        stats: ["STR", "DEX", "CON", "INT", "WIS", "CHA"]
    }

    createAbilityGrid = () => {
        const grid = [];
        for (var ability in this.state.abilities) {
            grid.push(
                <Grid item xs={6}>
                    <Paper className='ability'>
                        {(this.props.stats[this.state.abilities[ability]] > 11) ? "+":""}
                        {Math.floor(this.props.stats[this.state.abilities[ability]]/2)-5} {ability.toUpperCase()} ({this.state.stats[this.state.abilities[ability]]})
                    </Paper>
                </Grid>
            )
        }
        return grid;
    }

    createSavingGrid = () => {
        const grid = [];
        for (var i = 0; i < 6; i++) {
            grid.push (
                <Grid item xs={6}>
                    <Paper className='ability'>
                        {(this.props.stats[i] > 11) ? "+":""}
                        {Math.floor(this.props.stats[i]/2)-5} {this.state.stats[i]}
                    </Paper>
                </Grid>
            )
        }
        return grid;
    }

    render() {
        return (
            <div className="ability-mods">
                <h2>SKILLS</h2>
                <Grid container spacing={3} className='grid'>
                    {this.createAbilityGrid()}
                </Grid>
                <h2>SAVING THROWS</h2>
                <Grid container spacing={3} className='grid'>
                    {this.createSavingGrid()}
                </Grid>
            </div>
        )
    }
}

export default AbilityModifiers;