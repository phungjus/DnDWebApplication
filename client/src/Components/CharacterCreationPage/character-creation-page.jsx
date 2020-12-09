import React from 'react';
import CharacterUpload from '../CharacterUpload/character-upload.jsx'
import Alignment from '../Alignment/alignment.jsx'
import AbilityPoints from '../AbilityPoints/ability-points.jsx'
import RaceSelection from '../RaceSelection/race-selection.jsx'
import ClassSelection from '../ClassSelection/class-selection.jsx'
import Button from '@material-ui/core/Button'
import './character-creation-page-styles.css'
import {addImage, saveCharacter} from "../../Actions/Characters";

class CharacterCreatePage extends React.Component{ 

  state = {stats: [8, 8, 8, 8, 8, 8], class: "wizard", race: "human", name: "na", personality: "na", ideals: "na", bonds: "na", flaws: "na"}

  setStats(char) {
    var newStats = char.stats
    if (char.race === 'human') {
      newStats.map(n=>n+1) 
    }
    else if (char.race === 'elf') {
      newStats[1] = newStats[1] + 2
    }
    else {
      newStats[2] = newStats[2] + 2
    }
  }

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
    this.setStats(newCharacter)
    newCharacter.proficiency = 1 // all characters start with a prof. bonus of +1
    newCharacter.race === 'dwarf' ? newCharacter.speed = 20 : newCharacter.speed = 30
    newCharacter.attack = newCharacter.class === 'wizard' ? Math.floor(newCharacter.stats[3]/2)-4 : Math.floor(newCharacter.stats[1]/2)-4
    newCharacter.hp = Math.floor(newCharacter.stats[2]/2) + (newCharacter.class === 'wizard' ? 1 : newCharacter.class === 'rogue' ? 3 : 5)

    var x = document.getElementsByClassName("image-form");
    var input = document.getElementById("imageInput")
    if (input.value === "") {
      saveCharacter(this.props.userid, newCharacter, this.loadNextPage)
    }
    else {
      addImage(x[0], this.props.userid, newCharacter, this.loadNextPage)
    }
  }

  loadNextPage = () => {
    const button = document.getElementById("NavigateCharacter")
    button.click()
  }
  
  render() {
    console.log(this.props.userid)
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

export default CharacterCreatePage