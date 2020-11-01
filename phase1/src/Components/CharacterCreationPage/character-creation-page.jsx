import React from 'react';
import CharacterUpload from '../CharacterUpload/character-upload.jsx'
import Alignment from '../Alignment/alignment.jsx'
import AbilityPoints from '../AbilityPoints/ability-points.jsx'
import RaceSelection from '../RaceSelection/race-selection.jsx'
import './character-creation-page-styles.css'

class CharacterCreatePage extends React.Component{ 

  state = {stats: [8, 8, 8, 8, 8, 8]}

  handleStatsChange = (statsValue) => {
    this.setState({stats: statsValue});
  }
  
  render() {
    return (
      <div>
        <div class='title'><h1 class='title'>CHARACTER CREATOR</h1></div>
        <div className='charactercreatepage'>
          <CharacterUpload/>
          <Alignment/>
          <AbilityPoints onStatsChange={this.handleStatsChange}/>
          <RaceSelection currStats={this.state.stats}/>
        </div>
      </div>
    )
  }

}

export default CharacterCreatePage;