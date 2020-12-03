import React from 'react';
import CharacterUpload from '../CharacterUpload/character-upload.jsx'
import Alignment from '../Alignment/alignment.jsx'
import AbilityPoints from '../AbilityPoints/ability-points.jsx'
import RaceSelection from '../RaceSelection/race-selection.jsx'
import ClassSelection from '../ClassSelection/class-selection.jsx'
import Button from '@material-ui/core/Button'
import './character-creation-page-styles.css'
import {saveCharacter} from "../../Actions/Characters";

class CharacterCreatePage extends React.Component{ 

  state = {stats: [8, 8, 8, 8, 8, 8], class: "wizard", race: "human", name: "na", personality: "na", ideals: "na", bonds: "na", flaws: "na"}

  handleStatsChange = (statsValue) => {
    this.setState({stats: statsValue});
  }

  handleClassChange = (classValue) => {
    this.setState({class: classValue})
  }

  handleRaceChange = (raceValue) => {
    this.setState({race: raceValue})
  }

  handleNameChange = (e) => {
    this.setState({name: e.target.value})
  }

  handlePersonalityChange = (e) => {
    this.setState({personality: e.target.value})
  }

  handleIdealsChange = (e) => {
    this.setState({ideals: e.target.value})
  }

  handleBondsChange = (e) => {
    this.setState({bonds: e.target.value})
  }

  handleFlawsChange = (e) => {
    this.setState({flaws: e.target.value})
  }
  
  handleCharacterSubmit = () => {
    var newCharacter = {}
    newCharacter.name = this.state.name
    newCharacter.personality = this.state.personality
    newCharacter.ideals = this.state.ideals
    newCharacter.bonds = this.state.bonds 
    newCharacter.flaws = this.state.flaws
    newCharacter.level = 1 // all characters start at level 1 
    newCharacter.race = this.state.race
    newCharacter.class = this.state.class
    newCharacter.stats = this.state.stats 
    newCharacter.proficiency = 1 // all characters start with a prof. bonus of +1
    newCharacter.speed = 25
    newCharacter.attack = 5
    newCharacter.hp = 11
    console.log(this.props.userid)
    saveCharacter(this.props.userid, newCharacter)
  }
  
  render() {
    return (
      <div>
        <div className='charactercreatepage'>
          <CharacterUpload onNameChange={this.handleNameChange} onPersonalityChange={this.handlePersonalityChange} onIdealsChange={this.handleIdealsChange} onBondsChange={this.handleBondsChange} onFlawsChange={this.handleFlawsChange}/>
          <Alignment/>
          <AbilityPoints onStatsChange={this.handleStatsChange}/>
          <RaceSelection onRaceChange={this.handleRaceChange}/>
          <ClassSelection onClassChange={this.handleClassChange}/>
          <div className="wide"><Button className="button wide" variant="contained" component="span" onClick={this.handleCharacterSubmit}>SUBMIT</Button></div>
        </div>
      </div>
    )
  }

}

export default CharacterCreatePage;