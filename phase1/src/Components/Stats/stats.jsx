import React from 'react';
import Paper from '@material-ui/core/Paper';
import "./stats-styles.css";

class Stats extends React.Component {
    state = {
        names: ["STR", "DEX", "CON", "INT", "WIS", "CHA"]
    }

    generateStats = () => {
        const stats = []
        for (let i = 0; i < 6; i++) {
            stats.push(
                <div className="stat-container">
                    <Paper className="box">
                        <p>{this.props.stats[i]}</p>
                    </Paper>
                    <span className="circle">{(this.props.stats[i] > 9) ? "+":""}{Math.floor(this.props.stats[i]/2)-5}</span>
                    <p className="stat-label">{this.state.names[i]}</p>
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