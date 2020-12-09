import React from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import "./stats-styles.css";

class Stats extends React.Component {
    state = {
        names: ["STR", "DEX", "CON", "INT", "WIS", "CHA"],
        stats: this.props.stats
    }

    increaseStat = (e) => {
        const index = e.currentTarget.value
        var new_stat = this.state.stats
        new_stat[index] += 1
        this.setState({stats: new_stat})
        this.props.onStatsChange(new_stat)
        
    }

    decreaseStat = (e) => {
        const index = e.currentTarget.value 
        var new_stat = this.state.stats 
        new_stat[index] -= 1
        this.props.onStatsChange(new_stat)
    }

    generateStats = () => {
        const stats = []
        for (let i = 0; i < 6; i++) {
            stats.push(
                <div className="stat-container">
                    <Paper className="box">
                        <p>{this.props.stats[i]}</p>
                    </Paper>
                    <span className="circle">{(this.state.stats[i] > 9) ? "+":""}{Math.floor(this.state.stats[i]/2)-5}</span>
                    <p className="stat-label">{this.state.names[i]}</p>
                    {this.props.user.admin ? (
                        <div>
                        <Button 
                            className='button' 
                            onClick={this.increaseStat} 
                            value={i}>+
                        </Button>
                        <Button 
                            className='button' 
                            onClick={this.decreaseStat} 
                            value={i}>-
                        </Button>
                    </div>
                    ) : (
                            <span></span>
                    )}
                </div>  
            )
        }
        return stats
    }

    render() {
        return (
            <div className="stats">
                {this.generateStats()}
            </div>
        )
    }
}

export default Stats;