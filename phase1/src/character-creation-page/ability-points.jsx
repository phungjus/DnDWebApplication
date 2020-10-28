import React from 'react';
import './ability-points-styles.css'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

class AbilityPoints extends React.Component {

    state = {
        stats: [8, 8, 8, 8, 8, 8],
        available_points: 27,
        cost: {8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 7, 15: 9},
        abilities: ["STRENGTH", "DEXTERITY", "CONSTITUTION", "INTELLIGENCE", "WISDOM", "CHARISMA"]
    }

    increaseStat = (e) => {
        const index = e.currentTarget.value
        const stat = this.state.stats[index]
        const needed_points = this.state.cost[stat + 1] - this.state.cost[stat]
        var new_stat = this.state.stats 
        new_stat[index] += 1
        this.setState({stats: new_stat, available_points: this.state.available_points-needed_points})
        this.props.onStatsChange(new_stat)
        
    }

    decreaseStat = (e) => {
        const index = e.currentTarget.value 
        const stat = this.state.stats[index]
        const gained_points = this.state.cost[stat] - this.state.cost[stat - 1]
        var new_stat = this.state.stats 
        new_stat[index] -= 1
        this.setState({stats: new_stat, available_points: this.state.available_points + gained_points})
        this.props.onStatsChange(new_stat)
    }

    createGrid = () => {
        const grid = []
        for (let i = 0; i < 6; i++){
            grid.push(
                <Grid item xs={3}>
                    <Paper className='grid-cell'>{this.state.abilities[i]}</Paper>
                </Grid>
            )
            grid.push(
                <Grid item xs={3}>
                    <Paper className='grid-cell'>
                        {this.state.stats[i]}
                        <button 
                            disabled={this.state.stats[i]===15 || (this.state.cost[this.state.stats[i]+1] - this.state.cost[this.state.stats[i]] > this.state.available_points)}
                            className='increment' 
                            onClick={this.increaseStat} 
                            value={i}>+
                        </button>
                        <button
                            disabled={this.state.stats[i]===8} 
                            className='increment'
                            onClick={this.decreaseStat} 
                            value={i}>-
                        </button>
                    </Paper>
                </Grid>
            )
            grid.push(
                <Grid item xs={3}>
                    <Paper className='grid-cell'>{(this.state.stats[i] > 11) ? "+":""}{Math.floor(this.state.stats[i]/2)-5}</Paper>
                </Grid>
            )
            grid.push(
                <Grid item xs={3}>
                    <Paper className='grid-cell'>{this.state.cost[this.state.stats[i]]}</Paper>
                </Grid>
            )
        }
        return (grid)
    }

    render() {
        return (
            <div className='ability-points'>
                <h2>STEP 2: ASSIGN ABILITY POINTS</h2>
                <h3>These will determine you character's strengths and weaknesses.</h3>
                <Grid container spacing={3} className='grid'>
                    <Grid item xs={3}>
                    <Paper className='header'>ABILITY</Paper>
                    </Grid>
                    <Grid item xs={3}>
                    <Paper className='header'>SCORE</Paper>
                    </Grid>
                    <Grid item xs={3}>
                    <Paper className='header'>MODIFIER</Paper>
                    </Grid>
                    <Grid item xs={3}>
                    <Paper className='header'>POINTS SPENT</Paper>
                    </Grid>
                    {this.createGrid()}
                </Grid>
                <h3>AVAILABLE POINTS: {this.state.available_points}/27</h3>
            </div>
        )
    }
}

export default AbilityPoints;