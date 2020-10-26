import React from 'react';
import CharacterUpload from './character-upload.jsx'
import Alignment from './alignment.jsx'
import AbilityPoints from './ability-points.jsx'
import './character-creation-page-styles.css'

const CharacterCreatePage = () => (
  <div>
  <div class='title'><h1 class='title'>CHARACTER CREATOR</h1></div>
  <div className='charactercreatepage'>
    <CharacterUpload/>
    <Alignment/>
    <AbilityPoints/>
  </div>
  </div>
);

export default CharacterCreatePage;