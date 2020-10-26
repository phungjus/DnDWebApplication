import React from 'react';
import './ability-points-styles.css'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

class AbilityPoints extends React.Component {

    state = {
        stats: [8, 8, 8, 8, 8, 8],
        total_points: 27,
        spent_points: [0, 0, 0, 0, 0, 0],
        cost: {9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 7, 15: 9}
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
          <Paper className='header'>POINTS</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className='grid-cell'>STRENGTH</Paper>
        </Grid>
        <Grid item xs={3}>
        <Paper className='grid-cell'>{this.state.stats[0]}</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className='grid-cell'>{Math.floor(this.state.stats[0]/2)-5}</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className='grid-cell'>{this.state.spent_points[0]}</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className='grid-cell'>DEXTERITY</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className='grid-cell'>{this.state.stats[1]}</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className='grid-cell'>{Math.floor(this.state.stats[1]/2)-5}</Paper>
        </Grid>
        <Grid item xs={3}>
        <Paper className='grid-cell'>{this.state.spent_points[1]}</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className='grid-cell'>CONSTITUTION</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className='grid-cell'>{this.state.stats[2]}</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className='grid-cell'>{Math.floor(this.state.stats[2]/2)-5}</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className='grid-cell'>{this.state.spent_points[2]}</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className='grid-cell'>INTELLIGENCE</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className='grid-cell'>{this.state.stats[3]}</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className='grid-cell'>{Math.floor(this.state.stats[3]/2)-5}</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className='grid-cell'>{this.state.spent_points[3]}</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className='grid-cell'>WISDOM</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className='grid-cell'>{this.state.stats[4]}</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className='grid-cell'>{Math.floor(this.state.stats[4]/2)-5}</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className='grid-cell'>{this.state.spent_points[4]}</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className='grid-cell'>CHARISMA</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className='grid-cell'>{this.state.stats[5]}</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className='grid-cell'>{Math.floor(this.state.stats[5]/2)-5}</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className='grid-cell'>{this.state.spent_points[5]}</Paper>
        </Grid>
      </Grid>
            </div>
        )
    }
}

export default AbilityPoints;