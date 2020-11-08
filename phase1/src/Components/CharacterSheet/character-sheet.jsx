import React from 'react';
import caleb from '../../images/caleb.jpg';
import CharacterPanel from '../CharacterPanel/character-panel.jsx';
import './character-sheet-styles.css';

class CharacterSheet extends React.Component {
    /* This state is hardcoded for phase 1 but would be retrieved from backend */
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
        hp: 11,
        death: 0
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
            </div>
        )
    }
}

export default CharacterSheet;