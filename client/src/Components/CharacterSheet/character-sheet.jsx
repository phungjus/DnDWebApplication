import React from 'react';
import caleb from '../../images/caleb.jpg';
import CharacterPanel from '../CharacterPanel/character-panel.jsx';
import Stats from '../Stats/stats.jsx';
import CharacterHeader from '../CharacterHeader/character-header.jsx';
import Diceroller from '../Diceroller/index.js';
import './character-sheet-styles.css';
import AbilityModifiers from '../AbilityModifiers/ability-modifiers';
import {getCharacter} from '../../Actions/Characters.js'

class CharacterSheet extends React.Component {
    
    state = {
        name: "Caleb Widogast",
        image: caleb,
        level: 1,
        race: "human",
        class: "wizard",
        personality: "Caleb Widogast, born Bren Aldric Ermendrud, is a human wizard and a member of the adventuring party known as the Mighty Nein.",
        ideals: "The character's ideals will be described here.", 
        bonds: "The character's bonds will be described here.",
        flaws: "The character's flaws will be described here.", 
        stats: [8, 18, 11, 13, 9, 7],
        proficiency: 2,
        speed: 30,
        attack: 7,
        hp: 11,
    }

    componentDidMount = () => {
        getCharacter(this.props.userid, this.setCharacter)
    }

    setCharacter = (char) => {
        this.setState({name: char.name,
        level: char.level,
        race: char.race,
        class: char.class,
        personality: char.personality,
        ideals: char.ideals,
        bonds: char.bonds,
        flaws: char.flaws,
        stats: char.stats,
        proficiency: char.proficiency,
        speed: char.speed,
        attack: char.attack,
        hp: char.hp})
        console.log("State updated!")
        console.log(char)
    }

    handleStatsChange = (statsValue) => {
        this.setState({stats: statsValue});
      }

    render() {
        return (
            <div className="character-sheet">
                <CharacterPanel 
                    image={this.state.image} 
                    name={this.state.name}
                    level={this.state.level}
                    race={this.state.race}
                    class={this.state.class}
                    personality={this.state.personality}
                    hp={this.state.hp}
                    ideals={this.state.ideals}
                    bonds={this.state.bonds}
                    flaws={this.state.flaws}
                />
                <Stats
                    stats={this.state.stats}
                    user={this.props.user}
                    onStatsChange={this.handleStatsChange}
                />
                <CharacterHeader
                    ac={10 + Math.floor(this.state.stats[1]/2)-5}
                    initiative={(this.state.stats[1] > 9) ? "+".concat(Math.floor(this.state.stats[1]/2)-5):Math.floor(this.state.stats[1]/2)-5}
                    speed={this.state.speed}
                    proficiency={this.state.proficiency}
                    attack={this.state.attack}
                />
                <Diceroller/>
                <AbilityModifiers stats={this.state.stats}/>
            </div>
        )
    }
}

export default CharacterSheet;