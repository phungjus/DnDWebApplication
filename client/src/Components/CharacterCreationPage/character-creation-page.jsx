import React from 'react';
import CharacterUpload from '../CharacterUpload/character-upload.jsx'
import Alignment from '../Alignment/alignment.jsx'
import AbilityPoints from '../AbilityPoints/ability-points.jsx'
import RaceSelection from '../RaceSelection/race-selection.jsx'
import ClassSelection from '../ClassSelection/class-selection.jsx'
import Button from '@material-ui/core/Button'
import './character-creation-page-styles.css'

class CharacterCreatePage extends React.Component{ 

  state = {stats: [8, 8, 8, 8, 8, 8]}

  handleStatsChange = (statsValue) => {
    this.setState({stats: statsValue});
  }
  // Submit button currently does not do anything, will make call to back end in Phase 2. 
  
  render() {
    return (
      <div>
        <div className='charactercreatepage'>
          <CharacterUpload/>
          <Alignment/>
          <AbilityPoints onStatsChange={this.handleStatsChange}/>
          <RaceSelection/>
          <ClassSelection/>
          <div className="wide"><Button className="button wide" variant="contained" component="span">SUBMIT</Button></div>
        </div>
      </div>
    )
  }

}

export default CharacterCreatePage;